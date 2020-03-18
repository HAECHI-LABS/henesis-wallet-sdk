import {SDK} from '../src';
import {MasterWallet} from '../src/wallet';
import 'dotenv/config'

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
  });

  const wallet: MasterWallet = await sdk.wallets.getMasterWallet("85a9837c63852879b37dab21f494cf22");
  console.log(wallet.getData());
}

main().catch((e) => console.error(e));