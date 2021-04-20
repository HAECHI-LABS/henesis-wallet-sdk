import { Controller, Get } from "@nestjs/common";
import { HenesisKeysService } from "./henesis-keys.service";
import { KeyDTO } from "../dto/key.dto";
import { BalanceDTO } from "../dto/balance.dto";

@Controller("henesis-keys")
export class HenesisKeysController {
  constructor(private readonly henesisKeysService: HenesisKeysService) {}

  // todo: implement
  @Get("/me")
  public async getHenesisKey(): Promise<KeyDTO> {
    return null;
  }

  // todo: implement
  @Get("/balance")
  public async getHenesisKeyBalance(): Promise<BalanceDTO> {
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
