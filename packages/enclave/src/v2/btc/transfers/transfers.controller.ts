import { Controller, Get } from "@nestjs/common";
import { TransfersService } from "./transfers.service";
import { TransferDTO } from "../../dto";

@Controller("/v2/btc/transfers")
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  // todo: implement
  @Get("/")
  public async getTransfers(): Promise<TransferDTO> {
    return null;
  }

  // todo: implement
  @Get("/:transferId")
  public async getTransfer(): Promise<TransferDTO[]> {
    return null;
  }
}

// todo: delete when implementation is done

// import AbstractController from "../../controller";
// import { Controller } from "../../types";
// import express from "express";
// import { Transfer } from "@haechi-labs/henesis-wallet-core/lib/btc/transfers";
// import {
//   BtcTransaction,
//   BtcTransactionOutput,
// } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";
// import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
//
// export interface BtcTransactionOutputResponse
//   extends Omit<BtcTransactionOutput, "amount"> {
//   amount: string;
// }
//
// export interface BtcTransactionResponse
//   extends Omit<
//     BtcTransaction,
//     "blockNumber" | "feeAmount" | "amount" | "outputs"
//   > {
//   blockNumber: string;
//   feeAmount?: string;
//   amount: string;
//   outputs: BtcTransactionOutputResponse[];
// }
//
// export interface TransferResponse
//   extends Omit<
//     Transfer,
//     "transaction" | "amount" | "feeAmount" | "confirmation"
//   > {
//   transaction: BtcTransactionResponse;
//   amount: string;
//   feeAmount: string | null;
//   confirmation: string;
// }
//
// export default class TransfersController
//   extends AbstractController
//   implements Controller {
//   private path = "/api/v2/btc/transfers";
//
//   constructor() {
//     super();
//     this.initRoutes();
//   }
//
//   protected initRoutes(): void {
//     this.router.get(`${this.path}`, this.promiseWrapper(this.getTransfers));
//     this.router.get(
//       `${this.path}/:transferId`,
//       this.promiseWrapper(this.getTransfer)
//     );
//   }
//
//   private async getTransfers(
//     req: express.Request
//   ): Promise<Pagination<TransferResponse>> {
//     const data = await req.sdk.btc.transfers.getTransfers(req.query);
//     return this.pagination<TransferResponse>(req, {
//       pagination: data.pagination,
//       results: data.results.map((t) => this.bnToHexString(t)),
//     });
//   }
//
//   private async getTransfer(req: express.Request): Promise<TransferResponse> {
//     return this.bnToHexString(
//       await req.sdk.btc.transfers.getTransfer(req.params.transferId)
//     );
//   }
// }
