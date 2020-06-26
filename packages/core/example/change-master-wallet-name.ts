import {SDK} from '../src';
import {MasterWallet} from '../src/wallet';
import 'dotenv/config'

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://localhost:8080/api/v1"
  });

  const wallet: MasterWallet = await sdk.wallets.getMasterWallet("9efbb37b3cc2e78c389ad389ce9d05ef");
  await wallet.changeName("name-changed");
  console.log(wallet.getData());
}

main().catch((e) => console.error(e));