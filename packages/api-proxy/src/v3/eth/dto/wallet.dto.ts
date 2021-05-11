import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";
import { EthWallet } from "@haechi-labs/henesis-wallet-core/lib/eth/wallet";
import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";

export class WalletDTO {
  /**
   * 지갑 ID
   */
  id: string;
  /**
   * 지갑 이름
   * @example test-wallet
   */
  name: string;
  /**
   * 지갑 주소
   * @example 0xdde12e85d7f5d0003eff13f7a3cf6068b5a41454
   */
  address: string;
  /**
   * 메인넷 종류
   * @example ethereum
   */
  blockchain: BlockchainType;
  /**
   * 지갑 생성 시간 (형식: ms, UNIX time)
   * @example 1612411568760
   */
  createdAt: string;
  /**
   * 지갑 정보 수정 시간 (단위: ms, UNIX time)
   * @example 1612411724023
   */
  updatedAt: string;
  /**
   * 지갑 상태
   * @example ACTIVE
   */
  status: WalletStatus;
  /**
   * 출금 주소 화이트리스팅의 활성화 유무
   * @example false
   */
  whitelistActivated: boolean;
  /**
   * 컨트랙트 버전
   * @example v4
   */
  version: string;

  static fromEthWallet(wallet: EthWallet): WalletDTO {
    const walletData = wallet.getData();
    return {
      id: wallet.getId(),
      name: walletData.name,
      address: walletData.address,
      blockchain: walletData.blockchain,
      createdAt: walletData.createdAt,
      updatedAt: walletData.updatedAt,
      status: walletData.status,
      whitelistActivated: walletData.whitelistActivated,
      version: walletData.version,
    } as WalletDTO;
  }
}
