import { GasUsagesService } from "./gas-usages.service";
import { Controller, Get } from "@nestjs/common";
import { MethodGasUsageDTO } from "../dto/method-gas-usage.dto";

@Controller("gas-usages")
export class GasUsagesController {
  constructor(private readonly gasUsagesService: GasUsagesService) {}

  // todo: implement
  @Get("/method-gas-usages")
  public async getMethodGasUsages(): Promise<MethodGasUsageDTO> {
    return null;
  }
}

// todo: delete when implementation is done
// import express from "express";
// import { Method, MethodName } from "@haechi-labs/henesis-wallet-core";
//
// import AbstractController from "../../controller";
// import { Controller } from "../../types";
//
// export default class GasUsagesController
//   extends AbstractController
//   implements Controller {
//   private path = "/api/v2/eth";
//
//   constructor() {
//     super();
//     this.initRoutes();
//   }
//
//   initRoutes(): void {
//     this.router.get(
//       `${this.path}/method-gas-usages`,
//       this.promiseWrapper(this.getMethodGasUsages)
//     );
//   }
//
//   private async getMethodGasUsages(req: express.Request): Promise<Method> {
//     return this.bnToHexString(
//       await req.sdk.eth.gasUsages.getMethodGasUsages(
//         req.query.name as MethodName
//       )
//     );
//   }
// }
