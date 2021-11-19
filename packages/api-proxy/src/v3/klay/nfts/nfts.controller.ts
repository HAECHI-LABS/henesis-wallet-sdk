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
} from "../../eth/dto/exceptions.dto";
import { WalletDTO } from "../../eth/dto/wallet.dto";
import { BalanceDTO } from "../../eth/dto/balance.dto";
import { TransactionDTO } from "../../eth/dto/transaction.dto";
import { DepositAddressDTO } from "../../eth/dto/deposit-address.dto";
import {
  ApiResponseContentGenerator,
  AuthErrorResponses,
  AuthHeaders,
  PathParams,
  ReadMeExtension,
} from "../../../decorators";
import { EXAMPLE_ETHEREUM_NFT_DTO, NftDTO } from "../../eth/dto/nft.dto";
import express from "express";
import { NFT_ID_REQUIRED } from "../../eth/dto/params";
import { SyncMetadataRequestDTO } from "../../eth/nfts/dto/sync-metadata-request.dto";
import { NftsService } from "./nfts.service";

@Controller("nfts")
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
    type: NftDTO,
    isArray: true,
  })
  @ApiOperation({
    summary: "전체 NFT 컨트랙트 목록 조회하기",
    description: "모든 NFT 컨트랙트를 조회합니다.",
  })
  @ApiTags("nfts")
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
  @ApiTags("nfts")
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
