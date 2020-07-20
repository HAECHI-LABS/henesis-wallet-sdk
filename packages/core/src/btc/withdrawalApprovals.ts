import { BtcWallets } from "./wallets";
import { ApproveWithdrawal, WithdrawalApprover } from "../withdrawalApprovals";
import { Transfer } from "./transfers";
import { Client } from "../../lib/httpClient";
import {
  ApproveWithdrawalApprovalRequest,
  TransferDTO,
} from "../__generate__/btc";
import { parseResponseToTransfer } from "../utils/common";

export class BtcWithdrawalApprovals implements WithdrawalApprover {
  private readonly client: Client;

  private readonly wallets: BtcWallets;

  private readonly baseUrl = "/withdrawal-approvals";

  constructor(client: Client, wallets: BtcWallets) {
    this.client = client;
    this.wallets = wallets;
  }

  async approve(approveWithdrawal: ApproveWithdrawal): Promise<Transfer> {
    const wallet = await this.wallets.getWallet(
      approveWithdrawal.masterWalletId
    );
    const request: ApproveWithdrawalApprovalRequest = await wallet.build(
      approveWithdrawal.to,
      approveWithdrawal.amount,
      approveWithdrawal.passphrase,
      approveWithdrawal.otpCode
    );

    const transfer = await this.client.post<TransferDTO>(
      `${this.baseUrl}/${approveWithdrawal.id}/approve`,
      {
        request,
      }
    );
    return parseResponseToTransfer(transfer);
  }

  async reject(id: string): Promise<void> {
    return await this.client.post<void>(`${this.baseUrl}/${id}/reject`);
  }
}
