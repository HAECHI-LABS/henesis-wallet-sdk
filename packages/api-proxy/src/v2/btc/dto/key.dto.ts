import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_BITCOIN_KEY_DTO: KeyDTO = {
  address: "undefined",
  pub: "0x030b5dm1690572a06c07181cfp29a30dfa057ea66c16e06313nd66404299b22041",
  keyFile: `{\\"iv\\":\\"fk4p/phK72zMXOf7NzHr8g==\\",\\"v\\":1,\\"iter\\":10000,\\"ks\\":256,\\"ts\\":64,\\"mode\\":\\"ccm\\",\\"adata\\":\\"\\",\\"cipher\\":\\"aes\\",\\"salt\\":\\"31kCiaHPr1P=\\",\\"ct\\":\\"B2x5ckUjDMs+oU+jF5C8BkT3DHAfIw9gFEETSBI3U1+8xkUC6KQSh132Q2SZewhkYezSh3A8kKir36hDttFCy58o9GDHR+SO\\"}`,
};

export const EXAMPLE_LITECOIN_KEY_DTO: KeyDTO = EXAMPLE_BITCOIN_KEY_DTO;

export class KeyDTO {
  @ApiModelPropertyOptional({
    description: "Key의 주소 (BTC 지갑은 값이 없습니다)",
    example: EXAMPLE_BITCOIN_KEY_DTO.address,
  })
  address?: string;

  @ApiModelProperty({
    description: "Key의 Pub Key 정보",
    example: EXAMPLE_BITCOIN_KEY_DTO.pub,
  })
  pub: string;

  @ApiModelPropertyOptional({
    description: "Key의 Private Key를 암호화한 값",
    example: EXAMPLE_BITCOIN_KEY_DTO.keyFile,
  })
  keyFile?: string;
}
