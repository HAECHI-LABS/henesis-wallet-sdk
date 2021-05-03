import { EventDTO } from "./event.dto";
import { EthValueTransferEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";

export class ValueTransferEventDTO extends EventDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  amount: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  decimals: number;

  /**
   * 지갑 ID
   * @example ETH
   */

  coinSymbol: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  from: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  to: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  transferType: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  walletName: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  walletType: string;

  static fromETHValueTransferEvent(
    event: EthValueTransferEvent
  ): ValueTransferEventDTO {
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
      amount: event.amount ? BNConverter.bnToHexString(event.amount) : null,
      decimals: event.decimals,
      coinSymbol: event.coinSymbol,
      from: event.from,
      to: event.to,
      transferType: event.transferType,
      walletName: event.walletName,
      walletType: event.walletType,
    };
  }
}
