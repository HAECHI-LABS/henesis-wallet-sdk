import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from "@nestjs/common";
import { MasterWalletDTO } from "../dto/master-wallet.dto";
import { TransactionDTO } from "../dto/transaction.dto";
import { BalanceDTO } from "../dto/balance.dto";
import { WalletNonceDTO } from "../dto/wallet-nonce.dto";
import { UserWalletDTO } from "../dto/user-wallet.dto";
import {
  ApiHeaders,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AUTHORIZATION, X_HENESIS_SECRET } from "../../../headers";
import {
  ApiPaginationResponse,
  PathParams,
  Queries,
} from "../../../decorators";
import { QUERY_WALLET_NAME_OPTIONAL } from "../../btc/dto/queries";
import express from "express";
import { CreateMasterWalletRequestDTO } from "../../eth/dto/create-master-wallet-request.dto";
import { ActivateMasterWalletRequestDTO } from "../../eth/dto/activate-master-wallet-request.dto";
import { SendMasterWalletContractCallRequestDTO } from "../../eth/dto/send-master-wallet-contract-call-request.dto";
import { ChangeMasterWalletNameRequestDTO } from "../../eth/dto/change-master-wallet-name-request.dto";
import {
  QUERY_FLAG_OPTIONAL,
  QUERY_SYMBOL_OPTIONAL,
  QUERY_WALLETS_ADDRESS_OPTIONAL,
  QUERY_WALLETS_NAME_OPTIONAL,
  QUERY_WALLETS_PAGE_OPTIONAL,
  QUERY_WALLETS_SIZE_OPTIONAL,
  QUERY_WALLETS_SORT_OPTIONAL,
} from "../../eth/dto/queries";
import {
  PARAM_MASTER_WALLET_ID,
  PARAM_USER_WALLET_ID,
} from "../../eth/dto/params";
import { SendMasterWalletCoinRequestDTO } from "../../eth/dto/send-master-wallet-coin-request.dto";
import { SendMasterWalletBatchTransactionsRequestDTO } from "../../eth/dto/send-master-wallet-batch-transactions-request.dto";
import { FlushRequestDTO } from "../../eth/dto/flush-request.dto";
import { CreateRawTransactionRequestDTO } from "../../eth/dto/create-raw-transaction-request.dto";
import { SendSignedTransactionRequestDTO } from "../../eth/dto/send-signed-transaction-request.dto";
import { CreateUserWalletRequestDTO } from "../../eth/dto/create-user-wallet-request.dto";
import { SendUserWalletContractCallRequestDTO } from "../../eth/dto/send-user-wallet-contract-call-request.dto";
import { ChangeUserWalletNameRequestDTO } from "../../eth/dto/change-user-wallet-name-request.dto";
import { SendUserWalletCoinRequestDTO } from "../../eth/dto/send-user-wallet-coin-request.dto";
import { ChangePassphraseRequestDTO } from "../../eth/dto/change-passphrase-request.dto";
import { RetryCreateMasterWalletRequestDTO } from "../../eth/dto/retry-create-master-wallet-request.dto";
import { RetryCreateUserWalletRequestDTO } from "../../eth/dto/retry-create-user-wallet-request.dto";
import { PaginationDTO } from "../../eth/dto/pagination.dto";

