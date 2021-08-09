"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilAbstractWallet = void 0;
const wallet_1 = require("../wallet");
const blockchain_1 = require("../blockchain");
const utils_1 = require("./utils");
const signer_1 = require("./fil-core-lib/signer");
const constants_1 = require("./fil-core-lib/constants");
const utils_2 = require("./fil-core-lib/utils");
class FilAbstractWallet extends wallet_1.Wallet {
    constructor(client, data, keychains, baseUrl) {
        super(client, keychains, baseUrl);
        this.data = data;
        this.blockchain = blockchain_1.BlockchainType.FILECOIN;
    }
    getChain() {
        return this.data.blockchain;
    }
    signRawTransaction(rawTransaction, key, passphrase, fromSeed) {
        const message = utils_1.convertRawTransactionToMessage(rawTransaction);
        const signature = this.createMessageSignature(message, key, passphrase, fromSeed);
        message.cid = this.calculateCidFromMessage(message);
        const cid = this.calculateCidFromMessageAndSignature(message, signature);
        return {
            cid,
            message,
            signature,
        };
    }
    createMessageSignature(message, key, passphrase, fromSeed) {
        const msgObject = utils_1.convertMessageToObject(message);
        const serializedMsg = signer_1.transactionSerialize(msgObject);
        const signature = this.keychains.sign(key, passphrase, serializedMsg, fromSeed);
        return {
            data: signature,
            type: constants_1.ProtocolIndicator.SECP256K1,
        };
    }
    calculateCidFromMessage(message) {
        const messageObject = utils_1.convertMessageToObject(message);
        return new TextDecoder()
            .decode(utils_2.encode(utils_2.getCID(signer_1.transactionSerializeRaw(messageObject))))
            .toLocaleLowerCase();
    }
    calculateCidFromMessageAndSignature(message, signature) {
        const messageObject = utils_1.convertMessageToObject(message);
        return new TextDecoder()
            .decode(utils_2.encode(utils_2.getCID(signer_1.signedTransactionSerializeRaw(messageObject, signature))))
            .toLocaleLowerCase();
    }
}
exports.FilAbstractWallet = FilAbstractWallet;
//# sourceMappingURL=abstractWallet.js.map