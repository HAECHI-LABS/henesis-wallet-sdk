import { KeyDTO } from "./key.dto";
import {
  BtcActivatingMasterWallet,
  BtcMasterWallet,
} from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";
import { InactiveMasterWallet } from "@haechi-labs/henesis-wallet-core/lib/wallet";

export class WalletDTO {
  /**
   * 지갑 ID
   * @example cce4f485764767f256155390873668b3
   */
  id: string;

  /**
   * 지갑 이름
   * @example bit
   */
  name: string;

  /**
   * 지갑 주소
   * @example 2Mx6o4HZfPyV1QrYNv26jCGMwAPpDnVzq1z
   */
  address?: string;

  /**
   * 지갑 비밀번호를 복구하기 위해, 암호화하는 데에 쓰인 키
   * @example b72355635b2f5db7d603a73ad37d2460e28d93ad12df6da85fff4b18fe374ae3
   */
  encryptionKey?: string;

  /**
   * 지갑 생성 시간
   * @example 1599116098462
   */
  createdAt: string;

  /**
   * 지갑 변경 시간
   * @example 1599116105566
   */
  updatedAt: string;

  /**
   * 지갑 상태
   * @example INACTIVE, CREATING, ACTIVE
   */
  status: string;

  /**
   * 지갑이 속한 팀(Org)의 ID
   * @example 575a431dc73615a9e65648180bbd4fbb
   */
  orgId?: string;

  /**
   * 지갑을 서명할 때 쓰이는 Account Key 정보
   * @example Key
   */
  accountKey?: KeyDTO;

  /**
   * 출금 주소 화이트리스팅의 활성화 유무
   * @example false
   */
  whitelistActivated: boolean;

  static fromBTCMasterWallet(wallet: BtcMasterWallet): WalletDTO {
    return wallet.getData();
  }

  static fromInactiveMasterWallet(wallet: InactiveMasterWallet): WalletDTO {
    return {
      id: wallet.id,
      name: wallet.name,
      address: null,
      encryptionKey: null,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
      status: wallet.status,
      orgId: null,
      accountKey: null,
      whitelistActivated: false,
    };
  }

  static fromBTCActivatingMasterWallet(
    wallet: BtcActivatingMasterWallet
  ): WalletDTO {
    return {
      id: wallet.id,
      name: wallet.name,
      address: wallet.address,
      encryptionKey: null,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
      status: wallet.status,
      orgId: null,
      accountKey: null,
      whitelistActivated: false,
    };
  }
}
