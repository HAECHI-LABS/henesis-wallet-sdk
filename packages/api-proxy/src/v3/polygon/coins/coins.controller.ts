import { Controller, Get, Param, Query, Request } from "@nestjs/common";
import { CoinsService } from "./coins.service";
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { CoinDTO, EXAMPLE_ETHEREUM_COIN_DTO } from "../../eth/dto/coin.dto";
import express from "express";
import {
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  ReadMeExtension,
} from "../../../decorators";
import { TICKER_REQUIRED } from "../../eth/dto/params";
import {
  AccessTokenNotProvidedException,
  EXAMPLE_NO_COIN_EXCEPTION_DTO,
  InvalidAccessIpException,
  InvalidAccessTokenException,
  NoCoinException,
} from "../../eth/dto/exceptions.dto";

@Controller("coins")
@ApiExtraModels(
  InvalidAccessIpException,
  InvalidAccessTokenException,
  AccessTokenNotProvidedException,
  NoCoinException,
  CoinDTO
)
@AuthErrorResponses()
@AuthHeaders()
export class CoinsController {
  public constructor(private readonly coinsService: CoinsService) {}

  @Get()
  @ApiOkResponse({
    content: ApiResponseContentGenerator(CoinDTO, [EXAMPLE_ETHEREUM_COIN_DTO]),
    type: CoinDTO,
    isArray: true,
  })
  @ApiOperation({
    summary: "전체 코인 목록 조회하기",
    description:
      "Henesis Wallet에서 지원하는 모든 가상자산(토큰, 코인)을 조회합니다.",
  })
  @ApiTags("coins")
  @ReadMeExtension()
  public async getCoins(
    @Request() request: express.Request,
    @Query("flag") flag?: boolean
  ): Promise<CoinDTO[]> {
    return await this.coinsService.getCoins(request.sdk, flag);
  }

  @Get("/:ticker")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(CoinDTO, EXAMPLE_ETHEREUM_COIN_DTO),
  })
  @PathParams(TICKER_REQUIRED)
  @ApiBadRequestResponse({
    description: "코인 정보가 없을 때 response 입니다",
    content: ApiResponseContentGenerator(
      NoCoinException,
      EXAMPLE_NO_COIN_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "코인 정보 조회하기",
    description:
      "Henesis Wallet에서 지원하는 특정 가상자산(토큰, 코인)을 조회합니다.",
  })
  @ApiTags("coins")
  @ReadMeExtension()
  public async getCoin(
    @Request() request: express.Request,
    @Param("ticker") ticker: string
  ): Promise<CoinDTO> {
    return await this.coinsService.getCoin(request.sdk, ticker);
  }
}
