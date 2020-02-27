import {IWallet} from "./interfaces/Iwallet";
import {Client} from "./sdk";
import {generateKey} from "./key/generator";
import {KeyFile} from "./key/interfaces";
import {Keychains} from "./keychains";
import {GlobalWalletFactory} from "./wallet/walletFactory";

export interface WalletInformation {
  id: string;
  name: string;
  walletType: string;
  address: string;
  blockchain: string;
  createdAt: string;
  backupKey: KeyFile;
  accountKey: KeyFile;
}

export type createMasterWalletFunction = (name: string, blockchain: string) => Promise<IWallet>;
export type createUserWalletFunction = (name: string, blockchain: string, masterWalletId: string, passphrase: string) => Promise<IWallet>;
export type getWalletByIdFunction = (walletId: string) => Promise<IWallet>;

export class Wallets {
  private readonly client: Client;
  private keychains: Keychains;
  private baseUrl = "/wallets";

  constructor(client: Client) {
    this.client = client;
    this.keychains = new Keychains(this.client);
  }

  // public masterWallet() {
  //   return {
  //     find: this.getMasterWalletById as getWalletByIdFunction,
  //     create: this.createMasterWallet as createMasterWalletFunction
  //   }
  // }
  //
  // public userWallet() {
  //   return {
  //     find: this.getUserWalletById as getWalletByIdFunction,
  //     create: this.createUserWallet as createUserWalletFunction
  //   }
  // }

  public async createMasterWallet(name: string, blockchain: string): Promise<IWallet> {
    const payload: any = {name, blockchain};
    try {
      payload["accountKey"] = generateKey(blockchain);
      payload["backupKey"] = generateKey(blockchain);
    } catch (e) {
      //TODO error handle
    }
    //TODO validete return value
    const walletInformation = await this.client.post<WalletInformation>(`${this.baseUrl}/`, payload);
    return this.generateWalletInstanceByWalletInfo(walletInformation);
  }

  public async createUserWallet(name: string, blockchain: string, masterWalletId: string, passphrase: string): Promise<IWallet> {
    const masterWallet:IWallet = await this.getMasterWalletById(masterWalletId);
    const walletInformation:WalletInformation = await masterWallet.createUserWallet(name, passphrase);
    return this.generateWalletInstanceByWalletInfo(walletInformation);
  }

  public async getMasterWalletById(walletId: string): Promise<IWallet> {
    const walletInformation: WalletInformation = await this.client.get<WalletInformation>(`${this.baseUrl}/${walletId}`);
    return this.generateWalletInstanceByWalletInfo(walletInformation);
  }

  public async getUserWalletById(masterWalletId: string, userWalletId: string): Promise<IWallet> {
    const walletInformation: WalletInformation = await this.client.get<WalletInformation>(`${this.baseUrl}/${masterWalletId}/user-wallets/${userWalletId}`);
    return this.generateWalletInstanceByWalletInfo(walletInformation);
  }

  public generateWalletInstanceByWalletInfo(walletInformation:WalletInformation):IWallet {
    return GlobalWalletFactory.getWallet(walletInformation.blockchain)(
        this.client,
        this.keychains,
        walletInformation
    );
  }
}
