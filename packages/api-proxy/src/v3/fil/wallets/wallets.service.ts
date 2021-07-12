import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { MasterWalletDto } from "../dto/master-wallet.dto";
import { BalanceDTO } from "../dto/balance.dto";
import {
  FilFlush,
  FilMasterWallet,
} from "@haechi-labs/henesis-wallet-core/lib/fil/wallet";
import { ChangeWalletNameRequestDTO } from "./dto/chnage-wallet-name-request.dto";
import { TransferRequestDTO } from "./dto/transfer-request.dto";
import { TransferDTO } from "../dto/transfer.dto";
import { FilTransfer } from "@haechi-labs/henesis-wallet-core/lib/fil";
import BN from "bn.js";
import { FlushRequestDTO } from "./dto/flush-request.dto";
import { FlushDTO } from "../dto/flush.dto";
import { CreateDepositAddressRequestDTO } from "./dto/create-deposit-address-request.dto";
import { GetDepositAddressesOptionsDTO } from "./dto/get-deposit-addresses-options.dto";
import { DepositAddressDTO } from "../dto/deposit-address.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { FilDepositAddress } from "@haechi-labs/henesis-wallet-core/lib/fil/depositAddress";
import { MasterWalletBalanceDto } from "../dto/master-wallet-balance.dto";
import { PaginationOptionsDTO } from "../dto/pagination-options.dto";
import { getPaginationMeta } from "../../../utils/pagination";

@Injectable()
export class WalletsService {
  public async getMasterWallets(
    sdk: SDK,
    name?: string
  ): Promise<MasterWalletDto[]> {
    return (
      await sdk.fil.wallets.getMasterWallets({
        name: name,
      })
    ).map(MasterWalletDto.fromFilWallet);
  }

  public async getMasterWallet(
    sdk: SDK,
    masterWalletId: string
  ): Promise<MasterWalletDto> {
    return MasterWalletDto.fromFilWallet(
      await sdk.fil.wallets.getMasterWallet(masterWalletId)
    );
  }

  public async getMasterWalletBalances(
    sdk: SDK,
    masterWalletId: string
  ): Promise<MasterWalletBalanceDto[]> {
    const masterWallet: FilMasterWallet = await sdk.fil.wallets.getMasterWallet(
      masterWalletId
    );
    return MasterWalletBalanceDto.fromBalances(await masterWallet.getBalance());
  }

  public async changeMasterWalletName(
    sdk: SDK,
    masterWalletId: string,
    request: ChangeWalletNameRequestDTO
  ) {
    const masterWallet: FilMasterWallet = await sdk.fil.wallets.getMasterWallet(
      masterWalletId
    );
    await masterWallet.changeName(request.name);
  }

  public async transfer(
    sdk: SDK,
    masterWalletId: string,
    request: TransferRequestDTO
  ): Promise<TransferDTO> {
    const masterWallet: FilMasterWallet = await sdk.fil.wallets.getMasterWallet(
      masterWalletId
    );
    const transfer: FilTransfer = await masterWallet.transfer(
      request.to,
      new BN(request.amount),
      request.passphrase,
      null,
      request.gasPremium != null ? new BN(request.gasPremium) : null,
      request.metadata
    );
    return TransferDTO.fromTransfer(transfer);
  }

  public async flush(
    sdk: SDK,
    masterWalletId: string,
    request: FlushRequestDTO
  ): Promise<FlushDTO> {
    const masterWallet: FilMasterWallet = await sdk.fil.wallets.getMasterWallet(
      masterWalletId
    );
    const flush: FilFlush = await masterWallet.flush(
      request.targets,
      request.passphrase,
      request.gasPremium != null ? new BN(request.gasPremium) : null,
      request.metadata
    );
    return FlushDTO.fromFlush(flush);
  }

  public async getDepositAddresses(
    sdk: SDK,
    masterWalletId: string,
    options: GetDepositAddressesOptionsDTO,
    path: string
  ): Promise<PaginationDTO<DepositAddressDTO>> {
    const masterWallet: FilMasterWallet = await sdk.fil.wallets.getMasterWallet(
      masterWalletId
    );
    const data = await masterWallet.getDepositAddresses(options);
    return {
      pagination: getPaginationMeta(
        path,
        options.page,
        options.size,
        data.pagination.totalCount,
        options
      ),
      results: data.results.map(DepositAddressDTO.fromDepositAddress),
    };
  }

  public async createDepositAddress(
    sdk: SDK,
    masterWalletId: string,
    request: CreateDepositAddressRequestDTO
  ): Promise<DepositAddressDTO> {
    const masterWallet: FilMasterWallet = await sdk.fil.wallets.getMasterWallet(
      masterWalletId
    );
    return DepositAddressDTO.fromDepositAddress(
      await masterWallet.createDepositAddress(request.name)
    );
  }

  public async getDepositAddress(
    sdk: SDK,
    masterWalletId: string,
    depositAddressId: string
  ): Promise<DepositAddressDTO> {
    const masterWallet: FilMasterWallet = await sdk.fil.wallets.getMasterWallet(
      masterWalletId
    );
    return DepositAddressDTO.fromDepositAddress(
      await masterWallet.getDepositAddress(depositAddressId)
    );
  }

  public async getDepositAddressBalance(
    sdk: SDK,
    masterWalletId: string,
    depositAddressId: string
  ): Promise<BalanceDTO[]> {
    const masterWallet: FilMasterWallet = await sdk.fil.wallets.getMasterWallet(
      masterWalletId
    );
    const depositAddress: FilDepositAddress =
      await masterWallet.getDepositAddress(depositAddressId);
    return BalanceDTO.fromBalances(await depositAddress.getBalance());
  }

  public async getFlushes(
    sdk: SDK,
    masterWalletId: string,
    options: PaginationOptionsDTO
  ): Promise<PaginationDTO<FlushDTO>> {
    const masterWallet: FilMasterWallet = await sdk.fil.wallets.getMasterWallet(
      masterWalletId
    );
    const data = await masterWallet.getFlushes(options);
    return {
      pagination: data.pagination,
      results: data.results.map(FlushDTO.fromFlush),
    };
  }

  public async getFlush(
    sdk: SDK,
    masterWalletId: string,
    flushId: string
  ): Promise<FlushDTO> {
    const masterWallet: FilMasterWallet = await sdk.fil.wallets.getMasterWallet(
      masterWalletId
    );
    return FlushDTO.fromFlush(await masterWallet.getFlush(flushId));
  }
}
