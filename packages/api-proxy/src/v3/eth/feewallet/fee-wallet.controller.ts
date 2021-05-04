import { Controller, Get, Request } from "@nestjs/common";
import { FeeWalletService } from "./fee-wallet.service";
import { BalanceDTO } from "../dto/balance.dto";
import express from "express";
import { ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  AccessTokenNotProvidedException,
  InvalidAccessIpException,
  InvalidAccessTokenException,
} from "../dto/exceptions.dto";
import { AuthErrorResponses, AuthHeaders } from "../../../decorators";

@Controller("fee-wallet")
@ApiTags("fee-wallet")
@ApiExtraModels(
  InvalidAccessIpException,
  InvalidAccessTokenException,
  AccessTokenNotProvidedException
)
@AuthErrorResponses()
@AuthHeaders()
export class FeeWalletController {
  constructor(private readonly feeWalletsService: FeeWalletService) {}

  @Get("/balance")
  @ApiOperation({
    summary: "수수료 지갑 잔고 조회하기",
    description: "수수료 지갑의 잔액을 조회합니다.",
  })
  public async getBalance(
    @Request() request: express.Request
  ): Promise<BalanceDTO> {
    return await this.feeWalletsService.getBalance(request.sdk);
  }
}