@Controller("wallets")
@ApiTags("wallets")
export class WalletsController {
  @Get("/")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "전체 마스터 지갑 목록 조회하기",
    description: "모든 마스터 지갑 목록을 조회합니다.",
  })
  @Queries(QUERY_WALLET_NAME_OPTIONAL)
  public async getMasterWallets(
    @Request() request: express.Request,
    @Query("name") name?: string
  ): Promise<MasterWalletDTO[]> {
    return null;
  }

  @Post("/")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "마스터 지갑 생성하기",
    description: "마스터 지갑을 생성합니다.",
  })
  public async createMasterWallet(
    @Request() request: express.Request,
    @Body() createMasterWalletRequestDTO: CreateMasterWalletRequestDTO
  ): Promise<MasterWalletDTO> {
    return null;
  }

  @Post("/:masterWalletId/activate")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "마스터 지갑 활성화하기",
    description: "마스터 지갑을 활성화합니다.",
  })
  public async activateMasterWallet(
    @Request() request: express.Request,
    @Body() activateMasterWalletRequestDTO: ActivateMasterWalletRequestDTO
  ): Promise<MasterWalletDTO> {
    return null;
  }

  @Post("/:masterWalletId/contract-call")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "마스터 지갑에서 스마트 컨트랙트 호출하기",
    description:
      "특정 마스터 지갑에서 일반적인 스마트 컨트랙트 함수를 호출하는 트랜잭션을 발생시킵니다.",
  })
  public async sendMasterWalletContractCall(
    @Request() request: express.Request,
    @Body()
    sendMasterWalletContractCallRequestDTO: SendMasterWalletContractCallRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Patch("/:masterWalletId/name")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "마스터 지갑 이름 변경하기",
    description: "특정 마스터 지갑의 이름을 변경합니다.",
  })
  @ApiNoContentResponse()
  public async changeMasterWalletName(
    @Request() request: express.Request,
    @Body() changeMasterWalletNameRequestDTO: ChangeMasterWalletNameRequestDTO
  ) {
    return null;
  }

  @Get("/:masterWalletId/balance")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "마스터 지갑 잔고 조회하기",
    description: "특정 마스터 지갑의 잔액을 조회합니다.",
  })
  @Queries(QUERY_FLAG_OPTIONAL, QUERY_SYMBOL_OPTIONAL)
  public async getMasterWalletBalance(
    @Request() request: express.Request,
    @Query("flag") flag?: boolean,
    @Query("symbol") symbol?: string
  ): Promise<BalanceDTO> {
    return null;
  }

  @Get("/:masterWalletId/nonce")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "마스터 지갑 논스 조회하기",
    description: "특정 마스터 지갑의 nonce를 조회합니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID)
  public async getMasterWalletNonce(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string
  ): Promise<WalletNonceDTO> {
    return null;
  }

  @Post("/:masterWalletId/transfer")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "마스터 지갑에서 코인/토큰 전송하기",
    description: "특정 마스터 지갑에서 가상자산을 송금합니다.",
  })
  public async sendMasterWalletCoin(
    @Request() request: express.Request,
    @Body() sendMasterWalletCoinRequestDTO: SendMasterWalletCoinRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Post("/:masterWalletId/batch-transactions")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "마스터 지갑에서 여러 트랜잭션들을 모아서 호출하기",
    description:
      "특정 마스터 지갑에서 여러 트랜잭션을 모아 한꺼번에 발생니다.\n" +
      "최대 10개까지 보낼 수 있습니다.",
  })
  public async sendMasterWalletBatchTransactions(
    @Request() request: express.Request,
    @Body()
    sendMasterWalletBatchTransactionsRequestDTO: SendMasterWalletBatchTransactionsRequestDTO
  ): Promise<TransactionDTO[]> {
    return null;
  }

  @Post("/:masterWalletId/flush")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "사용자 지갑 잔액을 모두 끌어오기",
    description:
      "여러 사용자 지갑의 특정 코인/토큰 잔액을 모두 상위의 마스터 지갑으로 끌어옵니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID)
  public async flush(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() flushRequestDTO: FlushRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Post("/:masterWalletId/raw-transactions")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "모든 트랜잭션 정보 조회하기",
    description: "내가 발생시킨 모든 트랜잭션의 정보를 조회합니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID)
  public async createRawTransaction(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() createRawTransactionRequestDTO: CreateRawTransactionRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Post("/:masterWalletId/signed-transactions")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "모든 트랜잭션 정보 조회하기",
    description: "내가 발생시킨 모든 트랜잭션의 정보를 조회합니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID)
  public async sendSignedTransaction(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() sendSignedTransactionRequestDTO: SendSignedTransactionRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Get("/:masterWalletId/user-wallets/:userWalletId")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "사용자 지갑 정보 조회하기",
    description: "특정 사용자 지갑을 조회합니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  public async getUserWallet(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string
  ): Promise<UserWalletDTO> {
    return null;
  }

  @Get("/:masterWalletId/user-wallets")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "전체 사용자 지갑 목록 조회하기",
    description: "특정 마스터 지갑에 속한 모든 사용자 지갑 목록을 조회합니다.",
  })
  @Queries(
    QUERY_WALLETS_PAGE_OPTIONAL,
    QUERY_WALLETS_SIZE_OPTIONAL,
    QUERY_WALLETS_SORT_OPTIONAL,
    QUERY_WALLETS_NAME_OPTIONAL,
    QUERY_WALLETS_ADDRESS_OPTIONAL
  )
  @ApiPaginationResponse(UserWalletDTO)
  public async getUserWallets(
    @Request() request: express.Request,
    @Query("page") page: string,
    @Query("size") size: string,
    @Query("sort") sort: string,
    @Query("name") name: string,
    @Query("address") address: string
  ): Promise<PaginationDTO<UserWalletDTO>> {
    return null;
  }

  @Post("/:masterWalletId/user-wallets")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "사용자 지갑 생성하기",
    description: "특정 마스터 지갑 하위에 새로운 사용자 지갑을 생성합니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID)
  public async createUserWallet(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() createUserWalletRequestDTO: CreateUserWalletRequestDTO
  ): Promise<UserWalletDTO> {
    return null;
  }

  @Post("/:masterWalletId/user-wallets/:userWalletId/contract-call")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "사용자 지갑에서 스마트 컨트랙트 호출하기",
    description:
      "사용자 지갑에서 일반적인 스마트 컨트랙트 함수를 호출하는 트랜잭션을 발생시킵니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  public async sendUserWalletContractCall(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body()
    sendUserWalletContractCallRequestDTO: SendUserWalletContractCallRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Patch("/:masterWalletId/user-wallets/:userWalletId/name")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "사용자 지갑 이름 변경하기",
    description: "특정 사용자 지갑의 이름을 변경합니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  @ApiNoContentResponse()
  public async changeUserWalletName(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body() changeUserWalletNameRequestDTO: ChangeUserWalletNameRequestDTO
  ) {}

  @Get("/:masterWalletId/user-wallets/:userWalletId/balance")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "사용자 지갑 잔고 조회하기",
    description: "특정 사용자 지갑의 잔액을 조회합니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  @Queries(QUERY_FLAG_OPTIONAL, QUERY_SYMBOL_OPTIONAL)
  public async getUserWalletBalance(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Query("flag") flag: boolean,
    @Query("symbol") symbol: string
  ): Promise<BalanceDTO> {
    return null;
  }

  @Get("/:masterWalletId/user-wallets/:userWalletId/nonce")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "사용자 지갑 논스 조회하기",
    description: "특정 사용자 지갑의 nonce를 조회합니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  public async getUserWalletNonce(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string
  ): Promise<WalletNonceDTO> {
    return null;
  }

  @Post("/:masterWalletId/user-wallets/:userWalletId/transfer")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "사용자 지갑에서 코인/토큰 전송하기",
    description: "특정 사용자 지갑에서 가상자산을 전송합니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  public async sendUserWalletCoin(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body() sendUserWalletCoinRequestDTO: SendUserWalletCoinRequestDTO
  ): Promise<TransactionDTO> {
    return null;
  }

  @Patch("/:masterWalletId/passphrase")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "마스터 지갑 비밀번호 변경하기",
    description: "특정 마스터 지갑의 비밀번호를 변경합니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID)
  @ApiNoContentResponse()
  public async changePassphrase(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() changePassphraseRequestDTO: ChangePassphraseRequestDTO
  ) {}

  @Post("/:masterWalletId/recreate")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "마스터 지갑 재생성하기",
    description: "마스터 지갑을 재생성합니다.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID)
  public async retryCreateMasterWallet(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Body() retryCreateMasterWalletRequestDTO: RetryCreateMasterWalletRequestDTO
  ): Promise<MasterWalletDTO> {
    return null;
  }

  @Post("/:masterWalletId/user-wallets/:userWalletId/recreate")
  @ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION])
  @ApiOperation({
    summary: "사용자 지갑 생성 실패시 재시도하기",
    description:
      "특정 마스터 지갑 하위에 특정 사용자 지갑 생성 트랜잭션이 실패했을 때 재시도합니다.\n" +
      "\n" +
      "만약 사용자 지갑 생성 트랜잭션이 장시간 채굴 대기중(Pending)이어서 gasPrice를 높여 재시도하고 싶다면, '마스터 지갑에서 발생한 트랜잭션 교체하기' API를 사용하세요.",
  })
  @PathParams(PARAM_MASTER_WALLET_ID, PARAM_USER_WALLET_ID)
  public async retryCreateUserWallet(
    @Request() request: express.Request,
    @Param("masterWalletId") masterWalletId: string,
    @Param("userWalletId") userWalletId: string,
    @Body() retryCreateUserWalletRequestDTO: RetryCreateUserWalletRequestDTO
  ): Promise<MasterWalletDTO> {
    return null;
  }
}
// todo: delete when implementation is done
// import express from "express";
// import BN from "bn.js";
// import {
//   EthActivatingMasterWallet,
//   EthMasterWallet,
//   EthMasterWalletData,
//   EthTransaction,
//   EthUserWallet,
//   EthUserWalletData,
// } from "@haechi-labs/henesis-wallet-core/lib/eth/wallet";
// import {
//   BNConverter,
//   Coin,
//   MultiSigPayload,
//   SDK,
//   SignedMultiSigPayload,
// } from "@haechi-labs/henesis-wallet-core";
//
// import AbstractController from "../../controller";
// import { Controller } from "../../../types";
// import {
//   Balance,
//   Key,
//   Pagination,
// } from "@haechi-labs/henesis-wallet-core/lib/types";
// import { Cacheable, CacheClear } from "@type-cacheable/core";
// import { DefaultFilterCacheStrategy } from "../../../utils/cache";
// import {
//   InactiveMasterWallet,
//   WalletStatus,
// } from "@haechi-labs/henesis-wallet-core/lib/wallet";
// import {
//   HenesisError,
//   HttpStatus,
// } from "@haechi-labs/henesis-wallet-core/lib/error";
//
// interface BalanceResponse
//   extends Omit<Balance, "amount" | "spendableAmount" | "aggregatedAmount"> {
//   amount: string;
//   spendableAmount?: string;
// }
//
// interface MasterWalletBalanceResponse extends BalanceResponse {
//   aggregatedAmount: string;
// }
//
// interface Nonce {
//   nonce: string;
// }
//
// interface ContractCallRequest {
//   contractAddress: string;
//   value: BN;
//   data: string;
// }
//
// interface TransferRequest {
//   ticker: string;
//   to: string;
//   amount: BN;
// }
//
// export default class WalletsController
//   extends AbstractController
//   implements Controller {
//   private path = "/api/v2/klay/wallets";
//
//   constructor() {
//     super();
//     this.initRoutes();
//   }
//
//   initRoutes(): void {
//     this.router.get(
//       `${this.path}/:masterWalletId`,
//       this.promiseWrapper(this.getMasterWallet)
//     );
//
//     this.router.get(`${this.path}`, this.promiseWrapper(this.getMasterWallets));
//
//     this.router.post(
//       `${this.path}`,
//       this.promiseWrapper(this.createMasterWallet, 201)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/activate`,
//       this.promiseWrapper(this.activateMasterWallet)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/contract-call`,
//       this.promiseWrapper(this.sendMasterWalletContractCall, 201)
//     );
//
//     this.router.patch(
//       `${this.path}/:masterWalletId/name`,
//       this.promiseWrapper(this.changeMasterWalletName)
//     );
//
//     this.router.get(
//       `${this.path}/:masterWalletId/balance`,
//       this.promiseWrapper(this.getMasterWalletBalance)
//     );
//
//     this.router.get(
//       `${this.path}/:masterWalletId/nonce`,
//       this.promiseWrapper(this.getMasterWalletNonce)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/transfer`,
//       this.promiseWrapper(this.sendMasterWalletCoin, 201)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/batch-transactions`,
//       this.promiseWrapper(this.sendMasterWalletBatchTransactions, 201)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/flush`,
//       this.promiseWrapper(this.flush, 201)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/raw-transactions`,
//       this.promiseWrapper(this.createRawTransaction, 201)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/signed-transactions`,
//       this.promiseWrapper(this.sendSignedTransaction, 201)
//     );
//
//     this.router.get(
//       `${this.path}/:masterWalletId/user-wallets/:userWalletId`,
//       this.promiseWrapper(this.getUserWallet)
//     );
//
//     this.router.get(
//       `${this.path}/:masterWalletId/user-wallets`,
//       this.promiseWrapper(this.getUserWallets)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/user-wallets`,
//       this.promiseWrapper(this.createUserWallet, 201)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/user-wallets/:userWalletId/contract-call`,
//       this.promiseWrapper(this.sendUserWalletContractCall, 201)
//     );
//
//     this.router.patch(
//       `${this.path}/:masterWalletId/user-wallets/:userWalletId/name`,
//       this.promiseWrapper(this.changeUserWalletName)
//     );
//
//     this.router.get(
//       `${this.path}/:masterWalletId/user-wallets/:userWalletId/balance`,
//       this.promiseWrapper(this.getUserWalletBalance)
//     );
//
//     this.router.get(
//       `${this.path}/:masterWalletId/user-wallets/:userWalletId/nonce`,
//       this.promiseWrapper(this.getUserWalletNonce)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/user-wallets/:userWalletId/transfer`,
//       this.promiseWrapper(this.sendUserWalletCoin, 201)
//     );
//
//     this.router.patch(
//       `${this.path}/:masterWalletId/passphrase`,
//       this.promiseWrapper(this.changePassphrase)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/recreate`,
//       this.promiseWrapper(this.retryCreateMasterWallet)
//     );
//
//     this.router.post(
//       `${this.path}/:masterWalletId/user-wallets/:userWalletId/recreate`,
//       this.promiseWrapper(this.retryCreateUserWallet)
//     );
//   }
//
//   private retryCreateMasterWallet(
//     req: express.Request
//   ): Promise<EthMasterWalletData> {
//     return this.retryCreateMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId,
//       req.body.gasPrice
//         ? BNConverter.hexStringToBN(req.body.gasPrice)
//         : undefined
//     );
//   }
//
//   private retryCreateUserWallet(
//     req: express.Request
//   ): Promise<EthUserWalletData> {
//     return this.retryCreateUserWalletByContext(
//       req.sdk,
//       req.params.masterWalletId,
//       req.params.userWalletId,
//       req.body.gasPrice
//         ? BNConverter.hexStringToBN(req.body.gasPrice)
//         : undefined
//     );
//   }
//
//   private async getMasterWallet(
//     req: express.Request
//   ): Promise<EthMasterWalletData> {
//     return (
//       await this.getMasterWalletById(req.sdk, req.params.masterWalletId)
//     ).getData();
//   }
//
//   private async getMasterWallets(
//     req: express.Request
//   ): Promise<EthMasterWalletData[]> {
//     return (await req.sdk.klay.wallets.getMasterWallets(req.query)).map((c) =>
//       c.getData()
//     );
//   }
//
//   private async createMasterWallet(
//     req: express.Request
//   ): Promise<EthMasterWalletData | InactiveMasterWallet> {
//     const type: string = <string>req.query.type;
//     if (type != undefined) {
//       if (type.toUpperCase() != WalletStatus.INACTIVE) {
//         throw new HenesisError(
//           `type '${type}' is not supported`,
//           HttpStatus.BAD_REQUEST
//         );
//       }
//       return req.sdk.klay.wallets.createInactiveMasterWallet(req.body.name);
//     }
//     return (
//       await req.sdk.klay.wallets.createMasterWallet(
//         req.body.name,
//         req.body.passphrase,
//         req.body.gasPrice
//           ? BNConverter.hexStringToBN(req.body.gasPrice)
//           : undefined
//       )
//     ).getData();
//   }
//
//   private async sendMasterWalletContractCall(
//     req: express.Request
//   ): Promise<EthTransaction> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//
//     return await masterWallet.contractCall(
//       req.body.contractAddress,
//       BNConverter.hexStringToBN(req.body.value),
//       req.body.data,
//       req.body.passphrase,
//       req.body.otpCode,
//       req.body.gasPrice
//         ? BNConverter.hexStringToBN(req.body.gasPrice)
//         : undefined,
//       req.body.gasLimit
//         ? BNConverter.hexStringToBN(req.body.gasLimit)
//         : undefined
//     );
//   }
//
//   private async changeMasterWalletName(req: express.Request): Promise<void> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//
//     return await masterWallet.changeName(req.body.name);
//   }
//
//   private async getMasterWalletBalance(
//     req: express.Request
//   ): Promise<MasterWalletBalanceResponse[]> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//     const balances = await masterWallet.getBalance(
//       req.query.flag === "true",
//       req.query.symbol ? String(req.query.symbol) : null
//     );
//     return balances.map((c) => this.bnToHexString(c));
//   }
//
//   private async getMasterWalletNonce(req: express.Request): Promise<Nonce> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//
//     return {
//       nonce: BNConverter.bnToHexString(masterWallet.getNonce()),
//     };
//   }
//
//   private async sendMasterWalletCoin(
//     req: express.Request
//   ): Promise<EthTransaction> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//
//     return await masterWallet.transfer(
//       await this.getCoinByTicker(req.sdk, req.body.ticker),
//       req.body.to,
//       BNConverter.hexStringToBN(req.body.amount),
//       req.body.passphrase,
//       req.body.otpCode,
//       req.body.gasPrice
//         ? BNConverter.hexStringToBN(req.body.gasPrice)
//         : undefined,
//       req.body.gasLimit
//         ? BNConverter.hexStringToBN(req.body.gasLimit)
//         : undefined
//     );
//   }
//
//   private async sendMasterWalletBatchTransactions(
//     req: express.Request
//   ): Promise<EthTransaction[]> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//
//     const batch = masterWallet.createBatchRequest(req.body.otpCode);
//     const payloads: SignedMultiSigPayload[] = await Promise.all(
//       req.body.requests.map(
//         (request): Promise<SignedMultiSigPayload> => {
//           // TODO: should refactoring
//           if (this.isContractCallRequest(request)) {
//             request = request as ContractCallRequest;
//             return masterWallet.buildContractCallPayload(
//               request.contractAddress,
//               BNConverter.hexStringToBN(request.value),
//               request.data,
//               req.body.passphrase
//             );
//           }
//
//           if (this.isTransferRequest(request)) {
//             request = request as TransferRequest;
//             return this.getCoinByTicker(req.sdk, request.ticker).then((coin) =>
//               masterWallet.buildTransferPayload(
//                 coin,
//                 request.to,
//                 BNConverter.hexStringToBN(request.amount),
//                 req.body.passphrase
//               )
//             );
//           }
//
//           throw new Error("invalid batch transactions request format");
//         }
//       )
//     );
//     batch.addAll(payloads);
//
//     return batch.execute();
//   }
//
//   private async flush(req: express.Request): Promise<EthTransaction> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//
//     return await masterWallet.flush(
//       await this.getCoinByTicker(req.sdk, req.body.ticker),
//       req.body.userWalletIds,
//       req.body.passphrase,
//       req.body.otpCode,
//       req.body.gasPrice
//         ? BNConverter.hexStringToBN(req.body.gasPrice)
//         : undefined,
//       req.body.gasLimit
//         ? BNConverter.hexStringToBN(req.body.gasLimit)
//         : undefined
//     );
//   }
//
//   private async createRawTransaction(
//     req: express.Request
//   ): Promise<MultiSigPayload> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//
//     return masterWallet.createRawTransaction(
//       await this.getCoinByTicker(req.sdk, req.body.ticker),
//       req.body.to,
//       BNConverter.hexStringToBN(req.body.amount)
//     );
//   }
//
//   private async sendSignedTransaction(
//     req: express.Request
//   ): Promise<EthTransaction> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//
//     const signedMultiSigPayload = req.body.signedMultiSigPayload;
//     return masterWallet.sendTransaction(
//       {
//         signature: signedMultiSigPayload.signature,
//         multiSigPayload: {
//           walletAddress: signedMultiSigPayload.multiSigPayload.walletAddress,
//           toAddress: signedMultiSigPayload.multiSigPayload.toAddress,
//           value: BNConverter.hexStringToBN(
//             signedMultiSigPayload.multiSigPayload.value
//           ),
//           walletNonce: BNConverter.hexStringToBN(
//             signedMultiSigPayload.multiSigPayload.walletNonce
//           ),
//           hexData: signedMultiSigPayload.multiSigPayload.hexData,
//         },
//       },
//       masterWallet.getId(),
//       null,
//       req.body.gasPrice
//         ? BNConverter.hexStringToBN(req.body.gasPrice)
//         : undefined,
//       req.body.gasLimit
//         ? BNConverter.hexStringToBN(req.body.gasLimit)
//         : undefined
//     );
//   }
//
//   private async getUserWallet(
//     req: express.Request
//   ): Promise<EthUserWalletData> {
//     return (
//       await this.getUserWalletByContext(
//         req.sdk,
//         req.params.masterWalletId,
//         req.params.userWalletId
//       )
//     ).getData();
//   }
//
//   private async getUserWallets(
//     req: express.Request
//   ): Promise<Pagination<EthUserWalletData>> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//
//     const userWallets = await masterWallet.getUserWallets({
//       page: +req.query.page,
//       size: +req.query.size,
//       sort: req.query.sort as string,
//       name: req.query.name as string,
//       address: req.query.address as string,
//     });
//
//     return this.pagination<EthUserWalletData>(req, {
//       pagination: userWallets.pagination,
//       results: userWallets.results.map((c) => c.getData()),
//     });
//   }
//
//   private async createUserWallet(
//     req: express.Request
//   ): Promise<EthUserWalletData> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//
//     return (
//       await masterWallet.createUserWallet(
//         req.body.name,
//         req.body.passphrase,
//         req.body.gasPrice
//           ? BNConverter.hexStringToBN(req.body.gasPrice)
//           : undefined,
//         req.body.salt ? BNConverter.hexStringToBN(req.body.salt) : undefined
//       )
//     ).getData();
//   }
//
//   private async sendUserWalletContractCall(
//     req: express.Request
//   ): Promise<EthTransaction> {
//     const userWallet = await this.getUserWalletByContext(
//       req.sdk,
//       req.params.masterWalletId,
//       req.params.userWalletId
//     );
//
//     return await userWallet.contractCall(
//       req.body.contractAddress,
//       BNConverter.hexStringToBN(req.body.value),
//       req.body.data,
//       req.body.passphrase,
//       req.body.otpCode,
//       req.body.gasPrice
//         ? BNConverter.hexStringToBN(req.body.gasPrice)
//         : undefined,
//       req.body.gasLimit
//         ? BNConverter.hexStringToBN(req.body.gasLimit)
//         : undefined
//     );
//   }
//
//   private async changeUserWalletName(req: express.Request): Promise<void> {
//     const userWallet = await this.getUserWalletByContext(
//       req.sdk,
//       req.params.masterWalletId,
//       req.params.userWalletId
//     );
//
//     return await userWallet.changeName(req.body.name);
//   }
//
//   private async getUserWalletBalance(
//     req: express.Request
//   ): Promise<BalanceResponse[]> {
//     const userWallet = await this.getUserWalletByContext(
//       req.sdk,
//       req.params.masterWalletId,
//       req.params.userWalletId
//     );
//
//     const balances = await userWallet.getBalance(
//       req.query.flag === "true",
//       req.query.symbol ? String(req.query.symbol) : null
//     );
//     return balances.map((c) => this.bnToHexString(c));
//   }
//
//   private async getUserWalletNonce(req: express.Request): Promise<Nonce> {
//     const userWallet = await this.getUserWalletByContext(
//       req.sdk,
//       req.params.masterWalletId,
//       req.params.userWalletId
//     );
//
//     return {
//       nonce: BNConverter.bnToHexString(userWallet.getNonce()),
//     };
//   }
//
//   private async sendUserWalletCoin(
//     req: express.Request
//   ): Promise<EthTransaction> {
//     const userWallet = await this.getUserWalletByContext(
//       req.sdk,
//       req.params.masterWalletId,
//       req.params.userWalletId
//     );
//
//     return await userWallet.transfer(
//       await this.getCoinByTicker(req.sdk, req.body.ticker),
//       req.body.to,
//       BNConverter.hexStringToBN(req.body.amount),
//       req.body.passphrase,
//       req.body.otpCode,
//       req.body.gasPrice
//         ? BNConverter.hexStringToBN(req.body.gasPrice)
//         : undefined,
//       req.body.gasLimit
//         ? BNConverter.hexStringToBN(req.body.gasLimit)
//         : undefined
//     );
//   }
//
//   private async changePassphrase(req: express.Request): Promise<void> {
//     const masterWallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//
//     return await masterWallet.changePassphrase(
//       req.body.passphrase,
//       req.body.newPassphrase,
//       req.body.otpCode
//     );
//   }
//
//   @Cacheable({
//     cacheKey: (args) => args[1],
//     hashKey: "klay_coin",
//   })
//   private getCoinByTicker(sdk: SDK, ticker: string): Promise<Coin> {
//     return sdk.klay.coins.getCoin(ticker);
//   }
//
//   @Cacheable({
//     cacheKey: (args) => args[1],
//     hashKey: "klay_master_wallet",
//     ttlSeconds: 10, // should refresh master wallet due to whitelistActivated field
//     strategy: new DefaultFilterCacheStrategy(
//       (wallet: EthMasterWallet) =>
//         // should cache only if it is active
//         wallet.getData().status === WalletStatus.ACTIVE
//     ),
//   })
//   private getMasterWalletById(sdk: SDK, id: string): Promise<EthMasterWallet> {
//     return sdk.klay.wallets.getMasterWallet(id);
//   }
//
//   @CacheClear({
//     cacheKey: (args) => args[1],
//     hashKey: "klay_master_wallet",
//   })
//   private async retryCreateMasterWalletById(
//     sdk: SDK,
//     walletId: string,
//     gasPrice?: BN
//   ): Promise<EthMasterWalletData> {
//     return (
//       await sdk.klay.wallets.retryCreateMasterWallet(walletId, gasPrice)
//     ).getData();
//   }
//
//   @Cacheable({
//     cacheKey: (args) => args[1] + args[2],
//     hashKey: "klay_user_wallet",
//     strategy: new DefaultFilterCacheStrategy(
//       (wallet: EthUserWallet) =>
//         // should cache only if it is active
//         wallet.getData().status === WalletStatus.ACTIVE
//     ),
//   })
//   private async getUserWalletByContext(
//     sdk: SDK,
//     masterWalletId: string,
//     userWalletId: string
//   ): Promise<EthUserWallet> {
//     return (await this.getMasterWalletById(sdk, masterWalletId)).getUserWallet(
//       userWalletId
//     );
//   }
//
//   @CacheClear({
//     cacheKey: (args) => args[1] + args[2],
//     hashKey: "klay_user_wallet",
//   })
//   private async retryCreateUserWalletByContext(
//     sdk: SDK,
//     masterWalletId: string,
//     userWalletId: string,
//     gasPrice?: BN
//   ): Promise<EthUserWalletData> {
//     const masterWallet = await this.getMasterWalletById(sdk, masterWalletId);
//     const response = await masterWallet.retryCreateUserWallet(
//       userWalletId,
//       gasPrice
//     );
//     return response.getData();
//   }
//
//   private isContractCallRequest(request: any): request is ContractCallRequest {
//     return (
//       request.contractAddress !== undefined &&
//       request.value !== undefined &&
//       request.data !== undefined
//     );
//   }
//
//   private isTransferRequest(request: any): request is TransferRequest {
//     return (
//       request.ticker !== undefined &&
//       request.to !== undefined &&
//       request.amount !== undefined
//     );
//   }
//
//   private async activateMasterWallet(
//     req: express.Request
//   ): Promise<EthActivatingMasterWallet> {
//     const wallet = await this.getMasterWalletById(
//       req.sdk,
//       req.params.masterWalletId
//     );
//     return wallet.activate(
//       req.body.accountKey as Key,
//       req.body.backupKey as Key
//     );
//   }
// }