import {
  MasterWalletDTO as EthMasterWalletDTO,
  UserWalletDTOBlockchainEnum,
  Blockchain as EthBlockchain,
} from "./__generate__/eth";
import { Blockchain as AccountsBlockchain } from "./__generate__/accounts";

export const transformBlockchainType = (
  blockchain: EthBlockchain | AccountsBlockchain | UserWalletDTOBlockchainEnum
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
