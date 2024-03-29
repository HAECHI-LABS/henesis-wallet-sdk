import { Coin } from "@haechi-labs/henesis-wallet-core";
import { CoinDTOAttributesEnum } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import { Blockchain } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETHEREUM_COIN_DTO: CoinDTO = {
  id: 11,
  name: "ethereum",
  ticker: "ETH",
  address: "0xdd00383e5a51166bba3e96d84c14a36d72e6c128",
  description: "이더리움",
  decimals: 18,
  blockchain: Blockchain.ETHEREUM,
  attributes: [CoinDTOAttributesEnum.STANDARD],
};

export const EXAMPLE_BINANCE_SMART_CHAIN_COIN_DTO: CoinDTO = {
  id: 11,
  name: "BinanceCoin",
  ticker: "BNB",
  address: "0xdd00383e5a51166bba3e96d84c14a36d72e6c128",
  description: "바이낸스 코인",
  decimals: 18,
  blockchain: Blockchain.BINANCESMARTCHAIN,
  attributes: [CoinDTOAttributesEnum.STANDARD],
};

export class CoinDTO {
  @ApiModelProperty({
    description: "Henesis에서 부여한 Coin의 ID",
    example: EXAMPLE_ETHEREUM_COIN_DTO.id,
  })
  id: number;

  @ApiModelProperty({
    description: "코인 이름",
    example: EXAMPLE_ETHEREUM_COIN_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "코인의 기호",
    example: EXAMPLE_ETHEREUM_COIN_DTO.ticker,
  })
  ticker: string;

  @ApiModelProperty({
    description: "코인 컨트랙트 주소",
    example: EXAMPLE_ETHEREUM_COIN_DTO.address,
  })
  address: string;

  @ApiModelProperty({
    description: "코인 설명",
    example: EXAMPLE_ETHEREUM_COIN_DTO.description,
  })
  description: string;

  @ApiModelProperty({
    description: "코인의 소수점 자릿수",
    example: EXAMPLE_ETHEREUM_COIN_DTO.decimals,
  })
  decimals: number;

  @ApiModelProperty({
    description: "코인이 발행된 메인넷",
    example: EXAMPLE_ETHEREUM_COIN_DTO.blockchain,
    enum: Object.values(Blockchain),
  })
  blockchain: Blockchain;

  @ApiModelProperty({
    description: "코인의 메타 데이터",
    example: EXAMPLE_ETHEREUM_COIN_DTO.attributes,
    enum: Object.values(CoinDTOAttributesEnum),
    isArray: true,
  })
  attributes: CoinDTOAttributesEnum[];

  static fromCoin(coin: Coin): CoinDTO {
    const coinData = coin.getCoinData();
    return {
      id: coinData.id,
      name: coinData.name,
      ticker: coinData.symbol,
      address: coinData.address,
      description: coinData.desc,
      decimals: coinData.decimals,
      blockchain: coinData.blockchain,
      attributes: coinData.attributes,
    };
  }
}
