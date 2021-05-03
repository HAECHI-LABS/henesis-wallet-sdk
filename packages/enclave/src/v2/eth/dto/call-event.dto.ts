import { EventDTO } from "./event.dto";
import { EthCallEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";

export class CallEventDTO extends EventDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  fromAddress: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  toAddress: string;

  /**
   * 지갑 ID
   * @example ETH
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
