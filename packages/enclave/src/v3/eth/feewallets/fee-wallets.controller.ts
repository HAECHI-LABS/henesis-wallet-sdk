import { Controller, Get } from "@nestjs/common";
import { FeeWalletsService } from "./fee-wallets.service";
import { BalanceDTO } from "../dto/balance.dto";
import express from "express";
import { ApiHeaders, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AUTHORIZATION, X_HENESIS_SECRET } from "../../../headers";

@Controller("fee-wallets")
@ApiTags("fee-wallets")
export class FeeWalletsController {
  constructor(private readonly feeWalletsService: FeeWalletsService) {}

  @Get("/balance")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "수수료 지갑 잔고 조회하기",
    description: "수수료 지갑의 잔액을 조회합니다.",
  })
  public async getBalance(reqeust: express.Request): Promise<BalanceDTO> {
    return await this.feeWalletsService.getBalance(reqeust.sdk);
  }
}
