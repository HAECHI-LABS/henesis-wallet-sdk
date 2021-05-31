import { Controller, Get, Request } from "@nestjs/common";
import { HenesisKeysService } from "./henesis-keys.service";
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import express from "express";
import {
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  ReadMeExtension,
} from "../../../decorators";
import { KeyDTO } from "../../eth/dto/key.dto";
import {
  BalanceDTO,
  EXAMPLE_ETH_KLAY_BALANCE_DTO,
} from "../../eth/dto/balance.dto";

@Controller("henesis-keys")
@ApiTags("henesis-keys")
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
  @ReadMeExtension()
  public async getHenesisKeyBalance(
    @Request() request: express.Request
  ): Promise<BalanceDTO> {
    return await this.henesisKeysService.getHenesisKeyBalance(request.sdk);
  }
}
