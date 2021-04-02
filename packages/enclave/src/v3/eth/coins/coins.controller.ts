import { Controller, Get, Param, Query, Request } from "@nestjs/common";
import { CoinsService } from "./coins.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CoinDTO } from "../dto/coin.dto";
import express from "express";
import { PathParams, Queries } from "../../../decorators";
import { COIN_REQUIRED, FLAG_REQUIRED } from "../dto/params";

@Controller("coins")
@ApiTags("coins")
export class CoinsController {
  public constructor(private readonly coinsService: CoinsService) {}

  @Get()
  @Queries(FLAG_REQUIRED)
  @ApiOperation({ summary: "전체 코인 목록 조회하기" })
  public async getCoins(
    @Request() request: express.Request,
    @Query("flag") flag?: boolean
  ): Promise<CoinDTO[]> {
    return await this.coinsService.getCoins(flag, request.sdk);
  }

  @Get("/:coinId")
  @PathParams(COIN_REQUIRED)
  @ApiOperation({ summary: "코인 정보 조회하기" })
  public async getCoin(
    @Request() request: express.Request,
    @Param("coinId") coinId: string
  ): Promise<CoinDTO> {
    return await this.coinsService.getCoin(coinId, request.sdk);
  }
}
