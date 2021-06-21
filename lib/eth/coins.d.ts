import { Client } from "../httpClient";
import { Coin } from "./coin";
export declare class Coins {
    private readonly client;
    constructor(client: Client);
    getCoin(ticker: string): Promise<Coin>;
    getCoins(flag: boolean): Promise<Coin[]>;
    private resolveCoin;
}
