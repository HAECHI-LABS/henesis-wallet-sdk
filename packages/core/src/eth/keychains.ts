import crypto from "crypto";
import elliptic from "elliptic";
import { Key, Keychains, KeyWithPriv } from "../types";
import { keccak256, keccak256s } from "./eth-core-lib/hash";
import Bytes from "./eth-core-lib/bytes";
import sjcl from "./eth-core-lib/sjcl";
import { fromString } from "./eth-core-lib/nat";
import { BlockchainType } from "../blockchain";

const secp256k1 = new elliptic.ec("secp256k1"); // eslint-disable-line
const BASE_V_VALUE = 27;

export const encodeSignature = ([v, r, s]) => Bytes.flatten([r, s, v]);
export const decodeSignature = hex => [
  Bytes.slice(64, Bytes.length(hex), hex),
  Bytes.slice(0, 32, hex),
  Bytes.slice(32, 64, hex),
];

export const toChecksum = address => {
  const addressHash = keccak256s(address.slice(2));
  let checksumAddress = "0x";
  for (let i = 0; i < 40; i++) {
    checksumAddress +=
      parseInt(addressHash[i + 2], 16) > 7
        ? address[i + 2].toUpperCase()
        : address[i + 2];
  }
  return checksumAddress;
};

export const bytesToWord = (bytes?: Uint8Array): number =>
  bytes.reduce((num, byte) => num * 0x100 + byte, 0);

export class EthKeychains implements Keychains {
  private readonly blockchain: BlockchainType;

  constructor(blockchain: BlockchainType) {
    this.blockchain = blockchain;
  }

  public create(password: string): KeyWithPriv {
    const entropy = crypto.randomBytes(512 / 8);

    const innerHex = keccak256(
      Bytes.concat(Bytes.random(32), entropy || Bytes.random(32))
    );
    const middleHex = Bytes.concat(
      Bytes.concat(Bytes.random(32), innerHex),
      Bytes.random(32)
    );
    const privateKey = keccak256(middleHex);

    const buffer = Buffer.from(privateKey.slice(2), "hex");
    const ecKey = secp256k1.keyFromPrivate(buffer);
    const publicKey = `0x${ecKey.getPublic(false, "hex").slice(2)}`;
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

  public changePassword(
    key: Key,
    password: string,
    newPassword: string
  ): KeyWithPriv {
    const priv = this.decrypt(key, password);
    const ecKey = secp256k1.keyFromPrivate(Buffer.from(priv.slice(2), "hex"));
    const publicKey = `0x${ecKey.getPublic(false, "hex").slice(2)}`;
    const publicHash = keccak256(publicKey);
    const address = toChecksum(`0x${publicHash.slice(-40)}`);
    const newKeyFile = this.encryptPrivToKeyFile(priv, newPassword);
    return {
      address,
      pub: publicKey,
      priv,
      keyFile: newKeyFile,
    };
  }

  public decrypt(key: Key, password: string): string {
    try {
      return sjcl.decrypt(password, key.keyFile);
    } catch (error) {
      if (error.message.includes("ccm: tag doesn't match")) {
        error.message = `password error - ${error.message}`;
      } else if (
        error.message === "sjcl.exception.corrupt is not a constructor"
      ) {
        error.message = "password error";
      }
      throw error;
    }
  }

  public sign(
    key: Key,
    password: string,
    hexPayload: string
  ): string {
    const hashedMessage = keccak256(this.payloadToPrefixedMessage(hexPayload));

    const priv = this.decrypt(key, password);
    const signature = secp256k1
      .keyFromPrivate(Buffer.from(priv.slice(2), "hex"))
      .sign(Buffer.from(hashedMessage.slice(2), "hex"), { canonical: true });

    return encodeSignature([
      fromString(Bytes.fromNumber(BASE_V_VALUE + signature.recoveryParam)),
      Bytes.pad(32, Bytes.fromNat(`0x${signature.r.toString(16)}`)),
      Bytes.pad(32, Bytes.fromNat(`0x${signature.s.toString(16)}`)),
    ]);
  }

  public recoverAddressFromSignature(hexPayload: string, signature: string) {
    const vals = decodeSignature(signature);
    const vrs = {
      v: Bytes.toNumber(vals[0]),
      r: vals[1].slice(2),
      s: vals[2].slice(2),
    };
    const ecPublicKey = secp256k1.recoverPubKey(
      Buffer.from(
        keccak256(this.payloadToPrefixedMessage(hexPayload)).slice(2),
        "hex"
      ),
      vrs,
      vrs.v < 2 ? vrs.v : 1 - (vrs.v % 2)
    );
    const publicKey = `0x${ecPublicKey.encode("hex", false).slice(2)}`;
    const publicHash = keccak256(publicKey);
    return toChecksum(`0x${publicHash.slice(-40)}`);
  }

  private encryptPrivToKeyFile(privateKey: string, password: string): string {
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

  private payloadToPrefixedMessage(hexPayload: string): Buffer {
    const hashedPayload = keccak256(hexPayload);
    const payloadBuffer = Buffer.from(hashedPayload.slice(2), "hex");
    const preambleBuffer = Buffer.from(
      `\u0019${this.blockchainPrefix(this.blockchain)} Signed Message:\n${
        payloadBuffer.length
      }`
    );
    return Buffer.concat([preambleBuffer, payloadBuffer]);
  }

  private blockchainPrefix(blockchain: BlockchainType): string {
    const keys = Object.keys(BlockchainType).filter(
      (x) => BlockchainType[x] == blockchain
    );
    return keys.length > 0 ? keys[0] : null;
  }
}
