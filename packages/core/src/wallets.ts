import { Client } from './sdk';
import { Wallet, WalletInformation } from './wallet';
import { Key, Keychain, KeyWithPriv } from './keychain';
import { GlobalWalletFactory } from './factory';

export class Wallets {
  private readonly client: Client;

  private readonly keychian: Keychain;

  private baseUrl = '/wallets';

  constructor(client: Client, keychain:Keychain) {
    this.client = client;
    this.keychian = keychain;
  }

  public async createMasterWallet(
    name: string,
    blockchain: string,
    password:string,
    gasPrice?: number,
  ): Promise<Wallet> {
    // 서버에서 튕길수 있는 상황
    // 1. name 중복
    // 2. 잘못된 블록채인 -> cli 에서 거르자
    // 3. gas fee 부족
    // 4. 인증 관련된 문제
    // TODO: 1. 서버 error 확정 2. error handle logic 구현!
    const accountKeyWithPriv:KeyWithPriv = this.keychian.create(password);
    const backupKeyWithPriv:KeyWithPriv = this.keychian.create(password);
    const accountKey:Key = this.fromPrivKeyToKey(accountKeyWithPriv);
    const backupKey:Key = this.fromPrivKeyToKey(backupKeyWithPriv);

    const masterWalletInformation:WalletInformation = await this.client.post<WalletInformation>(`${this.baseUrl}`, {
      name,
      blockchain,
      accountKey,
      backupKey,
    });
    const masterWallet:Wallet = GlobalWalletFactory.get(blockchain)(this.client, masterWalletInformation);
    this.makeBackupPDF(masterWallet, accountKeyWithPriv, backupKeyWithPriv);
    return masterWallet;
  }

  public async getMasterWallet(walletId:string):Promise<Wallet> {
    // 서버에서 튕길 수 있는 상황
    // 1. walletId미존재
    // TODO
    const masterWalletInformation:WalletInformation = await this.client.get<WalletInformation>(
      `${this.baseUrl}/${walletId}`,
    );
    return GlobalWalletFactory
      .get(masterWalletInformation.blockchain)(this.client, masterWalletInformation);
  }

  public async getAllMasterWallets(): Promise<Wallet[]> {
    // 서버에서 튕길 수 있는 상황
    // 1. walletId미존재
    // TODO
    const masterWalletInformations:WalletInformation[] = await this.client.get<WalletInformation[]>(
      `${this.baseUrl}`,
    );
    return masterWalletInformations.map((masterWalletInformation:WalletInformation) => GlobalWalletFactory.get(masterWalletInformation.blockchain)(this.client, masterWalletInformation));
  }

  private fromPrivKeyToKey(keyWithPriv:KeyWithPriv):Key {
    return {
      address: keyWithPriv.address,
      pub: keyWithPriv.pub,
    } as Key;
  }

  private makeBackupPDF(wallet:Wallet, accountKey:KeyWithPriv, backupKey:KeyWithPriv) {
    // TODO
    return null;
  }
}
