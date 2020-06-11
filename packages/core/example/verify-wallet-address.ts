import { SDK } from "../src";
import { EthMasterWallet } from "../src/eth/wallet";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  const wallet: EthMasterWallet = await sdk.eth.wallets.getMasterWallet(
    "c69c0890824c1f2533d39ba7f146869e"
  );
  // valid case
  console.log(await sdk.eth.wallets.verifyAddress(wallet.getAddress()));
  console.log(
    await sdk.eth.wallets.verifyAddress(
      "0xcE48eC0C67Ca2bD3CD2b194F19d70f520752b822"
    )
  );
  // invalid case: %200xbb9bc244d798123fde783fcc1c72d3bb8c189413
  console.log(
    await sdk.eth.wallets.verifyAddress(
      "%200xbb9bc244d798123fde783fcc1c72d3bb8c189413"
    )
  );
}

main().catch((e) => console.error(e));
