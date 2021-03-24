import { Get, Path, Route, Request, Example } from "tsoa";
import express from "express";
import AbstractController from "../../controller";
import { CoinData } from "@haechi-labs/henesis-wallet-core";
import { CoinDTO } from "../../types";

@Route("/api/v2/eth/coins")
export class CoinsController extends AbstractController {
  @Get("{coinTicker}")
  @Example<CoinDTO>({
    id: 2,
    name: "Ethereum",
    ticker: "ETH",
    address: null,
    description: "",
    blockchain: "ETHEREUM",
    decimals: 18,
    attributes: [],
  })
  public async getCoin(
    @Path() coinTicker: string,
    @Request() request: express.Request
  ): Promise<CoinDTO> {
    return this.fromCoinDataToCoinDTO(
      (
        await request.sdk.eth.coins.getCoin(coinTicker.toUpperCase())
      ).getCoinData()
    );
  }

  @Get("/")
  @Example<CoinDTO[]>([
    {
      id: 2,
      name: "Ethereum",
      ticker: "ETH",
      address: null,
      description: "",
      blockchain: "ETHEREUM",
      decimals: 18,
      attributes: [],
    },
  ])
  public async getCoins(
    @Request() request: express.Request
  ): Promise<CoinDTO[]> {
    return (await request.sdk.eth.coins.getCoins(false)).map((coin) =>
      this.fromCoinDataToCoinDTO(coin.getCoinData())
    );
  }

  private fromCoinDataToCoinDTO(coinData: CoinData): CoinDTO {
    return {
      id: coinData.id,
      name: coinData.name,
      ticker: coinData.symbol,
      address: coinData.address,
      description: coinData.desc,
      blockchain: coinData.blockchain,
      decimals: coinData.decimals,
      attributes: coinData.attributes,
    };
  }
}
