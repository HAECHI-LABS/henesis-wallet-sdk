/// <reference path="../../src/typings/index.d.ts" />
import { SDK, Env } from "../../src";
import { EthWallet } from "../../src/eth/wallet";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Local,
  });

  const ethWallets = await sdk.eth.wallets.getWallets();
  console.log(ethWallets);
}

main();
