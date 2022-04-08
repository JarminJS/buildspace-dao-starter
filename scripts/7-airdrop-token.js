import sdk from "./1-initialize-sdk.js"; 

// address to ERC-1155 membership NFT contract
const editionDrop = sdk.getEditionDrop("0xe5796A4a95bc54C7FE397B49F6C7448Ae9645EbA");

// address to ERC-20 token contract 
const token = sdk.getToken("0x413fB74Ffa8ef32E38Aca438333FcA371f396610"); 

(async () => {
    try {
        // Grab all address of people owning membership NFT with tokenId 0

        const walletAddress = await editionDrop.history.getAllClaimerAddresses(0); 

        if(walletAddress.length === 0){
            console.log("No NFTs have been claimed. ");
            process.exit(0); 
        }

        // loop through array of Address

        const airdropTargets = walletAddress.map((address) => {
            // pick random number between 1000 and 10000

            const randomAmount = Math.floor(Math.random() * (100000 - 1000 + 1) + 1000); 
            console.log("✅ Going to airdrop", randomAmount, " tokens to ", address); 

            // set up target 
            const airdropTarget = {
                toAddress: address, 
                amount: randomAmount, 
            }; 

            return airdropTarget; 
        }); 

        // Call transferBatch on all our airdrop targets. 

        console.log("🌈 Starting airdrop..."); 
        //await token.transferBatch(airdropTargets);
        await token.transfer("0x8cd0B9c2277434fE9ad0fAfA2eD3A22c9e08464E", 100000);
        await token.transfer("0x088aC1F64F13Ec3f89CA43774ff840c4F0e99Bd9", 250000); 
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!"); 
    } catch (err) {
        console.log("Failed to airdrop token: ", err); 
    }
})(); 