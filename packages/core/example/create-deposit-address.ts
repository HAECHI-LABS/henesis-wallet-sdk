/// <reference path="../src/typings/index.d.ts" />
import { SDK } from "../src";
import { BtcMasterWallet } from "../src/btc/wallet";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  const wallet: BtcMasterWallet = await sdk.btc.wallets.getWallet(
    "a827891a90d51512dfed242235394c0f"
  );
  const depositAddress = await wallet.createDepositAddress("abcddddeee");
  console.log(depositAddress);
}

main().catch((e) => console.error(e));