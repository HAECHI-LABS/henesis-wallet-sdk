"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeScriptSignature = exports.isNewAddress = exports.isLegacyAddress = exports.convertToNewAddress = exports.convertToLegacyAddress = exports.convertTransferInternalDTO = exports.convertTransferDTO = exports.convertTransactionDTO = void 0;
const common_1 = require("../utils/common");
const buffer_1 = require("buffer");
const Address = require("./cashAddress");
const cashAddress = new Address();
const typeforce = require("typeforce");
const bip66 = require("bip66");
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
function convertToLegacyAddress(address) {
    try {
        const legacyAddress = cashAddress.toLegacyAddress(address);
        return legacyAddress === address ? null : legacyAddress;
    }
    catch (error) {
        return null;
    }
}
exports.convertToLegacyAddress = convertToLegacyAddress;
function convertToNewAddress(address) {
    try {
        const newAddress = cashAddress.toCashAddress(address);
        return newAddress === address ? null : newAddress;
    }
    catch (error) {
        return null;
    }
}
exports.convertToNewAddress = convertToNewAddress;
function isLegacyAddress(address) {
    try {
        return cashAddress.isLegacyAddress(address);
    }
    catch (error) {
        return false;
    }
}
exports.isLegacyAddress = isLegacyAddress;
function isNewAddress(address) {
    try {
        return cashAddress.isCashAddress(address);
    }
    catch (error) {
        return false;
    }
}
exports.isNewAddress = isNewAddress;
exports.encodeScriptSignature = (signature, hashType) => {
    typeforce({
        signature: typeforce.BufferN(64),
        hashType: typeforce.UInt8,
    }, { signature, hashType });
    const hashTypeBuffer = buffer_1.Buffer.allocUnsafe(1);
    hashTypeBuffer.writeUInt8(hashType, 0);
    const r = toDER(signature.slice(0, 32));
    const s = toDER(signature.slice(32, 64));
    return buffer_1.Buffer.concat([bip66.encode(r, s), hashTypeBuffer]);
};
const ZERO = buffer_1.Buffer.alloc(1, 0);
function toDER(x) {
    let i = 0;
    while (x[i] === 0)
        ++i;
    if (i === x.length)
        return ZERO;
    x = x.slice(i);
    if (x[0] & 0x80)
        return buffer_1.Buffer.concat([ZERO, x], 1 + x.length);
    return x;
}
//# sourceMappingURL=utils.js.map