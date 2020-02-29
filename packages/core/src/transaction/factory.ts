import {EthereumTransaction} from "./EthereumTransaction";
import {Erc20TransferTransaction} from "./erc20TransferTransaction";
import {CreateUserWalletTransaction} from "./createUserWalletTransaction";

export class EthereumTransactionFactory {
  private ethereumConstructor = new Map<string, EthereumTransaction>();
  public getTransaction(transactionType:string){
    const tx = this.ethereumConstructor.get(transactionType);
    if (tx) {
      return tx;
    } else {
      throw new Error(`unknown transaction type: ${transactionType}`);
    }
  }
  public registerTransaction(transactionType:string, ethereumTransaction:EthereumTransaction):void {
    this.ethereumConstructor.set(transactionType, ethereumTransaction);
  }
}

export const DefaultEthereumTransactionFactory:EthereumTransactionFactory = new EthereumTransactionFactory();

DefaultEthereumTransactionFactory.registerTransaction("eth",new EthereumTransaction());
DefaultEthereumTransactionFactory.registerTransaction("erc20",new Erc20TransferTransaction());
DefaultEthereumTransactionFactory.registerTransaction("createUserWallet",new CreateUserWalletTransaction());