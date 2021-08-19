import { SDK } from "../src";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });
  const masterWalletV2Id = "master_wallet_v2";
  const walletId = "master_wallet_v3";
  const EthUserWalletId = "user_wallet_id";
  const EthDepositAddressId = "deposit_address_id";

  /* 마스터 지갑 */
  const masterWalletV2 = await sdk.eth.wallets.getMasterWallet(
    masterWalletV2Id
  );
  const wallet = await sdk.eth.wallets.getWallet(walletId);

  /* 사용자 지갑, 입금 주소 */
  const userWallet = await masterWalletV2.getUserWallet(EthUserWalletId);
  const depositAddress = await wallet.getDepositAddress(EthDepositAddressId);

  console.log({ userWallet, depositAddress });
}

main();
