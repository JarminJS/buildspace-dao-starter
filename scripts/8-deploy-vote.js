import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        const voteContractAddress = await sdk.deployer.deployVote({
            // name of governance contract
            name: "Student DAO Contract",
            
            // location of governance token 
            voting_token_address: "0x413fB74Ffa8ef32E38Aca438333FcA371f396610",

            // assyming block time of around 13.14 seconds 

            //after created, when can vote? if immediatlely 
            voting_delay_in_blocks: 0, 

            // how long member vote, 1 day = 6570 blocks 
            voting_period_in_blocks: 6570, 

            // minimum number of total supply needed to vote 
            voting_quorum_fraction: 0, 

            // minimum number of token user needs to create a proposal 
            proposal_token_threshold: 0. 

        });
        
        console.log("✅ Successfully deployed vote contract, address:",
        voteContractAddress); 

    } catch {
        console.log("Unable to deploy vote contract: ", err); 

    }
})(); 
