import { AxiosResponse } from "axios";
import { BlockchainType } from "./blockchain";
import { Env } from "./sdk";
export interface ClientOptions {
    accessToken: string;
    secret: string;
    url: string;
    env: Env;
}
export interface Client {
    get<T = any>(url: string): Promise<T>;
    delete<T = any>(url: string, config?: any): Promise<T>;
    options<T = any>(url: string): Promise<T>;
    post<T = any>(url: string, data?: any): Promise<T>;
    put<T = any>(url: string, data?: any): Promise<T>;
    patch<T = any>(url: string, data?: any): Promise<T>;
}
export declare class HttpClient {
    private readonly baseUrl;
    private readonly client;
    private readonly apiClient;
    private readonly accessToken;
    private readonly secret;
    private readonly env;
    constructor(options: ClientOptions);
    private makeSDKClient;
    private makeApiClient;
    private makeClient;
    createSig(message: string): string;
}
export declare const enhancedBlockchainClient: (client: Client, blockchain: BlockchainType) => Client;
export declare const makeAPILogging: (source?: AxiosResponse) => {
    request: {
        url: string;
        method: import("axios").Method;
        data: any;
        headers: any;
        params: any;
    };
    response: {
        body: any;
        status: number;
        headers: any;
    };
};
