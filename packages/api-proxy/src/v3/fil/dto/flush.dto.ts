import { FilFlush } from "@haechi-labs/henesis-wallet-core/lib/fil/wallet";

export class FlushDTO {
  id: string;
  walletId: string;
  transfers: string[];
  createdAt: string;
  updatedAt: string;

  static fromFlush(flush: FilFlush) {
    return {
      id: flush.id,
      walletId: flush.walletId,
      transfers: flush.transfers.map((transfer) => {
        return transfer.id;
      }),
      createdAt: flush.createdAt,
      updatedAt: flush.updatedAt,
    };
  }
}
