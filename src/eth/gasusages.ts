import BN from 'bn.js';
import { BlockchainType } from '../blockchain';
import { Client } from '../sdk';
import { BNConverter } from '../utils';

export enum MethodName {
  TRANSFER = 'transfer',
  TRANSFER_ERC20 = 'transferErc20',
  CREATE_MASTER_WALLET = 'createMasterWallet'
}

export interface Method {
  id: string;
  blockchain: BlockchainType,
  name: MethodName,
  estimatedGasConsumption: BN
}

export class Gasusages {
  private readonly client: Client;

  private readonly baseUrl = '/method-gas-usages';

  constructor(client: Client) {
    this.client = client;
  }

  public async getMethodGasUsages(blockchain: BlockchainType, methodName: MethodName): Promise<Method> {
    const balance = await this.client.get(`${this.baseUrl}/?blockchain=${blockchain}&name=${methodName}`);
    balance.estimatedGasConsumption = BNConverter.hexStringToBN(balance.estimatedGasConsumption);
    return balance;
  }
}
