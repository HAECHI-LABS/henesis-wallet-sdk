import {SDK} from '../src';
import {MasterWallet} from '../src/wallet';
import 'dotenv/config'
import {BlockchainType} from '../src/blockchain';

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://localhost:8080/api/v1"
  });

  const wallet: MasterWallet = await sdk.wallets.createMasterWallet(
    "wallet1",
    BlockchainType.Klaytn,
    "passphrase"
  );

  console.log(wallet.getData());
}

main().catch((e) => console.error(e));