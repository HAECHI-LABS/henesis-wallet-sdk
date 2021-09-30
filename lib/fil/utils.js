"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMasterWalletBalanceDtoToFilBalance = exports.convertBalanceDtoToFilBalance = exports.convertDtoToFlush = exports.convertFilFlushTargetToDto = exports.convertRawTransactionToMessage = exports.convertMessageToObject = exports.convertSignedTransactionToRawSignedTransactionDTO = exports.convertTransferInternalDTO = exports.convertDtoToTransfer = exports.convertDtoToTransaction = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const common_1 = require("../utils/common");
exports.convertDtoToTransaction = (transactionDTO) => {
    if (transactionDTO) {
        return Object.assign(Object.assign({}, transactionDTO), { nonce: common_1.BNConverter.hexStringToBnOrElseNull(transactionDTO.nonce), amount: common_1.BNConverter.hexStringToBnOrElseNull(transactionDTO.amount), gasLimit: common_1.BNConverter.hexStringToBnOrElseNull(transactionDTO.gasLimit), gasFeeCap: common_1.BNConverter.hexStringToBnOrElseNull(transactionDTO.gasFeeCap), gasPremium: common_1.BNConverter.hexStringToBnOrElseNull(transactionDTO.gasPremium), gasUsed: common_1.BNConverter.hexStringToBnOrElseNull(transactionDTO.gasUsed), feeAmount: common_1.BNConverter.hexStringToBnOrElseNull(transactionDTO.feeAmount) });
    }
    return null;
};
exports.convertDtoToTransfer = (transferDTO) => {
    return transferDTO
        ? Object.assign(Object.assign({}, transferDTO), { amount: common_1.BNConverter.hexStringToBnOrElseNull(transferDTO.amount), transaction: exports.convertDtoToTransaction(transferDTO.transaction), proposalTransaction: exports.convertDtoToTransaction(transferDTO.proposalTransaction) }) : null;
};
exports.convertTransferInternalDTO = (transfer) => {
    return Object.assign(Object.assign({}, transfer), { amount: common_1.BNConverter.hexStringToBN(transfer.amount), transaction: transfer.transaction
            ? exports.convertDtoToTransaction(transfer.transaction)
            : null, confirmation: common_1.BNConverter.hexStringToBN(transfer.confirmation), proposalTransaction: transfer.proposalTransaction
            ? exports.convertDtoToTransaction(transfer.proposalTransaction)
            : null });
};
exports.convertSignedTransactionToRawSignedTransactionDTO = (transaction) => {
    if (transaction) {
        const message = transaction.message;
        const signature = transaction.signature;
        return {
            cid: transaction.cid,
            message: {
                cid: message.cid,
                version: message.version,
                to: message.to,
                from: message.from,
                nonce: message.nonce != null
                    ? common_1.BNConverter.bnToHexString(new bn_js_1.default(message.nonce))
                    : null,
                value: common_1.BNConverter.bnToHexStringOrElseNull(message.value),
                method: message.method,
                params: message.params,
                gasLimit: message.gasLimit != null
                    ? common_1.BNConverter.bnToHexString(new bn_js_1.default(message.gasLimit))
                    : null,
                gasFeeCap: common_1.BNConverter.bnToHexStringOrElseNull(message.gasFeeCap),
                gasPremium: common_1.BNConverter.bnToHexStringOrElseNull(message.gasPremium),
            },
            signature: {
                data: signature.data,
                type: signature.type,
            },
        };
    }
    return null;
};
exports.convertMessageToObject = (message) => {
    return message
        ? {
            to: message.to,
            from: message.from,
            nonce: message.nonce,
            value: message.value != null ? message.value.toString() : null,
            gaslimit: message.gasLimit,
            gasfeecap: message.gasFeeCap != null ? message.gasFeeCap.toString() : null,
            gaspremium: message.gasPremium != null ? message.gasPremium.toString() : null,
            method: message.method,
            params: message.params != null ? message.params : "",
        }
        : null;
};
exports.convertRawTransactionToMessage = (rawTransaction) => {
    return rawTransaction
        ? Object.assign(Object.assign({}, rawTransaction), { value: common_1.BNConverter.hexStringToBnOrElseNull(rawTransaction.value), gasLimit: rawTransaction.gasLimit != null
                ? common_1.BNConverter.hexStringToBN(rawTransaction.gasLimit).toNumber()
                : null, gasFeeCap: common_1.BNConverter.hexStringToBnOrElseNull(rawTransaction.gasFeeCap), gasPremium: common_1.BNConverter.hexStringToBnOrElseNull(rawTransaction.gasPremium), nonce: rawTransaction.nonce != null
                ? common_1.BNConverter.hexStringToBN(rawTransaction.nonce).toNumber()
                : null }) : null;
};
exports.convertFilFlushTargetToDto = (flushTarget) => {
    return {
        depositAddressId: flushTarget.depositAddressId,
        flushTransaction: exports.convertSignedTransactionToRawSignedTransactionDTO(flushTarget.flushTransaction),
    };
};
exports.convertDtoToFlush = (flushDTO) => {
    return flushDTO
        ? Object.assign(Object.assign({}, flushDTO), { transfers: flushDTO.transfers.map(exports.convertDtoToTransfer) }) : null;
};
exports.convertBalanceDtoToFilBalance = (balanceDTO) => {
    return {
        coinId: null,
        symbol: "FIL",
        amount: common_1.BNConverter.hexStringToBN(balanceDTO.confirmedBalance),
        spendableAmount: common_1.BNConverter.hexStringToBN(balanceDTO.spendableBalance),
        coinType: "FIL",
        name: "Filecoin",
        decimals: 18,
    };
};
exports.convertMasterWalletBalanceDtoToFilBalance = (balanceDTO) => {
    return {
        coinId: null,
        symbol: "FIL",
        amount: common_1.BNConverter.hexStringToBN(balanceDTO.confirmedBalance),
        spendableAmount: common_1.BNConverter.hexStringToBN(balanceDTO.spendableBalance),
        aggregatedAmount: common_1.BNConverter.hexStringToBN(balanceDTO.aggregatedBalance),
        coinType: "FIL",
        name: "Filecoin",
        decimals: 18,
    };
};
//# sourceMappingURL=utils.js.map