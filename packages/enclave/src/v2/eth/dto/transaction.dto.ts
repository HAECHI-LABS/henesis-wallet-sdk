import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import * as BN from "bn.js";
import {
  RawTransaction,
  SignedMultiSigPayload,
  TransactionStatus,
} from "@haechi-labs/henesis-wallet-core";

export class TransactionDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  id: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  blockchain: BlockchainType;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  sender: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  keyId: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  hash: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  error: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  signedMultiSigPayload: SignedMultiSigPayload;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  rawTransaction: RawTransaction;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  status: TransactionStatus;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  isFeeDelegated: boolean;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  fee?: BN;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  estimatedFee?: BN;
}
