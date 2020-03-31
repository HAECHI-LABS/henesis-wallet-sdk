import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import fs from 'fs';
import SVGtoPDF from 'svg-to-pdfkit';
import { MasterWalletData } from './wallet';
import { KeyWithPriv } from './keychains';

export interface PdfOption {
  data : MasterWalletData;
  accountKey : KeyWithPriv;
  backupKey : KeyWithPriv;
  encryptedPassphrase : string;
  path? : string;
}

function setQRCode(docs : PDFDocument, name: string, qr: string, data : string, x : number, y : number) : void {
  SVGtoPDF(docs, qr, x, y + 20, {width:120, height:120});
  docs.text(name, x, y, {width:120, align:'right'})
    .text(data, x + 150, y + 30, {width:410, align: 'left'});
}
export async function generatePdf(option : PdfOption) {
  const svg_enc = await QRCode.toString(option.encryptedPassphrase, {type: "svg"});
  const svg_acc = await QRCode.toString(option.accountKey.keyFile, {type: "svg"});
  const svg_back = await QRCode.toString(option.backupKey.keyFile, {type: "svg"});

  let docs = new PDFDocument({size: "A4", margin: 50});
  //TODO need to check if it is on server or client
  //now only supports server side
  const path = option.path ? option.path : option.data.id + ".pdf";
  const stream = fs.createWriteStream(path);
  docs.pipe(stream);

  setQRCode(docs, "Encrypted Passphrase", svg_enc, option.encryptedPassphrase, 10, 100);
  setQRCode(docs, "AccountKey", svg_acc, option.accountKey.keyFile, 10, 250);
  setQRCode(docs, "BackupKey",svg_back, option.backupKey.keyFile, 10, 400);
  docs.end();
}
