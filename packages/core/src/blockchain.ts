import { MasterWalletDTO as EthMasterWalletDTO } from "./__generate__/eth";

export const transformBlockchainType = (
  blockchain: EthMasterWalletDTO.BlockchainEnum
) => {
  const byBlockchain: Record<
    EthMasterWalletDTO.BlockchainEnum,
    BlockchainType
  > = {
    [EthMasterWalletDTO.BlockchainEnum.ETHEREUM]: BlockchainType.Ethereum,
    [EthMasterWalletDTO.BlockchainEnum.KLAYTN]: BlockchainType.Klaytn,
  };
  return byBlockchain[blockchain];
};

export enum BlockchainType {
  Ethereum = "ETHEREUM",
  Klaytn = "KLAYTN",
  BitCoin = "BITCOIN",
}
