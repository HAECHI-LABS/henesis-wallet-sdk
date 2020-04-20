import crypto from 'crypto';
import {
  bytesToWord, decodeSignature, encodeSignature, toChecksum,
} from './utils';
import { BlockchainType } from './blockchain';
import { Key, KeyWithPriv } from './types';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import SVGtoPDF from 'svg-to-pdfkit';
import { logo } from './resources/logo';
const elliptic = require('elliptic');
const { keccak256 } = require('./vendor/eth-lib/hash');
const Bytes = require('./vendor/eth-lib/bytes');
const sjcl = require('./vendor/sjcl');
const { fromString } = require('./vendor/eth-lib/nat');

const secp256k1 = new (elliptic.ec)("secp256k1"); // eslint-disable-line

const BASE_V_VALUE = 27;


export interface Keychains {
  create(password: string): KeyWithPriv;

  changePassword(keyFile: string, password: string, newPassword: string): KeyWithPriv;

  decryptKeyFile(keyFile: string, password: string): string;

  signPayload(blockchain: BlockchainType, hexPayload: string, keyFile: string, password: string): string;

  recoverAddressFromSignature(blockchain: BlockchainType, hexPayload: string, signature: string): string;
}

export class EthereumKeychains implements Keychains {
  public create(password: string): KeyWithPriv {
    const entropy = crypto.randomBytes(512 / 8);

    const innerHex = keccak256(Bytes.concat(Bytes.random(32), entropy || Bytes.random(32)));
    const middleHex = Bytes.concat(Bytes.concat(Bytes.random(32), innerHex), Bytes.random(32));
    const privateKey = keccak256(middleHex);

    const buffer = Buffer.from(privateKey.slice(2), 'hex');
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

  public changePassword(keyFile: string, password: string, newPassword: string): KeyWithPriv {
    const priv = this.decryptKeyFile(keyFile, password);
    const ecKey = secp256k1.keyFromPrivate(Buffer.from(priv.slice(2), 'hex'));
    const publicKey = `0x${ecKey.getPublic(false, 'hex').slice(2)}`;
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

  public signPayload(blockchain: BlockchainType, hexPayload: string, keyFile: string, password: string): string {
    const hashedMessage = keccak256(this.payloadToPrefixedMessage(blockchain, hexPayload));

    const priv = this.decryptKeyFile(keyFile, password);
    const signature = secp256k1
      .keyFromPrivate(Buffer.from(priv.slice(2), 'hex'))
      .sign(
        Buffer.from(hashedMessage.slice(2), 'hex'),
        { canonical: true },
      );

    return encodeSignature([
      fromString(Bytes.fromNumber(BASE_V_VALUE + signature.recoveryParam)),
      Bytes.pad(32, Bytes.fromNat(`0x${signature.r.toString(16)}`)),
      Bytes.pad(32, Bytes.fromNat(`0x${signature.s.toString(16)}`)),
    ]);
  }

  public recoverAddressFromSignature(blockchain: BlockchainType, hexPayload: string, signature: string) {
    const vals = decodeSignature(signature);
    const vrs = {
      v: Bytes.toNumber(vals[0]),
      r: vals[1].slice(2),
      s: vals[2].slice(2),
    };
    const ecPublicKey = secp256k1.recoverPubKey(
      Buffer.from(keccak256(this.payloadToPrefixedMessage(blockchain, hexPayload)).slice(2), 'hex'),
      vrs,
      vrs.v < 2 ? vrs.v : 1 - (vrs.v % 2),
    );
    const publicKey = `0x${ecPublicKey.encode('hex', false).slice(2)}`;
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

  private payloadToPrefixedMessage(blockchain: BlockchainType, hexPayload: string): Buffer {
    const hashedPayload = keccak256(hexPayload);
    const payloadBuffer = Buffer.from(hashedPayload.slice(2), 'hex');
    const preambleBuffer = Buffer.from(`\u0019${this.blockchainPrefix(blockchain)} Signed Message:\n${payloadBuffer.length}`);
    return Buffer.concat([preambleBuffer, payloadBuffer]);
  }

  private blockchainPrefix(blockchain: BlockchainType): string {
    const keys = Object.keys(BlockchainType).filter((x) => BlockchainType[x] == blockchain);
    return keys.length > 0 ? keys[0] : null;
  }
}

export class RecoveryKit {
  private name: string;
  private blockchain: BlockchainType;
  private henesisKey: Key;
  private accountKey: KeyWithPriv;
  private backupKey: KeyWithPriv;
  private encryptedPassphrase: string

  public constructor(
    name: string,
    blockchain: BlockchainType,
    henesisKey: Key,
    accountKey: KeyWithPriv,
    backupKey: KeyWithPriv,
    encryptedPassphrase: string
  ){
    this.name = name;
    this.blockchain = blockchain;
    this.henesisKey = henesisKey;
    this.accountKey = accountKey;
    this.backupKey = backupKey;
    this.encryptedPassphrase = encryptedPassphrase;
  }

  async generatePdf(): Promise<PDFDocument> {
    const docs = new PDFDocument({ size: 'A4' });
    docs
    .font(`Helvetica`)
    .fontSize(24)
    .fillColor('#060607')
    .text(this.name, 36, 36);
    // write wallet description
    docs
    .font(`Helvetica`)
    .fontSize(10)
    .fillColor('#3A4044')
    .text(`Platform : ${this.camelize(this.blockchain)}`, 36, 76)
    .text(`Created Time : ${this.getFormattedDate(new Date())}`, 36, 91);
    // write note
    docs
    .font(`Helvetica`)
    .fontSize(9)
    .fillColor('#F5405B')
    .text('This is a Recovery Kit to recover your keys when you lost them. Print this document, or keep it securely offline.', 36, 134, { width: 305 });
    // draw logo
    SVGtoPDF(docs, logo, 468, 36, { width: 91, preserveAspectRatio: 'xMinYMin' });
    await this.setQRCode(docs, 'A. Account Key', 'This is your private key, encrypted with your passphrase.', this.accountKey.keyFile, 36, 224);
    await this.setQRCode(docs, 'B. Backup Key', 'This is your backup private key, encrypted with your passphrase.', this.backupKey.keyFile, 36, 382);
    await this.setQRCode(docs, 'C. Henesis Key', 'This is the public part of the key that Henesis will use to co-sign transactions with you on your wallet.', this.henesisKey.address, 36, 540);
    await this.setQRCode(docs, 'D. Encrypted Wallet Passphrase', 'This is the wallet password, encrypted client-side with a key held by Henesis.', this.encryptedPassphrase, 36, 681);
    docs.end();
    return docs;
  }

  async setQRCode(docs : PDFDocument, name: string, desc: string, data : string, x : number, y : number) : Promise<void> {
    const qr = await QRCode.toString(data, { type: 'svg', color: { light: '0000' }, margin: 0 });
    docs
    .font(`Helvetica`)
    .fontSize(13)
    .fillColor('#060607')
    .text(name, x, y)
    .fontSize(9)
    .fillColor('#748089')
    .text(desc, x, docs.y + 3, { width: 340 })
    .fillColor('#465365')
    .text('Data : ', x, docs.y + 12)
    .fillColor('#465365')
    .text(data, x, docs.y + 5, { width: 390, align: 'justify' });
    SVGtoPDF(docs, qr, 453, y, { width: 105, height: 105, preserveAspectRatio: 'xMinYMin' });
  }

  getFormattedDate(date : Date) : string {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString();
    const dd = date.getDate().toString();
    return `${yyyy}/${mm[1] ? mm : `0${mm[0]}`}/${dd[1] ? dd : `0${dd[0]}`}`;
  }

  camelize(data : string) : string {
    const str = data.toLowerCase();
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }

  getName(): string {
    return this.name;
  }

  getBlockchain(): BlockchainType {
    return this.blockchain;
  }

  getHenesisKey(): Key {
    return this.henesisKey;
  }
  
  getAccountKey(): KeyWithPriv {
    return this.accountKey;
  }

  getBackupKey(): KeyWithPriv{
    return this.backupKey;
  }

  getEncryptedPassphrase(): string {
    return this.encryptedPassphrase;
  }
}

