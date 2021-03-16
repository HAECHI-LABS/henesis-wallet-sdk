/// <reference path="../src/typings/index.d.ts" />
import { SDK } from "../src";
import { EthWallet } from "../src/eth/wallet";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  const wallet: EthWallet = await sdk.eth.wallets.getMasterWallet(
    "3be5351bd52626108326f9ec44b7b633"
  );
  console.log(wallet.getNonce());
}

main().catch((e) => console.error(e));
