import { Client } from "./httpClient";
import {
  CreateCoinListingRequestRequest,
  CoinListingRequestDTO,
  CoinContractDTO,
} from "./__generate__/accounts";
import { BlockchainType, transformBlockchainType } from "./blockchain";
import { makeQueryString } from "./utils/url";

export interface CoinListingRequest
  extends Omit<CoinListingRequestDTO, "blockchain"> {
  blockchain: BlockchainType;
}

export interface CoinContract extends Omit<CoinContractDTO, "blockchain"> {
  blockchain: BlockchainType;
}

export class CoinListings {
  private readonly client: Client;

  private readonly baseUrl = "/organizations";

  constructor(client: Client) {
    this.client = client;
  }

  async cancelCoinListingRequest(requestId: string) {
    await this.client.post<void>(
      `${this.baseUrl}/coin-listing-requests/${requestId}/cancel`
    );
  }

  async createCoinListingRequest(
    request: Omit<CreateCoinListingRequestRequest, "blockchain"> & {
      blockchain: BlockchainType;
    }
  ): Promise<CoinListingRequest> {
    const response = await this.client.post<CoinListingRequestDTO>(
      `${this.baseUrl}/coin-listing-requests`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  async getCoinContract(request: {
    blockchain: BlockchainType;
    address: string;
  }): Promise<CoinContract> {
    const queryString = makeQueryString(request);
    const response = await this.client.get<CoinContractDTO>(
      `${this.baseUrl}/coin-contract${queryString ? `?${queryString}` : ""}`
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  async getCoinListingRequests(): Promise<CoinListingRequest[]> {
    const response = await this.client.get<CoinListingRequestDTO[]>(
      `${this.baseUrl}/coin-listing-requests`
    );
    return response.map((item) => {
      return {
        ...item,
        blockchain: transformBlockchainType(item.blockchain),
      };
    });
  }
}
