import { Injectable } from "@nestjs/common";
import {
  BNConverter,
  Coin,
  SDK,
  SignedMultiSigPayload,
} from "@haechi-labs/henesis-wallet-core";
import { MasterWalletDTO } from "../dto/master-wallet.dto";
import { CreateMasterWalletRequestDTO } from "../dto/create-master-wallet-request.dto";
import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";
import {
  HenesisError,
  HttpStatus,
} from "@haechi-labs/henesis-wallet-core/lib/error";
import { InactiveMasterWalletDTO } from "../dto/inactive-master-wallet.dto";
import { ActivateMasterWalletRequestDTO } from "../dto/activate-master-wallet-request.dto";
import { Key } from "@haechi-labs/henesis-wallet-core/lib/types";
import { EthMasterWallet } from "@haechi-labs/henesis-wallet-core/lib/eth/wallet";
import { TransactionDTO } from "../dto/transaction.dto";
import { SendMasterWalletContractCallRequestDTO } from "../dto/send-master-wallet-contract-call-request.dto";
import { ChangeMasterWalletNameRequestDTO } from "../dto/change-master-wallet-name-request.dto";
import { BalanceDTO } from "../dto/balance.dto";
import { SendMasterWalletCoinRequestDTO } from "../dto/send-master-wallet-coin-request.dto";
import {
  ContractCallRequest,
  SendMasterWalletBatchTransactionsRequestDTO,
  TransferRequest,
} from "../dto/send-master-wallet-batch-transactions-request.dto";
import BN from "bn.js";
import { FlushRequestDTO } from "../dto/flush-request.dto";
import { UserWalletDTO } from "../dto/user-wallet.dto";
import {
  EthUserWallet,
  EthUserWalletData,
} from "@haechi-labs/henesis-wallet-core/lib/eth/userWallet";
import { PaginationDTO } from "../dto/pagination.dto";
import { CreateUserWalletRequestDTO } from "../dto/create-user-wallet-request.dto";
import { SendUserWalletContractCallRequestDTO } from "../dto/send-user-wallet-contract-call-request.dto";
import { ChangeUserWalletNameRequestDTO } from "../dto/change-user-wallet-name-request.dto";
import { SendUserWalletCoinRequestDTO } from "../dto/send-user-wallet-coin-request.dto";
import { RetryCreateMasterWalletRequestDTO } from "../dto/retry-create-master-wallet-request.dto";
import { RetryCreateUserWalletRequestDTO } from "../dto/retry-create-user-wallet-request.dto";
import { EthMasterWalletData } from "@haechi-labs/henesis-wallet-core/lib/eth/abstractWallet";

@Injectable()
export class WalletsService {
  public constructor() {}

  public async getMasterWallets(
    sdk: SDK,
    name?: string
  ): Promise<MasterWalletDTO[]> {
    const options: { name?: string } = {};
    if (name) options.name = name;

    return (await sdk.eth.wallets.getMasterWallets(options)).map((c) =>
      c.getData()
    );
  }

  public async createMasterWallet(
    sdk: SDK,
    createMasterWalletRequestDTO: CreateMasterWalletRequestDTO
  ): Promise<MasterWalletDTO | InactiveMasterWalletDTO> {
    const type: string = createMasterWalletRequestDTO.type;
    if (type != undefined) {
      if (type.toUpperCase() != WalletStatus.INACTIVE) {
        throw new HenesisError(
          `type '${type}' is not supported`,
          HttpStatus.BAD_REQUEST
        );
      }
      return (await sdk.eth.wallets.createInactiveMasterWallet(
        createMasterWalletRequestDTO.name
      )) as InactiveMasterWalletDTO;
    }
    return (
      await sdk.eth.wallets.createMasterWallet(
        createMasterWalletRequestDTO.name,
        createMasterWalletRequestDTO.passphrase,
        createMasterWalletRequestDTO.gasPrice
          ? BNConverter.hexStringToBN(createMasterWalletRequestDTO.gasPrice)
          : undefined
      )
    ).getData();
  }

