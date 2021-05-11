import { EthDepositAddress } from "@haechi-labs/henesis-wallet-core/lib/eth/depositAddress";
import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";

export class DepositAddressDTO {
  /**
   * 입금 주소 ID
   * @example a1f9e4c33ea9f51974490fd1c30efb3e
   */
  id: string;
  /**
   * 입금 주소
   * @example 0x70d4e4abbe12c9c5098df3b31d9ad89c99a01967
   */
  address: string;
  /**
   * 입금 주소 이름
   * @example deposit-address-1
   */
  name: string;
  /**
   * 메인넷 종류
   * @example ETHEREUM
   */
  blockchain: BlockchainType;
  /**
   * 지갑 생성 시간 (단위: ms, UNIX time)
   * @example 1614582860091
   */
  createdAt: string;
  /**
   * 지갑 정보 수정 시간 (단위: ms, UNIX time)
   * @example 1614582928222
   */
  updatedAt: string;
  /** 입금 주소 버전
   * @example v4
   */
  version: string;

  static fromEthDepositAddress(address: EthDepositAddress): DepositAddressDTO {
    return {
      id: address.getId(),
      address: address.getAddress(),
      name: address.getData().name,
      blockchain: address.getData().blockchain,
      createdAt: address.getData().createdAt,
      updatedAt: address.getData().updatedAt,
      version: address.getVersion(),
    } as unknown as DepositAddressDTO;
  }
}
