import {SDK} from "../src";
import {
    EthDepositAddress,
    EthMasterWallet,
    EthMasterWalletV2,
    EthUserWallet, FlushHistory
} from "../src/eth/wallet";
import "dotenv/config";

async function main() {
    const sdk = new SDK({
        accessToken: process.env.ACCESS_TOKEN,
        secret: process.env.SECRET,
        url: process.env.URL,
    });
    const masterWalletV2Id = "master_wallet_v2";
    const masterWalletV3Id = "master_wallet_v3";
    const EthUserWalletId = "user_wallet_id";
    const EthDepositAddressId = "deposit_address_id";

    /* 마스터 지갑 */
    const masterWalletV2: EthMasterWalletV2 = await sdk.eth.wallets.getMasterWalletV2(
        masterWalletV2Id
    );
    const masterWalletV3: EthMasterWallet = await sdk.eth.wallets.getMasterWallet(
        masterWalletV3Id
    );

    /* 사용자 지갑, 입금 주소 */
    const userWallet: EthUserWallet = await masterWalletV2.getUserWallet(EthUserWalletId);
    const depositAddress: EthDepositAddress = await masterWalletV3.getDepositAddress(EthDepositAddressId);

    /* 집금 목록 조회 */
    const flushHistories: FlushHistory[] = (await masterWalletV3.getFlushHistory()).results[0];
}

main().catch((e) => console.error(e));
