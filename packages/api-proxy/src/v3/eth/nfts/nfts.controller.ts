import { Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  DepositAddressNotFoundException,
  EXAMPLE_NFT_NOT_FOUND_EXCEPTION_DTO,
  NftNotFoundException,
  NoWalletNameException,
  WalletNotFoundException,
} from "../dto/exceptions.dto";
import { WalletDTO } from "../dto/wallet.dto";
import { BalanceDTO } from "../dto/balance.dto";
import { TransactionDTO } from "../dto/transaction.dto";
import { DepositAddressDTO } from "../dto/deposit-address.dto";
import {
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  ReadMeExtension,
} from "../../../decorators";
import { NFT_ID_REQUIRED } from "../dto/params";
import express from "express";
import { NftsService } from "./nfts.service";
import { EXAMPLE_ETHEREUM_NFT_DTO, NftDTO } from "../dto/nft.dto";
import { SyncMetadataRequestDTO } from "./dto/sync-metadata-request.dto";

@Controller("nfts")
@ApiTags("nfts")
@ApiExtraModels(
  WalletNotFoundException,
  NoWalletNameException,
  DepositAddressNotFoundException,
  WalletDTO,
  BalanceDTO,
  TransactionDTO,
  DepositAddressDTO,
  NftNotFoundException
)
@AuthErrorResponses()
@AuthHeaders()
@ReadMeExtension()
export class NftsController {
  constructor(private readonly nftsService: NftsService) {}

  @Get("/")
  @ApiOkResponse({
    content: ApiResponseContentGenerator(NftDTO, EXAMPLE_ETHEREUM_NFT_DTO),
    isArray: true,
  })
  @ApiOperation({
    summary: "전체 NFT 컨트랙트 목록 조회하기",
    description: "모든 NFT 컨트랙트를 조회합니다.",
  })
  @ReadMeExtension()
  public async getNfts(@Request() request: express.Request): Promise<NftDTO[]> {
    return await this.nftsService.getNfts(request.sdk);
  }

  @Post("/:nftId/sync-metadata")
  @ApiNoContentResponse()
  @PathParams(NFT_ID_REQUIRED)
  @ApiBadRequestResponse({
    description: "해당하는 id의 NFT 컨트랙트가 없을 때 발생합니다.",
    content: ApiResponseContentGenerator(
      NftNotFoundException,
      EXAMPLE_NFT_NOT_FOUND_EXCEPTION_DTO
    ),
  })
  @ApiOperation({
    summary: "NFT metadata 동기화 요청하기",
    description: "NFT 컨트랙트의 metadata 동기화를 요청합니다.",
  })
  @ReadMeExtension()
  public async syncMetadata(
    @Request() request: express.Request,
    @Param("nftId") nftId: string,
    @Body() syncMetadataRequestDTO: SyncMetadataRequestDTO
  ) {
    return await this.nftsService.syncMetadata(
      request.sdk,
      parseInt(nftId),
      syncMetadataRequestDTO
    );
  }
}
