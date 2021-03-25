import { ApiProperty } from "@nestjs/swagger";
export enum Blockchain {
  ETHEREUM = "ETHEREUM",
  KLAYTN = "KLAYTN",
  BITCOIN = "BITCOIN",
}
export class CoinDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ticker: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  decimals: number;

  @ApiProperty({ name: "blockchain", enum: Blockchain })
  blockchain: Blockchain;
}
