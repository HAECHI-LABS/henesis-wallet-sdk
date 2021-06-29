"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryKit = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const qrcode_1 = __importDefault(require("qrcode"));
const svg_to_pdfkit_1 = __importDefault(require("svg-to-pdfkit"));
const logo_1 = require("./resources/logo");
class RecoveryKit {
    constructor(name, blockchain, henesisKey, accountKey, backupKey, encryptedPassphrase, encryptionKey, env) {
        this.name = name;
        this.blockchain = blockchain;
        this.henesisKey = henesisKey;
        this.accountKey = accountKey;
        this.backupKey = backupKey;
        this.encryptedPassphrase = encryptedPassphrase;
        this.encryptionKey = encryptionKey;
        this.env = env;
    }
    async generatePdf() {
        const docs = new pdfkit_1.default({ size: "A4" });
        docs
            .font("Helvetica")
            .fontSize(24)
            .fillColor("#060607")
            .text(this.name, 36, 36);
        docs
            .font("Helvetica")
            .fontSize(10)
            .fillColor("#3A4044")
            .text(`Platform : ${this.env == 2 ? "Testnet" : ""} ${this.camelize(this.blockchain)}`, 36, 76)
            .text(`Created Time : ${this.getFormattedDate(new Date())}`, 36, 91);
        docs
            .font("Helvetica")
            .fontSize(9)
            .fillColor("#F5405B")
            .text("This is a Recovery Kit to recover your keys when you lost them. Print this document, or keep it securely offline.", 36, 134, { width: 305 });
        svg_to_pdfkit_1.default(docs, logo_1.logo, 468, 36, {
            width: 91,
            preserveAspectRatio: "xMinYMin",
        });
        await this.setQRCode(docs, "A. Account Key", "This is your private key, encrypted with your passphrase.", this.accountKey.keyFile, 36, 224);
        await this.setQRCode(docs, "B. Backup Key", "This is your backup private key, encrypted with your passphrase.", this.backupKey.keyFile, 36, 382);
        await this.setQRCode(docs, "C. Henesis Key", "This is the public part of the key that Henesis will use to co-sign transactions with you on your wallet.", this.henesisKey.pub, 36, 540);
        await this.setQRCode(docs, "D. Encrypted Wallet Passphrase", "This is the wallet password, encrypted client-side with a key held by Henesis.", this.encryptedPassphrase, 36, 681);
        docs.end();
        return docs;
    }
    async setQRCode(docs, name, desc, data, x, y) {
        const qr = await qrcode_1.default.toString(data, {
            type: "svg",
            color: { light: "0000" },
            margin: 0,
        });
        docs
            .font("Helvetica")
            .fontSize(13)
            .fillColor("#060607")
            .text(name, x, y)
            .fontSize(9)
            .fillColor("#748089")
            .text(desc, x, docs.y + 3, { width: 340 })
            .fillColor("#465365")
            .text("Data : ", x, docs.y + 12)
            .fillColor("#465365")
            .text(data, x, docs.y + 5, { width: 390, align: "justify" });
        svg_to_pdfkit_1.default(docs, qr, 453, y, {
            width: 105,
            height: 105,
            preserveAspectRatio: "xMinYMin",
        });
    }
    getFormattedDate(date) {
        const yyyy = date.getFullYear().toString();
        const mm = (date.getMonth() + 1).toString();
        const dd = date.getDate().toString();
        return `${yyyy}/${mm[1] ? mm : `0${mm[0]}`}/${dd[1] ? dd : `0${dd[0]}`}`;
    }
    camelize(data) {
        const str = data.toLowerCase();
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }
    getName() {
        return this.name;
    }
    getBlockchain() {
        return this.blockchain;
    }
    getHenesisKey() {
        return this.henesisKey;
    }
    getAccountKey() {
        return this.accountKey;
    }
    getBackupKey() {
        return this.backupKey;
    }
    getEncryptedPassphrase() {
        return this.encryptedPassphrase;
    }
    getEncryptionKey() {
        return this.encryptionKey;
    }
}
exports.RecoveryKit = RecoveryKit;
//# sourceMappingURL=recoverykit.js.map