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

  const ethWallets: EthWallet[] = await sdk.eth.wallets.getMasterWallets();
  const klayWallets: EthWallet[] = await sdk.klay.wallets.getMasterWallets();
  console.log(ethWallets, klayWallets);
}

main().catch((e) => console.error(e));
