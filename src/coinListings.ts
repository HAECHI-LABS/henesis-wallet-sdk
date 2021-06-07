import { Client } from "./httpClient";
import {
  CreateCoinListingRequestRequest,
  CoinListingRequestDTO,
  RejectCoinListingRequestRequest,
  CoinContractDTO,
} from "./__generate__/accounts";
import { BlockchainType, transformBlockchainType } from "./blockchain";

interface CoinListingRequest extends Omit<CoinListingRequestDTO, "blockchain"> {
  blockchain: BlockchainType;
}

interface CoinContract extends Omit<CoinContractDTO, "blockchain"> {
  blockchain: BlockchainType;
}

export class CoinListings {
  private readonly client: Client;

  private readonly baseUrl = "/organizations";
  private readonly operationBaseUrl = "/operation/organizations";

  constructor(client: Client) {
    this.client = client;
  }

  async approveCoinListingRequest(request: {
    organizationId: string;
    requestId: string;
  }) {
    const { organizationId, requestId } = request;
    await this.client.post<void>(
      `${this.operationBaseUrl}/${organizationId}/coin-listing-requests/${requestId}/approve`
    );
  }

  async rejectCoinListingRequest(
    request: RejectCoinListingRequestRequest & {
      organizationId: string;
      requestId: string;
    }
  ) {
    const { organizationId, requestId, ...rest } = request;
    await this.client.post<void>(
      `${this.operationBaseUrl}/${organizationId}/coin-listing-requests/${requestId}/reject`,
      rest
    );
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
    const response = await this.client.get<CoinContractDTO>(
      `${this.baseUrl}/coin-contract`
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
