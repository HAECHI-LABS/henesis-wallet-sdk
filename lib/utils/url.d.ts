import { Env } from "../sdk";
import { BlockchainType } from "../blockchain";
export declare const baseUrls: Map<Env, string>;
export declare const removePrefixApi: (url: string) => string;
export declare const makePrefixPathByBlockchainType: (blockchain?: BlockchainType) => string;
export declare const makeQueryString: (options?: object) => string;
