"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTransferInternalDTO = exports.convertTransferDTO = exports.convertTransactionDTO = void 0;
const common_1 = require("../utils/common");
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
//# sourceMappingURL=utils.js.map