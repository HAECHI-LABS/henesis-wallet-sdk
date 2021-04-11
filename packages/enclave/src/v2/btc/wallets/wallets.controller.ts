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
import { WalletsService } from "./wallets.service";
import { WalletDTO } from "../dto/wallet.dto";
import { BalanceDTO } from "../dto/balance.dto";
import { EstimationFeeDto } from "../dto/estimation-fee.dto";
import { DepositAddressDTO } from "../dto/deposit-address.dto";
import { TransferDTO } from "../dto/transfer.dto";
import { BtcRawTransactionDTO } from "../dto/btc-raw-transaction.dto";
import { SignedRawTransactionDTO } from "../dto/signed-raw-transaction.dto";
import { ApiOperation } from "@nestjs/swagger";
import express from "express";
import { CreateInactiveMasterWalletRequestDTO } from "../dto/create-inactive-master-wallet-request.dto";
import { ChangeWalletNameRequestDTO } from "../dto/change-wallet-name-request.dto";
import { ChangePassphraseRequestDTO } from "../dto/change-passphrase-request.dto";
import { CreateDepositAddressRequestDTO } from "../dto/create-deposit-address-request.dto";
import { ActivateMasterWalletRequestDTO } from "../dto/activate-master-wallet-request.dto";
import { VerifyAddressRequestDTO } from "../dto/verify-address-request.dto";
import { TransferRequestDTO } from "../dto/transfer-request.dto";
import { CreateRawTransactionRequestDTO } from "../dto/create-raw-transaction-request.dto";
import { SendSignedTransactionRequestDTO } from "../dto/send-signed-transaction-request.dto";

