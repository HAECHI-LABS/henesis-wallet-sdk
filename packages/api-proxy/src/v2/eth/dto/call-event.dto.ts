import { EventDTO } from "./event.dto";
import { EthCallEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";

export class CallEventDTO extends EventDTO {
  /**
   * 호출한 스마트 컨트랙트 주소
   * @example 0x4c49f0ead605aca868364769c9a4ef24930810b5
   */

  fromAddress: string;

  /**
   * 호출한 스마트 컨트랙트 주소
   * @example 0xe3d9325576bf491c2f35e92b020b7b990557f545
   */

  toAddress: string;

  /**
   * data
   * @example 0x6eea436c
   */

  data: string;

  static fromETHCallEvent(event: EthCallEvent): CallEventDTO {
    return {
      id: event.id,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      status: event.status,
      transactionHash: event.transactionHash,
      walletId: event.walletId,
      transactionId: event.transactionId,
      orgId: event.orgId,
      masterWalletId: event.masterWalletId,
      confirmation: event.confirmation
        ? BNConverter.bnToHexString(event.confirmation)
        : null,
      fromAddress: event.fromAddress,
      toAddress: event.toAddress,
      data: event.data,
    };
  }
}
