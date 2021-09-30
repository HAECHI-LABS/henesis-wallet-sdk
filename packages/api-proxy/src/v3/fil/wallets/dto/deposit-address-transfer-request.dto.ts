import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_TRANSFER_REQUEST_DTO: DepositAddressTransferRequestDTO =
  {
    to: "t1rxcckgd5rye7thpngyvykpfokfh7dwk3oggnx3a",
    amount: "1304000000000000000",
    passphrase: "passphrase",
    metadata: "metadata",
  };

export class DepositAddressTransferRequestDTO {
  @ApiModelProperty({
    description: "암호화폐를 받을 지갑 주소",
    example: EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_TRANSFER_REQUEST_DTO.to,
  })
  to: string;

  @ApiModelProperty({
    description: "암호화폐의 양 (단위: attoFIL)",
    example: EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_TRANSFER_REQUEST_DTO.amount,
  })
  amount: string;

  @ApiModelProperty({
    description: "지갑의 비밀번호",
    example: EXAMPLE_FILECOIN_DEPOSIT_ADDRESS_TRANSFER_REQUEST_DTO.passphrase,
  })
  passphrase: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: "metadata",
  })
  metadata?: string;
}