@Controller("wallets")
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get("/")
  @ApiOperation({
    summary: "전체 지갑 목록 조회하기",
    description: "전체 지갑 목록을 조회합니다.",
  }) // todo: name query
  public async getWallets(
    @Request() request: express.Request,
    @Query("name") walletName?: string
  ): Promise<WalletDTO[]> {
    return null;
  }

  @Post("/")
  @ApiOperation({
    summary: "지갑 생성하기",
    description: "지갑을 생성합니다.",
  })
  public async createInactiveMasterWallet(
    @Request() request: express.Request,
    @Body()
    createInactiveMasterWalletRequest: CreateInactiveMasterWalletRequestDTO
  ): Promise<WalletDTO> {
    return null;
  }

  // todo: implement
  @Post("/:walletId/activate")
  @ApiOperation({
    summary: "지갑 활성화하기",
    description: "지갑을 활성화합니다.",
  })
  public async activateMasterWallet(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body()
    activateMasterWalletRequestDTO: ActivateMasterWalletRequestDTO
  ): Promise<WalletDTO> {
    return null;
  }

  @Get("/:walletId")
  @ApiOperation({
    summary: "지갑 정보 조회하기",
    description: "특정 지갑의 상세 정보를 조회합니다.",
  })
  public async getWallet(
    @Request() request: express.Request,
    @Param("walletId") walletId: string
  ): Promise<WalletDTO> {
    return null;
  }

  @Patch("/:walletId/name")
  @ApiOperation({
    summary: "지갑 정보 변경하기",
    description: "특정 지갑의 이름을 변경합니다.",
  })
  public async changeWalletName(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body()
    changeWalletNameRequestDTO: ChangeWalletNameRequestDTO
  ) {}

  @Patch("/:walletId/passphrase")
  @ApiOperation({
    summary: "지갑 비밀번호 변경하기",
    description: "특정 지갑의 비밀번호를 변경합니다.",
  })
  public async changePassphrase(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body()
    changePassphraseRequestDTO: ChangePassphraseRequestDTO
  ) {}

  @Get("/:walletId/balance")
  @ApiOperation({
    summary: "지갑 잔고 조회하기",
    description: "특정 지갑의 잔고를 변경합니다.",
  })
  public async getWalletBalance(
    @Request() request: express.Request,
    @Param("walletId") walletId: string
  ): Promise<BalanceDTO> {
    return null;
  }

  @Get("/:walletId/estimated-fee")
  @ApiOperation({
    summary: "예상 수수료 조회하기",
    description: "예상 수수료를 조회합니다.",
  })
  public async getEstimatedFee(
    @Request() request: express.Request,
    @Param("walletId") walletId: string
  ): Promise<EstimationFeeDto> {
    return null;
  }

  @Post("/:walletId/deposit-addresses")
  @ApiOperation({
    summary: "입금 주소 생성하기",
    description: "입금 주소를 생성합니다.",
  })
  public async createDepositAddress(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body()
    createDepositAddressRequestDTO: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    return null;
  }

  @Get("/:walletId/deposit-addresses")
  @ApiOperation({
    summary: "전체 입금 주소 목록 조회하기",
    description: "특정 지갑에 속한 모든 입금 주소 목록을 조회합니다.",
  }) // todo: id, address, name query
  public async getDepositAddresses(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Query("id") id?: string,
    @Query("address") address?: string,
    @Query("name") name?: string
  ): Promise<DepositAddressDTO[]> {
    return null;
  }

  @Get("/:walletId/deposit-addresses/:depositAddressId")
  @ApiOperation({
    summary: "입금 주소 정보 조회하기",
    description: "특정 입금 주소 정보를 조회합니다.",
  }) // todo: name query
  public async getDepositAddress(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Param("depositAddressId") depositAddressId: string,
    @Query("name") name?: string
  ): Promise<DepositAddressDTO> {
    return null;
  }

  @Post("/verify-address")
  @ApiOperation({
    summary: "입금 주소 검증하기",
    description: "특정 입금 주소를 검증합니다.",
  })
  public async verifyAddress(
    @Request() request: express.Request,
    @Body() verifyAddressRequestDTO: VerifyAddressRequestDTO
  ): Promise<boolean> {
    return null;
  }

  @Post("/:walletId/transfer")
  @ApiOperation({
    summary: "transfer",
    description: "transfer",
  })
  public async transfer(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() transferRequestDTO: TransferRequestDTO
  ): Promise<TransferDTO> {
    return null;
  }

  @Post("/:walletId/raw-transactions")
  @ApiOperation({
    summary: "raw 트랜잭션 전송하기",
    description: "raw 트랜잭션 전송합니다.",
  })
  public async createRawTransaction(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() createRawTransactionRequestDTO: CreateRawTransactionRequestDTO
  ): Promise<BtcRawTransactionDTO> {
    return null;
  }

  @Post("/:walletId/signed-transactions")
  @ApiOperation({
    summary: "signed 트랜잭션 전송하기",
    description: "signed 트랜잭션 전송합니다.",
  })
  public async sendSignedTransaction(
    @Request() request: express.Request,
    @Param("walletId") walletId: string,
    @Body() sendSignedTransactionRequestDTO: SendSignedTransactionRequestDTO
  ): Promise<SignedRawTransactionDTO> {
    return null;
  }
}

