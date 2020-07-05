import BN from "bn.js";
import { BlockchainType } from "../blockchain";
import { Client } from "../httpClient";
import { BNConverter } from "../utils/common";
import { MethodGasUsageDTO } from "../__generate__/eth";

export enum MethodName {
  TRANSFER = "transfer",
  TRANSFER_ERC20 = "transferErc20",
  CREATE_MASTER_WALLET = "createMasterWallet",
}

export interface Method {
  id: string;
  blockchain: BlockchainType;
  name: MethodName;
  estimatedGasConsumption: BN;
}

export class Gasusages {
  private readonly client: Client;

  private readonly baseUrl;

  constructor(client: Client) {
    this.client = client;
    this.baseUrl = "/method-gas-usages";
  }

  public async getMethodGasUsages(methodName: MethodName): Promise<Method> {
    const balance = await this.client.get<NoUndefinedField<MethodGasUsageDTO>>(
      `${this.baseUrl}?name=${methodName}`
    );
    return {
      id: balance.id,
      name: balance.name as MethodName,
      blockchain: balance.blockchain,
      estimatedGasConsumption: BNConverter.hexStringToBN(
        String(balance.estimatedGasConsumption)
      ),
    };
  }
}
