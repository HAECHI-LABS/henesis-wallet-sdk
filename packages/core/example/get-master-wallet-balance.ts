import {SDK} from '../src';
import {MasterWallet} from '../src/wallet';
import 'dotenv/config'

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://localhost:8080/api/v1"
  });

  const wallet: MasterWallet = await sdk.wallets.getMasterWallet("73846a39bcd6124a205834c05daea5f5");
  console.log(await wallet.getBalance());
}

main().catch((e) => console.error(e));