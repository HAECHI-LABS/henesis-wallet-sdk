import {
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  ReadMeExtension,
} from "../../../decorators";
import { CoinsService } from "../../eth/coins/coins.service";
import { Get, Param, Query, Request } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import {
  CoinDTO,
  EXAMPLE_BINANCE_SMART_CHAIN_COIN_DTO,
} from "../../eth/dto/coin.dto";
import express from "express";
import { COIN_REQUIRED } from "../../eth/dto/params";
import {
  EXAMPLE_NO_COIN_EXCEPTION_DTO,
  NoCoinException,
} from "../../eth/dto/exceptions.dto";

@AuthErrorResponses()
@AuthHeaders()
export class CoinsController {
  public constructor(private readonly coinService: CoinsService) {}

  @Get()
  @ApiOkResponse({
    content: ApiResponseContentGenerator(CoinDTO, [
      EXAMPLE_BINANCE_SMART_CHAIN_COIN_DTO,
    ]),
    isArray: true,
  })
  @ApiOperation({
    summary: "전체 코인 목록 조회하기",
    description:
      "Henesis Wallet에서 지원하는 모든 가상자산(토큰, 코인)을 조회합니다.",
  })
  @ReadMeExtension()
  public async getCoins(
    @Request() request: express.Request,
    @Query("flag") flag?: boolean
  ): Promise<CoinDTO[]> {
    return await this.coinService.getCoins(request.sdk, flag);
  }

  @Get("/:coinId")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(
      CoinDTO,
      EXAMPLE_BINANCE_SMART_CHAIN_COIN_DTO
    ),
  })
  @PathParams(COIN_REQUIRED)
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
  @ReadMeExtension()
  public async getCoin(
    @Request() request: express.Request,
    @Param("coinId") coinId: string
  ): Promise<CoinDTO> {
    return await this.coinService.getCoin(coinId, request.sdk);
  }
}
