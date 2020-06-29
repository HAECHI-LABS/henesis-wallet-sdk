import AbstractController from "../controller";
import { Controller } from "../../types";
import express, { request } from "express";
import { Pagination, Timestamp } from "@haechi-labs/henesis-wallet-core/lib/types";
import { Transfer, TransferStatus } from "@haechi-labs/henesis-wallet-core/lib/btc/transfers";
import { BNConverter, TransactionStatus } from "@haechi-labs/henesis-wallet-core";
import { BtcTransaction, BtcTransactionOutput } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";

export default class TransfersController extends AbstractController
  implements Controller {
  private path = "/api/v2/btc/transfers";

  constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes() {
    this.router.get(`${this.path}`, this.promiseWrapper(this.getTransfers));
  }

  private async getTransfers(
    req: express.Request
  ): Promise<any> {
    const data = await req.sdk.btc.transfers.getTransfers({
      page: +req.query.page,
      size: +req.query.size,
      sort: req.query.sort as string,
      walletId: req.query.walletId as string,
      transactionHash: req.query.transactionHash as string,
      address: req.query.address as string,
      status: req.query.status as TransferStatus,
      start: +req.query.start,
      end: +req.query.end
    });

    return this.pagination<any>(req, {
      pagination: data.pagination,
      results: data.results.map((t) => {
        return {
          id: t.id,
          walletId: t.walletId,
          outputIndex: t.outputIndex,
          transaction: {
            id: t.transaction.id,
            amount: BNConverter.bnToHexString(t.transaction.amount),
            blockNumber: t.transaction.blockNumber
              ? BNConverter.bnToHexString(t.transaction.blockNumber)
              : null,
            feeAmount: t.transaction.feeAmount
              ? BNConverter.bnToHexString(t.transaction.feeAmount)
              : null,
            createdAt: t.transaction.createdAt,
            hex: t.transaction.hex,
            outputs: t.transaction.outputs.map((o) => {
              return {
                transactionId: o.transactionId,
                outputIndex: o.outputIndex,
                address: o.address,
                scriptPubKey: o.scriptPubKey,
                amount: BNConverter.bnToHexString(o.amount),
                isChange: o.isChange
              };
            }),
            inputs: []
          },
          receivedAt: t.receivedAt,
          sendTo: t.sendTo,
          type: t.type,
          status: t.status,
          createdAt: t.createdAt
        };
      })
    });
  }
}
