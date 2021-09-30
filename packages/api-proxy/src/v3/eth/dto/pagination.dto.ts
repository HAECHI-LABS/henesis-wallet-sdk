import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {
  ContractCallsDTO,
  EXAMPLE_BINANCE_SMART_CHAIN_CALLS_DTO,
  EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO,
} from "./contract-calls.dto";
import {
  EXAMPLE_BINANCE_SMART_CHAIN_TRANSFER_DTO,
  EXAMPLE_ETHEREUM_TRANSFER_DTO,
  TransferDTO,
} from "./transfer.dto";
import {
  EXAMPLE_BINANCE_SMART_CHAIN_TRANSACTION_DTO,
  EXAMPLE_ETHEREUM_TRANSACTION_DTO,
  TransactionDTO,
} from "./transaction.dto";
import {
  DepositAddressDTO,
  EXAMPLE_BINANCE_SMART_CHAIN_DEPOSIT_ADDRESS_DTO,
  EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO,
} from "./deposit-address.dto";
import {
  EXAMPLE_ETHEREUM_NFT_BALANCE_DTO,
  NftBalanceDTO,
} from "./nft-balance.dto";
import {
  EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO,
  NftTransferDTO,
} from "./nft-transfer.dto";

export const EXAMPLE_ETHEREUM_PAGINATION_METADATA: PaginationMetadata = {
  nextUrl: "http://localhost:3000/api/v3/ethereum/transfers?page=2",
  previousUrl: "http://localhost:3000/api/v3/ethereum/transfers?page=1",
  totalCount: 5,
};

export const EXAMPLE_BINANCE_SMART_CHAIN_PAGINATION_METADATA: PaginationMetadata =
  {
    nextUrl:
      "http://localhost:3000/api/v3/binance-smart-chain/value-transfer-events?page=2",
    previousUrl:
      "http://localhost:3000/api/v3/binance-smart-chain/value-transfer-events?page=1",
    totalCount: 5,
  };

export const EXAMPLE_ETHEREUM_PAGINATION_CONTRACT_CALLS_DTO: PaginationDTO<ContractCallsDTO> =
  {
    pagination: EXAMPLE_ETHEREUM_PAGINATION_METADATA,
    results: [EXAMPLE_ETHEREUM_CONTRACT_CALLS_DTO],
  };

export const EXAMPLE_ETHEREUM_PAGINATION_NFT_BALANCE_DTO: PaginationDTO<NftBalanceDTO> =
  {
    pagination: EXAMPLE_ETHEREUM_PAGINATION_METADATA,
    results: [EXAMPLE_ETHEREUM_NFT_BALANCE_DTO],
  };

export const EXAMPLE_ETHEREUM_PAGINATION_DEPOSIT_ADDRESS_DTO: PaginationDTO<DepositAddressDTO> =
  {
    pagination: EXAMPLE_ETHEREUM_PAGINATION_METADATA,
    results: [EXAMPLE_ETHEREUM_DEPOSIT_ADDRESS_DTO],
  };

export const EXAMPLE_BINANCE_SMART_CHAIN_PAGINATION_CONTRACT_CALLS_DTO: PaginationDTO<ContractCallsDTO> =
  {
    pagination: EXAMPLE_BINANCE_SMART_CHAIN_PAGINATION_METADATA,
    results: [EXAMPLE_BINANCE_SMART_CHAIN_CALLS_DTO],
  };

export const EXAMPLE_ETHEREUM_PAGINATION_TRANSFER_DTO: PaginationDTO<TransferDTO> =
  {
    pagination: EXAMPLE_ETHEREUM_PAGINATION_METADATA,
    results: [EXAMPLE_ETHEREUM_TRANSFER_DTO],
  };

export const EXAMPLE_ETHEREUM_PAGINATION_NFT_TRANSFER_DTO: PaginationDTO<NftTransferDTO> =
  {
    pagination: EXAMPLE_ETHEREUM_PAGINATION_METADATA,
    results: [EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO],
  };

export const EXAMPLE_BINANCE_SMART_CHAIN_PAGINATION_TRANSFER_DTO: PaginationDTO<TransferDTO> =
  {
    pagination: EXAMPLE_BINANCE_SMART_CHAIN_PAGINATION_METADATA,
    results: [EXAMPLE_BINANCE_SMART_CHAIN_TRANSFER_DTO],
  };

export const EXAMPLE_ETHEREUM_PAGINATION_TRANSACTION_DTO: PaginationDTO<TransactionDTO> =
  {
    pagination: EXAMPLE_ETHEREUM_PAGINATION_METADATA,
    results: [EXAMPLE_ETHEREUM_TRANSACTION_DTO],
  };

export const EXAMPLE_BINANCE_SMART_CHAIN_PAGINATION_TRANSACTION_DTO: PaginationDTO<TransactionDTO> =
  {
    pagination: EXAMPLE_BINANCE_SMART_CHAIN_PAGINATION_METADATA,
    results: [EXAMPLE_BINANCE_SMART_CHAIN_TRANSACTION_DTO],
  };

export class PaginationMetadata {
  @ApiModelProperty({
    description: "다음 pagination url",
    example: EXAMPLE_ETHEREUM_PAGINATION_METADATA.nextUrl,
  })
  nextUrl: string;

  @ApiModelProperty({
    description: "이전 pagination url",
    example: EXAMPLE_ETHEREUM_PAGINATION_METADATA.previousUrl,
  })
  previousUrl: string;

  @ApiModelProperty({
    description: "총 갯수",
    example: EXAMPLE_ETHEREUM_PAGINATION_METADATA.totalCount,
  })
  totalCount: number;
}

export class PaginationDTO<T> {
  results: T[];
  pagination: PaginationMetadata;
}
