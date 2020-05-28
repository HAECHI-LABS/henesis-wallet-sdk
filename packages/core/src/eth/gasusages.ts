import BN from 'bn.js';
import { BlockchainType } from '../blockchain';
import { Client } from '../httpClient';
import { BNConverter } from '../utils';
import { SubModule } from './module';

export enum MethodName {
  TRANSFER = 'transfer',
  TRANSFER_ERC20 = 'transferErc20',
  CREATE_MASTER_WALLET = 'createMasterWallet',
}

export interface Method {
  id: string;
  blockchain: BlockchainType;
  name: MethodName;
  estimatedGasConsumption: BN;
}

export class Gasusages extends SubModule {
  private readonly client: Client;

  private readonly baseUrl;

  constructor(client: Client) {
    super();
    this.client = client;
    this.baseUrl = this.getBaseUrl() + '/method-gas-usages';
  }

  public async getMethodGasUsages(methodName: MethodName): Promise<Method> {
    const balance = await this.client.get(
      `${this.baseUrl}/?name=${methodName}`,
    );
    balance.estimatedGasConsumption = BNConverter.hexStringToBN(
      balance.estimatedGasConsumption,
    );
    return balance;
  }
}
