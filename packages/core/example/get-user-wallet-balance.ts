import {SDK} from '../src';
import { MasterWallet, UserWallet } from "../src/wallet";
import 'dotenv/config'

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://localhost:8080/api/v1"
  });

  const wallet: MasterWallet = await sdk.wallets.getMasterWallet("73846a39bcd6124a205834c05daea5f5");
  const userWallet: UserWallet = await wallet.getUserWallet("e7a8e1ff3704388577278ea00d753c51");
  console.log(await userWallet.getBalance());
}

main().catch((e) => console.error(e));