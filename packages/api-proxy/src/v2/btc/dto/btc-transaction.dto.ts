import {
  BtcTransactionOutputDTO,
  EXAMPLE_BITCOIN_BTC_TRANSACTION_OUTPUT_DTO,
} from "./btc-transaction-output.dto";
import { BtcTransaction } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO: BtcTransactionDTO = {
  id: "beb70cf0b90afb6683ece78e0dfb4a140cf498310b833eea8092b5edd271e9c3",
  transactionHash:
    "beb70cf0b90afb6683ece78e0dfb4a140cf498310b833eea8092b5edd271e9c3",
  blockNumber: "0x1d85f3",
  amount: "0x2ee",
  feeAmount: "0x2ee",
  createdAt: "1620042742913",
  updatedAt: "1620042742915",
  hex:
    "0x01000000010ef55b0654efc9f632a73e0d545e185914f81eefddcd161d1340f94b5bb6c91e01000000fdfe0000483045022100c6b5167d4d66bf4f712830b31795df3ffc34074a672906069b6e5299c61e12f90220364bb6b5b4ab5ff528aef2d82b08a7cbb582d1b6f135200800afbad08807d65101483045022100f73667aca7a6434e6c86e6d1970ccefe6e052554c45b6df64b86c48bd9428006022024d98a75217ad115985d961def56ab36e8d23dafe487c47ff39b445094574f54014c695221039c12b1681bc9506b4304a5d7f3933e55c0b55e3a90e47a0b94a6d209afb6173021039c3e34050a735c790a0d8ce39c52165dd11af50ee252a6b83dceaddd02b33b9d21039c882ac166fcb0056145105e18982b7c3b9dc5b54e1ac430f65e7c998ccfdb7d53aeffffffff02010000000000000017a91400271eec282b0368c3a2948145f7ae034fcd1d0787c54319000000000017a9147cfdc2bc58a9cad8b1cae530ce784f828c03a9ca8700000000",
  outputs: [EXAMPLE_BITCOIN_BTC_TRANSACTION_OUTPUT_DTO],
};

export class BtcTransactionDTO {
  @ApiModelProperty({
    description:
      "트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인 트랜잭션 해시와 다른 개념입니다.)",
    example: EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "온체인 트랜잭션 해시",
    example: EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO.transactionHash,
  })
  transactionHash: string;

  @ApiModelProperty({
    description:
      "트랜잭션이 담긴 블록 번호 (형식: 16진법) (트랜잭션 상태가 PENDING일 때는 존재하지 않습니다.)",
    example: EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO.blockNumber,
  })
  blockNumber?: string;

  @ApiModelProperty({
    description: "전송할 암호화폐의 양 (단위: satoshi) (형식: 16진법)",
    example: EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO.amount,
  })
  amount: string;

  @ApiModelProperty({
    description: "수수료 금액",
    example: EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO.feeAmount,
  })
  feeAmount?: string;

  @ApiModelProperty({
    description: "트랜잭션이 생성된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "트랜잭션 상태가 마지막으로 변경된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelProperty({
    description: "블록체인에 전파된 트랜잭션 Body의 raw data",
    example: EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO.hex,
  })
  hex: string;

  @ApiModelProperty({
    description: "트랜잭션을 통해 생성된 UTXO의 Output",
    example: EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO.outputs,
  })
  outputs: BtcTransactionOutputDTO[];

  static fromBTCTransaction(transaction: BtcTransaction): BtcTransactionDTO {
    return {
      id: transaction.id,
      transactionHash: transaction.transactionHash,
      blockNumber: transaction.blockNumber
        ? BNConverter.bnToHexString(transaction.blockNumber)
        : null,
      feeAmount: transaction.feeAmount
        ? BNConverter.bnToHexString(transaction.feeAmount)
        : null,
      amount: transaction.amount
        ? BNConverter.bnToHexString(transaction.amount)
        : null,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      hex: transaction.hex,
      outputs: transaction.outputs.map(
        BtcTransactionOutputDTO.fromBTCTransactionOutput
      ),
    };
  }
}
