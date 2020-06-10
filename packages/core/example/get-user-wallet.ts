import { SDK } from '../src';
import { EthMasterWallet } from '../src/eth/wallet';
import 'dotenv/config';

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  const wallet: EthMasterWallet = await sdk.eth.wallets.getMasterWallet(
    '3be5351bd52626108326f9ec44b7b633',
  );
  console.log(
    (await wallet.getUserWallet('f2f719478e5ce9f1b45a44fab94b1556')).getData(),
  );
}

main().catch(e => console.error(e));
