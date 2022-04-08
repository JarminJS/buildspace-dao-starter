import sdk from "./1-initialize-sdk.js"; 

// address of ERC-20 contract 

const token = sdk.getToken("0x413fB74Ffa8ef32E38Aca438333FcA371f396610"); 

(async () => {
    try {

        // max supply ? 1,000,000 is a nice number 
        const amount = 1000000; 

        // interact with deployed contract and mint tokens 
        await token.mint(amount); 
        const totalSupply = await token.totalSupply(); 

        console.log("✅ There now is", totalSupply.displayValue, "$STK in circulation")

    } catch (err) {
        console.log("Failed to print money: ", err); 
    }
})(); 