import {SDK} from '../src';
import {MasterWallet} from '../src/wallet';
import 'dotenv/config'
import { Coins } from "../src/coins";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://localhost:8080/api/v1"
  });

  const wallet: MasterWallet = await sdk.wallets.getMasterWallet("3be5351bd52626108326f9ec44b7b633");
  console.log(await wallet.getTokenBalance(Coins.Hib));
}

main().catch((e) => console.error(e));