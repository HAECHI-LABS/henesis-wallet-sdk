import { EXAMPLE_TRANSFER_DTO, TransferDTO } from "./transfer.dto";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {
  DepositAddressDTO,
  EXAMPLE_DEPOSIT_ADDRESS_DTO,
} from "./deposit-address.dto";

export const EXAMPLE_PAGINATION_METADATA_DTO: PaginationMetadata = {
  nextUrl: "http://localhost:3000/api/v3/ltc/transfers?page=2",
  previousUrl: "http://localhost:3000/api/v3/ltc/transfers?page=1",
  totalCount: 5,
};

export const EXAMPLE_PAGINATION_DEPOSIT_ADDRESS_DTO: PaginationDTO<DepositAddressDTO> =
  {
    pagination: EXAMPLE_PAGINATION_METADATA_DTO,
    results: [EXAMPLE_DEPOSIT_ADDRESS_DTO],
  };

export const EXAMPLE_PAGINATION_TRANSFER_DTO: PaginationDTO<TransferDTO> = {
  pagination: EXAMPLE_PAGINATION_METADATA_DTO,
  results: [EXAMPLE_TRANSFER_DTO],
};

export class PaginationMetadata {
  @ApiModelProperty({
    description: "다음 pagination url",
    example: EXAMPLE_PAGINATION_METADATA_DTO.nextUrl,
  })
  nextUrl: string;

  @ApiModelProperty({
    description: "이전 pagination url",
    example: EXAMPLE_PAGINATION_METADATA_DTO.previousUrl,
  })
  previousUrl: string;

  @ApiModelProperty({
    description: "총 갯수",
    example: EXAMPLE_PAGINATION_METADATA_DTO.totalCount,
  })
  totalCount: number;
}

export class PaginationDTO<T> {
  results: T[];
  pagination: PaginationMetadata;
}
