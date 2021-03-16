import { SDK } from "../src";
import {
  EthDepositAddress,
  EthWallet,
  EthMasterWallet,
  EthUserWallet,
  FlushHistory,
} from "../src/eth/wallet";
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
  const masterWalletV2: EthMasterWallet = await sdk.eth.wallets.getWallet(
    masterWalletV2Id
  );
  const wallet: EthWallet = await sdk.eth.wallets.getMasterWallet(walletId);

  /* 사용자 지갑, 입금 주소 */
  const userWallet: EthUserWallet = await masterWalletV2.getUserWallet(
    EthUserWalletId
  );
  const depositAddress: EthDepositAddress = await wallet.getDepositAddress(
    EthDepositAddressId
  );

  /* 집금 목록 조회 */
  const flushHistories: FlushHistory[] = (await wallet.getFlushHistory())
    .results[0];
}

main().catch((e) => console.error(e));
