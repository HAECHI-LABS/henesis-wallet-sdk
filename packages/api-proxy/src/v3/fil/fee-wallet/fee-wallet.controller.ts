import { Controller, Get, Request } from "@nestjs/common";
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  ReadMeExtension,
} from "../../../decorators";
import { FeeWalletService } from "./fee-wallet.service";
import express from "express";
import {
  EXAMPLE_FILECOIN_FEE_WALLET_BALANCE_DTO,
  FeeWalletBalanceDTO,
} from "../dto/fee-wallet-balance.dto";
import {
  EXAMPLE_FILECOIN_FEE_WALLET_DTO,
  FeeWalletDTO,
} from "../dto/fee-wallet.dto";
import {
  AccessTokenNotProvidedException,
  InvalidAccessIpException,
  InvalidAccessTokenException,
} from "../dto/exceptions.dto";

@Controller("fee-wallet")
@ApiExtraModels(
  InvalidAccessIpException,
  InvalidAccessTokenException,
  AccessTokenNotProvidedException,
  FeeWalletDTO,
  FeeWalletBalanceDTO
)
@AuthErrorResponses()
@AuthHeaders()
@ReadMeExtension()
export class FeeWalletController {
  constructor(private readonly feeWalletService: FeeWalletService) {}

  @Get("/")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      FeeWalletDTO,
      EXAMPLE_FILECOIN_FEE_WALLET_DTO
    ),
  })
  @ApiOperation({
    summary: "수수료 지갑 조회하기",
    description: "수수료 지갑을 조회합니다.",
  })
  @ApiTags("fee-wallet")
  public async getFeeWallets(
    @Request() request: express.Request
  ): Promise<FeeWalletDTO> {
    return await this.feeWalletService.getFeeWallets(request.sdk);
  }

  @Get("/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      FeeWalletBalanceDTO,
      EXAMPLE_FILECOIN_FEE_WALLET_BALANCE_DTO
    ),
  })
  @ApiOperation({
    summary: "수수료 지갑 잔고 조회하기",
    description: "수수료 지갑의 잔액을 조회합니다.",
  })
  @ApiTags("fee-wallet")
  public async getBalance(
    @Request() request: express.Request
  ): Promise<FeeWalletBalanceDTO> {
    return await this.feeWalletService.getBalance(request.sdk);
  }
}
