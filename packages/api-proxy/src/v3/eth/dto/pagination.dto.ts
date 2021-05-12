import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ContractCallsDTO, EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO } from './contract-calls.dto';
import { EXAMPLE_ETHEREUM_TRANSFER_DTO, TransferDTO } from './transfer.dto';
import { EXAMPLE_ETHEREUM_TRANSACTION_DTO, TransactionDTO } from './transaction.dto';

export const EXAMPLE_ETHEREUM_PAGINATION_METADATA: PaginationMetadata = {
  nextUrl: "http://localhost:3000/api/v2/eth/value-transfer-events?page=2",
  previousUrl: "http://localhost:3000/api/v2/eth/value-transfer-events?page=1",
  totalCount: 5
}

export const EXAMPLE_ETHEREUM_PAGINATION_CONTRACT_CALLS_DTO: PaginationDTO<ContractCallsDTO> = {
  pagination: EXAMPLE_ETHEREUM_PAGINATION_METADATA,
  results: [EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO]
}

export const EXAMPLE_ETHEREUM_PAGINATION_TRANSFER_DTO: PaginationDTO<TransferDTO> = {
  pagination: EXAMPLE_ETHEREUM_PAGINATION_METADATA,
  results: [EXAMPLE_ETHEREUM_TRANSFER_DTO]
}

export const EXAMPLE_ETHEREUM_PAGINATION_TRANSACTION_DTO: PaginationDTO<TransactionDTO> = {
  pagination: EXAMPLE_ETHEREUM_PAGINATION_METADATA,
  results: [EXAMPLE_ETHEREUM_TRANSACTION_DTO]
}

export class PaginationMetadata {
  @ApiModelProperty({
    description: "다음 pagination url",
    example: EXAMPLE_ETHEREUM_PAGINATION_METADATA.nextUrl
  })
  nextUrl: string;

  @ApiModelProperty({
    description: "이전 pagination url",
    example: EXAMPLE_ETHEREUM_PAGINATION_METADATA.previousUrl
  })
  previousUrl: string;

  @ApiModelProperty({
    description: "총 갯수",
    example: EXAMPLE_ETHEREUM_PAGINATION_METADATA.totalCount
  })
  totalCount: number;
}

export class PaginationDTO<T> {
  results: T[];
  pagination: PaginationMetadata;
}
