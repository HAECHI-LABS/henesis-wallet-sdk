import {WalletInformation} from "../wallets";

export interface Transaction {

}

export interface MultiSignaturePayload {

}

export interface PayloadAndSignature {
  signature: string;
  payload: MultiSignaturePayload;
}

export interface IWallet {
  transfer(
      ticker: string,
      to: string,
      value: number,
      passphrase: string
  ): Transaction
  getAddress():string;
  createUserWallet(
      name,
      passphrase
  ):Promise<WalletInformation>;
}

export interface IEthereumWallet extends IWallet {
  contractCall(
      contractAddress: string,
      value: number,
      data: string,
      passphrase: string
  ): Transaction;


  getWalletSequenceId();
}