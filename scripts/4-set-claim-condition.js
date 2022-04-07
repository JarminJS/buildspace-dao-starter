import sdk from "./1-initialize-sdk.js"; 
import {MaxUint256} from "@ethersproject/constants"; 

const editionDrop = sdk.getEditionDrop(
    "0xe5796A4a95bc54C7FE397B49F6C7448Ae9645EbA"
); 

(async () => {
    try {
    // set our own claim conditions. an array of object because we can
    // have multiple phases starting at different time 
    
    const claimCondition = [{
        // when can start claiming: now 
        startTime: new Date(), 
        // max number NFT can be claimed 
        maxQuantity: 10_000, 
        // price of NFT
        price: 0, 
        // amount can be claimed in one transaction
        quantityLimitPerTransaction: 1, 
        // set the wait between transactions to MaxUint256, 
        // people can only claim once
        waitInSeconds: MaxUint256, 
    }]

    await editionDrop.claimConditions.set("0", claimCondition); 
    console.log("✅ Sucessfully set claim condition!")
    } catch (err) {
        console.log("Failed to set claim condition ", err); 
    }
})(); 