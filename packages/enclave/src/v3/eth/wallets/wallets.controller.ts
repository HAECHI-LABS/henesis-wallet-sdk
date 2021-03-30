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
import { ApiNoContentResponse, ApiTags } from "@nestjs/swagger";
import { ApiPaginationResponse, OptionalQueries } from "../../../decorators";
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

@Controller("/v3/ethereum/wallets")
@ApiTags("v3/ethereum/wallets")
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get("/")
  @OptionalQueries("name")
  getWallets(@Query("name") name?: string): Promise<WalletDTO[]> {
    return null;
  }

  @Get("/:walletId")
  getWallet(@Param("walletId") walletId: string): Promise<WalletDTO> {
    return null;
  }

  @Get("/:walletId/balance")
  getBalanceOfWallet(@Param("walletId") walletId: string): Promise<BalanceDTO> {
    return null;
  }

  @Patch("/:walletId/name")
  @ApiNoContentResponse()
  changeWalletName(
    @Param("walletId") walletId: string,
    @Body() changeWalletName: ChangeWalletNameRequestDTO
  ) {
    return null;
  }

  @Post("/:walletId/transfer")
  sendCoin(
    @Param("walletId") walletId: string,
    @Body() sendCoinReqpest: SendCoinRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Post("/:walletId/transactions")
  callContract(
    @Param("walletId") walletId: string,
    @Body() createTransactionRequest: CreateTransactionRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Post("/:walletId/flush")
  flush(
    @Param("walletId") walletId: string,
    @Body() createFlushRequest: CreateFlushRequestDTO
  ): Promise<FlushDTO> {
    return null;
  }

  @Get("/:walletId/deposit-addresses")
  @OptionalQueries("name", "address", "size", "page")
  @ApiPaginationResponse(DepositAddressDTO)
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
  createDepositAddress(
    @Param("walletId") walletId: string,
    @Body() createDepositAddress: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    return null;
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId")
  getDepositAddress(
    @Param("walletId") walletId: string,
    @Param("depositAddressId") depositAddressId: string
  ): Promise<DepositAddressDTO> {
    return null;
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId/balance")
  getBalanceOfDepositAddress(
    @Param("walletId") walletId: string,
    @Param("depositAddressId") depositAddressId: string
  ): Promise<BalanceDTO> {
    return null;
  }
}
