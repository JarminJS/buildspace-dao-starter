import {useAddress, useEditionDrop, useMetamask } from '@thirdweb-dev/react'; 
import {useState, useEffect } from 'react'; 

const App = () => {
  // use the hook thirdweb give us. 
  const address = useAddress(); 
  const connectWithMetamask = useMetamask(); 
  console.log("👋 Address: ", address); 

  // initialize our editionDrop contract 
  const editionDrop = useEditionDrop("0xe5796A4a95bc54C7FE397B49F6C7448Ae9645EbA"); 

  //state variable for us to know if user has our NFT 
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false); 

  // isClaiming lets us easily keep a loading state while minting NFT
  const [isClaiming, setIsClaiming] = useState(false); 
  useEffect(() =>{
    if(!address){
      return; 
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0); 
        if(balance.gt(0)){
          setHasClaimedNFT(true); 
          console.log("🌟 this user has a membership NFT!");
          let nftAddress = editionDrop.getAddress(); 
          console.log("🌊 Check out your membership NFT on OpenSea: https://testnets.opensea.io/assets/"+nftAddress+"/0");
    
        } else {
          setHasClaimedNFT(false); 
          console.log("😭 this user doesn't have a membership NFT."); 
        }
      } catch (err){
        setHasClaimedNFT(false); 
        console.log("Failed to get balance ", err); 
      }
    }; 
    checkBalance(); 
  }, [address, editionDrop]); 
  
  const getNftLink = async () => {
    try {
      let nftAddress = editionDrop.getAddress(); 
      return  "https://testnets.opensea.io/assets/"+nftAddress+"/0";
    } catch (err) {
      console.log("Cannot retrieve link, ", err); 
    }
  }; 

  const mintNft = async () => {
    try {
      setIsClaiming(true); 
      await editionDrop.claim("0", 1); 
      let nftAddress = editionDrop.getAddress(); 
      console.log("🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/"+nftAddress+"/0");
      setHasClaimedNFT(true); 
    } catch (err) {
      setHasClaimedNFT(false); 
      console.log("Failed to mint NFT ", err); 
    } finally {
      setIsClaiming(false); 
    }
  }; 

  // This is the case where the user hasn't connected their wallet to your web app. 
  // Let them call connectWallet 
  if(!address) {
    return (
      <div className="landing">
        <h1>back with studentDAO 👨🏻‍🎓</h1>
        <button onClick= { connectWithMetamask } className = "btn-hero">
          Connect wallet
        </button>
      </div>
    );
  } 

    if(hasClaimedNFT) {
      return (
        <div className = "member-page">
          <h1>👨🏻‍🎓 DAO Member Page</h1>
          <p>Good to see you member!</p>
        </div>
      )
    }
  // This is the case where we have the user's address -> they've connected their wallet 
  
  return (
    <div className = "mint-nft">
      <h1>💻 mint your free studentDAO Membership NFT!</h1>
      <button disabled={isClaiming} onClick={mintNft}>
        {isClaiming? "Minting..." : "Mint your nft (FREE)"}
      </button>

    </div>
  )
};

export default App;
