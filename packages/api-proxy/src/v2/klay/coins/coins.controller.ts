import { Controller, Get, Param, Query, Request } from "@nestjs/common";
import express from "express";
import { CoinsService } from "./coins.service";
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
  PathParams,
  Queries,
  ReadMeExtension,
} from "../../../decorators";
import { PARAM_COIN_TICKER } from "../../eth/dto/params";
import { QUERY_COIN_FLAG_OPTIONAL } from "../../eth/dto/queries";
import { CoinDTO, EXAMPLE_ETH_KLAY_COIN_DTO } from "../../eth/dto/coin.dto";
import { NoCoinException } from "../../eth/dto/exceptions.dto";

@Controller("coins")
@ApiTags("coins")
@AuthErrorResponses()
@AuthHeaders()
@ApiExtraModels(NoCoinException, CoinDTO)
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get("/")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(CoinDTO, [EXAMPLE_ETH_KLAY_COIN_DTO]),
    isArray: true,
  })
  @ApiOperation({
    summary: "전체 코인/토큰 목록 조회하기",
    description:
      "Henesis Wallet에서 지원하는 모든 가상자산(토큰, 코인)을 조회합니다.",
  })
  @Queries(QUERY_COIN_FLAG_OPTIONAL)
  @ReadMeExtension()
  public async getCoins(
    @Request() request: express.Request,
    @Query("flag") flag?: string
  ): Promise<CoinDTO[]> {
    return await this.coinsService.getCoins(request.sdk, flag);
  }

  @Get(":ticker")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(CoinDTO, EXAMPLE_ETH_KLAY_COIN_DTO),
    isArray: false,
  })
  @ApiOperation({
    summary: "코인/토큰 정보 조회하기",
    description:
      "Henesis Wallet에서 지원하는 특정 가상자산(토큰, 코인)을 조회합니다.",
  })
  @PathParams(PARAM_COIN_TICKER)
  @ReadMeExtension()
  public async getCoin(
    @Request() request: express.Request,
    @Param("ticker") ticker: string
  ): Promise<CoinDTO> {
    return await this.coinsService.getCoin(request.sdk, ticker);
  }
}
