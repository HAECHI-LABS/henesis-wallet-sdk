export class NoCoinException {
  /**
   * @example "there is no '2' coin at 'ETHEREUM'"
   */
  message: string;
  /**
   * @example 4000
   */
  code: number;
}
export class InvalidAccessTokenException {
  /**
   * @example "expired or invalid access token and signature"
   */
  message: string;
  /**
   * @example 4001
   */
  code: number;
}

export class InvalidStatusException {
  /**
   * @example "'status' is invalid: not supported event status"
   */
  message: string;
  /**
   * @example 4001
   */
  code: number;
}

export class InvalidAccessIpException {
  /**
   * @example "ip '106.101.128.133' is not allowed"
   */
  message: string;
  /**
   * @example 4008
   */
  code: number;
}

export class AccessTokenNotProvidedException {
  /**
   * @example "access token not provided"
   */
  message: string;
  /**
   * @example 4001
   */
  code: number;
}

export class TransactionIdNotFoundException {
  /**
   * @example "transaction id '1' does not exists"
   */
  message: string;
  /**
   * @example 4000
   */
  code: number;
}

export class WalletNotFoundException {
  /**
   * @example "wallet 'c27732256a1f8d45df5aec31ba7ef85cd' does not exist"
   */
  message: string;
  /**
   * @example 4000
   */
  code: number;
}

export class NoWalletNameException {
  /**
   * @example "wallet name should not be empty"
   */
  message: string;
  /**
   * @example 4000
   */
  code: number;
}

export class DepositAddressNotFoundException {
  /**
   * @example "deposit address 'c27732256a1f8d45df5aec31ba7ef85cd' does not exist"
   */
  message: string;
  /**
   * @example 4000
   */
  code: number;
}
