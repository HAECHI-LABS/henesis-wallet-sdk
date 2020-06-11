import { SDK } from "../src";
import "dotenv/config";
import { BlockchainType } from "../src/blockchain";
import { EthMasterWallet } from "../src/eth/wallet";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  const wallet: EthMasterWallet = await sdk.eth.wallets.createMasterWallet(
    "wallet1",
    BlockchainType.Klaytn,
    "passphrase"
  );

  console.log(wallet.getData());
}

main().catch((e) => console.error(e));