// todo: delete when implementation is done
// import AbstractController from "../../controller";
// import { Controller } from "../../types";
// import express from "express";
// import {
//   BtcActivatingMasterWallet,
//   BtcEstimatedFee,
//   BtcMasterWallet,
//   BtcMasterWalletData,
//   BtcRawTransaction,
//   BtcSignedRawTransaction,
//   DepositAddress,
// } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";
// import { BNConverter, SDK } from "@haechi-labs/henesis-wallet-core";
// import {
//   Balance,
//   Key,
//   Pagination,
// } from "@haechi-labs/henesis-wallet-core/lib/types";
// import { Transfer } from "@haechi-labs/henesis-wallet-core/lib/btc/transfers";
// import { TransferResponse } from "../transfers/transfers.controller";
// import { Cacheable } from "@type-cacheable/core";
// import {
//   InactiveMasterWallet,
//   WalletStatus,
// } from "@haechi-labs/henesis-wallet-core/lib/wallet";
// import { DefaultFilterCacheStrategy } from "../../../utils/cache";
// import {
//   HenesisError,
//   HttpStatus,
// } from "@haechi-labs/henesis-wallet-core/lib/error";
//
// export interface BalanceResponse
//   extends Omit<Balance, "amount" | "spendableAmount"> {
//   amount: string;
//   spendableAmount?: string;
// }
//
// export interface Boolean {
//   value: boolean;
// }
//
// export default class WalletsController
//   extends AbstractController
//   implements Controller {
//   private path = "/api/v2/btc/wallets";
//
//   constructor() {
//     super();
//     this.initRoutes();
//   }
//
//   protected initRoutes(): void {
//     this.router.get(`${this.path}`, this.promiseWrapper(this.getWallets));
//     this.router.post(
//       `${this.path}`,
//       this.promiseWrapper(this.createInactiveMasterWallet, 201)
//     );
//     this.router.post(
//       `${this.path}/:walletId/activate`,
//       this.promiseWrapper(this.activateMasterWallet)
//     );
//     this.router.get(
//       `${this.path}/:walletId`,
//       this.promiseWrapper(this.getWallet)
//     );
//
//     this.router.patch(
//       `${this.path}/:walletId/name`,
//       this.promiseWrapper(this.changeWalletName)
//     );
//
//     this.router.patch(
//       `${this.path}/:walletId/passphrase`,
//       this.promiseWrapper(this.changePassphrase)
//     );
//
//     this.router.get(
//       `${this.path}/:walletId/balance`,
//       this.promiseWrapper(this.getWalletBalance)
//     );
//
//     this.router.get(
//       `${this.path}/:walletId/estimated-fee`,
//       this.promiseWrapper(this.getEstimatedFee)
//     );
//
//     this.router.post(
//       `${this.path}/:walletId/deposit-addresses`,
//       this.promiseWrapper(this.createDepositAddress)
//     );
//
//     this.router.get(
//       `${this.path}/:walletId/deposit-addresses`,
//       this.promiseWrapper(this.getDepositAddresses)
//     );
//
//     this.router.get(
//       `${this.path}/:walletId/deposit-addresses/:depositAddressId`,
//       this.promiseWrapper(this.getDepositAddress)
//     );
//
//     this.router.post(
//       `${this.path}/verify-address`,
//       this.promiseWrapper(this.verifyAddress)
//     );
//
//     this.router.post(
//       `${this.path}/:walletId/transfer`,
//       this.promiseWrapper(this.transfer)
//     );
//
//     this.router.post(
//       `${this.path}/:walletId/raw-transactions`,
//       this.promiseWrapper(this.createRawTransaction, 201)
//     );
//
//     this.router.post(
//       `${this.path}/:walletId/signed-transactions`,
//       this.promiseWrapper(this.sendSignedTransaction, 201)
//     );
//   }
//
//   private async getWallets(
//     req: express.Request
//   ): Promise<BtcMasterWalletData[]> {
//     const options = req.query;
//     const wallets = await req.sdk.btc.wallets.getMasterWallets(options);
//     return wallets.map((x) => x.getData());
//   }
//
//   private async getWallet(req: express.Request): Promise<BtcMasterWalletData> {
//     const wallet = await this.getWalletById(req.sdk, req.params.walletId);
//     return wallet.getData();
//   }
//
//   @Cacheable({
//     cacheKey: (args) => args[1],
//     hashKey: "btc_wallet",
//     ttlSeconds: 10, // should refresh master wallet due to whitelistActivated field
//     strategy: new DefaultFilterCacheStrategy(
//       (wallet: BtcMasterWallet) =>
//         // should cache only if it is active
//         wallet.getData().status === WalletStatus.ACTIVE
//     ),
//   })
//   private getWalletById(sdk: SDK, id: string): Promise<BtcMasterWallet> {
//     return sdk.btc.wallets.getWallet(id);
//   }
//
//   private async verifyAddress(req: express.Request): Promise<Boolean> {
//     return {
//       value: req.sdk.btc.wallets.verifyAddress(req.body.address),
//     };
//   }
//
//   private async transfer(req: express.Request): Promise<TransferResponse> {
//     const wallet = await this.getWalletById(req.sdk, req.params.walletId);
//     const transfer: Transfer = await wallet.transfer(
//       req.body.to,
//       BNConverter.hexStringToBN(req.body.amount),
//       req.body.passphrase,
//       req.body.otpCode,
//       req.body.feeRate ? BNConverter.hexStringToBN(req.body.feeRate) : undefined
//     );
//
//     return this.bnToHexString(transfer);
//   }
//
//   private async createRawTransaction(
//     req: express.Request
//   ): Promise<BtcRawTransaction> {
//     const wallet = await this.getWalletById(req.sdk, req.params.walletId);
//     return wallet.createRawTransaction(
//       req.body.to,
//       BNConverter.hexStringToBN(req.body.amount),
//       req.body.feeRate ? BNConverter.hexStringToBN(req.body.feeRate) : undefined
//     );
//   }
//
//   private async sendSignedTransaction(
//     req: express.Request
//   ): Promise<TransferResponse> {
//     const wallet = await this.getWalletById(req.sdk, req.params.walletId);
//     const transfer: Transfer = await wallet.sendSignedTransaction(
//       req.body as BtcSignedRawTransaction
//     );
//     return this.bnToHexString(transfer);
//   }
//
//   private async getEstimatedFee(
//     req: express.Request
//   ): Promise<BtcEstimatedFee> {
//     const wallet = await this.getWalletById(req.sdk, req.params.walletId);
//     return wallet.getEstimatedFee();
//   }
//
//   private async getWalletBalance(
//     req: express.Request
//   ): Promise<BalanceResponse[]> {
//     const wallet = await this.getWalletById(req.sdk, req.params.walletId);
//
//     const balances = await wallet.getBalance();
//     return this.bnToHexString(balances);
//   }
//
//   private async getDepositAddresses(
//     req: express.Request
//   ): Promise<Pagination<DepositAddress>> {
//     const wallet = await this.getWalletById(req.sdk, req.params.walletId);
//
//     return this.pagination<DepositAddress>(
//       req,
//       await wallet.getDepositAddresses(req.query)
//     );
//   }
//
//   private getDepositAddress(req: express.Request): Promise<DepositAddress> {
//     return this.getDepositAddressByContext(
//       req.sdk,
//       req.params.walletId,
//       req.params.depositAddressId
//     );
//   }
//
//   @Cacheable({
//     cacheKey: (args) => args[1] + args[2],
//     hashKey: "btc_deposit_address",
//   })
//   private async getDepositAddressByContext(
//     sdk: SDK,
//     walletId: string,
//     depositAddressId: string
//   ): Promise<DepositAddress> {
//     const wallet = await this.getWalletById(sdk, walletId);
//
//     return wallet.getDepositAddress(depositAddressId);
//   }
//
//   private async createDepositAddress(
//     req: express.Request
//   ): Promise<DepositAddress> {
//     const wallet = await this.getWalletById(req.sdk, req.params.walletId);
//
//     return await wallet.createDepositAddress(req.body.name);
//   }
//
//   private async changePassphrase(req: express.Request): Promise<void> {
//     const wallet = await this.getWalletById(req.sdk, req.params.walletId);
//
//     return wallet.changePassphrase(
//       req.body.passphrase,
//       req.body.newPassphrase,
//       req.body.otpCode
//     );
//   }
//
//   private async changeWalletName(req: express.Request): Promise<void> {
//     const wallet = await this.getWalletById(req.sdk, req.params.walletId);
//
//     return wallet.changeName(req.body.name);
//   }
//
//   private createInactiveMasterWallet(
//     req: express.Request
//   ): Promise<InactiveMasterWallet> {
//     const type: string = <string>req.query.type;
//     if (type == undefined || type.toUpperCase() != WalletStatus.INACTIVE) {
//       throw new HenesisError(`type should be inactive`, HttpStatus.BAD_REQUEST);
//     }
//     return req.sdk.btc.wallets.createInactiveMasterWallet(req.body.name);
//   }
//
//   private async activateMasterWallet(
//     req: express.Request
//   ): Promise<BtcActivatingMasterWallet> {
//     const wallet = await this.getWalletById(req.sdk, req.params.walletId);
//     return wallet.activate(
//       req.body.accountKey as Key,
//       req.body.backupKey as Key
//     );
//   }
// }
