import { ApiImplicitQuery } from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";
import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, ApiResponse } from "@nestjs/swagger";
import { PaginationMetadata } from "./v3/eth/dto/pagination.dto";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export function OptionalQueries(...queries) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    let result = target;
    for (let i = 0; i < queries.length; i++) {
      const dec = ApiImplicitQuery({ name: queries[i], required: false });
      result = dec(result, propertyKey, descriptor);
    }
    return result;
  };
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
