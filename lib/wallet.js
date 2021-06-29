"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = exports.convertWalletStatus = exports.WalletStatus = exports.WalletType = exports.transformPolicyType = exports.PolicyType = exports.AllowedCoinType = exports.WhitelistType = void 0;
const aes_js_1 = __importDefault(require("aes-js"));
const js_base64_1 = require("js-base64");
const common_1 = require("./utils/common");
const url_1 = require("./utils/url");
const api_1 = require("./__generate__/eth/api");
exports.WhitelistType = api_1.WhitelistType;
exports.AllowedCoinType = api_1.AllowedCoinType;
var PolicyType;
(function (PolicyType) {
    PolicyType["DAILY"] = "DAILY";
    PolicyType["TRANSACTION"] = "TRANSACTION";
})(PolicyType = exports.PolicyType || (exports.PolicyType = {}));
exports.transformPolicyType = (type) => {
    const byPolicyType = {
        DAILY: PolicyType.DAILY,
        TRANSACTION: PolicyType.TRANSACTION,
    };
    return byPolicyType[type];
};
exports.WalletType = api_1.WalletType;
var WalletStatus;
(function (WalletStatus) {
    WalletStatus["ACTIVE"] = "ACTIVE";
    WalletStatus["CREATING"] = "CREATING";
    WalletStatus["FAILED"] = "FAILED";
    WalletStatus["INACTIVE"] = "INACTIVE";
})(WalletStatus = exports.WalletStatus || (exports.WalletStatus = {}));
exports.convertWalletStatus = (status) => {
    const byWalletStatus = {
        ACTIVE: WalletStatus.ACTIVE,
        CREATING: WalletStatus.CREATING,
        FAILED: WalletStatus.FAILED,
        INACTIVE: WalletStatus.INACTIVE,
    };
    return byWalletStatus[status];
};
class Wallet {
    constructor(client, keychains, baseUrl) {
        this.withdrawalApprovalUrl = "/withdrawal-approvals";
        this.client = client;
        this.keychains = keychains;
        this.baseUrl = baseUrl;
    }
    recoverPassphrase(encryptedPassphrase) {
        try {
            const aesCtr = new aes_js_1.default.ModeOfOperation.ctr(aes_js_1.default.utils.hex.toBytes(this.getEncryptionKey()));
            const decryptedBytes = aesCtr.decrypt(aes_js_1.default.utils.hex.toBytes(js_base64_1.Base64.decode(encryptedPassphrase)));
            return aes_js_1.default.utils.utf8.fromBytes(decryptedBytes);
        }
        catch (e) {
            throw new Error("failed to recover passphrase");
        }
    }
    async changePassphrase(passphrase, newPassphrase, otpCode) {
        common_1.checkNullAndUndefinedParameter({
            passphrase,
            newPassphrase,
        });
        return await this.changePassphraseWithKeyFile(passphrase, newPassphrase, this.getAccountKey(), otpCode);
    }
    async changePassphraseWithKeyFile(passphrase, newPassphrase, targetKey, otpCode) {
        const newKey = this.keychains.changePassword(targetKey, passphrase, newPassphrase);
        const key = await this.client.patch(`${this.baseUrl}/account-key`, {
            keyFile: newKey.keyFile,
            otpCode,
        });
        this.updateAccountKey(key);
    }
    async restorePassphrase(encryptedPassphrase, newPassphrase, otpCode) {
        const passphrase = this.recoverPassphrase(encryptedPassphrase);
        const initialKey = await this.client.get(`${this.baseUrl}/initial-key`);
        await this.changePassphraseWithKeyFile(passphrase, newPassphrase, initialKey, otpCode);
    }
    async verifyEncryptedPassphrase(encryptedPassphrase) {
        let passphrase;
        try {
            passphrase = this.recoverPassphrase(encryptedPassphrase);
        }
        catch (e) {
            return false;
        }
        const initialKey = await this.client.get(`${this.baseUrl}/initial-key`);
        return await this.verifyPassphraseWithKeyFile(passphrase, initialKey);
    }
    async verifyPassphrase(passphrase) {
        return this.verifyPassphraseWithKeyFile(passphrase);
    }
    async verifyPassphraseWithKeyFile(passphrase, initialKey) {
        try {
            this.keychains.decrypt(initialKey ? initialKey : this.getAccountKey(), passphrase);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async createWithdrawalPolicy(params) {
        const { limitAmount, walletType, policyType, coinSymbol, otpCode } = params;
        const request = {
            limitAmount: common_1.BNConverter.bnToHexString(limitAmount),
            walletType: walletType,
            type: policyType,
            coinSymbol,
            otpCode,
        };
        const data = await this.client.post(`${this.baseUrl}/withdrawal-policies`, request);
        return Object.assign(Object.assign({}, data), { type: exports.transformPolicyType(data.type), limitAmount: common_1.BNConverter.hexStringToBN(data.limitAmount) });
    }
    async patchWithdrawalPolicy(params) {
        const { id, limitAmount, otpCode } = params;
        const request = {
            limitAmount: common_1.BNConverter.bnToHexString(limitAmount),
            otpCode,
        };
        const data = await this.client.patch(`${this.baseUrl}/withdrawal-policies/${id}`, request);
        return Object.assign(Object.assign({}, data), { type: exports.transformPolicyType(data.type), limitAmount: common_1.BNConverter.hexStringToBN(data.limitAmount) });
    }
    async getWithdrawalPolices(options) {
        const queryString = url_1.makeQueryString(options);
        const data = await this.client.get(`${this.baseUrl}/withdrawal-policies${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: data.pagination,
            results: data.results.map((data) => {
                return Object.assign(Object.assign({}, data), { type: exports.transformPolicyType(data.type), limitAmount: common_1.BNConverter.hexStringToBN(data.limitAmount) });
            }),
        };
    }
    async createAllowedAddress(params) {
        const request = {
            address: params.address,
            label: params.label,
            coinId: params.coinId,
            whitelistType: params.whitelistType,
            allowedCoinType: params.allowedCoinType,
            otpCode: params.otpCode,
        };
        return await this.client.post(`${this.baseUrl}/allowed-addresses`, request);
    }
    async getAllowedAddresses(options) {
        const queryString = url_1.makeQueryString(options);
        return await this.client.get(`${this.baseUrl}/allowed-addresses${queryString ? `?${queryString}` : ""}`);
    }
    async getAllowedAddress(id) {
        return await this.client.get(`${this.baseUrl}/allowed-addresses/${id}`);
    }
    async deleteAllowedAddress(id, otpCode) {
        const request = {
            otpCode,
        };
        await this.client.delete(`${this.baseUrl}/allowed-addresses/${id}`, {
            data: request,
        });
    }
    async activateAllowedAddresses(otpCode) {
        const request = {
            otpCode,
        };
        await this.client.post(`${this.baseUrl}/activate-allowed-addresses`, request);
    }
    async inactivateAllowedAddresses(otpCode) {
        const request = {
            otpCode,
        };
        await this.client.post(`${this.baseUrl}/inactivate-allowed-addresses`, request);
    }
    async validateAllowedAddress(address, coinId) {
        const request = {
            address,
            coinId,
        };
        const response = await this.client.post(`${this.baseUrl}/allowed-addresses/validate`, request);
        return response.isValid;
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.js.map