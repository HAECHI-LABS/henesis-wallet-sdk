import {
  UserWalletDTOBlockchainEnum,
  Blockchain as EthBlockchain,
  Blockchain,
} from "./__generate__/eth";
import { Blockchain as AccountsBlockchain } from "./__generate__/accounts";

export const transformBlockchainType = (
  blockchain:
    | EthBlockchain
    | AccountsBlockchain
    | UserWalletDTOBlockchainEnum
    | Blockchain
) => {
  const byBlockchain: Record<
    EthBlockchain | AccountsBlockchain | UserWalletDTOBlockchainEnum,
    BlockchainType
  > = {
    ETHEREUM: BlockchainType.Ethereum,
    KLAYTN: BlockchainType.Klaytn,
    BITCOIN: BlockchainType.BitCoin,
  };
  return byBlockchain[blockchain];
};

export enum BlockchainType {
  Ethereum = "ETHEREUM",
  Klaytn = "KLAYTN",
  BitCoin = "BITCOIN",
}
