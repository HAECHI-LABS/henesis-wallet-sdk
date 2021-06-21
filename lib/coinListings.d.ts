import { Client } from "./httpClient";
import { CreateCoinListingRequestRequest, CoinListingRequestDTO, CoinContractDTO } from "./__generate__/accounts";
import { BlockchainType } from "./blockchain";
export interface CoinListingRequest extends Omit<CoinListingRequestDTO, "blockchain"> {
    blockchain: BlockchainType;
}
export interface CoinContract extends Omit<CoinContractDTO, "blockchain"> {
    blockchain: BlockchainType;
}
export declare class CoinListings {
    private readonly client;
    private readonly baseUrl;
    constructor(client: Client);
    cancelCoinListingRequest(requestId: string): Promise<void>;
    createCoinListingRequest(request: Omit<CreateCoinListingRequestRequest, "blockchain"> & {
        blockchain: BlockchainType;
    }): Promise<CoinListingRequest>;
    getCoinContract(request: {
        blockchain: BlockchainType;
        address: string;
    }): Promise<CoinContract>;
    getCoinListingRequests(): Promise<CoinListingRequest[]>;
}
