import { Controller, Get, Query, Request } from "@nestjs/common";
import { GasUsagesService } from "./gas-usages.service";
import { MethodGasUsageDTO } from "../dto/method-gas-usage.dto";
import { ApiHeaders, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AUTHORIZATION, X_HENESIS_SECRET } from "../../../headers";
import { Queries } from "../../../decorators";
import { QUERY_WALLET_NAME_OPTIONAL } from "../../btc/dto/queries";
import express from "express";

@Controller("gas-usages")
@ApiTags("gas-usages")
export class GasUsagesController {
  constructor(private readonly gasUsagesService: GasUsagesService) {}

  @Get("/method-gas-usages")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "입출금 내역 조회하기",
    description: "입출금 내역을 조회합니다.",
  })
  @Queries(QUERY_WALLET_NAME_OPTIONAL)
  public async getMethodGasUsages(
    @Request() request: express.Request,
    @Query("name") name?: string
  ): Promise<MethodGasUsageDTO> {
    return null;
  }
}

// todo: delete when implementation is done
// import express from "express";
// import { Method, MethodName } from "@haechi-labs/henesis-wallet-core";
//
// import AbstractController from "../../controller";
// import { Controller } from "../../../types";
//
// export default class GasUsagesController
//   extends AbstractController
//   implements Controller {
//   private path = "/api/v2/klay";
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
//       await req.sdk.klay.gasUsages.getMethodGasUsages(
//         req.query.name as MethodName
//       )
//     );
//   }
// }
