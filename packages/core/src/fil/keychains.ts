import { Key, Keychains, KeyWithPriv } from "../types";
import { BlockchainType } from "../blockchain";

// TODO: implement me
export class FilKeychains implements Keychains {
  private readonly blockchain: BlockchainType;

  constructor(blockchain: BlockchainType) {
    this.blockchain = blockchain;
  }

  changePassword(key: Key, password: string, newPassword: string): KeyWithPriv {
    return undefined;
  }

  create(password: string): KeyWithPriv {
    return undefined;
  }

  decrypt(key: Key, password: string): string {
    return "";
  }

  sign(key: Key, password: string, hexPayload: string): string {
    return "";
  }
}
