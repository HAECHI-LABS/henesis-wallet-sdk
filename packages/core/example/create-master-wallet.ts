import {SDK} from "../src";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  const wallet = await sdk.btc.wallets.createMasterWallet(
    'btc_master_wallet',
    'passphrase'
  );
  console.log(wallet);
}

main().catch((e) => console.error(e));
