import { applyDecorators, HttpStatus } from "@nestjs/common";
import {
  ApiHeaders,
  ApiOkResponse,
  ApiParam,
  ApiParamOptions,
  ApiQuery,
  ApiQueryOptions,
  ApiResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
  refs,
} from "@nestjs/swagger";
import { PaginationMetadata } from "./v3/eth/dto/pagination.dto";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {
  AccessTokenNotProvidedException,
  InvalidAccessIpException,
  InvalidAccessTokenException,
} from "./v3/eth/dto/exceptions.dto";
import { AUTHORIZATION, X_HENESIS_SECRET } from "./headers";

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
      schema: {
        oneOf: [
          { $ref: getSchemaPath(InvalidAccessTokenException) },
          { $ref: getSchemaPath(AccessTokenNotProvidedException) },
          { $ref: getSchemaPath(InvalidAccessIpException) },
        ],
      },
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
export function ApiPaginationResponse(type: Entity) {
  class PaginationResponseForEntity<Entity> extends PaginationResponse<Entity> {
    @ApiModelProperty({ type, isArray: true })
    public results: Entity[];
  }

  Object.defineProperty(PaginationResponseForEntity, "name", {
    value: `GetManyResponseFor${type.name}`,
  });

  return applyDecorators(ApiOkResponse({ type: PaginationResponseForEntity }));
}
