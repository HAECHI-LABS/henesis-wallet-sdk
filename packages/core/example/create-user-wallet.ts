/// <reference path="../src/typings/index.d.ts" />
import { SDK } from "../src";
import { EthWallet, EthUserWallet } from "../src/eth/wallet";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  const wallet: EthWallet = await sdk.eth.wallets.getMasterWallet(
    "4b0945c3e21d6fba4703d56c94a786de"
  );
  const userWallet: EthUserWallet = await wallet.createUserWallet(
    "wallet",
    "passphrase"
  );

  console.log(userWallet.getData());
}

main().catch((e) => console.error(e));
