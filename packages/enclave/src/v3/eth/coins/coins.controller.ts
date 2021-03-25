import { Controller, Get, Query, Request } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CoinsService } from "./coins.service";
import * as express from "express";
import { CoinDTO } from "./coins.dto";
import { ApiImplicitQuery } from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";

@Controller("/v3/eth/coins")
@ApiTags("coins")
export class CoinsController {
  public constructor(private readonly coinsService: CoinsService) {}

  @Get()
  @ApiImplicitQuery({
    name: "flag",
    required: false,
    type: Boolean,
  })
  @ApiResponse({
    description: "코인 목록을 반환합니다",
    type: [CoinDTO],
  })
  public async getCoins(
    @Request() request: express.Request,
    @Query("flag") flag?: boolean
  ): Promise<CoinDTO[]> {
    return await this.coinsService.getCoins(flag, request.sdk);
  }
}
