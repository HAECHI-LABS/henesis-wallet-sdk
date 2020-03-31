import {SDK} from '../src';
import {MasterWallet} from '../src/wallet';
import 'dotenv/config'

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://localhost:8080/api/v1"
  });

  const wallets: MasterWallet[] = await sdk.wallets.getMasterWallets();
  console.log(wallets);
}

main().catch((e) => console.error(e));