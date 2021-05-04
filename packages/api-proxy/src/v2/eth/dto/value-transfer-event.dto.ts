import { EventDTO } from "./event.dto";
import { EthValueTransferEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";

export class ValueTransferEventDTO extends EventDTO {
  /**
   * 암호화폐의 양
   * @example 0x2386f26fc10000
   */

  amount: string;

  /**
   * 암호화폐의 소수점 자릿수
   * @example 18
   */

  decimals: number;

  /**
   * 암호화폐의 기호 (symbol)
   * @example ETH
   */

  coinSymbol: string;

  /**
   * 출금 주소
   * @example 0xd5fcc938ad42a56f1c60e7bd41f646ad844b2273
   */

  from: string;

  /**
   * 입금 주소
   * @example 0xb659b6db08cdb7c24bd35b72222807c2567086f3
   */

  to: string;

  /**
   * 입출금 타입
   * @example WITHDRAWAL
   */

  transferType: string;

  /**
   * 해당 내역의 지갑 이름
   * @example bit
   */

  walletName: string;

  /**
   * 해당 내역의 지갑 종류
   * @example MASTER_WALLET
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
