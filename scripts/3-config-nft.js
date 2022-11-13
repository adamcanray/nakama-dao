import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = await sdk.getEditionDrop("0x1898894b048b5589CB0Fc9744347cBC1e97661dC");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Chopper Hat",
        description: "This NFT will give you access to NakamaDAO!",
        image: readFileSync("scripts/assets/chopper-hat.jpeg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();