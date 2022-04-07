import sdk from "./1-initialize-sdk.js"; 
import { readFileSync } from "fs"; 

const editionDrop = sdk.getEditionDrop("0xe5796A4a95bc54C7FE397B49F6C7448Ae9645EbA"); 

(async () => {
    try {
        await editionDrop.createBatch([
            {
                name: "Students Pass", 
                description: "This NFT will grant you access to studentDAO", 
                image: readFileSync("scripts/assets/pass.png")
            }, 
        ]); 
        console.log("✅ Successfully created a new NFT in the drop!"); 
    } catch(err) {
        console.log("Failed to create the new NFT ", err); 
    }
})(); 