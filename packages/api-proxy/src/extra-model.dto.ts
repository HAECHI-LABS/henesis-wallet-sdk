import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_INVALID_ACCESS_TOKEN_EXCEPTION: InvalidAccessTokenException =
  {
    message: "expired or invalid access token and signature",
    code: 4001,
  };

export const EXAMPLE_ACCESS_TOKEN_NOT_PROVIDED_EXCEPTION: AccessTokenNotProvidedException =
  {
    message: "access token not provided",
    code: 4001,
  };

export const EXAMPLE_INVALID_ACCESS_IP_EXCEPTION: InvalidAccessIpException = {
  message: "ip '106.101.128.133' is not allowed",
  code: 4008,
};

export class InvalidAccessTokenException {
  @ApiModelProperty({
    description: "API 에러 메시지",
    example: EXAMPLE_INVALID_ACCESS_TOKEN_EXCEPTION.message,
  })
  message: string;

  @ApiModelProperty({
    description: "헤네시스 API 에러 코드",
    example: EXAMPLE_INVALID_ACCESS_TOKEN_EXCEPTION.code,
  })
  code: number;
}

export class AccessTokenNotProvidedException {
  @ApiModelProperty({
    description: "API 에러 메시지",
    example: EXAMPLE_ACCESS_TOKEN_NOT_PROVIDED_EXCEPTION.message,
  })
  message: string;

  @ApiModelProperty({
    description: "헤네시스 API 에러 코드",
    example: EXAMPLE_ACCESS_TOKEN_NOT_PROVIDED_EXCEPTION.code,
  })
  code: number;
}

export class InvalidAccessIpException {
  @ApiModelProperty({
    description: "API 에러 메시지",
    example: EXAMPLE_INVALID_ACCESS_IP_EXCEPTION.message,
  })
  message: string;

  @ApiModelProperty({
    description: "헤네시스 API 에러 코드",
    example: EXAMPLE_INVALID_ACCESS_IP_EXCEPTION.code,
  })
  code: number;
}
