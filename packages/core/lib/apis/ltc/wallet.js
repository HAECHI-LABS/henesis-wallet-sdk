"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepositAddressApi = exports.createDepositAddressApi = void 0;
const lodash_1 = __importDefault(require("lodash"));
const ltc_1 = require("../../__generate__/ltc");
const walletControllerApi = (client) => {
    const apiClient = lodash_1.default.get(client, ["apiClient"]);
    return ltc_1.WalletControllerApiFactory(undefined, "", apiClient);
};
exports.createDepositAddressApi = async ({ client, walletId, request, }) => {
    const response = await walletControllerApi(client).createDepositAddress1(walletId, request);
    return response.data;
};
exports.getDepositAddressApi = async ({ client, walletId, depositAddressId, }) => {
    const response = await walletControllerApi(client).getDepositAddress1(walletId, depositAddressId);
    return response.data;
};
//# sourceMappingURL=wallet.js.map