  public async activateMasterWallet(
    sdk: SDK,
    masterWalletId: string,
    activateMasterWalletRequestDTO: ActivateMasterWalletRequestDTO
  ): Promise<MasterWalletDTO> {
    const wallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );
    return wallet.activate(
      activateMasterWalletRequestDTO.accountKey as Key,
      activateMasterWalletRequestDTO.backupKey as Key
    );
  }

  public async sendMasterWalletContractCall(
    sdk: SDK,
    masterWalletId: string,
    sendMasterWalletContractCallRequestDTO: SendMasterWalletContractCallRequestDTO
  ): Promise<TransactionDTO> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    return await masterWallet.contractCall(
      sendMasterWalletContractCallRequestDTO.contractAddress,
      BNConverter.hexStringToBN(sendMasterWalletContractCallRequestDTO.value),
      sendMasterWalletContractCallRequestDTO.data,
      sendMasterWalletContractCallRequestDTO.passphrase,
      null,
      sendMasterWalletContractCallRequestDTO.gasPrice
        ? BNConverter.hexStringToBN(
            sendMasterWalletContractCallRequestDTO.gasPrice
          )
        : undefined,
      sendMasterWalletContractCallRequestDTO.gasLimit
        ? BNConverter.hexStringToBN(
            sendMasterWalletContractCallRequestDTO.gasLimit
          )
        : undefined
    );
  }

  public async changeMasterWalletName(
    sdk: SDK,
    masterWalletId: string,
    changeMasterWalletNameRequestDTO: ChangeMasterWalletNameRequestDTO
  ): Promise<void> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    return await masterWallet.changeName(changeMasterWalletNameRequestDTO.name);
  }

  public async getMasterWalletBalance(
    sdk: SDK,
    masterWalletId: string,
    flag?: string,
    symbol?: string
  ): Promise<BalanceDTO[]> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );
    const balances = await masterWallet.getBalance(
      flag === "true",
      symbol ? String(symbol) : null
    );
    return balances.map(BalanceDTO.fromBalance);
  }

  public async sendMasterWalletCoin(
    sdk: SDK,
    masterWalletId: string,
    sendMasterWalletCoinRequestDTO: SendMasterWalletCoinRequestDTO
  ): Promise<TransactionDTO> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    return await masterWallet.transfer(
      await WalletsService.getCoinByTicker(
        sdk,
        sendMasterWalletCoinRequestDTO.ticker
      ),
      sendMasterWalletCoinRequestDTO.to,
      BNConverter.hexStringToBN(sendMasterWalletCoinRequestDTO.amount),
      sendMasterWalletCoinRequestDTO.passphrase,
      null,
      sendMasterWalletCoinRequestDTO.gasPrice
        ? BNConverter.hexStringToBN(sendMasterWalletCoinRequestDTO.gasPrice)
        : undefined,
      sendMasterWalletCoinRequestDTO.gasLimit
        ? BNConverter.hexStringToBN(sendMasterWalletCoinRequestDTO.gasLimit)
        : undefined
    );
  }

  public async sendMasterWalletBatchTransactions(
    sdk: SDK,
    masterWalletId: string,
    sendMasterWalletBatchTransactionsRequestDTO: SendMasterWalletBatchTransactionsRequestDTO
  ): Promise<TransactionDTO[]> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    const batch = masterWallet.createBatchRequest(null);
    const payloads: SignedMultiSigPayload[] = await Promise.all(
      (sendMasterWalletBatchTransactionsRequestDTO.requests as any[]).map(
        (request): Promise<SignedMultiSigPayload> => {
          // TODO: should refactoring
          if (this.isContractCallRequest(request)) {
            request = request as ContractCallRequest;
            return masterWallet.buildContractCallPayload(
              request.contractAddress,
              BNConverter.hexStringToBN(request.value),
              request.data,
              sendMasterWalletBatchTransactionsRequestDTO.passphrase
            );
          }

          if (this.isTransferRequest(request)) {
            request = request as TransferRequest;
            return WalletsService.getCoinByTicker(
              sdk,
              request.ticker
            ).then((coin) =>
              masterWallet.buildTransferPayload(
                coin,
                request.to,
                BNConverter.hexStringToBN(request.amount),
                sendMasterWalletBatchTransactionsRequestDTO.passphrase
              )
            );
          }

          throw new Error("invalid batch transactions request format");
        }
      )
    );
    batch.addAll(payloads);

    return batch.execute();
  }

  public async flush(
    sdk: SDK,
    masterWalletId: string,
    flushRequestDTO: FlushRequestDTO
  ): Promise<TransactionDTO> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    return await masterWallet.flush(
      await WalletsService.getCoinByTicker(sdk, flushRequestDTO.ticker),
      flushRequestDTO.userWalletIds,
      flushRequestDTO.passphrase,
      null,
      flushRequestDTO.gasPrice
        ? BNConverter.hexStringToBN(flushRequestDTO.gasPrice)
        : undefined,
      flushRequestDTO.gasLimit
        ? BNConverter.hexStringToBN(flushRequestDTO.gasLimit)
        : undefined
    );
  }

  public async getUserWallet(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string
  ): Promise<UserWalletDTO> {
    return (
      await WalletsService.getUserWalletByContext(
        sdk,
        masterWalletId,
        userWalletId
      )
    ).getData();
  }

  public async getUserWallets(
    sdk: SDK,
    masterWalletId: string,
    page?: string,
    size?: string,
    sort?: string,
    name?: string,
    address?: string
  ): Promise<PaginationDTO<UserWalletDTO>> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    const userWallets = await masterWallet.getUserWallets({
      page: +page,
      size: +size,
      sort: sort as string,
      name: name as string,
      address: address as string,
    });

    return {
      pagination: userWallets.pagination,
      results: userWallets.results.map((c) => c.getData()),
    };
  }

  public async createUserWallet(
    sdk: SDK,
    masterWalletId: string,
    createUserWalletRequestDTO: CreateUserWalletRequestDTO
  ): Promise<UserWalletDTO> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );

    return (
      await masterWallet.createUserWallet(
        createUserWalletRequestDTO.name,
        createUserWalletRequestDTO.passphrase,
        createUserWalletRequestDTO.gasPrice
          ? BNConverter.hexStringToBN(createUserWalletRequestDTO.gasPrice)
          : undefined,
        createUserWalletRequestDTO.salt
          ? BNConverter.hexStringToBN(createUserWalletRequestDTO.salt)
          : undefined
      )
    ).getData();
  }

  public async sendUserWalletContractCall(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    sendUserWalletContractCallRequestDTO: SendUserWalletContractCallRequestDTO
  ): Promise<TransactionDTO> {
    const userWallet = await WalletsService.getUserWalletByContext(
      sdk,
      masterWalletId,
      userWalletId
    );

    return await userWallet.contractCall(
      sendUserWalletContractCallRequestDTO.contractAddress,
      BNConverter.hexStringToBN(sendUserWalletContractCallRequestDTO.value),
      sendUserWalletContractCallRequestDTO.data,
      sendUserWalletContractCallRequestDTO.passphrase,
      null,
      sendUserWalletContractCallRequestDTO.gasPrice
        ? BNConverter.hexStringToBN(
            sendUserWalletContractCallRequestDTO.gasPrice
          )
        : undefined,
      sendUserWalletContractCallRequestDTO.gasLimit
        ? BNConverter.hexStringToBN(
            sendUserWalletContractCallRequestDTO.gasLimit
          )
        : undefined
    );
  }

  public async changeUserWalletName(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    changeUserWalletNameRequestDTO: ChangeUserWalletNameRequestDTO
  ): Promise<void> {
    const userWallet = await WalletsService.getUserWalletByContext(
      sdk,
      masterWalletId,
      userWalletId
    );

    return await userWallet.changeName(changeUserWalletNameRequestDTO.name);
  }

  public async getUserWalletBalance(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    flag?: string,
    symbol?: string
  ): Promise<BalanceDTO[]> {
    const userWallet = await WalletsService.getUserWalletByContext(
      sdk,
      masterWalletId,
      userWalletId
    );

    const balances = await userWallet.getBalance(
      flag === "true",
      symbol ? String(symbol) : null
    );
    return balances.map(BalanceDTO.fromBalance);
  }

  public async sendUserWalletCoin(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    sendUserWalletCoinRequestDTO: SendUserWalletCoinRequestDTO
  ): Promise<TransactionDTO> {
    const userWallet = await WalletsService.getUserWalletByContext(
      sdk,
      masterWalletId,
      userWalletId
    );

    return await userWallet.transfer(
      await WalletsService.getCoinByTicker(
        sdk,
        sendUserWalletCoinRequestDTO.ticker
      ),
      sendUserWalletCoinRequestDTO.to,
      BNConverter.hexStringToBN(sendUserWalletCoinRequestDTO.amount),
      sendUserWalletCoinRequestDTO.passphrase,
      null,
      sendUserWalletCoinRequestDTO.gasPrice
        ? BNConverter.hexStringToBN(sendUserWalletCoinRequestDTO.gasPrice)
        : undefined,
      sendUserWalletCoinRequestDTO.gasLimit
        ? BNConverter.hexStringToBN(sendUserWalletCoinRequestDTO.gasLimit)
        : undefined
    );
  }

  public async retryCreateMasterWallet(
    sdk: SDK,
    masterWalletId: string,
    retryCreateMasterWalletRequestDTO: RetryCreateMasterWalletRequestDTO
  ): Promise<MasterWalletDTO> {
    return WalletsService.retryCreateMasterWalletById(
      sdk,
      masterWalletId,
      retryCreateMasterWalletRequestDTO.gasPrice
        ? BNConverter.hexStringToBN(retryCreateMasterWalletRequestDTO.gasPrice)
        : undefined
    );
  }

  public async retryCreateUserWallet(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    retryCreateUserWalletRequestDTO: RetryCreateUserWalletRequestDTO
  ): Promise<UserWalletDTO> {
    return WalletsService.retryCreateUserWalletByContext(
      sdk,
      masterWalletId,
      userWalletId,
      retryCreateUserWalletRequestDTO.gasPrice
        ? BNConverter.hexStringToBN(retryCreateUserWalletRequestDTO.gasPrice)
        : undefined
    );
  }

  private static getMasterWalletById(
    sdk: SDK,
    id: string
  ): Promise<EthMasterWallet> {
    return sdk.eth.wallets.getMasterWallet(id);
  }

  private static getCoinByTicker(sdk: SDK, ticker: string): Promise<Coin> {
    return sdk.eth.coins.getCoin(ticker);
  }

  private isContractCallRequest(request: any): request is ContractCallRequest {
    return (
      request.contractAddress !== undefined &&
      request.value !== undefined &&
      request.data !== undefined
    );
  }

  private isTransferRequest(request: any): request is TransferRequest {
    return (
      request.ticker !== undefined &&
      request.to !== undefined &&
      request.amount !== undefined
    );
  }

  private static async retryCreateUserWalletByContext(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string,
    gasPrice?: BN
  ): Promise<EthUserWalletData> {
    const masterWallet = await WalletsService.getMasterWalletById(
      sdk,
      masterWalletId
    );
    const response = await masterWallet.retryCreateUserWallet(
      userWalletId,
      gasPrice
    );
    return response.getData();
  }

  private static async retryCreateMasterWalletById(
    sdk: SDK,
    walletId: string,
    gasPrice?: BN
  ): Promise<EthMasterWalletData> {
    return (
      await sdk.eth.wallets.retryCreateMasterWallet(walletId, gasPrice)
    ).getData();
  }

  private static async getUserWalletByContext(
    sdk: SDK,
    masterWalletId: string,
    userWalletId: string
  ): Promise<EthUserWallet> {
    return (
      await WalletsService.getMasterWalletById(sdk, masterWalletId)
    ).getUserWallet(userWalletId);
  }
}
