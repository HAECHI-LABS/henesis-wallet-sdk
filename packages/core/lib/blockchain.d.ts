import { UserWalletDTOBlockchainEnum, Blockchain as EthBlockchain, Blockchain } from "./__generate__/eth";
import { Blockchain as LTCBlockchain } from "./__generate__/ltc";
import { Blockchain as AccountsBlockchain } from "./__generate__/accounts";
export declare const transformBlockchainType: (blockchain: EthBlockchain | AccountsBlockchain | UserWalletDTOBlockchainEnum | Blockchain | LTCBlockchain) => BlockchainType;
export declare enum BlockchainType {
    ETHEREUM = "ETHEREUM",
    KLAYTN = "KLAYTN",
    BITCOIN = "BITCOIN",
    LITECOIN = "LITECOIN",
    FILECOIN = "FILECOIN",
    BINANCE_SMART_CHAIN = "BINANCE_SMART_CHAIN"
}
