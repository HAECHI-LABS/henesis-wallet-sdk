import { Controller, Get, Param, Query, Request } from "@nestjs/common";
import express from "express";
import { CoinsService } from "./coins.service";
import { CoinDTO } from "../dto/coin.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller("coins")
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get("/")
  @ApiOperation({
    summary: "전체 코인/토큰 목록 조회하기",
    description:
      "Henesis Wallet에서 지원하는 모든 가상자산(토큰, 코인)을 조회합니다.",
  })
  public async getCoins(
    @Request() request: express.Request,
    @Query("flag") flag?: boolean
  ): Promise<CoinDTO[]> {
    return null;
  }

  @Get("/:ticker")
  @ApiOperation({
    summary: "코인/토큰 정보 조회하기",
    description:
      "Henesis Wallet에서 지원하는 특정 가상자산(토큰, 코인)을 조회합니다.",
  })
  public async getCoin(
    @Request() request: express.Request,
    @Param("ticker") ticker: string
  ): Promise<CoinDTO> {
    return null;
  }
}
// todo: delete when implementation is done
// import express from "express";
//
// import AbstractController from "../../controller";
// import { Controller } from "../../types";
// import { CoinData } from "@haechi-labs/henesis-wallet-core";
//
// export default class CoinsController
//   extends AbstractController
//   implements Controller {
//   private path = "/api/v2/eth/coins";
//
//   constructor() {
//     super();
//     this.initRoutes();
//   }
//
//   initRoutes(): void {
//     this.router.get(`${this.path}/:ticker`, this.promiseWrapper(this.getCoin));
//
//     this.router.get(`${this.path}`, this.promiseWrapper(this.getAllCoins));
//   }
//
//   private async getCoin(req: express.Request): Promise<CoinData> {
//     return (await req.sdk.eth.coins.getCoin(req.params.ticker)).getCoinData();
//   }
//
//   private async getAllCoins(req: express.Request): Promise<CoinData[]> {
//     return (
//       await req.sdk.eth.coins.getCoins(req.query.flag === "true")
//     ).map((c) => c.getCoinData());
//   }
// }
