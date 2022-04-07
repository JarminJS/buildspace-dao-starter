import {AddressZero} from "@ethersproject/constants"; 
import sdk from "./1-initialize-sdk.js"; 
import {readFileSync} from "fs"; 

// editionDrop Contract Address: 0xe5796A4a95bc54C7FE397B49F6C7448Ae9645EbA

(async () => {
    try {
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            // collection name 
            name: "studentDAO Membership", 
            // description 
            description: "A DAO for students",  
            //image held on our NFT 
            image: readFileSync("scripts/assets/student.png"), 
            // need address people receiving the address 
            // planning not to charge, so pass in the 0x0 address
            // can set this to own address if want to charge for the drop
            primary_sale_recipient: AddressZero, 
        }); 

        // this returns address of contract
        // use this to initialize contract on the thirdweb sdk 
        const editionDrop = sdk.getEditionDrop(editionDropAddress);
        
        // get metadata of contract 
        const metadata = await editionDrop.metadata.get(); 

        console.log("✅ Successfully deployed editionDrop contract, address:",
        editionDropAddress); 

        console.log("✅ editionDrop metadata: ", metadata); 

    } catch (error) {
        console.log("Failed to display editionDrop contract, ", error ); 
    }
})(); 