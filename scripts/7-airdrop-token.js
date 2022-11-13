import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const editionDrop = sdk.getEditionDrop("0x1898894b048b5589CB0Fc9744347cBC1e97661dC");
// const editionDrop = await sdk.getContract("0x1898894b048b5589CB0Fc9744347cBC1e97661dC");

// This is the address to our ERC-20 token contract.
const token = sdk.getToken("0x0B25787f3496816358B343d772f01799426c4714");
// const token = await sdk.getToken("0x0B25787f3496816358B343d772f01799426c4714");

(async () => {
  try {
    console.log(await editionDrop.erc1155)
    // Grab all the addresses of people who own our membership NFT, 
    // which has a tokenId of 0.
    // const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000.
      const randomAmount = Math.floor(Math.random() * (100 - 10 + 1) + 10);
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

      // Set up the target.
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log(walletAddresses)
    console.log(airdropTargets)
    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();