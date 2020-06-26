import {SDK} from '../src';
import {MasterWallet} from '../src/wallet';
import 'dotenv/config'

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://staging.test.wallet.henesis.io/api/v1"
  });

  const wallet: MasterWallet = await sdk.wallets.getMasterWallet("269fd2a3cfabac6c91bf4f602ffd7823");
  const tx = await wallet.flush("EVT", ['9a6dfbe57821e042678c59d50065bfc8'], 'password');
  console.log(tx);
}

main().catch((e) => console.error(e));
