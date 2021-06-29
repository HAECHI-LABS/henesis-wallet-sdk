"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTransactionHistoryDTO = exports.convertRawTransactionDTO = exports.convertTransactionDTO = void 0;
const common_1 = require("../utils/common");
const blockchain_1 = require("../blockchain");
exports.convertTransactionDTO = (transactionDTO) => {
    const rawTransaction = transactionDTO.rawTransaction;
    const signedMultiSigPayload = transactionDTO.signedMultiSigPayload;
    const multiSigPayload = signedMultiSigPayload === null || signedMultiSigPayload === void 0 ? void 0 : signedMultiSigPayload.multiSigPayload;
    return Object.assign(Object.assign({}, transactionDTO), { blockchain: blockchain_1.transformBlockchainType(transactionDTO.blockchain), signedMultiSigPayload: signedMultiSigPayload
            ? Object.assign(Object.assign({}, signedMultiSigPayload), { multiSigPayload: multiSigPayload
                    ? Object.assign(Object.assign({}, multiSigPayload), { value: common_1.BNConverter.hexStringToBN(String(multiSigPayload.value)), walletNonce: common_1.BNConverter.hexStringToBN(String(multiSigPayload.walletNonce)) }) : null }) : null, rawTransaction: exports.convertRawTransactionDTO(rawTransaction), fee: common_1.BNConverter.hexStringToBN(String(transactionDTO.fee)), estimatedFee: common_1.BNConverter.hexStringToBN(String(transactionDTO.estimatedFee)), isFeeDelegated: transactionDTO.isFeeDelegated });
};
exports.convertRawTransactionDTO = (rawTransaction) => {
    return rawTransaction
        ? Object.assign(Object.assign({}, rawTransaction), { nonce: rawTransaction.nonce
                ? common_1.BNConverter.hexStringToBN(String(rawTransaction.nonce))
                : null, gasPrice: rawTransaction.gasPrice
                ? common_1.BNConverter.hexStringToBN(String(rawTransaction.gasPrice))
                : null, gasLimit: rawTransaction.gasLimit
                ? common_1.BNConverter.hexStringToBN(String(rawTransaction.gasLimit))
                : null, to: rawTransaction.to, value: rawTransaction.value
                ? common_1.BNConverter.hexStringToBN(String(rawTransaction.value))
                : null, data: rawTransaction.data }) : null;
};
exports.convertTransactionHistoryDTO = (transactionHistoryDTO) => {
    return Object.assign(Object.assign({}, exports.convertTransactionDTO(transactionHistoryDTO)), { wallet: transactionHistoryDTO.wallet, type: transactionHistoryDTO.type, createdAt: transactionHistoryDTO.createdAt });
};
//# sourceMappingURL=utils.js.map