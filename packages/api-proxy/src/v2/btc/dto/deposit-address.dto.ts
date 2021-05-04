import { DepositAddress } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";

export class DepositAddressDTO {
  /**
   * 입금 주소 ID
   * @example 94fd6a94ed199d660acf55e2f2943a7c
   */
  id: string;

  /**
   * 입금 주소 이름
   * @example bit
   */
  name: string;

  /**
   * 입금 주소
   * @example 2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm
   */
  address: string;

  /**
   * 입금 주소 공개키
   * @example 0x022bf2a47ce5027831a3587ecd9f2d0d1e590a227ea576f61598ee84405e0479c1
   */
  pub: string;

  /**
   * 입금 주소 생성 시간 (단위: ms, UNIX time)
   * @example 1620041696849
   */
  createdAt: string;

  static fromDepositAddress(depositAddress: DepositAddress): DepositAddressDTO {
    return depositAddress as DepositAddressDTO;
  }
}
