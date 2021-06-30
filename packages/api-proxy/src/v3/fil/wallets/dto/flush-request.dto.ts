import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_FLUSH_REQUEST_DTO: FlushRequestDTO = {
  targets: [
    "493ef9d5a4e86b9e7af657a56c8e3844",
    "a52dea92424426e3ed2b6a32af76c7af",
  ],
  passphrase: "passphrase",
  gasPremium: "199659",
};

export class FlushRequestDTO {
  @ApiModelProperty({
    description:
      "집금할 입금 주소의 ID (집금 요청당 최대 50개의 입금 주소를 집금할 수 있습니다.)",
    example: EXAMPLE_FILECOIN_FLUSH_REQUEST_DTO.targets,
  })
  targets: string[];

  @ApiModelProperty({
    description: "지갑의 비밀번호",
    example: EXAMPLE_FILECOIN_FLUSH_REQUEST_DTO.passphrase,
  })
  passphrase: string;

  @ApiModelProperty({
    description:
      "트랜잭션에 사용할 gas premium (단위: attoFIL) null일 경우, Henesis가 자동으로 0블럭 안에 채굴될 수 있는 값으로 설정합니다.",
    example: EXAMPLE_FILECOIN_FLUSH_REQUEST_DTO.gasPremium,
  })
  gasPremium: string;
}
