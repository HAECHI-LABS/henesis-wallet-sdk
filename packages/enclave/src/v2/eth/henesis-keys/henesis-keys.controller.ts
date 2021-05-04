import { Controller, Get, Request } from "@nestjs/common";
import { HenesisKeysService } from "./henesis-keys.service";
import { KeyDTO } from "../dto/key.dto";
import { BalanceDTO } from "../dto/balance.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import express from "express";
@Controller("henesis-keys")
@ApiTags("henesis-keys")
export class HenesisKeysController {
  constructor(private readonly henesisKeysService: HenesisKeysService) {}

  @Get("/me")
  @ApiOperation({
    summary: "Henesis Key 조회하기",
    description: "Henesis Key를 조회합니다.",
  })
  public async getHenesisKey(
    @Request() request: express.Request
  ): Promise<KeyDTO> {
    return await this.henesisKeysService.getHenesisKey(request.sdk);
  }

  @Get("/balance")
  @ApiOperation({
    summary: "수수료 지갑 잔액 조회하기",
    description: "수수료 지갑의 잔액을 조회합니다.",
  })
  public async getHenesisKeyBalance(
    @Request() request: express.Request
  ): Promise<BalanceDTO> {
    return await this.henesisKeysService.getHenesisKeyBalance(request.sdk);
  }
}
