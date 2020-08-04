import { MasterWalletDTO as EthMasterWalletDTO } from "./__generate__/eth";
import { WithdrawalApprovalDTO } from "./__generate__/accounts";

export const transformBlockchainType = (
  blockchain:
    | EthMasterWalletDTO.BlockchainEnum
    | WithdrawalApprovalDTO.BlockchainEnum
) => {
  const byBlockchain: Record<
    EthMasterWalletDTO.BlockchainEnum | WithdrawalApprovalDTO.BlockchainEnum,
    BlockchainType
  > = {
    [EthMasterWalletDTO.BlockchainEnum.ETHEREUM]: BlockchainType.Ethereum,
    [EthMasterWalletDTO.BlockchainEnum.KLAYTN]: BlockchainType.Klaytn,
    [WithdrawalApprovalDTO.BlockchainEnum.ETHEREUM]: BlockchainType.Ethereum,
    [WithdrawalApprovalDTO.BlockchainEnum.KLAYTN]: BlockchainType.Klaytn,
    [WithdrawalApprovalDTO.BlockchainEnum.BITCOIN]: BlockchainType.BitCoin,
  };
  return byBlockchain[blockchain];
};

export enum BlockchainType {
  Ethereum = "ETHEREUM",
  Klaytn = "KLAYTN",
  BitCoin = "BITCOIN",
}
