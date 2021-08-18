"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtcMasterWallet = exports.transformWalletData = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const common_1 = require("../utils/common");
const wallet_1 = require("../wallet");
const blockchain_1 = require("../blockchain");
const url_1 = require("../utils/url");
const lodash_1 = __importDefault(require("lodash"));
const wallet_2 = require("../apis/btc/wallet");
const utils_1 = require("./utils");
exports.transformWalletData = (data) => {
    return Object.assign(Object.assign({}, data), { status: wallet_1.convertWalletStatus(data.status) });
};
class BtcMasterWallet extends wallet_1.Wallet {
    constructor(data, client, keychains, env) {
        super(client, keychains, `/wallets/${data.id}`, blockchain_1.BlockchainType.BITCOIN);
        this.data = data;
        this.env = env;
    }
    async build(to, amount, passphrase, feeRate, metadata) {
        common_1.checkNullAndUndefinedParameter({ to, passphrase });
        const rawTransaction = await this.createRawTransaction(to, amount, feeRate, metadata);
        const tx = new bitcoinjs_lib_1.Transaction();
        rawTransaction.inputs.forEach((input) => {
            tx.addInput(new Buffer(new Buffer(input.transactionOutput.transactionId, "hex").reverse()), input.transactionOutput.outputIndex);
        });
        rawTransaction.outputs.forEach((output) => {
            tx.addOutput(bitcoinjs_lib_1.address.toOutputScript(output.to, this.env === 3 ? bitcoinjs_lib_1.networks.bitcoin : bitcoinjs_lib_1.networks.testnet), new bn_js_1.default(output.amount.slice(2), "hex").toNumber());
        });
        const accountSigs = [];
        for (let i = 0; i < rawTransaction.inputs.length; i++) {
            const sigHash = tx.hashForSignature(i, new Buffer(rawTransaction.inputs[i].redeemScript.slice(2), "hex"), bitcoinjs_lib_1.Transaction.SIGHASH_ALL);
            const hexHash = this.keychains.sign(this.data.accountKey, passphrase, sigHash.toString("hex"));
            const accountSig = bitcoinjs_lib_1.script.signature
                .encode(Buffer.from(hexHash, "hex"), bitcoinjs_lib_1.Transaction.SIGHASH_ALL)
                .toString("hex");
            accountSigs.push(accountSig);
        }
        const payload = {
            inputs: [],
            outputs: [],
        };
        for (let i = 0; i < rawTransaction.inputs.length; i++) {
            const transactionOutput = rawTransaction.inputs[i].transactionOutput;
            payload.inputs.push({
                transactionOutput: Object.assign(Object.assign({}, transactionOutput), { amount: common_1.BNConverter.bnToHexString(transactionOutput.amount) }),
                accountSignature: accountSigs[i],
            });
        }
        for (let i = 0; i < rawTransaction.outputs.length; i++) {
            payload.outputs.push(rawTransaction.outputs[i]);
        }
        return payload;
    }
    async transfer(to, amount, passphrase, otpCode, feeRate, metadata) {
        return this.sendSignedTransaction(Object.assign(Object.assign({}, (await this.build(to, amount, passphrase, feeRate, metadata))), { otpCode: otpCode }));
    }
    async sendSignedTransaction(signedRawTransactionRequest) {
        const transfer = await this.client.post(`${this.baseUrl}/transactions`, signedRawTransactionRequest);
        return utils_1.convertTransferDTO(transfer);
    }
    async createRawTransaction(to, amount, feeRate, metadata) {
        const response = await this.client.post(`${this.baseUrl}/raw-transactions`, {
            to,
            amount: common_1.BNConverter.bnToHexString(amount),
            feeRate: feeRate ? common_1.BNConverter.bnToHexString(feeRate) : undefined,
            metadata: metadata,
        });
        return {
            inputs: lodash_1.default.map(response.inputs, (input) => {
                return {
                    redeemScript: input.redeemScript,
                    transactionOutput: Object.assign(Object.assign({}, input.transactionOutput), { amount: common_1.BNConverter.hexStringToBN(String(input.transactionOutput.amount)) }),
                };
            }),
            outputs: lodash_1.default.map(response.outputs, (output) => {
                return {
                    to: output.to,
                    amount: String(output.amount),
                    isChange: output.isChange,
                };
            }),
        };
    }
    async getEstimatedFee() {
        const response = await this.client.get(`${this.baseUrl}/estimated-fee`);
        return {
            estimatedFee: String(response.estimatedFee),
        };
    }
    getChain() {
        return this.blockchain;
    }
    async getBalance() {
        const response = await this.client.get(`${this.baseUrl}/balance`);
        return [
            {
                coinId: null,
                symbol: "BTC",
                amount: common_1.BNConverter.hexStringToBN(String(response.balance)),
                spendableAmount: common_1.BNConverter.hexStringToBN(String(response.spendableBalance)),
                coinType: "BTC",
                name: "Bitcoin",
                decimals: 8,
            },
        ];
    }
    createDepositAddress(name, otpCode) {
        common_1.checkNullAndUndefinedParameter({ name });
        return wallet_2.createDepositAddressApi({
            client: this.client,
            walletId: this.data.id,
            request: {
                name,
                otpCode,
            },
        });
    }
    getDepositAddress(depositAddressId) {
        return wallet_2.getDepositAddressApi({
            client: this.client,
            walletId: this.data.id,
            depositAddressId,
        });
    }
    getDepositAddresses(options) {
        const queryString = url_1.makeQueryString(options);
        return this.client.get(`${this.baseUrl}/deposit-addresses${queryString ? `?${queryString}` : ""}`);
    }
    async approve(params) {
        const request = Object.assign(Object.assign({}, (await this.build(params.toAddress, params.amount, params.passphrase))), { otpCode: params.otpCode });
        const transfer = await this.client.post(`${this.withdrawalApprovalUrl}/${params.id}/approve`, request);
        return utils_1.convertTransferDTO(transfer);
    }
    async reject(params) {
        const request = {
            otpCode: params.otpCode,
        };
        await this.client.post(`${this.withdrawalApprovalUrl}/${params.id}/reject`, request);
    }
    getAddress() {
        return this.data.address;
    }
    getData() {
        return this.data;
    }
    getId() {
        return this.data.id;
    }
    getEncryptionKey() {
        return this.data.encryptionKey;
    }
    getAccountKey() {
        return this.data.accountKey;
    }
    updateAccountKey(key) {
        this.data.accountKey = key;
    }
    async changeName(name) {
        common_1.checkNullAndUndefinedParameter({ name });
        const request = {
            name,
        };
        const btcWalletData = await this.client.patch(`${this.baseUrl}/name`, request);
        this.data.name = btcWalletData.name;
    }
    async activate(accountKey, backupKey) {
        const params = {
            accountKey: {
                pub: accountKey.pub,
                keyFile: undefined,
            },
            backupKey: {
                pub: backupKey.pub,
                keyFile: undefined,
            },
        };
        const masterWallet = await this.client.post(`${this.baseUrl}/activate`, params);
        const { id, name: walletName, address, status, createdAt, updatedAt, } = masterWallet;
        return {
            id,
            name: walletName,
            blockchain: blockchain_1.BlockchainType.BITCOIN,
            address,
            status,
            createdAt,
            updatedAt,
        };
    }
}
exports.BtcMasterWallet = BtcMasterWallet;
//# sourceMappingURL=wallet.js.map