import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export const INVALID_ACCESS_TOKEN_EXCEPTION_EXAMPLE: InvalidAccessTokenException = {
  message: "expired or invalid access token and signature",
  code: 4001
}

export const ACCESS_TOKEN_NOT_PROVIDED_EXCEPTION_EXAMPLE: AccessTokenNotProvidedException = {
  message: "access token not provided",
  code: 4001
}

export const INVALID_ACCESS_IP_EXCEPTION_EXAMPLE: InvalidAccessIpException = {
  message: "ip '106.101.128.133' is not allowed",
  code: 4008
}

export class InvalidAccessTokenException {
  @ApiModelProperty({
    example: INVALID_ACCESS_TOKEN_EXCEPTION_EXAMPLE.message
  })
  message: string;

  @ApiModelProperty({
    example: INVALID_ACCESS_TOKEN_EXCEPTION_EXAMPLE.code
  })
  code: number;
}

export class AccessTokenNotProvidedException {
  @ApiModelProperty({
    example: ACCESS_TOKEN_NOT_PROVIDED_EXCEPTION_EXAMPLE.message
  })
  message: string;

  @ApiModelProperty({
    example: ACCESS_TOKEN_NOT_PROVIDED_EXCEPTION_EXAMPLE.code
  })
  code: number;
}

export class InvalidAccessIpException {
  @ApiModelProperty({
    example: INVALID_ACCESS_IP_EXCEPTION_EXAMPLE.message
  })
  message: string;

  @ApiModelProperty({
    example: INVALID_ACCESS_IP_EXCEPTION_EXAMPLE.code
  })
  code: number;
}
