import { Controller, Get, Request } from "@nestjs/common";
import { HenesisKeysService } from "./henesis-keys.service";
import { KeyDTO } from "../dto/key.dto";
import { BalanceDTO } from "../dto/balance.dto";
import { ApiOperation } from "@nestjs/swagger";
import express from "express";

@Controller("henesis-keys")
export class HenesisKeysController {
  constructor(private readonly henesisKeysService: HenesisKeysService) {}

  @Get("/me")
  @ApiOperation({
    summary: "코인/토큰 입출금 내역 조회하기",
    description: "모든 지갑의 가상자산 입출금 내역을 조회합니다.",
  })
  public async getHenesisKey(
    @Request() request: express.Request
  ): Promise<KeyDTO> {
    return null;
  }

  @Get("/balance")
  @ApiOperation({
    summary: "수수료 지갑 잔액 조회하기",
    description: "수수료 지갑의 잔액을 조회합니다.",
  })
  public async getHenesisKeyBalance(
    @Request() request: express.Request
  ): Promise<BalanceDTO> {
    return null;
  }
}
// todo: delete when implementation is done
// import express from "express";
// import { Balance, Key } from "@haechi-labs/henesis-wallet-core/lib/types";
//
// import AbstractController from "../../controller";
// import { Controller } from "../../types";
//
// export default class HenesisKeysController
//   extends AbstractController
//   implements Controller {
//   private path = "/api/v2/eth/henesis-keys";
//
//   constructor() {
//     super();
//     this.initRoutes();
//   }
//
//   initRoutes(): void {
//     this.router.get(`${this.path}/me`, this.promiseWrapper(this.getHenesisKey));
//
//     this.router.get(
//       `${this.path}/balance`,
//       this.promiseWrapper(this.getHenesisKeyBalance)
//     );
//   }
//
//   private getHenesisKey(req: express.Request): Promise<Key> {
//     return req.sdk.eth.henesisKeys.getHenesisKey();
//   }
//
//   private async getHenesisKeyBalance(req: express.Request): Promise<Balance> {
//     return this.bnToHexString(
//       await req.sdk.eth.henesisKeys.getHenesisKeyBalance()
//     );
//   }
// }
