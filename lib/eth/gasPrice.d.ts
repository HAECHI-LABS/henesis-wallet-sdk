import * as BN from "bn.js";
import { Client } from "../httpClient";
export declare class GasPrice {
    private readonly client;
    private readonly baseUrl;
    constructor(client: Client);
    getGasPrice(): Promise<BN>;
}
