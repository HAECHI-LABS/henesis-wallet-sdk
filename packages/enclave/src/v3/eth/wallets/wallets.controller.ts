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
import {
  ApiHeaders,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
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
  TICKER_OPTIONAL,
  TRANSACTION_ID_REQUIRED,
  WALLET_ID_REQUIRED,
} from "../dto/params";
import { AUTHORIZATION, X_HENESIS_SECRET } from "../../../headers";

@Controller("wallets")
@ApiTags("wallets")
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get("/")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @Queries(NAME_OPTIONAL)
  @ApiOperation({
    summary: "전체 지갑 목록 조회하기",
    description: "모든 지갑의 목록을 조회합니다.",
  })
  getWallets(@Query("name") name?: string): Promise<WalletDTO[]> {
    return null;
  }

  @Get("/:walletId")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(WALLET_ID_REQUIRED)
  @ApiOperation({
    summary: "지갑 정보 조회하기",
    description: "특정 지갑의 정보를 조회합니다.",
  })
  getWallet(@Param("walletId") walletId: string): Promise<WalletDTO> {
    return null;
  }

  @Get("/:walletId/balance")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(WALLET_ID_REQUIRED)
  @Queries(TICKER_OPTIONAL)
  @ApiOperation({
    summary: "지갑 잔고 조회하기",
    description: "특정 지갑의 잔고를 조회합니다.",
  })
  getBalanceOfWallet(
    @Param("walletId") walletId: string,
    @Query("ticker") ticker: string
  ): Promise<BalanceDTO> {
    return null;
  }

  @Patch("/:walletId/name")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(WALLET_ID_REQUIRED)
  @ApiNoContentResponse()
  @ApiOperation({
    summary: "지갑 이름 변경하기",
    description: "특정 지갑의 이름을 변경합니다.",
  })
  changeWalletName(
    @Param("walletId") walletId: string,
    @Body() changeWalletName: ChangeWalletNameRequestDTO
  ) {
    return null;
  }

  @Post("/:walletId/transfer")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(WALLET_ID_REQUIRED)
  @ApiOperation({
    summary: "지갑에서 코인 전송하기",
    description: "특정 지갑에서 가상자산을 송금합니다.",
  })
  sendCoin(
    @Param("walletId") walletId: string,
    @Body() sendCoinRequest: SendCoinRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Post("/:walletId/transactions")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(WALLET_ID_REQUIRED)
  @ApiOperation({
    summary: "지갑에서 스마트 컨트랙트 호출하기",
    description:
      "특정 지갑에서 일반적인 스마트 컨트랙트 함수를 호출하는 트랜잭션을 발생시킵니다.",
  })
  callContract(
    @Param("walletId") walletId: string,
    @Body() createTransactionRequest: CreateTransactionRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Post("/:walletId/flush")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(WALLET_ID_REQUIRED)
  @ApiOperation({
    summary: "입금 주소 잔액을 모두 끌어오기",
    description:
      "원화 입금 주소의 특정 코인/토큰 잔액을 모두 상위의 지갑으로 끌어옵니다.",
  })
  flush(
    @Param("walletId") walletId: string,
    @Body() createFlushRequest: CreateFlushRequestDTO
  ): Promise<FlushDTO> {
    return null;
  }

  @Patch("/:walletId/transactions/:transactionId")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(WALLET_ID_REQUIRED, TRANSACTION_ID_REQUIRED)
  @ApiNoContentResponse()
  @ApiOperation({
    summary: "트랜잭션 다시 전송하기",
    description:
      "네트워크 사정 등으로 채굴이 지연됐을때, 블록체인에 트랜잭션을 다시 전송합니다.",
  })
  resendTransaction(
    @Param("walletId") walletId: string,
    @Param("transactionId") transactionId: string
  ) {
    return;
  }

  @Get("/:walletId/deposit-addresses")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(WALLET_ID_REQUIRED)
  @Queries(
    NAME_OPTIONAL,
    DEPOSIT_ADDRESS_OPTIONAL,
    SIZE_OPTIONAL,
    PAGE_OPTIONAL
  )
  @ApiPaginationResponse(DepositAddressDTO)
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "전체 입금 주소 목록 조회하기",
    description: "특정 지갑에 속한 모든 입금 주소 조회합니다.",
  })
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
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(WALLET_ID_REQUIRED)
  @ApiOperation({
    summary: "입금 주소 생성하기",
    description: "특정 지갑 하위에 새로운 입금 주소 생성합니다",
  })
  createDepositAddress(
    @Param("walletId") walletId: string,
    @Body() createDepositAddress: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    return null;
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @ApiOperation({
    summary: "입금 주소 정보 조회하기",
    description: "특정 입금 주소를 조회합니다.",
  })
  getDepositAddress(
    @Param("walletId") walletId: string,
    @Param("depositAddressId") depositAddressId: string
  ): Promise<DepositAddressDTO> {
    return null;
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId/balance")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @PathParams(WALLET_ID_REQUIRED, DEPOSIT_ADDRESS_ID_REQUIRED)
  @ApiOperation({
    summary: "입금 주소 잔고 조회하기",
    description: "특정 입금 주소의 잔액을 조회합니다.",
  })
  getBalanceOfDepositAddress(
    @Param("walletId") walletId: string,
    @Param("depositAddressId") depositAddressId: string
  ): Promise<BalanceDTO> {
    return null;
  }
}
