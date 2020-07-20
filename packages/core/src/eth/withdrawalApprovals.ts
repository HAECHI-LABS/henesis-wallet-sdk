import { ApproveWithdrawal, WithdrawalApprover } from "../withdrawalApprovals";
import { Client } from "../httpClient";
import { EthWallets } from "./wallets";
import { EthTransaction } from "./wallet";
import {
  ApproveWithdrawalApprovalRequest,
  TransactionDTO,
} from "../__generate__/eth";
import { BNConverter } from "..";
import { transformBlockchainType } from "../blockchain";

export class BtcWithdrawalApprovals implements WithdrawalApprover {
  private readonly client: Client;

  private readonly wallets: EthWallets;

  private readonly baseUrl = "/withdrawal-approvals";

  constructor(client: Client, wallets: EthWallets) {
    this.client = client;
    this.wallets = wallets;
  }

  async approve(approveWithdrawal: ApproveWithdrawal): Promise<EthTransaction> {
    const wallet = await this.wallets.getMasterWallet(
      approveWithdrawal.masterWalletId
    );
    const signedMultiSigPayload = await wallet.buildTransferPayload(
      approveWithdrawal.coinSymbol,
      approveWithdrawal.to,
      approveWithdrawal.amount,
      approveWithdrawal.passphrase
    );

    const request: ApproveWithdrawalApprovalRequest = {
      signedMultiSigPayload: {
        ...signedMultiSigPayload,
        multiSigPayload: {
          ...signedMultiSigPayload.multiSigPayload,
          value: BNConverter.bnToHexString(
            signedMultiSigPayload.multiSigPayload.value
          ),
          walletNonce: BNConverter.bnToHexString(
            signedMultiSigPayload.multiSigPayload.walletNonce
          ),
        },
      },
      transactionId: approveWithdrawal.transactionId,
      walletId: approveWithdrawal.masterWalletId,
      otpCode: approveWithdrawal.otpCode,
      gasLimit: BNConverter.bnToHexString(approveWithdrawal.gasLimit),
      gasPrice: BNConverter.bnToHexString(approveWithdrawal.gasPrice),
    };

    const response = await this.client.post<TransactionDTO>(
      `${this.baseUrl}/${approveWithdrawal.id}/approve`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  async reject(id: string): Promise<void> {
    return await this.client.post<void>(`${this.baseUrl}/${id}/reject`);
  }
}
