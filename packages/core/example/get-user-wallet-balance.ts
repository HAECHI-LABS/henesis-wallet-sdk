/// <reference path="../src/typings/index.d.ts" />
import { SDK } from "../src";
import { EthMasterWallet, EthUserWallet } from "../src/eth/wallet";
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
  const userWallet: EthUserWallet = await wallet.getUserWallet(
    "e7a8e1ff3704388577278ea00d753c51"
  );
  console.log(await userWallet.getBalance());
}

main().catch((e) => console.error(e));
