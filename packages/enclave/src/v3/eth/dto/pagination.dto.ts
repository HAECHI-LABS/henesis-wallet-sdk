// import {
//   ApiModelProperty,
//   ApiModelPropertyOptional,
// } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
// import { ApiExtraModels } from "@nestjs/swagger";
//

//
// type Entity = Function;
//
// export class PaginationResponse<Entity> {
//   @ApiModelProperty({ type: Object, isArray: true }) // will be overwritten
//   public results: Entity[];
//
//   @ApiModelPropertyOptional()
//   public pagination: Pagination;
// }
//
// // ref: https://github.com/nestjs/swagger/issues/86
// export function getPaginationDTOFor(type: Entity): typeof PaginationResponse {
//   class PaginationResponseForEntity<Entity> extends PaginationResponse<Entity> {
//     @ApiModelProperty({ type, isArray: true })
//     public results: Entity[];
//   }
//
//   Object.defineProperty(PaginationResponseForEntity, "name", {
//     value: `GetManyResponseFor${type.name}`,
//   });
//
//   return PaginationResponseForEntity;
// }
//
// import { ApiProperty } from "@nestjs/swagger";

export class PaginationMetadata {
  /**
   * 다음 pagination url
   * @example http://localhost:3000/api/v2/eth/value-transfer-events?page=2
   */
  nextUrl: string;
  /**
   * 이전 pagination url
   * @example http://localhost:3000/api/v2/eth/value-transfer-events?page=1
   */
  previousUrl: string;
  /**
   * 총 갯수
   */
  totalCount: number;
}

export class PaginationDTO<T> {
  results: T[];
  pagination: PaginationMetadata;
}
