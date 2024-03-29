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
    "3be5351bd52626108326f9ec44b7b633"
  );
  const depositAddresses = await wallet.getDepositAddresses({
    name: "wallet",
  });

  depositAddresses.results.forEach((value) => {
    console.log(value.getData());
  });
}

main();
