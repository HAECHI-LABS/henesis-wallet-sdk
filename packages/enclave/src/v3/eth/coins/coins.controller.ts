import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Request,
} from "@nestjs/common";
import { CoinsService } from "./coins.service";
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CoinDTO } from "../dto/coin.dto";
import express from "express";
import {
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  Queries,
} from "../../../decorators";
import { COIN_REQUIRED, FLAG_REQUIRED } from "../dto/params";
import {
  AccessTokenNotProvidedException,
  InvalidAccessIpException,
  InvalidAccessTokenException,
  NoCoinException,
} from "../dto/exceptions.dto";

@Controller("coins")
@ApiTags("coins")
@ApiExtraModels(
  InvalidAccessIpException,
  InvalidAccessTokenException,
  AccessTokenNotProvidedException
)
@AuthErrorResponses()
@AuthHeaders()
export class CoinsController {
  public constructor(private readonly coinsService: CoinsService) {}

  @Get()
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
    return await this.coinsService.getCoins(request.sdk, flag);
  }

  @Get("/:coinId")
  @PathParams(COIN_REQUIRED)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "코인 정보가 없을 때 response 입니다",
    type: NoCoinException,
  })
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
