import { Client } from './sdk';
import { BlockchainType } from './blockchain';
import {
  Coin, CoinData, Erc20, Eth, Klay,
} from './coin';

export class Coins {
	private readonly client: Client;

	constructor(client: Client) {
	  this.client = client;
	}

	public async getCoin(ticker: string, blockchain: BlockchainType): Promise<Coin> {
	  const coinData = await this.client.get(`/coins/${ticker.toUpperCase()}?blockchain=${blockchain}`);
	  return this.resolveCoin(coinData);
	}

	public async getCoins(): Promise<Coin[]> {
	  const coinData: CoinData[] = await this.client.get<CoinData[]>('/coins');
	  return coinData.map((coinDatum) => this.resolveCoin(coinDatum));
	}

	private resolveCoin(coinData: CoinData): Coin {
	  switch (coinData.symbol.toUpperCase()) {
	    case 'ETH':
	      return new Eth(coinData);
	      break;
	    case 'KLAY':
	      return new Klay(coinData);
	      break;
	    default:
	      return new Erc20(coinData);
	  }
	}
}
