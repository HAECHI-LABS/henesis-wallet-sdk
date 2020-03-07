import * as crypto from 'crypto';
import {
  bytesToWord, decodeSignature, encodeSignature, toChecksum,
} from './utils';

const elliptic = require('elliptic');
const { keccak256, keccak256s } = require('./vendor/eth-lib/hash');
const Bytes = require('./vendor/eth-lib/bytes');
const sjcl = require('./vendor/sjcl');
const { fromString } = require('./vendor/eth-lib/nat');

const secp256k1 = new (elliptic.ec)("secp256k1"); // eslint-disable-line

const BASE_V_VALUE = 27;

export interface Key {
  address: string;
  pub: string;
  keyFile: string;
}

export interface KeyWithPriv extends Key {
  priv: string;
}

export interface Keychains {
  create(password: string): KeyWithPriv;

  decryptKeyFile(keyFile: string, password: string): string;

  signPayload(payload: string, keyFile: string, password: string): string;

  recoverAddressFromSignature(payload: string, signature: string): string;
}

export class EthereumKeychains implements Keychains {
  public create(password: string): KeyWithPriv {
    const entropy = crypto.randomBytes(512 / 8);

    const innerHex = keccak256(Bytes.concat(Bytes.random(32), entropy || Bytes.random(32)));
    const middleHex = Bytes.concat(Bytes.concat(Bytes.random(32), innerHex), Bytes.random(32));
    const privateKey = keccak256(middleHex);

    const buffer = new Buffer(privateKey.slice(2), 'hex');
    const ecKey = secp256k1.keyFromPrivate(buffer);
    const publicKey = `0x${ecKey.getPublic(false, 'hex').slice(2)}`;
    const publicHash = keccak256(publicKey);
    const address = toChecksum(`0x${publicHash.slice(-40)}`);

    const keyFile = this.encryptPrivToKeyFile(privateKey, password);
    return {
      address,
      pub: publicKey,
      priv: privateKey,
      keyFile,
    };
  }

  public decryptKeyFile(keyFile: string, password: string): string {
    try {
      return sjcl.decrypt(password, keyFile);
    } catch (error) {
      if (error.message.includes('ccm: tag doesn\'t match')) {
        error.message = `password error - ${error.message}`;
      }
      throw error;
    }
  }

  public signPayload(payload: string, keyFile: string, password: string): string {
    const priv = this.decryptKeyFile(keyFile, password);
    const signature = secp256k1
      .keyFromPrivate(new Buffer(priv.slice(2), 'hex'))
      .sign(new Buffer(payload.slice(2), 'hex'), { canonical: true });

    return encodeSignature([
      fromString(Bytes.fromNumber(BASE_V_VALUE + signature.recoveryParam)),
      Bytes.pad(32, Bytes.fromNat(`0x${signature.r.toString(16)}`)),
      Bytes.pad(32, Bytes.fromNat(`0x${signature.s.toString(16)}`))]);
  }

  public recoverAddressFromSignature(payload: string, signature: string) {
    const vals = decodeSignature(signature);
    const vrs = { v: Bytes.toNumber(vals[0]), r: vals[1].slice(2), s: vals[2].slice(2) };
    const ecPublicKey = secp256k1.recoverPubKey(new Buffer(payload.slice(2), 'hex'), vrs, vrs.v < 2 ? vrs.v : 1 - (vrs.v % 2));
    const publicKey = `0x${ecPublicKey.encode('hex', false).slice(2)}`;
    const publicHash = keccak256(publicKey);
    const address = toChecksum(`0x${publicHash.slice(-40)}`);
    return address;
  }

  private encryptPrivToKeyFile(privateKey:string, password:string):string {
    const randomSalt = crypto.randomBytes(8);
    const randomIV = crypto.randomBytes(16);
    const encryptOptions = {
      iter: 10000,
      ks: 256,
      salt: [
        bytesToWord(randomSalt.slice(0, 4)),
        bytesToWord(randomSalt.slice(4)),
      ],
      iv: [
        bytesToWord(randomIV.slice(0, 4)),
        bytesToWord(randomIV.slice(4, 8)),
        bytesToWord(randomIV.slice(8, 12)),
        bytesToWord(randomIV.slice(12, 16)),
      ],
    };
    return sjcl.encrypt(password, privateKey, encryptOptions);
  }
}
