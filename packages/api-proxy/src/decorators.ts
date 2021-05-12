import { applyDecorators } from "@nestjs/common";
import {
  ApiExtraModels,
  ApiHeaders,
  ApiOkResponse,
  ApiParam,
  ApiParamOptions,
  ApiQuery,
  ApiQueryOptions,
  ApiUnauthorizedResponse,
  getSchemaPath
} from '@nestjs/swagger';
import { PaginationMetadata } from "./v3/eth/dto/pagination.dto";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

import { AUTHORIZATION, X_HENESIS_SECRET } from "./headers";
import {
  ACCESS_TOKEN_NOT_PROVIDED_EXCEPTION_EXAMPLE,
  AccessTokenNotProvidedException, INVALID_ACCESS_IP_EXCEPTION_EXAMPLE, INVALID_ACCESS_TOKEN_EXCEPTION_EXAMPLE,
  InvalidAccessIpException,
  InvalidAccessTokenException
} from './extra-model.dto';
import { getTypeReferenceAsString } from '@nestjs/swagger/dist/plugin/utils/plugin-utils';
import { ContentObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function PathParams(...paramsOptions: ApiParamOptions[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    return paramsOptions.reduce(
      (acc, cur) => ApiParam(cur)(acc, propertyKey, descriptor),
      target
    );
  };
}

export function Queries(...queriesOptions: ApiQueryOptions[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    return queriesOptions.reduce(
      (acc, cur) => ApiQuery(cur)(acc, propertyKey, descriptor),
      target
    );
  };
}

export function AuthHeaders() {
  return applyDecorators(ApiHeaders([X_HENESIS_SECRET, AUTHORIZATION]));
}

export function AuthErrorResponses() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: "아래와 같은 인증 에러가 발생할 수 있습니다.",
      content: {
        "application/json": {
          schema: {
            allOf: [
              { $ref: getSchemaPath(InvalidAccessTokenException) },
              { $ref: getSchemaPath(AccessTokenNotProvidedException) },
              { $ref: getSchemaPath(InvalidAccessIpException) }
            ]
          },
          examples: {
            "invalidAccessToken": {
              value: INVALID_ACCESS_TOKEN_EXCEPTION_EXAMPLE
            },
            "accessTokenNotProvided": {
              value: ACCESS_TOKEN_NOT_PROVIDED_EXCEPTION_EXAMPLE
            },
            "invalidAccessIp": {
              value: INVALID_ACCESS_IP_EXCEPTION_EXAMPLE
            }
          }
        }
      }
    })
  );
}

type Entity = Function;

export class PaginationResponse<Entity> {
  // will be overwritten at function ApiPaginationResponse
  @ApiModelProperty({ type: Object, isArray: true })
  public results: Entity[];

  @ApiModelPropertyOptional()
  public pagination: PaginationMetadata;
}

// ref: https://github.com/nestjs/swagger/issues/86
export function ApiPaginationResponse(type: Entity, example: any) {
  class PaginationResponseForEntity<Entity> extends PaginationResponse<Entity> {
    @ApiModelProperty({ type, isArray: true })
    public results: Entity[];
  }

  Object.defineProperty(PaginationResponseForEntity, "name", {
    value: `GetManyResponseFor${type.name}`,
  });

  return applyDecorators(ApiOkResponse({
    content: ApiResponseContentGenerator(PaginationResponseForEntity, example)
  }));
}

export function ApiResponseContentGenerator(model: string | Function, example: any): ContentObject {
  return {
    "application/json": {
      schema: {
        $ref: getSchemaPath(model)
      },
      example: example
    }
  }
}