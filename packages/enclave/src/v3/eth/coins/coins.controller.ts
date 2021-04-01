import { Controller, Get, Param, Query, Request } from "@nestjs/common";
import { CoinsService } from "./coins.service";
import { ApiTags } from "@nestjs/swagger";
import { CoinDTO } from "../dto/coin.dto";
import express from "express";
import { OptionalQueries } from "../../../decorators";

@Controller("/v3/ethereum/coins")
@ApiTags("v3/ethereum/coins")
export class CoinsController {
  public constructor(private readonly coinsService: CoinsService) {}

  @Get()
  @OptionalQueries("flag")
  public async getCoins(
    @Request() request: express.Request,
    @Query("flag") flag?: boolean
  ): Promise<CoinDTO[]> {
    return await this.coinsService.getCoins(flag, request.sdk);
  }

  @Get("/:coinId")
  public async getCoin(
    @Request() request: express.Request,
    @Param("coinId") coinId: string
  ): Promise<CoinDTO> {
    return await this.coinsService.getCoin(coinId, request.sdk);
  }
}
