import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import ethers from "ethers";

// Importing and configuring our .env file that we use to securely store our environment variables
import dotenv from "dotenv";
dotenv.config();

// Some quick checks to make sure our .env is working.
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  console.log("🛑 Private key not found.");
}

if (!process.env.QUICKNODE_API_URL || process.env.QUICKNODE_API_URL === "") {
  console.log("🛑 QuickNode API URL not found.");
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
  console.log("🛑 Wallet Address not found.");
}

// const sdk = ThirdwebSDK.fromPrivateKey(
//   // Your wallet private key. ALWAYS KEEP THIS PRIVATE, DO NOT SHARE IT WITH ANYONE, add it to your .env file and do not commit that file to github!
//   process.env.PRIVATE_KEY,
//   // RPC URL, we'll use our QuickNode API URL from our .env file.
//   // process.env.QUICKNODE_API_URL
//   process.env.INFURA_API_URL
// );

// RPC URL, we'll use our QuickNode API URL from our .env file.
// const provider = new ethers.providers.JsonRpcProvider(process.env.QUICKNODE_API_URL);
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_API_URL);
// Your wallet private key. ALWAYS KEEP THIS PRIVATE, DO NOT SHARE IT WITH ANYONE, add it to your .env file and do not commit that file to github!
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const sdk = new ThirdwebSDK(wallet, {
    gasSettings: {
        speed: "standard",
        // maxPriceInGwei: 250000000, // 100000000 GWEI equal to 0.1 ETH, see: https://www.eth-to-wei.com/?gclid=Cj0KCQjwnvOaBhDTARIsAJf8eVMvpaRZ7DiA6nxaP6VETq_iDqZt3T-nliLGTHsOcX0B17EBtsCthEAaAnVNEALw_wcB
    },
});

(async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log("SDK initialized by address:", address)
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();

// We are exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;