import { Controller, Get } from "@nestjs/common";
import { FeeWalletsService } from "./fee-wallets.service";
import { BalanceDTO } from "../dto/balance.dto";
import express from "express";
import { ApiTags } from "@nestjs/swagger";

@Controller("/v3/ethereum/fee-wallets")
@ApiTags("v3/ethereum/fee-wallets")
export class FeeWalletsController {
  constructor(private readonly feeWalletsService: FeeWalletsService) {}

  @Get("/balance")
  public async getBalance(reqeust: express.Request): Promise<BalanceDTO> {
    return await this.feeWalletsService.getBalance(reqeust.sdk);
  }
}
