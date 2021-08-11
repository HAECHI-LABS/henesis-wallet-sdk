import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class ContractCallRequest {
  contractAddress: string;
  value: string;
  data: string;
}

export class TransferRequest {
  ticker: string;
  to: string;
  amount: string;
}

export class SendMasterWalletBatchTransactionsRequestDTO {
  @ApiModelProperty({
    description: "마스터 지갑의 비밀번호",
    example: "passphrase",
  })
  passphrase: string;

  @ApiModelProperty({
    description: "전송할 트랜잭션 요청들",
    example: "ContractCallRequest or TransferRequest",
  })
  requests: ContractCallRequest[] | TransferRequest[];
}
