import {SDK} from '../src';
import {MasterWallet} from '../src/wallet';
import 'dotenv/config'

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://localhost:8080/api/v1"
  });

  const wallet: MasterWallet = await sdk.wallets.getMasterWallet("3be5351bd52626108326f9ec44b7b633");
  console.log((await wallet.getUserWallet("f2f719478e5ce9f1b45a44fab94b1556")).getData());
}

main().catch((e) => console.error(e));