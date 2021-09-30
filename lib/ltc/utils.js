"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToLegacyAddress = exports.convertToNewAddress = exports.isNewAddress = exports.isLegacyAddress = exports.convertTransferInternalDTO = exports.convertTransferDTO = exports.convertTransactionDTO = void 0;
const common_1 = require("../utils/common");
const bitcoin = __importStar(require("bitcoinjs-lib"));
exports.convertTransactionDTO = (transaction) => {
    return Object.assign(Object.assign({}, transaction), { amount: common_1.BNConverter.hexStringToBN(String(transaction.amount)), blockNumber: transaction.blockNumber
            ? common_1.BNConverter.hexStringToBN(String(transaction.blockNumber))
            : null, feeAmount: transaction.feeAmount
            ? common_1.BNConverter.hexStringToBN(String(transaction.feeAmount))
            : null, outputs: transaction.outputs.map((o) => {
            return {
                transactionId: o.transactionId,
                outputIndex: o.outputIndex,
                address: o.address,
                scriptPubKey: o.scriptPubKey,
                amount: common_1.BNConverter.hexStringToBN(String(o.amount)),
                isChange: o.isChange,
            };
        }) });
};
exports.convertTransferDTO = (t) => {
    return Object.assign(Object.assign({}, t), { transaction: t.transaction ? exports.convertTransactionDTO(t.transaction) : null, feeAmount: t.feeAmount ? common_1.BNConverter.hexStringToBN(t.feeAmount) : null, amount: common_1.BNConverter.hexStringToBN(t.amount), confirmation: common_1.BNConverter.hexStringToBN(t.confirmation) });
};
exports.convertTransferInternalDTO = (transfer) => {
    return Object.assign(Object.assign({}, transfer), { transaction: transfer.transaction
            ? exports.convertTransactionDTO(transfer.transaction)
            : null, feeAmount: transfer.feeAmount
            ? common_1.BNConverter.hexStringToBN(transfer.feeAmount)
            : null, amount: common_1.BNConverter.hexStringToBN(transfer.amount), confirmation: common_1.BNConverter.hexStringToBN(transfer.confirmation) });
};
function isLegacyAddress(address) {
    try {
        const decoded = bitcoin.address.fromBase58Check(address);
        const version = decoded["version"];
        switch (version) {
            case 5:
            case 196:
                return true;
            default:
                return false;
        }
    }
    catch (err) {
        return false;
    }
}
exports.isLegacyAddress = isLegacyAddress;
function isNewAddress(address) {
    try {
        const decoded = bitcoin.address.fromBase58Check(address);
        const version = decoded["version"];
        switch (version) {
            case 50:
            case 58:
                return true;
            default:
                return false;
        }
    }
    catch (err) {
        return false;
    }
}
exports.isNewAddress = isNewAddress;
function convertToNewAddress(address) {
    try {
        const decoded = bitcoin.address.fromBase58Check(address);
        const version = decoded["version"];
        let newVersion;
        switch (version) {
            case 5:
                newVersion = 50;
                break;
            case 196:
                newVersion = 58;
                break;
            default:
                return null;
        }
        return bitcoin.address.toBase58Check(decoded["hash"], newVersion);
    }
    catch (err) {
        return null;
    }
}
exports.convertToNewAddress = convertToNewAddress;
function convertToLegacyAddress(address) {
    try {
        const decoded = bitcoin.address.fromBase58Check(address);
        const version = decoded["version"];
        let newVersion;
        switch (version) {
            case 50:
                newVersion = 5;
                break;
            case 58:
                newVersion = 196;
                break;
            default:
                return null;
        }
        return bitcoin.address.toBase58Check(decoded["hash"], newVersion);
    }
    catch (err) {
        return null;
    }
}
exports.convertToLegacyAddress = convertToLegacyAddress;
//# sourceMappingURL=utils.js.map