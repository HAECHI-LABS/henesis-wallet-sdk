"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accounts = exports.Role = void 0;
const accounts_1 = require("./__generate__/accounts");
const url_1 = require("./utils/url");
exports.Role = accounts_1.Role;
class Accounts {
    constructor(client) {
        this.baseUrl = "/accounts";
        this.DEFAULT_TOKEN_EXPIRED_TIME = 3600;
        this.client = client;
    }
    me() {
        return this.client.get(`${this.baseUrl}/me`);
    }
    login(email, password, otpCode) {
        return this.client.post(`${this.baseUrl}/login`, {
            email,
            password,
            otpCode,
        });
    }
    async signup(params) {
        return await this.client.post(`${this.baseUrl}/signup`, params);
    }
    async verifyEmail(email) {
        await this.client.post(`${this.baseUrl}/verify-email`, { email });
    }
    async verify(params) {
        const queryString = url_1.makeQueryString({
            identifier: params.identifier,
            account_id: params.accountId,
        });
        await this.client.get(`${this.baseUrl}/login/verify${queryString ? `?${queryString}` : ""}`);
    }
    async changeName(firstName, lastName) {
        const params = {
            firstName,
            lastName,
        };
        await this.client.patch(`${this.baseUrl}/name`, params);
    }
    async changePassword(password, newPassword, otpCode) {
        const params = {
            newPassword,
            password,
            otpCode,
        };
        await this.client.patch(`${this.baseUrl}/password`, params);
    }
    createAccessToken(expiresIn) {
        const requestExpiresIn = expiresIn || this.DEFAULT_TOKEN_EXPIRED_TIME;
        return this.client.post(`${this.baseUrl}/token`, {
            expiresIn: requestExpiresIn,
        });
    }
    refreshShortAccessToken(otpCode) {
        return this.client.post(`${this.baseUrl}/token?type=short`, {
            otpCode,
        });
    }
    getAccessToken() {
        return this.client.get(`${this.baseUrl}/token`);
    }
    async updateLanguage(language) {
        await this.client.patch(`${this.baseUrl}/language`, {
            newLanguage: language,
        });
    }
}
exports.Accounts = Accounts;
//# sourceMappingURL=accounts.js.map