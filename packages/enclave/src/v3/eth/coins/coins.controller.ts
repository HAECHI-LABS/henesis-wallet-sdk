import { Controller, Get, Param, Query, Request } from "@nestjs/common";
import { CoinsService } from "./coins.service";
import { ApiHeaders, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CoinDTO } from "../dto/coin.dto";
import express from "express";
import { PathParams, Queries } from "../../../decorators";
import { COIN_REQUIRED, FLAG_REQUIRED } from "../dto/params";
import { AUTHORIZATION, X_HENESIS_SECRET } from "../../../headers";

@Controller("coins")
@ApiTags("coins")
export class CoinsController {
  public constructor(private readonly coinsService: CoinsService) {}

  @Get()
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @Queries(FLAG_REQUIRED)
  @ApiOperation({
    summary: "전체 코인 목록 조회하기",
    description:
      "Henesis Wallet에서 지원하는 모든 가상자산(토큰, 코인)을 조회합니다.",
  })
  public async getCoins(
    @Request() request: express.Request,
    @Query("flag") flag?: boolean
  ): Promise<CoinDTO[]> {
    return await this.coinsService.getCoins(flag, request.sdk);
  }

  @Get("/:coinId")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(COIN_REQUIRED)
  @ApiOperation({
    summary: "코인 정보 조회하기",
    description:
      "Henesis Wallet에서 지원하는 특정 가상자산(토큰, 코인)을 조회합니다.",
  })
  public async getCoin(
    @Request() request: express.Request,
    @Param("coinId") coinId: string
  ): Promise<CoinDTO> {
    return await this.coinsService.getCoin(coinId, request.sdk);
  }
}
