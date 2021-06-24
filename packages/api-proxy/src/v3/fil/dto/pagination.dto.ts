import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {
  DepositAddressDTO,
  EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO,
} from "./deposit-address.dto";
import { EXAMPLE_FILECOIN_TRANSFER_DTO, TransferDTO } from "./transfer.dto";

export const EXAMPLE_FILECOIN_PAGINATION_METADATA: PaginationMetadata = {
  nextUrl: "http://localhost:3000/api/v3/filecoin/transfers?page=2",
  previousUrl: "http://localhost:3000/api/v3/filecion/transfers?page=1",
  totalCount: 5,
};

export const EXAMPLE_FILECOIN_PAGINATION_TRANSFER_DTO: PaginationDTO<TransferDTO> =
  {
    pagination: EXAMPLE_FILECOIN_PAGINATION_METADATA,
    results: [EXAMPLE_FILECOIN_TRANSFER_DTO],
  };

export const EXAMPLE_FILECOIN_PAGINATION_DEPOSIT_ADDRESS_DTO: PaginationDTO<DepositAddressDTO> =
  {
    pagination: EXAMPLE_FILECOIN_PAGINATION_METADATA,
    results: [EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_DTO],
  };

export class PaginationMetadata {
  @ApiModelProperty({
    description: "다음 pagination url",
    example: EXAMPLE_FILECOIN_PAGINATION_METADATA.nextUrl,
  })
  nextUrl: string;

  @ApiModelProperty({
    description: "이전 pagination url",
    example: EXAMPLE_FILECOIN_PAGINATION_METADATA.previousUrl,
  })
  previousUrl: string;

  @ApiModelProperty({
    description: "총 갯수",
    example: EXAMPLE_FILECOIN_PAGINATION_METADATA.totalCount,
  })
  totalCount: number;
}

export class PaginationDTO<T> {
  results: T[];
  pagination: PaginationMetadata;
}
