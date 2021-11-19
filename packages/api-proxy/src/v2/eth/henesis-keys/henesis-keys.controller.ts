import { Controller, Get, Request } from "@nestjs/common";
import { HenesisKeysService } from "./henesis-keys.service";
import { BalanceDTO, EXAMPLE_ETH_KLAY_BALANCE_DTO } from "../dto/balance.dto";
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiExtraModels,
} from "@nestjs/swagger";
import express from "express";
import {
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  ReadMeExtension,
} from "../../../decorators";

@Controller("henesis-keys")
@AuthErrorResponses()
@AuthHeaders()
@ApiExtraModels(BalanceDTO)
export class HenesisKeysController {
  constructor(private readonly henesisKeysService: HenesisKeysService) {}

  @Get("/balance")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      BalanceDTO,
      EXAMPLE_ETH_KLAY_BALANCE_DTO
    ),
    isArray: false,
  })
  @ApiOperation({
    summary: "수수료 지갑 잔액 조회하기",
    description: "수수료 지갑의 잔액을 조회합니다.",
  })
  @ApiTags("henesis-keys")
  @ReadMeExtension()
  public async getHenesisKeyBalance(
    @Request() request: express.Request
  ): Promise<BalanceDTO> {
    return await this.henesisKeysService.getHenesisKeyBalance(request.sdk);
  }
}
