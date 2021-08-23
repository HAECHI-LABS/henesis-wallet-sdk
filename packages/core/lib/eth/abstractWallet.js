"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthLikeWallet = exports.getAddressFromCompressedPub = exports.convertSignedMultiSigPayloadToDTO = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const blockchain_1 = require("../blockchain");
const transactions_1 = require("./transactions");
const batch_1 = __importDefault(require("./batch"));
const common_1 = require("../utils/common");
const wallet_1 = require("../wallet");
const coins_1 = require("./coins");
const lodash_1 = __importDefault(require("lodash"));
const error_1 = require("../error");
const crypto_1 = require("crypto");
const eth_crypto_1 = __importDefault(require("eth-crypto"));
const nfts_1 = require("./nfts");
const url_1 = require("../utils/url");
function convertSignedMultiSigPayloadToDTO(signedMultiSigPayload) {
    return {
        signature: signedMultiSigPayload.signature,
        multiSigPayload: {
            hexData: signedMultiSigPayload.multiSigPayload.hexData,
            walletNonce: common_1.BNConverter.bnToHexString(signedMultiSigPayload.multiSigPayload.walletNonce),
            value: common_1.BNConverter.bnToHexString(signedMultiSigPayload.multiSigPayload.value),
            toAddress: signedMultiSigPayload.multiSigPayload.toAddress,
            walletAddress: signedMultiSigPayload.multiSigPayload.walletAddress,
        },
    };
}
exports.convertSignedMultiSigPayloadToDTO = convertSignedMultiSigPayloadToDTO;
function getAddressFromCompressedPub(pub) {
    const pubKey = eth_crypto_1.default.publicKey.decompress(common_1.HexConverter.remove0x(pub));
    return eth_crypto_1.default.publicKey.toAddress(pubKey);
}
exports.getAddressFromCompressedPub = getAddressFromCompressedPub;
class EthLikeWallet extends wallet_1.Wallet {
    constructor(client, data, keychains, blockchain, baseUrl) {
        super(client, keychains, baseUrl, blockchain);
        this.DEFAULT_CONTRACT_CALL_GAS_LIMIT = new bn_js_1.default(1000000);
        this.DEFAULT_COIN_TRANSFER_GAS_LIMIT = new bn_js_1.default(150000);
        this.DEFAULT_TOKEN_TRANSFER_GAS_LIMIT = new bn_js_1.default(500000);
        this.DEFAULT_NFT_TRANSFER_GAS_LIMIT = new bn_js_1.default(500000);
        this.data = data;
        this.coins = new coins_1.Coins(this.client);
        this.nfts = new nfts_1.Nfts(this.client);
    }
    getChain() {
        return this.blockchain;
    }
    getVersion() {
        return this.data.version;
    }
    getVersionNumber() {
        return parseInt(this.getVersion().substr(1));
    }
    async replaceTransaction(transactionId, gasPrice) {
        common_1.checkNullAndUndefinedParameter({ transactionId });
        const request = {
            walletId: this.getId(),
            transactionId,
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
        };
        const response = await this.client.post(`/wallets/transactions/replace`, request);
        return Object.assign(Object.assign({}, response), { blockchain: blockchain_1.transformBlockchainType(response.blockchain) });
    }
    async resendTransaction(transactionId, gasPrice, gasLimit) {
        common_1.checkNullAndUndefinedParameter({ transactionId });
        const request = {
            walletId: this.getId(),
            transactionId,
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
            gasLimit: gasLimit ? common_1.BNConverter.bnToHexString(gasLimit) : undefined,
        };
        const response = await this.client.post(`/wallets/transactions/resend`, request);
        return Object.assign(Object.assign({}, response), { blockchain: blockchain_1.transformBlockchainType(response.blockchain) });
    }
    async contractCall(contractAddress, value, data, passphrase, otpCode, gasPrice, gasLimit, metadata) {
        return this.sendTransaction(await this.buildContractCallPayload(contractAddress, value, data, passphrase), this.getId(), otpCode, gasPrice, gasLimit || this.DEFAULT_CONTRACT_CALL_GAS_LIMIT, metadata);
    }
    async buildContractCallPayload(contractAddress, value, data, passphrase) {
        if (lodash_1.default.isEmpty(data)) {
            throw new error_1.ValidationParameterError("data is empty");
        }
        common_1.checkNullAndUndefinedParameter({
            contractAddress,
            data,
            passphrase,
        });
        const multiSigPayload = {
            hexData: data,
            walletNonce: this.getNonce(),
            value,
            toAddress: contractAddress,
            walletAddress: this.getAddress(),
        };
        return this.signPayload(multiSigPayload, passphrase);
    }
    async transfer(coin, to, amount, passphrase, otpCode, gasPrice, gasLimit, metadata) {
        const c = typeof coin === "string" ? await this.coins.getCoin(coin) : coin;
        return this.sendTransaction(await this.buildTransferPayload(c, to, amount, passphrase), this.getId(), otpCode, gasPrice, gasLimit || this.getGasLimitByTicker(c), metadata);
    }
    async buildTransferPayload(coin, to, amount, passphrase) {
        common_1.checkNullAndUndefinedParameter({
            coin,
            to,
            passphrase,
        });
        const c = typeof coin === "string" ? await this.coins.getCoin(coin) : coin;
        return this.signPayload(await c.buildTransferMultiSigPayload(this, to, amount), passphrase);
    }
    async createRawTransaction(coin, to, amount) {
        common_1.checkNullAndUndefinedParameter({ coin, to });
        const c = typeof coin === "string" ? await this.coins.getCoin(coin) : coin;
        return c.buildTransferMultiSigPayload(this, to, amount);
    }
    createBatchRequest(otpCode) {
        return new batch_1.default((signedMultiSigPayloads) => this.sendBatchTransaction(this.getChain(), signedMultiSigPayloads, this.getId(), otpCode));
    }
    async sendTransaction(signedMultiSigPayload, walletId, otpCode, gasPrice, gasLimit, metadata) {
        const request = {
            walletId,
            signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(signedMultiSigPayload),
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
            gasLimit: gasLimit ? common_1.BNConverter.bnToHexString(gasLimit) : undefined,
            otpCode,
            metadata,
        };
        const response = await this.client.post(`/wallets/transactions`, request);
        return Object.assign(Object.assign({}, response), { blockchain: blockchain_1.transformBlockchainType(response.blockchain) });
    }
    getNonce() {
        return common_1.BNConverter.hexStringToBN("0x" + crypto_1.randomBytes(32).toString("hex"));
    }
    async getNftBalance(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`${this.baseUrl}/nft/balance${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((data) => data),
        };
    }
    signPayload(multiSigPayload, passphrase) {
        return {
            signature: this.keychains.sign(this.data.accountKey, passphrase, transactions_1.formatMultiSigPayload(multiSigPayload)),
            multiSigPayload,
        };
    }
    async sendBatchTransaction(blockchain, signedMultiSigPayloads, walletId, otpCode, gasPrice, gasLimit) {
        const signedMultiSigPayloadDTOs = signedMultiSigPayloads.map((signedMultiSigPayload) => convertSignedMultiSigPayloadToDTO(signedMultiSigPayload));
        const response = await this.client.post(`/wallets/batch-transactions`, {
            walletId,
            blockchain,
            signedMultiSigPayloads: signedMultiSigPayloadDTOs,
            gasPrice: gasPrice ? common_1.BNConverter.bnToHexString(gasPrice) : undefined,
            gasLimit: gasLimit ? common_1.BNConverter.bnToHexString(gasLimit) : undefined,
            otpCode,
        });
        return lodash_1.default.map(response, (batchTransaction) => {
            const transaction = batchTransaction.transaction;
            return Object.assign(Object.assign({}, transaction), { blockchain: blockchain_1.transformBlockchainType(transaction.blockchain) });
        });
    }
    getGasLimitByTicker(coin) {
        const ticker = coin.getCoinData().symbol;
        if (ticker.toUpperCase() === "ETH" || ticker.toUpperCase() === "KLAY") {
            return this.DEFAULT_COIN_TRANSFER_GAS_LIMIT;
        }
        return this.DEFAULT_TOKEN_TRANSFER_GAS_LIMIT;
    }
    async buildTransferNftPayload(nft, tokenOnchainId, from, to, passphrase) {
        common_1.checkNullAndUndefinedParameter({
            nft,
            to,
            passphrase,
        });
        return this.signPayload(await nft.buildTransferMultiSigPayload(from, to, tokenOnchainId), passphrase);
    }
}
exports.EthLikeWallet = EthLikeWallet;
//# sourceMappingURL=abstractWallet.js.map