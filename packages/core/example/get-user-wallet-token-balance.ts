import {SDK} from '../src';
import { MasterWallet, UserWallet } from "../src/wallet";
import 'dotenv/config'
import { Coins } from "../src/coins";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://localhost:8080/api/v1"
  });

  const wallet: MasterWallet = await sdk.wallets.getMasterWallet("3be5351bd52626108326f9ec44b7b633");
  const userWallet: UserWallet = await wallet.getUserWallet("f2f719478e5ce9f1b45a44fab94b1556");
  console.log(await userWallet.getTokenBalance(Coins.Hib));
}

main().catch((e) => console.error(e));