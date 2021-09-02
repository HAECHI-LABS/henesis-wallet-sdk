import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { LtcTransactionOutput } from "@haechi-labs/henesis-wallet-core/lib/ltc/wallet";

export const EXAMPLE_TRANSACTION_OUTPUT_DTO: TransactionOutputDto = {
  address: "QS9mDWR42bcNK5CiWe2nU5PAM6vMzdi6fV",
  amount: "1",
  transactionId:
    "beb70cf0b90afb6683ece78e0dfb4a140cf498310b833eea8092b5edd271e9c3",
  outputIndex: 0,
  scriptPubKey: "0xa91400271eec282b0368c3a2948145f7ae034fcd1d0787",
  isChange: false,
};

export class TransactionOutputDto {
  @ApiModelProperty({
    description: "해당 UTXO를 소유한 주소",
    example: EXAMPLE_TRANSACTION_OUTPUT_DTO.address,
  })
  address: string;

  @ApiModelProperty({
    description: "Output에 포함된 암호화폐의 양 (단위: litoshi) (형식: 10진법)",
    example: EXAMPLE_TRANSACTION_OUTPUT_DTO.amount,
  })
  amount: string;

  @ApiModelProperty({
    description: "트랜잭션 ID",
    example: EXAMPLE_TRANSACTION_OUTPUT_DTO.transactionId,
  })
  transactionId: string;

  @ApiModelProperty({
    description:
      "해당 Output이 같은 트랜잭션에 포함된 여러 UTXO 중에 몇 번째 Output인지 나타내는 값",
    example: EXAMPLE_TRANSACTION_OUTPUT_DTO.outputIndex,
  })
  outputIndex: number;

  @ApiModelProperty({
    description: "트랜잭션 검증을 위한 서명키",
    example: EXAMPLE_TRANSACTION_OUTPUT_DTO.scriptPubKey,
  })
  scriptPubKey: string;

  @ApiModelProperty({
    description: "전송 후 잔액을 자신의 지갑으로 다시 보내는 Output인가?",
    example: EXAMPLE_TRANSACTION_OUTPUT_DTO.isChange,
  })
  isChange: boolean;

  static fromTransactionOutput(
    output: LtcTransactionOutput
  ): TransactionOutputDto {
    return {
      address: output.address,
      amount: output.amount
        ? BNConverter.bnToDecimalString(output.amount)
        : null,
      transactionId: output.transactionId,
      outputIndex: output.outputIndex,
      scriptPubKey: output.scriptPubKey,
      isChange: output.isChange,
    };
  }
}
