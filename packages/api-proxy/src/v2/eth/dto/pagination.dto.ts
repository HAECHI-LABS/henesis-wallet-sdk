import {
  EXAMPLE_ETH_KLAY_VALUE_TRANSFER_EVENT_DTO,
  ValueTransferEventDTO,
} from "./value-transfer-event.dto";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {
  CallEventDTO,
  EXAMPLE_ETH_KLAY_CALL_EVENT_DTO,
} from "./call-event.dto";
import {
  EXAMPLE_ETH_KLAY_TRANSACTION_DTO,
  TransactionDTO,
} from "./transaction.dto";
import {
  EXAMPLE_ETH_KLAY_USER_WALLET_DTO,
  UserWalletDTO,
} from "./user-wallet.dto";

export const EXAMPLE_ETH_KLAY_PAGINATION_METADATA_DTO: PaginationMetadata = {
  nextUrl: "http://localhost:3000/api/v2/eth/transfers?page=2",
  previousUrl: "http://localhost:3000/api/v2/eth/transfers?page=1",
  totalCount: 5,
};

export const EXAMPLE_ETH_KLAY_PAGINATION_VALUE_TRANSFER_EVENT_DTO: PaginationDTO<ValueTransferEventDTO> =
  {
    pagination: EXAMPLE_ETH_KLAY_PAGINATION_METADATA_DTO,
    results: [EXAMPLE_ETH_KLAY_VALUE_TRANSFER_EVENT_DTO],
  };

export const EXAMPLE_ETH_KLAY_PAGINATION_CALL_EVENT_DTO: PaginationDTO<CallEventDTO> =
  {
    pagination: EXAMPLE_ETH_KLAY_PAGINATION_METADATA_DTO,
    results: [EXAMPLE_ETH_KLAY_CALL_EVENT_DTO],
  };

export const EXAMPLE_ETH_KLAY_PAGINATION_TRNASCATION_DTO: PaginationDTO<TransactionDTO> =
  {
    pagination: EXAMPLE_ETH_KLAY_PAGINATION_METADATA_DTO,
    results: [EXAMPLE_ETH_KLAY_TRANSACTION_DTO],
  };

export const EXAMPLE_ETH_KLAY_PAGINATION_USER_WALLET_DTO: PaginationDTO<UserWalletDTO> =
  {
    pagination: EXAMPLE_ETH_KLAY_PAGINATION_METADATA_DTO,
    results: [EXAMPLE_ETH_KLAY_USER_WALLET_DTO],
  };

export class PaginationMetadata {
  @ApiModelProperty({
    description: "다음 pagination url",
    example: EXAMPLE_ETH_KLAY_PAGINATION_METADATA_DTO.nextUrl,
  })
  nextUrl: string;

  @ApiModelProperty({
    description: "이전 pagination url",
    example: EXAMPLE_ETH_KLAY_PAGINATION_METADATA_DTO.previousUrl,
  })
  previousUrl: string;

  @ApiModelProperty({
    description: "총 갯수",
    example: EXAMPLE_ETH_KLAY_PAGINATION_METADATA_DTO.totalCount,
  })
  totalCount: number;
}

export class PaginationDTO<T> {
  results: T[];
  pagination: PaginationMetadata;
}
