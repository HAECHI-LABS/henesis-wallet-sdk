import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import SVGtoPDF from 'svg-to-pdfkit';
import { BlockchainType } from './blockchain';
import { Key, KeyWithPriv } from './types';
import { logo } from './resources/logo';
import { Env } from './sdk';

export class RecoveryKit {
  private readonly name: string;

  private readonly blockchain: BlockchainType;

  private readonly henesisKey: Key;

  private readonly accountKey: KeyWithPriv;

  private readonly backupKey: KeyWithPriv;

  private readonly encryptedPassphrase: string;

  private readonly encryptionKey: string;

  private readonly env: Env;

  public constructor(
    name: string,
    blockchain: BlockchainType,
    henesisKey: Key,
    accountKey: KeyWithPriv,
    backupKey: KeyWithPriv,
    encryptedPassphrase: string,
    encryptionKey: string,
    env: Env,
  ) {
    this.name = name;
    this.blockchain = blockchain;
    this.henesisKey = henesisKey;
    this.accountKey = accountKey;
    this.backupKey = backupKey;
    this.encryptedPassphrase = encryptedPassphrase;
    this.encryptionKey = encryptionKey;
    this.env = env;
  }

  async generatePdf(): Promise<PDFDocument> {
    const docs = new PDFDocument({ size: 'A4' });
    docs
      .font('Helvetica')
      .fontSize(24)
      .fillColor('#060607')
      .text(this.name, 36, 36);
    // write wallet description
    docs
      .font('Helvetica')
      .fontSize(10)
      .fillColor('#3A4044')
      .text(
        `Platform : ${this.env == Env.Test ? 'Testnet' : ''} ${this.camelize(
          this.blockchain,
        )}`,
        36,
        76,
      )
      .text(`Created Time : ${this.getFormattedDate(new Date())}`, 36, 91);
    // write note
    docs
      .font('Helvetica')
      .fontSize(9)
      .fillColor('#F5405B')
      .text(
        'This is a Recovery Kit to recover your keys when you lost them. Print this document, or keep it securely offline.',
        36,
        134,
        { width: 305 },
      );
    // draw logo
    SVGtoPDF(docs, logo, 468, 36, {
      width: 91,
      preserveAspectRatio: 'xMinYMin',
    });
    await this.setQRCode(
      docs,
      'A. Account Key',
      'This is your private key, encrypted with your passphrase.',
      this.accountKey.keyFile,
      36,
      224,
    );
    await this.setQRCode(
      docs,
      'B. Backup Key',
      'This is your backup private key, encrypted with your passphrase.',
      this.backupKey.keyFile,
      36,
      382,
    );
    await this.setQRCode(
      docs,
      'C. Henesis Key',
      'This is the public part of the key that Henesis will use to co-sign transactions with you on your wallet.',
      this.henesisKey.address,
      36,
      540,
    );
    await this.setQRCode(
      docs,
      'D. Encrypted Wallet Passphrase',
      'This is the wallet password, encrypted client-side with a key held by Henesis.',
      this.encryptedPassphrase,
      36,
      681,
    );
    docs.end();
    return docs;
  }

  async setQRCode(
    docs: PDFDocument,
    name: string,
    desc: string,
    data: string,
    x: number,
    y: number,
  ): Promise<void> {
    const qr = await QRCode.toString(data, {
      type: 'svg',
      color: { light: '0000' },
      margin: 0,
    });
    docs
      .font('Helvetica')
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
    SVGtoPDF(docs, qr, 453, y, {
      width: 105,
      height: 105,
      preserveAspectRatio: 'xMinYMin',
    });
  }

  getFormattedDate(date: Date): string {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString();
    const dd = date.getDate().toString();
    return `${yyyy}/${mm[1] ? mm : `0${mm[0]}`}/${dd[1] ? dd : `0${dd[0]}`}`;
  }

  camelize(data: string): string {
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

  getBackupKey(): KeyWithPriv {
    return this.backupKey;
  }

  getEncryptedPassphrase(): string {
    return this.encryptedPassphrase;
  }

  getEncryptionKey(): string {
    return this.encryptionKey;
  }
}
