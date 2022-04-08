import { AddressZero } from "@ethersproject/constants"; 
import sdk from "./1-initialize-sdk.js"; 

(async () => {
    try {
        // deploy standard ERC-21 contract

        const tokenAddress = await sdk.deployer.deployToken({
            // token name 
            name: "Student Token", 
            // symbol
            symbol: "STK", 
            //set if want to sell, if not AddressZero
            primary_sale_recipient: AddressZero, 
        }); 

        console.log("✅ Successfully deployed token module, address:", tokenAddress); 
    } catch (err) {
        console.log("Failed to deploy token module: ", err); 
    }
})(); 