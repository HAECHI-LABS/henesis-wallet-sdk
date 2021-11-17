import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_TRANSACTION_DTO: TransactionDTO = {
  id: "c3a43bbf3d33e94fdc1adfc2d17a63b3",
  hash: "bafy2bzaced4hk2ufk3xwcmxuiuikudoh6dcxgjfoforubsbn7tu5rfyc3446e",
  feeAmount: "314076729208",
};

export class TransactionDTO {
  @ApiModelProperty({
    description: "Henesis에서 부여한 트랜잭션의 ID",
    example: EXAMPLE_FILECOIN_TRANSACTION_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "트랜잭션 해시",
    example: EXAMPLE_FILECOIN_TRANSACTION_DTO.hash,
  })
  hash: string;

  @ApiModelProperty({
    description: "수수료 양 (단위: attoFIL)",
    example: EXAMPLE_FILECOIN_TRANSACTION_DTO.feeAmount,
  })
  feeAmount?: string;
}
