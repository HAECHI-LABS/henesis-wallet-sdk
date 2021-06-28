import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_TRANSFER_REQUEST_DTO: TransferRequestDTO = {
  to: "t1rxcckgd5rye7thpngyvykpfokfh7dwk3oggnx3a",
  amount: "1304000000000000000",
  passphrase: "passphrase",
  gasPremium: "199659",
};

export class TransferRequestDTO {
  @ApiModelProperty({
    description: "암호화폐를 받을 지갑 주소",
    example: EXAMPLE_FILECOIN_TRANSFER_REQUEST_DTO.to,
  })
  to: string;

  @ApiModelProperty({
    description: "암호화폐의 양 (단위: attoFIL)",
    example: EXAMPLE_FILECOIN_TRANSFER_REQUEST_DTO.amount,
  })
  amount: string;

  @ApiModelProperty({
    description: "지갑의 비밀번호",
    example: EXAMPLE_FILECOIN_TRANSFER_REQUEST_DTO.passphrase,
  })
  passphrase: string;

  @ApiModelProperty({
    description:
      "트랜잭션에 사용할 gas premium (단위: attoFIL) null일 경우, Henesis가 자동으로 0블럭 안에 채굴될 수 있는 값으로 설정합니다.",
    example: EXAMPLE_FILECOIN_TRANSFER_REQUEST_DTO.gasPremium,
  })
  gasPremium: string;
}
