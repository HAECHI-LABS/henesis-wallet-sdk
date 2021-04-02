import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { WalletsService } from "./wallets.service";
import { ApiNoContentResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ApiPaginationResponse,
  PathParams,
  Queries,
} from "../../../decorators";
import { WalletDTO } from "../dto/wallet.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { BalanceDTO } from "../dto/balance.dto";
import { TransactionDTO } from "../dto/transaction.dto";
import { FlushDTO } from "../dto/flush.dto";
import { DepositAddressDTO } from "../dto/deposit-address.dto";
import { ChangeWalletNameRequestDTO } from "./dto/change-wallet-name-request.dto";
import { SendCoinRequestDTO } from "./dto/send-coin-request.dto";
import { CreateTransactionRequestDTO } from "./dto/create-transaction-reqeust.dto";
import { CreateFlushRequestDTO } from "./dto/create-flush-request.dto";
import { CreateDepositAddressRequestDTO } from "./dto/create-deposit-address-request.dto";
import {
  DEPOSIT_ADDRESS_ID_REQUIRED,
  DEPOSIT_ADDRESS_OPTIONAL,
  NAME_OPTIONAL,
  PAGE_OPTIONAL,
  SIZE_OPTIONAL,
  WALLET_ID_REQUIRED,
} from "../dto/params";

@Controller("wallets")
@ApiTags("wallets")
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get("/")
  @Queries(NAME_OPTIONAL)
  @ApiOperation({ summary: "전체 지갑 목록 조회하기" })
  getWallets(@Query("name") name?: string): Promise<WalletDTO[]> {
    return null;
  }

  @Get("/:walletId")
  @PathParams(WALLET_ID_REQUIRED)
  @ApiOperation({ summary: "지갑 정보 조회하기" })
  getWallet(@Param("walletId") walletId: string): Promise<WalletDTO> {
    return null;
  }

  @Get("/:walletId/balance")
  @PathParams(WALLET_ID_REQUIRED)
  @ApiOperation({ summary: "지갑 잔고 조회하기" })
  getBalanceOfWallet(@Param("walletId") walletId: string): Promise<BalanceDTO> {
    return null;
  }

  @Patch("/:walletId/name")
  @PathParams(WALLET_ID_REQUIRED)
  @ApiNoContentResponse()
  @ApiOperation({ summary: "지갑 이름 변경하기" })
  changeWalletName(
    @Param("walletId") walletId: string,
    @Body() changeWalletName: ChangeWalletNameRequestDTO
  ) {
    return null;
  }

  @Post("/:walletId/transfer")
  @PathParams(WALLET_ID_REQUIRED)
  @ApiOperation({ summary: "지갑에서 코인 전송하기" })
  sendCoin(
    @Param("walletId") walletId: string,
    @Body() sendCoinReqpest: SendCoinRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Post("/:walletId/transactions")
  @PathParams(WALLET_ID_REQUIRED)
  @ApiOperation({ summary: "지갑에서 스마트 컨트랙트 호출하기" })
  callContract(
    @Param("walletId") walletId: string,
    @Body() createTransactionRequest: CreateTransactionRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Post("/:walletId/flush")
  @PathParams(WALLET_ID_REQUIRED)
  @ApiOperation({ summary: "입금 주소 잔액을 모두 끌어오기" })
  flush(
    @Param("walletId") walletId: string,
    @Body() createFlushRequest: CreateFlushRequestDTO
  ): Promise<FlushDTO> {
    return null;
  }

  @Get("/:walletId/deposit-addresses")
  @PathParams(WALLET_ID_REQUIRED)
  @Queries(
    NAME_OPTIONAL,
    DEPOSIT_ADDRESS_OPTIONAL,
    SIZE_OPTIONAL,
    PAGE_OPTIONAL
  )
  @ApiPaginationResponse(DepositAddressDTO)
  @ApiOperation({ summary: "전체 입금 주소 목록 조회하기" })
  getDepositAddresses(
    @Param("walletId") walletId: string,
    @Query("name") name?: string,
    @Query("address") address?: string,
    @Query("size") size: number = 15,
    @Query("page") page: number = 0
  ): Promise<PaginationDTO<DepositAddressDTO>> {
    return null;
  }

  @Post("/:walletId/deposit-addresses")
  @PathParams(WALLET_ID_REQUIRED)
  @ApiOperation({ summary: "입금 주소 생성하기" })
  createDepositAddress(
    @Param("walletId") walletId: string,
    @Body() createDepositAddress: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    return null;
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId")
  @PathParams(WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @ApiOperation({ summary: "입금 주소 정보 조회하기" })
  getDepositAddress(
    @Param("walletId") walletId: string,
    @Param("depositAddressId") depositAddressId: string
  ): Promise<DepositAddressDTO> {
    return null;
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId/balance")
  @PathParams(WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @ApiOperation({ summary: "입금 주소 잔고 조회하기" })
  getBalanceOfDepositAddress(
    @Param("walletId") walletId: string,
    @Param("depositAddressId") depositAddressId: string
  ): Promise<BalanceDTO> {
    return null;
  }
}
