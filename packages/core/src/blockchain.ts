import {
  MasterWalletDTO as EthMasterWalletDTO,
  MasterWalletDTOBlockchainEnum as EthMasterWalletDTOBlockchainEnum,
  TransactionDTOBlockchainEnum,
  UserWalletDTOBlockchainEnum,
  MethodGasUsageDTOBlockchainEnum,
} from "./__generate__/eth";
import {
  WithdrawalApprovalDTO,
  WithdrawalApprovalDTOBlockchainEnum,
} from "./__generate__/accounts";

export const transformBlockchainType = (
  blockchain:
    | EthMasterWalletDTOBlockchainEnum
    | WithdrawalApprovalDTOBlockchainEnum
    | TransactionDTOBlockchainEnum
    | UserWalletDTOBlockchainEnum
    | MethodGasUsageDTOBlockchainEnum
) => {
  const byBlockchain: Record<
    | EthMasterWalletDTOBlockchainEnum
    | WithdrawalApprovalDTOBlockchainEnum
    | TransactionDTOBlockchainEnum
    | UserWalletDTOBlockchainEnum
    | MethodGasUsageDTOBlockchainEnum,
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
