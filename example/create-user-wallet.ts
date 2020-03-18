import {SDK} from '../src';
import {MasterWallet, UserWallet} from '../src/wallet';
import 'dotenv/config'

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
  });

  const wallet: MasterWallet = await sdk.wallets.getMasterWallet("7c07fc1dc4d5e10b45731d259dc4f36b");
  const userWallet: UserWallet = await wallet.createUserWallet(
    "wallet",
    "passphrase"
  );

  console.log(userWallet.getData());
}

main().catch((e) => console.error(e));