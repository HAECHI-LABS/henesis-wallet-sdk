import { SDK, Env } from "../../src";
import "dotenv/config";
import { FilMasterWallet } from "../../src/fil/wallet";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Local,
  });

  const wallet: FilMasterWallet = await sdk.fil.wallets.getMasterWallet("e0e1338777a804f27bd8f339d719b65b");
  const depositAddress = await wallet.createDepositAddress("dp-abc");
  console.log(depositAddress);
}

main();
