/// <reference path="../../src/typings/index.d.ts" />
import { SDK, Env } from "../../src";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Local,
  });

  const wallet = await sdk.eth.wallets.getWallet(
    "4b0945c3e21d6fba4703d56c94a786de"
  );
  const userWallet = await wallet.createDepositAddress("wallet");

  console.log(userWallet.getData());
}

main();
