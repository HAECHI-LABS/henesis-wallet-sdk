import { Controller, Get } from "@nestjs/common";
import { FeeWalletsService } from "./fee-wallets.service";
import { BalanceDTO } from "../dto/balance.dto";
import express from "express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("fee-wallets")
@ApiTags("fee-wallets")
export class FeeWalletsController {
  constructor(private readonly feeWalletsService: FeeWalletsService) {}

  @Get("/balance")
  @ApiOperation({ summary: "가스비 지갑 잔고 조회하기" })
  public async getBalance(reqeust: express.Request): Promise<BalanceDTO> {
    return await this.feeWalletsService.getBalance(reqeust.sdk);
  }
}
