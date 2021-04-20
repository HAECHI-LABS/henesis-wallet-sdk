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
    "73846a39bcd6124a205834c05daea5f5"
  );
  const depositAddress = await wallet.getDepositAddress(
    "e7a8e1ff3704388577278ea00d753c51"
  );
  console.log(await depositAddress.getBalance());
}

main();
