import { Key, KeyWithPriv } from "../types";
import { ECPair } from "bitcoinjs-lib";
import { networks } from "bitcoinjs-lib";
import bip38 from "bip38";

export interface BTCKeychains {
  create(password: string): KeyWithPriv;

  sign(key: Key, passphrase: string, payload: Buffer): Buffer
}

export class DefaultBTCKeyChains implements BTCKeychains {
  create(passphrase: string): KeyWithPriv {
    const ecPair = ECPair.makeRandom({
      network: networks.testnet,
      compressed: true
    });

    return {
      keyFile: bip38.encrypt(ecPair.privateKey, ecPair.compressed, passphrase),
      priv: `0x${ecPair.privateKey.toString("hex")}`,
      pub: `0x${ecPair.publicKey.toString("hex")}`
    };
  }

  sign(key: Key, passphrase: string, payload: Buffer): Buffer {
    const decryptedKey = bip38.decrypt(key.keyFile, passphrase);
    const ecPair = ECPair.fromPrivateKey(decryptedKey.privateKey, {
      compressed: decryptedKey.compressed,
      network: networks.testnet
    });
    return ecPair.sign(payload);
  }
}