import BN from "bn.js";

export interface ContractCallRequest {
  contractAddress: string;
  value: string;
  data: string;
}

export interface TransferRequest {
  ticker: string;
  to: string;
  amount: string;
}

export class SendMasterWalletBatchTransactionsRequestDTO {
  /**
   * 마스터 지갑의 비밀번호
   * @example passphrase
   */
  passphrase: string;

  /**
   * 전송할 트랜잭션 요청들
   * @example ContractCallRequest or TransferRequest
   */
  requests: ContractCallRequest[] | TransferRequest[];
}
