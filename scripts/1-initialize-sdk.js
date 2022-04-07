import { ThirdwebSDK } from "@thirdweb-dev/sdk"; 
import ethers from "ethers"; 

// Importing and configuring .env file used to store environment variables
import dotenv from "dotenv"; 
dotenv.config(); 

// Check .env files 

if(!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === ""){
    console.log("🛑 Private key not found.");
}

if(!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === ""){
    console.log("🛑 Alchemy API URL not found.");
}

if(!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === ""){
    console.log("🛑 Wallet address not found.");
}

const sdk  = new ThirdwebSDK(
    new ethers.Wallet(
        // Private key -- KEEP THIS PRIVATE, DO NOT SHARE, add to .env file]
        process.env.PRIVATE_KEY,
        // RPC URL, use Alchemy API URL 
        ethers.getDefaultProvider(process.env.ALCHEMY_API_URL),
    )
); 

(async () => {
    try {
        const address = await sdk.getSigner().getAddress(); 
        console.log("👋 SDK initialized by : ", address); 
    } catch (err) {
        console.log("Failed to get app from sdk ",  err); 
        process.exit(1); 
    }
})(); 

// export initialized thirdweb SDK to use in other scripts
export default sdk; 
