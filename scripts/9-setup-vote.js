import sdk from "./1-initialize-sdk.js"; 

// governance contract 
const vote = sdk.getVote("0xF02411568DfC8F17929c02Fe964189C38Ad244b8"); 

// ERC-20 contract 
const token = sdk.getToken("0x413fB74Ffa8ef32E38Aca438333FcA371f396610"); 

(async () => {
    try {
        await token.roles.grant("minter", vote.getAddress()); 

        console.log("Successfully gave vote contract permission to act on token contract");
    } catch (err) {
        console.log("failed to grant vote contract permissions on token contract", err);
        process.exit(1); 
    } 

    try {
        // grab wallet's token balance, 
        const ownedTokenBalance = await token.balanceOf(
            "0xFbDbB0e92ecf53407181996728601f96900cdD61"
        );

        

        // grab 90% of total supply 
        const ownedAmount = ownedTokenBalance.displayValue; 
        const percent90 = Number(ownedAmount) / 100 * 90; 
    
        // transfer 
        
        await token.transfer(
            vote.getAddress(), 
            percent90
        ); 
        

        console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract");
    } catch (err) {
        console.log("Failed to transfer token to vote contract, ", err);
    }
})(); 