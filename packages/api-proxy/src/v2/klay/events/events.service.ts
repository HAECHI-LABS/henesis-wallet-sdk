import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { Timestamp } from "@haechi-labs/henesis-wallet-core/lib/types";
import {
  EventStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import { PaginationDTO } from "../../eth/dto/pagination.dto";
import { ValueTransferEventDTO } from "../../eth/dto/value-transfer-event.dto";
import { CallEventDTO } from "../../eth/dto/call-event.dto";

@Injectable()
export class EventsService {
  public constructor() {}

  public async getValueTransferEvents(
    sdk: SDK,
    symbol?: string,
    walletId?: string,
    masterWalletId?: string,
    transactionId?: string,
    transactionHash?: string,
    status?: EventStatus,
    updatedAtGte?: Timestamp,
    updatedAtLt?: Timestamp,
    transferType?: TransferType,
    size?: number,
    page?: number
  ): Promise<PaginationDTO<ValueTransferEventDTO>> {
    const options: {
      symbol?: string;
      walletId?: string;
      masterWalletId?: string;
      transactionId?: string;
      transactionHash?: string;
      status?: EventStatus;
      updatedAtGte?: Timestamp;
      updatedAtLt?: Timestamp;
      transferType?: TransferType;
      size?: number;
      page?: number;
    } = {};
    if (symbol) options.symbol = symbol;
    if (walletId) options.walletId = walletId;
    if (masterWalletId) options.masterWalletId = masterWalletId;
    if (transactionId) options.transactionId = transactionId;
    if (transactionHash) options.transactionHash = transactionHash;
    if (status) options.status = status;
    if (updatedAtGte) options.updatedAtGte = updatedAtGte;
    if (updatedAtLt) options.updatedAtLt = updatedAtLt;
    if (transferType) options.transferType = transferType;
    if (size) options.size = size;
    if (page) options.page = page;

    const events = await sdk.klay.events.getValueTransferEvents(options);
    return {
      pagination: events.pagination as any,
      results: events.results.map(
        ValueTransferEventDTO.fromETHValueTransferEvent
      ),
    };
  }

  public async getCallEvents(
    sdk: SDK,
    walletId?: string,
    masterWalletId?: string,
    transactionId?: string,
    transactionHash?: string,
    status?: EventStatus,
    updatedAtGte?: Timestamp,
    updatedAtLt?: Timestamp,
    size?: number,
    page?: number
  ): Promise<PaginationDTO<CallEventDTO>> {
    const options: {
      walletId?: string;
      masterWalletId?: string;
      transactionId?: string;
      transactionHash?: string;
      status?: EventStatus;
      updatedAtGte?: Timestamp;
      updatedAtLt?: Timestamp;
      size?: number;
      page?: number;
    } = {};
    if (walletId) options.walletId = walletId;
    if (masterWalletId) options.masterWalletId = masterWalletId;
    if (transactionId) options.transactionId = transactionId;
    if (transactionHash) options.transactionHash = transactionHash;
    if (status) options.status = status;
    if (updatedAtGte) options.updatedAtGte = updatedAtGte;
    if (updatedAtLt) options.updatedAtLt = updatedAtLt;
    if (size) options.size = size;
    if (page) options.page = page;

    const events = await sdk.klay.events.getCallEvents(options);
    return {
      pagination: events.pagination as any,
      results: events.results.map(CallEventDTO.fromETHCallEvent),
    };
  }
}
