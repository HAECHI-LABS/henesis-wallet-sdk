import { SDK } from "../src";
import { EthMasterWallet, EthUserWallet } from "../src/eth/wallet";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  const wallet: EthMasterWallet = await sdk.eth.wallets.getMasterWallet(
    "3be5351bd52626108326f9ec44b7b633"
  );
  const userWallet: EthUserWallet = await wallet.createUserWallet(
    "wallet",
    "passphrase"
  );

  console.log(userWallet.getData());
}

main().catch((e) => console.error(e));
