import BN from "bn.js";

export interface ContractCallRequest {
  contractAddress: string;
  value: BN;
  data: string;
}

export interface TransferRequest {
  ticker: string;
  to: string;
  amount: BN;
}

export class SendMasterWalletBatchTransactionsRequestDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  passphrase: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  requests: ContractCallRequest[] | TransferRequest[];
}
