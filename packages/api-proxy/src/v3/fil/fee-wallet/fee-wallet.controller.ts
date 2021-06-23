import { Controller, Get, Request } from "@nestjs/common";
import { ApiExtraModels, ApiTags } from "@nestjs/swagger";
import {
  AuthErrorResponses,
  AuthHeaders,
  ReadMeExtension,
} from "../../../decorators";
import { FeeWalletService } from "./fee-wallet.service";
import express from "express";
import { FeeWalletBalanceDTO } from "../dto/fee-wallet-balance.dto";
import { FeeWalletDTO } from "../dto/fee-wallet.dto";

@Controller("fee-wallet")
@ApiTags("fee-wallet")
@ApiExtraModels()
@AuthErrorResponses()
@AuthHeaders()
@ReadMeExtension()
export class FeeWalletController {
  constructor(private readonly feeWalletService: FeeWalletService) {}

  @Get("/")
  public async getFeeWallets(
    @Request() request: express.Request
  ): Promise<FeeWalletDTO> {
    return await this.feeWalletService.getFeeWallets(request.sdk);
  }

  @Get("/balance")
  public async getBalance(
    @Request() request: express.Request
  ): Promise<FeeWalletBalanceDTO> {
    return await this.feeWalletService.getBalance(request.sdk);
  }
}
