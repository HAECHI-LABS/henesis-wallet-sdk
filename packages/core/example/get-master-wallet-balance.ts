/// <reference path="../src/typings/index.d.ts" />
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
    "73846a39bcd6124a205834c05daea5f5"
  );
  console.log(await wallet.getBalance());
}

main().catch((e) => console.error(e));
