"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organizations = void 0;
const url_1 = require("./utils/url");
class Organizations {
    constructor(client) {
        this.baseUrl = "/organizations";
        this.client = client;
    }
    async getOrganization() {
        return this.client.get(`${this.baseUrl}/me`);
    }
    getAccounts() {
        return this.client.get(`${this.baseUrl}/accounts`);
    }
    createSecret() {
        return this.client.post(`${this.baseUrl}/secret`);
    }
    changeAccountRole(accountId, role, otpCode) {
        return this.client.patch(`${this.baseUrl}/accounts/${accountId}`, {
            role,
            otpCode,
        });
    }
    async addAllowedIP(params) {
        const request = Object.assign({}, params);
        const result = await this.client.post(`${this.baseUrl}/allowed-ips`, request);
        return this.convertAllowedIpDTO(result);
    }
    async getAllowedIPs(options) {
        const queryString = url_1.makeQueryString(options);
        const result = await this.client.get(`${this.baseUrl}/allowed-ips${queryString ? `?${queryString}` : ""}`);
        return {
            pagination: result.pagination,
            results: result.results.map(this.convertAllowedIpDTO),
        };
    }
    async getAllowedIP(id) {
        const result = await this.client.get(`${this.baseUrl}/allowed-ips/${id}`);
        return this.convertAllowedIpDTO(result);
    }
    async patchAllowedIpLabel(params) {
        const request = {
            label: params.label,
            otpCode: params.otpCode,
        };
        const result = await this.client.patch(`${this.baseUrl}/allowed-ips/${params.id}/label`, request);
        return this.convertAllowedIpDTO(result);
    }
    async deleteAllowedIp(id, otpCode) {
        const request = {
            otpCode,
        };
        await this.client.delete(`${this.baseUrl}/allowed-ips/${id}`, {
            data: request,
        });
    }
    async activateAllowedIps(otpCode) {
        const request = {
            otpCode,
        };
        await this.client.post(`${this.baseUrl}/activate-allowed-ips`, request);
    }
    async inactivateAllowedIps(otpCode) {
        const request = {
            otpCode,
        };
        await this.client.post(`${this.baseUrl}/inactivate-allowed-ips`, request);
    }
    convertAllowedIpDTO(dto) {
        var _a;
        return Object.assign(Object.assign({}, dto), { location: (_a = dto.location) !== null && _a !== void 0 ? _a : null });
    }
}
exports.Organizations = Organizations;
//# sourceMappingURL=organizations.js.map