import { MasterWalletDTO as EthMasterWalletDTO } from "./__generate__/eth";

export enum InnerBlockchainType {
  BITCOIN = <any>"BITCOIN",
}

export const BlockchainType: Record<
  | keyof typeof EthMasterWalletDTO.BlockchainEnum
  | keyof typeof InnerBlockchainType,
  EthMasterWalletDTO.BlockchainEnum | InnerBlockchainType
> = { ...EthMasterWalletDTO.BlockchainEnum, ...InnerBlockchainType };
export type BlockchainType =
  | EthMasterWalletDTO.BlockchainEnum
  | InnerBlockchainType;
