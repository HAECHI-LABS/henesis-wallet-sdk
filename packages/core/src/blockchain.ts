import {
  UserWalletDTOBlockchainEnum,
  Blockchain as EthBlockchain,
  Blockchain,
} from "./__generate__/eth";
import { Blockchain as LTCBlockchain } from "./__generate__/ltc";
import { Blockchain as AccountsBlockchain } from "./__generate__/accounts";
import { Blockchain as BillingsBlockchain } from "./__generate__/billings";

export const transformBlockchainType = (
  blockchain:
    | EthBlockchain
    | AccountsBlockchain
    | BillingsBlockchain
    | UserWalletDTOBlockchainEnum
    | Blockchain
    // FIXME: should we use this LTCBlockchain?
    // We may update EthBlockchain later.
    | LTCBlockchain
): BlockchainType => {
  const byBlockchain: Record<
    EthBlockchain | UserWalletDTOBlockchainEnum | LTCBlockchain,
    BlockchainType
  > = {
    ETHEREUM: BlockchainType.ETHEREUM,
    KLAYTN: BlockchainType.KLAYTN,
    BITCOIN: BlockchainType.BITCOIN,
    LITECOIN: BlockchainType.LITECOIN,
    FILECOIN: BlockchainType.FILECOIN,
    BINANCE_SMART_CHAIN: BlockchainType.BINANCE_SMART_CHAIN,
    BITCOIN_CASH: BlockchainType.BITCOIN_CASH,
  };
  return byBlockchain[blockchain];
};

export enum BlockchainType {
  ETHEREUM = "ETHEREUM",
  KLAYTN = "KLAYTN",
  BITCOIN = "BITCOIN",
  LITECOIN = "LITECOIN",
  FILECOIN = "FILECOIN",
  BINANCE_SMART_CHAIN = "BINANCE_SMART_CHAIN",
  BITCOIN_CASH = "BITCOIN_CASH",
  POLYGON = "POLYGON",
}

export enum BlockchainCoinSymbol {
  ETHEREUM = "ETH",
  KLAYTN = "KLAY",
  BITCOIN = "BTC",
  LITECOIN = "LTC",
  FILECOIN = "FIL",
  BINANCE_SMART_CHAIN = "BNB",
  BITCOIN_CASH = "BCH",
}
