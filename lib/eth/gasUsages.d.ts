import BN from "bn.js";
import { BlockchainType } from "../blockchain";
import { Client } from "../httpClient";
export declare enum MethodName {
    TRANSFER = "transfer",
    TRANSFER_ERC20 = "transferErc20",
    CREATE_MASTER_WALLET = "createMasterWallet"
}
export interface Method {
    id: string;
    blockchain: BlockchainType;
    name: MethodName;
    estimatedGasConsumption: BN;
}
export declare class GasUsages {
    private readonly client;
    private readonly baseUrl;
    constructor(client: Client);
    getMethodGasUsages(methodName: MethodName): Promise<Method>;
}
