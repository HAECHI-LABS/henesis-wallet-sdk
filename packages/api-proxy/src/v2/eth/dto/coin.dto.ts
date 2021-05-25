import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETH_KLAY_COIN_DTO: CoinDTO = {
  id: 576,
  name: "Ampleforth",
  symbol: "AMPL",
  address: "0x35b1dc534959fa547047a3dcdf1eb1eebd704561",
  desc: "AMPL",
  blockchain: "ETHEREUM",
  decimals: 9,
  attributes: ["ERC20_STANDARD", "ERC20_REBASE"],
};

export class CoinDTO {
  @ApiModelProperty({
    description: "암호화폐 ID",
    example: EXAMPLE_ETH_KLAY_COIN_DTO.id,
  })
  id: number;

  @ApiModelProperty({
    description: "암호화폐 이름",
    example: EXAMPLE_ETH_KLAY_COIN_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "암호화폐의 기호 (symbol)",
    example: EXAMPLE_ETH_KLAY_COIN_DTO.symbol,
  })
  symbol: string;

  @ApiModelProperty({
    description: "암호화폐 주소",
    example: EXAMPLE_ETH_KLAY_COIN_DTO.address,
  })
  address: string;

  @ApiModelPropertyOptional({
    description: "암호화폐 설명",
    example: EXAMPLE_ETH_KLAY_COIN_DTO.desc,
  })
  desc?: string;

  @ApiModelProperty({
    description: "암호화폐가 발행된 블록체인 플랫폼",
    example: EXAMPLE_ETH_KLAY_COIN_DTO.blockchain,
  })
  blockchain: string;

  @ApiModelProperty({
    description: "암호화폐의 소수점 자릿수",
    example: EXAMPLE_ETH_KLAY_COIN_DTO.decimals,
  })
  decimals: number;

  @ApiModelProperty({
    description: "암호화폐의 메타 데이터",
    example: EXAMPLE_ETH_KLAY_COIN_DTO.attributes,
  })
  attributes: string[];
}
