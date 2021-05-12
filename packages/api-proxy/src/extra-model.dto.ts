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
