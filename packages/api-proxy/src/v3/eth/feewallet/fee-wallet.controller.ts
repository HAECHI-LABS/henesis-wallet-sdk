import { Controller, Get, Request } from "@nestjs/common";
import { FeeWalletService } from "./fee-wallet.service";
import { BalanceDTO, EXAMPLE_ETHEREUM_BALANCE_DTO } from "../dto/balance.dto";
import express from "express";
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  AccessTokenNotProvidedException,
  InvalidAccessIpException,
  InvalidAccessTokenException,
} from "../dto/exceptions.dto";
import {
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  ReadMeExtension,
} from "../../../decorators";

@Controller("fee-wallet")
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
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      BalanceDTO,
      EXAMPLE_ETHEREUM_BALANCE_DTO
    ),
  })
  @ApiOperation({
    summary: "수수료 지갑 잔고 조회하기",
    description: "수수료 지갑의 잔액을 조회합니다.",
  })
  @ApiTags("fee-wallet")
  @ReadMeExtension()
  public async getBalance(
    @Request() request: express.Request
  ): Promise<BalanceDTO> {
    return await this.feeWalletsService.getBalance(request.sdk);
  }
}
