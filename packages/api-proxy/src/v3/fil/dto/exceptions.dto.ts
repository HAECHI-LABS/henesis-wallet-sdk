import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_INVALID_ACCESS_TOKEN_EXCEPTION_DTO: InvalidAccessTokenException =
  {
    message: "expired or invalid access token and signature",
    code: 4001,
  };

export const EXAMPLE_INVALID_STATUS_EXCEPTION_DTO: InvalidStatusException = {
  message: "'status' is invalid: not supported event status",
  code: 4001,
};

export const EXAMPLE_INVALID_ACCESS_IP_EXCEPTION_DTO: InvalidAccessIpException =
  {
    message: "ip '106.101.128.133' is not allowed",
    code: 4008,
  };

export const EXAMPLE_ACCESS_TOKEN_NOT_PROVIDED_EXCEPTION_DTO: AccessTokenNotProvidedException =
  {
    message: "access token not provided",
    code: 4001,
  };

export const EXAMPLE_TRANSACTION_ID_NOT_FOUND_EXCEPTION_DTO: TransactionIdNotFoundException =
  {
    message:
      "transaction id 'c3a43bbf3d33e94fdc1adfc2d17a63b3' does not exists",
    code: 4000,
  };

export const EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO: WalletNotFoundException = {
  message: "wallet 'c27732256a1f8d45df5aec31ba7ef85cd' does not exist",
  code: 4000,
};

export const EXAMPLE_NO_WALLET_NAME_EXCEPTION_DTO: NoWalletNameException = {
  message: "wallet name should not be empty",
  code: 4000,
};

export const EXAMPLE_DEPOSIT_ADDRESS_NOT_FOUND_EXCEPTION_DTO: DepositAddressNotFoundException =
  {
    message:
      "deposit address 'c27732256a1f8d45df5aec31ba7ef85cd' does not exist",
    code: 4000,
  };

export class InvalidAccessTokenException {
  @ApiModelProperty({
    description: "API 에러 메시지",
    example: EXAMPLE_INVALID_ACCESS_TOKEN_EXCEPTION_DTO.message,
  })
  message: string;

  @ApiModelProperty({
    description: "헤네시스 API 에러 코드",
    example: EXAMPLE_INVALID_ACCESS_TOKEN_EXCEPTION_DTO.code,
  })
  code: number;
}

export class InvalidStatusException {
  @ApiModelProperty({
    description: "API 에러 메시지",
    example: EXAMPLE_INVALID_STATUS_EXCEPTION_DTO.message,
  })
  message: string;

  @ApiModelProperty({
    description: "헤네시스 API 에러 코드",
    example: EXAMPLE_INVALID_STATUS_EXCEPTION_DTO.code,
  })
  code: number;
}

export class InvalidAccessIpException {
  @ApiModelProperty({
    description: "API 에러 메시지",
    example: EXAMPLE_INVALID_ACCESS_IP_EXCEPTION_DTO.message,
  })
  message: string;

  @ApiModelProperty({
    description: "헤네시스 API 에러 코드",
    example: EXAMPLE_INVALID_ACCESS_IP_EXCEPTION_DTO.code,
  })
  code: number;
}

export class AccessTokenNotProvidedException {
  @ApiModelProperty({
    description: "API 에러 메시지",
    example: EXAMPLE_ACCESS_TOKEN_NOT_PROVIDED_EXCEPTION_DTO.message,
  })
  message: string;

  @ApiModelProperty({
    description: "헤네시스 API 에러 코드",
    example: EXAMPLE_ACCESS_TOKEN_NOT_PROVIDED_EXCEPTION_DTO.code,
  })
  code: number;
}

export class TransactionIdNotFoundException {
  @ApiModelProperty({
    description: "API 에러 메시지",
    example: EXAMPLE_TRANSACTION_ID_NOT_FOUND_EXCEPTION_DTO.message,
  })
  message: string;

  @ApiModelProperty({
    description: "헤네시스 API 에러 코드",
    example: EXAMPLE_TRANSACTION_ID_NOT_FOUND_EXCEPTION_DTO.code,
  })
  code: number;
}

export class WalletNotFoundException {
  @ApiModelProperty({
    description: "API 에러 메시지",
    example: EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO.message,
  })
  message: string;

  @ApiModelProperty({
    description: "헤네시스 API 에러 코드",
    example: EXAMPLE_WALLET_NOT_FOUND_EXCEPTION_DTO.code,
  })
  code: number;
}

export class NoWalletNameException {
  @ApiModelProperty({
    description: "API 에러 메시지",
    example: EXAMPLE_NO_WALLET_NAME_EXCEPTION_DTO.message,
  })
  message: string;

  @ApiModelProperty({
    description: "헤네시스 API 에러 코드",
    example: EXAMPLE_NO_WALLET_NAME_EXCEPTION_DTO.code,
  })
  code: number;
}

export class DepositAddressNotFoundException {
  @ApiModelProperty({
    description: "API 에러 메시지",
    example: EXAMPLE_DEPOSIT_ADDRESS_NOT_FOUND_EXCEPTION_DTO.message,
  })
  message: string;

  @ApiModelProperty({
    description: "헤네시스 API 에러 코드",
    example: EXAMPLE_DEPOSIT_ADDRESS_NOT_FOUND_EXCEPTION_DTO.code,
  })
  code: number;
}
