import { Controller, Get, Param, Query, Request } from "@nestjs/common";
import { TransfersService } from "./transfers.service";
import { TransferDTO } from "../dto/transfer.dto";
import { ApiHeaders, ApiOperation, ApiTags } from "@nestjs/swagger";
import express from "express";
import { PaginationDTO } from "../dto/pagination.dto";
import {
  ApiPaginationResponse,
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  Queries,
} from "../../../decorators";
import {
  QUERY_TRANSFERS_ADDRESS_OPTIONAL,
  QUERY_TRANSFERS_PAGE_OPTIONAL,
  QUERY_TRANSFERS_SIZE_OPTIONAL,
  QUERY_TRANSFERS_STATUS_OPTIONAL,
  QUERY_TRANSFERS_TRANSACTION_HASH_OPTIONAL,
  QUERY_TRANSFERS_TYPE_OPTIONAL,
  QUERY_TRANSFERS_UPDATED_AT_GTE_OPTIONAL,
  QUERY_TRANSFERS_UPDATED_AT_LT_OPTIONAL,
  QUERY_TRANSFERS_WALLET_ID_OPTIONAL,
} from "../dto/queries";
import { PARAM_TRANSFER_ID } from "../dto/params";

@Controller("transfers")
@ApiTags("transfers")
@AuthErrorResponses()
@AuthHeaders()
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get("/")
  @ApiOperation({
    summary: "입출금 내역 조회하기",
    description: "입출금 내역을 조회합니다.",
  })
  @ApiPaginationResponse(TransferDTO)
  @Queries(
    QUERY_TRANSFERS_TYPE_OPTIONAL,
    QUERY_TRANSFERS_WALLET_ID_OPTIONAL,
    QUERY_TRANSFERS_STATUS_OPTIONAL,
    QUERY_TRANSFERS_ADDRESS_OPTIONAL,
    QUERY_TRANSFERS_TRANSACTION_HASH_OPTIONAL,
    QUERY_TRANSFERS_UPDATED_AT_GTE_OPTIONAL,
    QUERY_TRANSFERS_UPDATED_AT_LT_OPTIONAL,
    QUERY_TRANSFERS_SIZE_OPTIONAL,
    QUERY_TRANSFERS_PAGE_OPTIONAL
  )
  public async getTransfers(
    @Request() request: express.Request,
    @Query("type") type?: string,
    @Query("walletId") walletId?: string,
    @Query("status") status?: string,
    @Query("address") address?: string,
    @Query("transactionHash") transactionHash?: string,
    @Query("updatedAtGte") updatedAtGte?: string,
    @Query("updatedAtLt") updatedAtLt?: string,
    @Query("size") size?: string,
    @Query("page") page?: string
  ): Promise<PaginationDTO<TransferDTO>> {
    return await this.transfersService.getTransfers(request.sdk, {
      type,
      walletId,
      status,
      address,
      transactionHash,
      updatedAtGte,
      updatedAtLt,
      size,
      page,
    });
  }

  @Get("/:transferId")
  @ApiOperation({
    summary: "특정 입출금 내역 조회하기",
    description: "특정 입출금 내역을 조회합니다.",
  })
  @PathParams(PARAM_TRANSFER_ID)
  public async getTransfer(
    @Request() request: express.Request,
    @Param("transferId") transferId: string
  ): Promise<TransferDTO> {
    return await this.transfersService.getTransfer(request.sdk, transferId);
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
