import { SDK } from '../src';
import { MasterWallet } from '../src/wallet';
import 'dotenv/config';

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: 'http://localhost:8080/api/v1',
  });

  const wallet: MasterWallet = await sdk.wallets.getMasterWallet('c69c0890824c1f2533d39ba7f146869e');
  // valid case
  console.log(await wallet.verifyAddress(wallet.getAddress()));
  // invalid case: %200xbb9bc244d798123fde783fcc1c72d3bb8c189413
  console.log(await wallet.verifyAddress('%200xbb9bc244d798123fde783fcc1c72d3bb8c189413'));
}

main().catch((e) => console.error(e));
