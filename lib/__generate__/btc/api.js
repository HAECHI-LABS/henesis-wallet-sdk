"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalApprovalControllerApi = exports.WithdrawalApprovalControllerApiFactory = exports.WithdrawalApprovalControllerApiFp = exports.WithdrawalApprovalControllerApiAxiosParamCreator = exports.WalletControllerApi = exports.WalletControllerApiFactory = exports.WalletControllerApiFp = exports.WalletControllerApiAxiosParamCreator = exports.TransferControllerApi = exports.TransferControllerApiFactory = exports.TransferControllerApiFp = exports.TransferControllerApiAxiosParamCreator = exports.LtcWithdrawalApprovalControllerApi = exports.LtcWithdrawalApprovalControllerApiFactory = exports.LtcWithdrawalApprovalControllerApiFp = exports.LtcWithdrawalApprovalControllerApiAxiosParamCreator = exports.LtcWalletControllerApi = exports.LtcWalletControllerApiFactory = exports.LtcWalletControllerApiFp = exports.LtcWalletControllerApiAxiosParamCreator = exports.LtcTransferControllerApi = exports.LtcTransferControllerApiFactory = exports.LtcTransferControllerApiFp = exports.LtcTransferControllerApiAxiosParamCreator = exports.LtcInternalControllerApi = exports.LtcInternalControllerApiFactory = exports.LtcInternalControllerApiFp = exports.LtcInternalControllerApiAxiosParamCreator = exports.LtcAdminControllerApi = exports.LtcAdminControllerApiFactory = exports.LtcAdminControllerApiFp = exports.LtcAdminControllerApiAxiosParamCreator = exports.InternalControllerApi = exports.InternalControllerApiFactory = exports.InternalControllerApiFp = exports.InternalControllerApiAxiosParamCreator = exports.BchWithdrawalApprovalControllerApi = exports.BchWithdrawalApprovalControllerApiFactory = exports.BchWithdrawalApprovalControllerApiFp = exports.BchWithdrawalApprovalControllerApiAxiosParamCreator = exports.BchWalletControllerApi = exports.BchWalletControllerApiFactory = exports.BchWalletControllerApiFp = exports.BchWalletControllerApiAxiosParamCreator = exports.BchTransferControllerApi = exports.BchTransferControllerApiFactory = exports.BchTransferControllerApiFp = exports.BchTransferControllerApiAxiosParamCreator = exports.BchInternalControllerApi = exports.BchInternalControllerApiFactory = exports.BchInternalControllerApiFp = exports.BchInternalControllerApiAxiosParamCreator = exports.BchAdminControllerApi = exports.BchAdminControllerApiFactory = exports.BchAdminControllerApiFp = exports.BchAdminControllerApiAxiosParamCreator = exports.AdminControllerApi = exports.AdminControllerApiFactory = exports.AdminControllerApiFp = exports.AdminControllerApiAxiosParamCreator = exports.WithdrawalPolicyType = exports.WhitelistType = exports.WalletStatus = exports.WalletDTOStatusEnum = exports.WalletDTOTypeEnum = exports.WalletDTOBlockchainEnum = exports.TransferType = exports.TransferStatus = exports.SimplifiedTransferDTOStatusEnum = exports.SimplifiedTransferDTOTypeEnum = exports.CoinSymbol = exports.Blockchain = exports.AllowedCoinType = void 0;
const globalImportUrl = __importStar(require("url"));
const axios_1 = __importDefault(require("axios"));
const base_1 = require("./base");
var AllowedCoinType;
(function (AllowedCoinType) {
    AllowedCoinType["ALL"] = "ALL";
    AllowedCoinType["SINGLE"] = "SINGLE";
})(AllowedCoinType = exports.AllowedCoinType || (exports.AllowedCoinType = {}));
var Blockchain;
(function (Blockchain) {
    Blockchain["ETHEREUM"] = "ETHEREUM";
    Blockchain["KLAYTN"] = "KLAYTN";
    Blockchain["BITCOIN"] = "BITCOIN";
    Blockchain["FILECOIN"] = "FILECOIN";
    Blockchain["BINANCESMARTCHAIN"] = "BINANCE_SMART_CHAIN";
    Blockchain["LITECOIN"] = "LITECOIN";
    Blockchain["BITCOINCASH"] = "BITCOIN_CASH";
})(Blockchain = exports.Blockchain || (exports.Blockchain = {}));
var CoinSymbol;
(function (CoinSymbol) {
    CoinSymbol["ETH"] = "ETH";
    CoinSymbol["KLAY"] = "KLAY";
    CoinSymbol["BTC"] = "BTC";
    CoinSymbol["FIL"] = "FIL";
    CoinSymbol["BNB"] = "BNB";
    CoinSymbol["LTC"] = "LTC";
    CoinSymbol["BCH"] = "BCH";
})(CoinSymbol = exports.CoinSymbol || (exports.CoinSymbol = {}));
var SimplifiedTransferDTOTypeEnum;
(function (SimplifiedTransferDTOTypeEnum) {
    SimplifiedTransferDTOTypeEnum["WITHDRAWAL"] = "WITHDRAWAL";
    SimplifiedTransferDTOTypeEnum["DEPOSIT"] = "DEPOSIT";
})(SimplifiedTransferDTOTypeEnum = exports.SimplifiedTransferDTOTypeEnum || (exports.SimplifiedTransferDTOTypeEnum = {}));
var SimplifiedTransferDTOStatusEnum;
(function (SimplifiedTransferDTOStatusEnum) {
    SimplifiedTransferDTOStatusEnum["PENDINGAPPROVAL"] = "PENDING_APPROVAL";
    SimplifiedTransferDTOStatusEnum["REJECTED"] = "REJECTED";
    SimplifiedTransferDTOStatusEnum["PENDING"] = "PENDING";
    SimplifiedTransferDTOStatusEnum["MINED"] = "MINED";
    SimplifiedTransferDTOStatusEnum["CONFIRMED"] = "CONFIRMED";
    SimplifiedTransferDTOStatusEnum["REQUESTED"] = "REQUESTED";
})(SimplifiedTransferDTOStatusEnum = exports.SimplifiedTransferDTOStatusEnum || (exports.SimplifiedTransferDTOStatusEnum = {}));
var TransferStatus;
(function (TransferStatus) {
    TransferStatus["PENDINGAPPROVAL"] = "PENDING_APPROVAL";
    TransferStatus["REJECTED"] = "REJECTED";
    TransferStatus["PENDING"] = "PENDING";
    TransferStatus["MINED"] = "MINED";
    TransferStatus["CONFIRMED"] = "CONFIRMED";
    TransferStatus["REQUESTED"] = "REQUESTED";
})(TransferStatus = exports.TransferStatus || (exports.TransferStatus = {}));
var TransferType;
(function (TransferType) {
    TransferType["WITHDRAWAL"] = "WITHDRAWAL";
    TransferType["DEPOSIT"] = "DEPOSIT";
})(TransferType = exports.TransferType || (exports.TransferType = {}));
var WalletDTOBlockchainEnum;
(function (WalletDTOBlockchainEnum) {
    WalletDTOBlockchainEnum["ETHEREUM"] = "ETHEREUM";
    WalletDTOBlockchainEnum["KLAYTN"] = "KLAYTN";
    WalletDTOBlockchainEnum["BITCOIN"] = "BITCOIN";
    WalletDTOBlockchainEnum["FILECOIN"] = "FILECOIN";
    WalletDTOBlockchainEnum["BINANCESMARTCHAIN"] = "BINANCE_SMART_CHAIN";
    WalletDTOBlockchainEnum["LITECOIN"] = "LITECOIN";
    WalletDTOBlockchainEnum["BITCOINCASH"] = "BITCOIN_CASH";
})(WalletDTOBlockchainEnum = exports.WalletDTOBlockchainEnum || (exports.WalletDTOBlockchainEnum = {}));
var WalletDTOTypeEnum;
(function (WalletDTOTypeEnum) {
    WalletDTOTypeEnum["MASTERWALLET"] = "MASTER_WALLET";
    WalletDTOTypeEnum["DEPOSITADDRESS"] = "DEPOSIT_ADDRESS";
})(WalletDTOTypeEnum = exports.WalletDTOTypeEnum || (exports.WalletDTOTypeEnum = {}));
var WalletDTOStatusEnum;
(function (WalletDTOStatusEnum) {
    WalletDTOStatusEnum["ACTIVE"] = "ACTIVE";
    WalletDTOStatusEnum["INACTIVE"] = "INACTIVE";
    WalletDTOStatusEnum["CREATING"] = "CREATING";
})(WalletDTOStatusEnum = exports.WalletDTOStatusEnum || (exports.WalletDTOStatusEnum = {}));
var WalletStatus;
(function (WalletStatus) {
    WalletStatus["ACTIVE"] = "ACTIVE";
    WalletStatus["INACTIVE"] = "INACTIVE";
    WalletStatus["CREATING"] = "CREATING";
})(WalletStatus = exports.WalletStatus || (exports.WalletStatus = {}));
var WhitelistType;
(function (WhitelistType) {
    WhitelistType["ALL"] = "ALL";
    WhitelistType["SINGLE"] = "SINGLE";
})(WhitelistType = exports.WhitelistType || (exports.WhitelistType = {}));
var WithdrawalPolicyType;
(function (WithdrawalPolicyType) {
    WithdrawalPolicyType["DAILY"] = "DAILY";
    WithdrawalPolicyType["TRANSACTION"] = "TRANSACTION";
})(WithdrawalPolicyType = exports.WithdrawalPolicyType || (exports.WithdrawalPolicyType = {}));
exports.AdminControllerApiAxiosParamCreator = function (configuration) {
    return {
        getDepositAddresses5: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getDepositAddresses5.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getDepositAddresses5.');
            }
            const localVarPath = `/api/v2/btc/admin/deposit-addresses`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getExternalWithdrawals2: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getExternalWithdrawals2.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getExternalWithdrawals2.');
            }
            const localVarPath = `/api/v2/btc/admin/external-withdrawals`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWallets5: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getMasterWallets5.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getMasterWallets5.');
            }
            const localVarPath = `/api/v2/btc/admin/master-wallets`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getTransfers8: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers8.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getTransfers8.');
            }
            const localVarPath = `/api/v2/btc/admin/transfers`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.AdminControllerApiFp = function (configuration) {
    return {
        async getDepositAddresses5(pageable, condition, options) {
            const localVarAxiosArgs = await exports.AdminControllerApiAxiosParamCreator(configuration).getDepositAddresses5(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getExternalWithdrawals2(pageable, condition, options) {
            const localVarAxiosArgs = await exports.AdminControllerApiAxiosParamCreator(configuration).getExternalWithdrawals2(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets5(pageable, condition, options) {
            const localVarAxiosArgs = await exports.AdminControllerApiAxiosParamCreator(configuration).getMasterWallets5(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers8(pageable, condition, options) {
            const localVarAxiosArgs = await exports.AdminControllerApiAxiosParamCreator(configuration).getTransfers8(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.AdminControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getDepositAddresses5(pageable, condition, options) {
            return exports.AdminControllerApiFp(configuration).getDepositAddresses5(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getExternalWithdrawals2(pageable, condition, options) {
            return exports.AdminControllerApiFp(configuration).getExternalWithdrawals2(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getMasterWallets5(pageable, condition, options) {
            return exports.AdminControllerApiFp(configuration).getMasterWallets5(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getTransfers8(pageable, condition, options) {
            return exports.AdminControllerApiFp(configuration).getTransfers8(pageable, condition, options).then((request) => request(axios, basePath));
        },
    };
};
class AdminControllerApi extends base_1.BaseAPI {
    getDepositAddresses5(pageable, condition, options) {
        return exports.AdminControllerApiFp(this.configuration).getDepositAddresses5(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getExternalWithdrawals2(pageable, condition, options) {
        return exports.AdminControllerApiFp(this.configuration).getExternalWithdrawals2(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets5(pageable, condition, options) {
        return exports.AdminControllerApiFp(this.configuration).getMasterWallets5(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers8(pageable, condition, options) {
        return exports.AdminControllerApiFp(this.configuration).getTransfers8(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.AdminControllerApi = AdminControllerApi;
exports.BchAdminControllerApiAxiosParamCreator = function (configuration) {
    return {
        getDepositAddresses3: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getDepositAddresses3.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getDepositAddresses3.');
            }
            const localVarPath = `/api/v2/bch/admin/deposit-addresses`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getExternalWithdrawals1: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getExternalWithdrawals1.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getExternalWithdrawals1.');
            }
            const localVarPath = `/api/v2/bch/admin/external-withdrawals`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWallets3: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getMasterWallets3.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getMasterWallets3.');
            }
            const localVarPath = `/api/v2/bch/admin/master-wallets`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getTransfers4: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers4.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getTransfers4.');
            }
            const localVarPath = `/api/v2/bch/admin/transfers`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.BchAdminControllerApiFp = function (configuration) {
    return {
        async getDepositAddresses3(pageable, condition, options) {
            const localVarAxiosArgs = await exports.BchAdminControllerApiAxiosParamCreator(configuration).getDepositAddresses3(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getExternalWithdrawals1(pageable, condition, options) {
            const localVarAxiosArgs = await exports.BchAdminControllerApiAxiosParamCreator(configuration).getExternalWithdrawals1(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets3(pageable, condition, options) {
            const localVarAxiosArgs = await exports.BchAdminControllerApiAxiosParamCreator(configuration).getMasterWallets3(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers4(pageable, condition, options) {
            const localVarAxiosArgs = await exports.BchAdminControllerApiAxiosParamCreator(configuration).getTransfers4(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BchAdminControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getDepositAddresses3(pageable, condition, options) {
            return exports.BchAdminControllerApiFp(configuration).getDepositAddresses3(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getExternalWithdrawals1(pageable, condition, options) {
            return exports.BchAdminControllerApiFp(configuration).getExternalWithdrawals1(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getMasterWallets3(pageable, condition, options) {
            return exports.BchAdminControllerApiFp(configuration).getMasterWallets3(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getTransfers4(pageable, condition, options) {
            return exports.BchAdminControllerApiFp(configuration).getTransfers4(pageable, condition, options).then((request) => request(axios, basePath));
        },
    };
};
class BchAdminControllerApi extends base_1.BaseAPI {
    getDepositAddresses3(pageable, condition, options) {
        return exports.BchAdminControllerApiFp(this.configuration).getDepositAddresses3(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getExternalWithdrawals1(pageable, condition, options) {
        return exports.BchAdminControllerApiFp(this.configuration).getExternalWithdrawals1(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets3(pageable, condition, options) {
        return exports.BchAdminControllerApiFp(this.configuration).getMasterWallets3(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers4(pageable, condition, options) {
        return exports.BchAdminControllerApiFp(this.configuration).getTransfers4(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BchAdminControllerApi = BchAdminControllerApi;
exports.BchInternalControllerApiAxiosParamCreator = function (configuration) {
    return {
        getTransfer2: async (transferId, options = {}) => {
            if (transferId === null || transferId === undefined) {
                throw new base_1.RequiredError('transferId', 'Required parameter transferId was null or undefined when calling getTransfer2.');
            }
            const localVarPath = `/api/v2/bch/internal/transfers/{transferId}`
                .replace(`{${"transferId"}}`, encodeURIComponent(String(transferId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getTransfers3: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers3.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getTransfers3.');
            }
            const localVarPath = `/api/v2/bch/internal/transfers`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.BchInternalControllerApiFp = function (configuration) {
    return {
        async getTransfer2(transferId, options) {
            const localVarAxiosArgs = await exports.BchInternalControllerApiAxiosParamCreator(configuration).getTransfer2(transferId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers3(pageable, specs, options) {
            const localVarAxiosArgs = await exports.BchInternalControllerApiAxiosParamCreator(configuration).getTransfers3(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BchInternalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getTransfer2(transferId, options) {
            return exports.BchInternalControllerApiFp(configuration).getTransfer2(transferId, options).then((request) => request(axios, basePath));
        },
        getTransfers3(pageable, specs, options) {
            return exports.BchInternalControllerApiFp(configuration).getTransfers3(pageable, specs, options).then((request) => request(axios, basePath));
        },
    };
};
class BchInternalControllerApi extends base_1.BaseAPI {
    getTransfer2(transferId, options) {
        return exports.BchInternalControllerApiFp(this.configuration).getTransfer2(transferId, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers3(pageable, specs, options) {
        return exports.BchInternalControllerApiFp(this.configuration).getTransfers3(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BchInternalControllerApi = BchInternalControllerApi;
exports.BchTransferControllerApiAxiosParamCreator = function (configuration) {
    return {
        getTransfer3: async (transferId, options = {}) => {
            if (transferId === null || transferId === undefined) {
                throw new base_1.RequiredError('transferId', 'Required parameter transferId was null or undefined when calling getTransfer3.');
            }
            const localVarPath = `/api/v2/bch/transfers/{transferId}`
                .replace(`{${"transferId"}}`, encodeURIComponent(String(transferId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getTransfers5: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers5.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getTransfers5.');
            }
            const localVarPath = `/api/v2/bch/transfers`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.BchTransferControllerApiFp = function (configuration) {
    return {
        async getTransfer3(transferId, options) {
            const localVarAxiosArgs = await exports.BchTransferControllerApiAxiosParamCreator(configuration).getTransfer3(transferId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers5(pageable, specs, options) {
            const localVarAxiosArgs = await exports.BchTransferControllerApiAxiosParamCreator(configuration).getTransfers5(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BchTransferControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getTransfer3(transferId, options) {
            return exports.BchTransferControllerApiFp(configuration).getTransfer3(transferId, options).then((request) => request(axios, basePath));
        },
        getTransfers5(pageable, specs, options) {
            return exports.BchTransferControllerApiFp(configuration).getTransfers5(pageable, specs, options).then((request) => request(axios, basePath));
        },
    };
};
class BchTransferControllerApi extends base_1.BaseAPI {
    getTransfer3(transferId, options) {
        return exports.BchTransferControllerApiFp(this.configuration).getTransfer3(transferId, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers5(pageable, specs, options) {
        return exports.BchTransferControllerApiFp(this.configuration).getTransfers5(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BchTransferControllerApi = BchTransferControllerApi;
exports.BchWalletControllerApiAxiosParamCreator = function (configuration) {
    return {
        activateAllowedAddresses1: async (walletId, activateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling activateAllowedAddresses1.');
            }
            if (activateAllowedAddressesRequest === null || activateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('activateAllowedAddressesRequest', 'Required parameter activateAllowedAddressesRequest was null or undefined when calling activateAllowedAddresses1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/activate-allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof activateAllowedAddressesRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(activateAllowedAddressesRequest !== undefined ? activateAllowedAddressesRequest : {}) : (activateAllowedAddressesRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        activateMasterWallet1: async (walletId, activateMasterWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling activateMasterWallet1.');
            }
            if (activateMasterWalletRequest === null || activateMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('activateMasterWalletRequest', 'Required parameter activateMasterWalletRequest was null or undefined when calling activateMasterWallet1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/activate`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof activateMasterWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(activateMasterWalletRequest !== undefined ? activateMasterWalletRequest : {}) : (activateMasterWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        calculateEstimatedFee1: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling calculateEstimatedFee1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/estimated-fee`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createAllowedAddress1: async (walletId, createAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createAllowedAddress1.');
            }
            if (createAllowedAddressRequest === null || createAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('createAllowedAddressRequest', 'Required parameter createAllowedAddressRequest was null or undefined when calling createAllowedAddress1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createAllowedAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createAllowedAddressRequest !== undefined ? createAllowedAddressRequest : {}) : (createAllowedAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createDepositAddress1: async (walletId, createDepositAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createDepositAddress1.');
            }
            if (createDepositAddressRequest === null || createDepositAddressRequest === undefined) {
                throw new base_1.RequiredError('createDepositAddressRequest', 'Required parameter createDepositAddressRequest was null or undefined when calling createDepositAddress1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/deposit-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createDepositAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createDepositAddressRequest !== undefined ? createDepositAddressRequest : {}) : (createDepositAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createMasterWallet2: async (createInactiveMasterWalletRequest, options = {}) => {
            if (createInactiveMasterWalletRequest === null || createInactiveMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('createInactiveMasterWalletRequest', 'Required parameter createInactiveMasterWalletRequest was null or undefined when calling createMasterWallet2.');
            }
            const localVarPath = `/api/v2/bch/wallets`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createInactiveMasterWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createInactiveMasterWalletRequest !== undefined ? createInactiveMasterWalletRequest : {}) : (createInactiveMasterWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createRawTransaction1: async (walletId, createRawTransactionRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createRawTransaction1.');
            }
            if (createRawTransactionRequest === null || createRawTransactionRequest === undefined) {
                throw new base_1.RequiredError('createRawTransactionRequest', 'Required parameter createRawTransactionRequest was null or undefined when calling createRawTransaction1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/raw-transactions`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createRawTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createRawTransactionRequest !== undefined ? createRawTransactionRequest : {}) : (createRawTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createWalletWithdrawalPolicy1: async (walletId, createWithdrawalPolicyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createWalletWithdrawalPolicy1.');
            }
            if (createWithdrawalPolicyRequest === null || createWithdrawalPolicyRequest === undefined) {
                throw new base_1.RequiredError('createWithdrawalPolicyRequest', 'Required parameter createWithdrawalPolicyRequest was null or undefined when calling createWalletWithdrawalPolicy1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/withdrawal-policies`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createWithdrawalPolicyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createWithdrawalPolicyRequest !== undefined ? createWithdrawalPolicyRequest : {}) : (createWithdrawalPolicyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        deleteAllowedAddress1: async (walletId, allowedAddressId, deleteAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling deleteAllowedAddress1.');
            }
            if (allowedAddressId === null || allowedAddressId === undefined) {
                throw new base_1.RequiredError('allowedAddressId', 'Required parameter allowedAddressId was null or undefined when calling deleteAllowedAddress1.');
            }
            if (deleteAllowedAddressRequest === null || deleteAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('deleteAllowedAddressRequest', 'Required parameter deleteAllowedAddressRequest was null or undefined when calling deleteAllowedAddress1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"allowedAddressId"}}`, encodeURIComponent(String(allowedAddressId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'DELETE' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof deleteAllowedAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(deleteAllowedAddressRequest !== undefined ? deleteAllowedAddressRequest : {}) : (deleteAllowedAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getAllowedAddress1: async (walletId, allowedAddressId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddress1.');
            }
            if (allowedAddressId === null || allowedAddressId === undefined) {
                throw new base_1.RequiredError('allowedAddressId', 'Required parameter allowedAddressId was null or undefined when calling getAllowedAddress1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"allowedAddressId"}}`, encodeURIComponent(String(allowedAddressId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getAllowedAddresses1: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddresses1.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllowedAddresses1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getBalance1: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getBalance1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/balance`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getDepositAddress1: async (walletId, depositAddressId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getDepositAddress1.');
            }
            if (depositAddressId === null || depositAddressId === undefined) {
                throw new base_1.RequiredError('depositAddressId', 'Required parameter depositAddressId was null or undefined when calling getDepositAddress1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/deposit-addresses/{depositAddressId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"depositAddressId"}}`, encodeURIComponent(String(depositAddressId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getDepositAddresses2: async (walletId, pageable, condition, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getDepositAddresses2.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getDepositAddresses2.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getDepositAddresses2.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/deposit-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWallet1: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWallet1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWalletInitialKey1: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletInitialKey1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/initial-key`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWallets2: async (specs, options = {}) => {
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getMasterWallets2.');
            }
            const localVarPath = `/api/v2/bch/wallets`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getWalletWithdrawalPolicies1: async (walletId, pageable, specs, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getWalletWithdrawalPolicies1.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getWalletWithdrawalPolicies1.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getWalletWithdrawalPolicies1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/withdrawal-policies`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getWalletWithdrawalPolicy1: async (walletId, withdrawalPolicyId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getWalletWithdrawalPolicy1.');
            }
            if (withdrawalPolicyId === null || withdrawalPolicyId === undefined) {
                throw new base_1.RequiredError('withdrawalPolicyId', 'Required parameter withdrawalPolicyId was null or undefined when calling getWalletWithdrawalPolicy1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/withdrawal-policies/{withdrawalPolicyId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"withdrawalPolicyId"}}`, encodeURIComponent(String(withdrawalPolicyId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        inactivateAllowedAddresses1: async (walletId, inactivateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling inactivateAllowedAddresses1.');
            }
            if (inactivateAllowedAddressesRequest === null || inactivateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('inactivateAllowedAddressesRequest', 'Required parameter inactivateAllowedAddressesRequest was null or undefined when calling inactivateAllowedAddresses1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/inactivate-allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof inactivateAllowedAddressesRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(inactivateAllowedAddressesRequest !== undefined ? inactivateAllowedAddressesRequest : {}) : (inactivateAllowedAddressesRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchMasterWalletAccountKey1: async (walletId, patchAccountKeyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletAccountKey1.');
            }
            if (patchAccountKeyRequest === null || patchAccountKeyRequest === undefined) {
                throw new base_1.RequiredError('patchAccountKeyRequest', 'Required parameter patchAccountKeyRequest was null or undefined when calling patchMasterWalletAccountKey1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/account-key`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'PATCH' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof patchAccountKeyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(patchAccountKeyRequest !== undefined ? patchAccountKeyRequest : {}) : (patchAccountKeyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchMasterWalletName1: async (walletId, patchWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletName1.');
            }
            if (patchWalletNameRequest === null || patchWalletNameRequest === undefined) {
                throw new base_1.RequiredError('patchWalletNameRequest', 'Required parameter patchWalletNameRequest was null or undefined when calling patchMasterWalletName1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/name`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'PATCH' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof patchWalletNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(patchWalletNameRequest !== undefined ? patchWalletNameRequest : {}) : (patchWalletNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchWalletWithdrawalPolicy1: async (walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchWalletWithdrawalPolicy1.');
            }
            if (withdrawalPolicyId === null || withdrawalPolicyId === undefined) {
                throw new base_1.RequiredError('withdrawalPolicyId', 'Required parameter withdrawalPolicyId was null or undefined when calling patchWalletWithdrawalPolicy1.');
            }
            if (patchWithdrawalPolicyRequest === null || patchWithdrawalPolicyRequest === undefined) {
                throw new base_1.RequiredError('patchWithdrawalPolicyRequest', 'Required parameter patchWithdrawalPolicyRequest was null or undefined when calling patchWalletWithdrawalPolicy1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/withdrawal-policies/{withdrawalPolicyId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"withdrawalPolicyId"}}`, encodeURIComponent(String(withdrawalPolicyId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'PATCH' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof patchWithdrawalPolicyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(patchWithdrawalPolicyRequest !== undefined ? patchWithdrawalPolicyRequest : {}) : (patchWithdrawalPolicyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        sendTransaction1: async (walletId, createTransactionRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling sendTransaction1.');
            }
            if (createTransactionRequest === null || createTransactionRequest === undefined) {
                throw new base_1.RequiredError('createTransactionRequest', 'Required parameter createTransactionRequest was null or undefined when calling sendTransaction1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/transactions`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createTransactionRequest !== undefined ? createTransactionRequest : {}) : (createTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        validateIsAllowedAddress1: async (walletId, validateIsAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling validateIsAllowedAddress1.');
            }
            if (validateIsAllowedAddressRequest === null || validateIsAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('validateIsAllowedAddressRequest', 'Required parameter validateIsAllowedAddressRequest was null or undefined when calling validateIsAllowedAddress1.');
            }
            const localVarPath = `/api/v2/bch/wallets/{walletId}/allowed-addresses/validate`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof validateIsAllowedAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(validateIsAllowedAddressRequest !== undefined ? validateIsAllowedAddressRequest : {}) : (validateIsAllowedAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.BchWalletControllerApiFp = function (configuration) {
    return {
        async activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async activateMasterWallet1(walletId, activateMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).activateMasterWallet1(walletId, activateMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async calculateEstimatedFee1(walletId, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).calculateEstimatedFee1(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createAllowedAddress1(walletId, createAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).createAllowedAddress1(walletId, createAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createDepositAddress1(walletId, createDepositAddressRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).createDepositAddress1(walletId, createDepositAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createMasterWallet2(createInactiveMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).createMasterWallet2(createInactiveMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createRawTransaction1(walletId, createRawTransactionRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).createRawTransaction1(walletId, createRawTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddress1(walletId, allowedAddressId, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).getAllowedAddress1(walletId, allowedAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddresses1(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).getAllowedAddresses1(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getBalance1(walletId, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).getBalance1(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddress1(walletId, depositAddressId, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).getDepositAddress1(walletId, depositAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddresses2(walletId, pageable, condition, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).getDepositAddresses2(walletId, pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallet1(walletId, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).getMasterWallet1(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletInitialKey1(walletId, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).getMasterWalletInitialKey1(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets2(specs, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).getMasterWallets2(specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWalletWithdrawalPolicies1(walletId, pageable, specs, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).getWalletWithdrawalPolicies1(walletId, pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).getWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletAccountKey1(walletId, patchAccountKeyRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).patchMasterWalletAccountKey1(walletId, patchAccountKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletName1(walletId, patchWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).patchMasterWalletName1(walletId, patchWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).patchWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendTransaction1(walletId, createTransactionRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).sendTransaction1(walletId, createTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.BchWalletControllerApiAxiosParamCreator(configuration).validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BchWalletControllerApiFactory = function (configuration, basePath, axios) {
    return {
        activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        activateMasterWallet1(walletId, activateMasterWalletRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).activateMasterWallet1(walletId, activateMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        calculateEstimatedFee1(walletId, options) {
            return exports.BchWalletControllerApiFp(configuration).calculateEstimatedFee1(walletId, options).then((request) => request(axios, basePath));
        },
        createAllowedAddress1(walletId, createAllowedAddressRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).createAllowedAddress1(walletId, createAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        createDepositAddress1(walletId, createDepositAddressRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).createDepositAddress1(walletId, createDepositAddressRequest, options).then((request) => request(axios, basePath));
        },
        createMasterWallet2(createInactiveMasterWalletRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).createMasterWallet2(createInactiveMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        createRawTransaction1(walletId, createRawTransactionRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).createRawTransaction1(walletId, createRawTransactionRequest, options).then((request) => request(axios, basePath));
        },
        createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        getAllowedAddress1(walletId, allowedAddressId, options) {
            return exports.BchWalletControllerApiFp(configuration).getAllowedAddress1(walletId, allowedAddressId, options).then((request) => request(axios, basePath));
        },
        getAllowedAddresses1(walletId, pageable, options) {
            return exports.BchWalletControllerApiFp(configuration).getAllowedAddresses1(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        getBalance1(walletId, options) {
            return exports.BchWalletControllerApiFp(configuration).getBalance1(walletId, options).then((request) => request(axios, basePath));
        },
        getDepositAddress1(walletId, depositAddressId, options) {
            return exports.BchWalletControllerApiFp(configuration).getDepositAddress1(walletId, depositAddressId, options).then((request) => request(axios, basePath));
        },
        getDepositAddresses2(walletId, pageable, condition, options) {
            return exports.BchWalletControllerApiFp(configuration).getDepositAddresses2(walletId, pageable, condition, options).then((request) => request(axios, basePath));
        },
        getMasterWallet1(walletId, options) {
            return exports.BchWalletControllerApiFp(configuration).getMasterWallet1(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletInitialKey1(walletId, options) {
            return exports.BchWalletControllerApiFp(configuration).getMasterWalletInitialKey1(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWallets2(specs, options) {
            return exports.BchWalletControllerApiFp(configuration).getMasterWallets2(specs, options).then((request) => request(axios, basePath));
        },
        getWalletWithdrawalPolicies1(walletId, pageable, specs, options) {
            return exports.BchWalletControllerApiFp(configuration).getWalletWithdrawalPolicies1(walletId, pageable, specs, options).then((request) => request(axios, basePath));
        },
        getWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, options) {
            return exports.BchWalletControllerApiFp(configuration).getWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, options).then((request) => request(axios, basePath));
        },
        inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletAccountKey1(walletId, patchAccountKeyRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).patchMasterWalletAccountKey1(walletId, patchAccountKeyRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletName1(walletId, patchWalletNameRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).patchMasterWalletName1(walletId, patchWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).patchWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        sendTransaction1(walletId, createTransactionRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).sendTransaction1(walletId, createTransactionRequest, options).then((request) => request(axios, basePath));
        },
        validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options) {
            return exports.BchWalletControllerApiFp(configuration).validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class BchWalletControllerApi extends base_1.BaseAPI {
    activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    activateMasterWallet1(walletId, activateMasterWalletRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).activateMasterWallet1(walletId, activateMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    calculateEstimatedFee1(walletId, options) {
        return exports.BchWalletControllerApiFp(this.configuration).calculateEstimatedFee1(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    createAllowedAddress1(walletId, createAllowedAddressRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).createAllowedAddress1(walletId, createAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createDepositAddress1(walletId, createDepositAddressRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).createDepositAddress1(walletId, createDepositAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createMasterWallet2(createInactiveMasterWalletRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).createMasterWallet2(createInactiveMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createRawTransaction1(walletId, createRawTransactionRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).createRawTransaction1(walletId, createRawTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddress1(walletId, allowedAddressId, options) {
        return exports.BchWalletControllerApiFp(this.configuration).getAllowedAddress1(walletId, allowedAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddresses1(walletId, pageable, options) {
        return exports.BchWalletControllerApiFp(this.configuration).getAllowedAddresses1(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getBalance1(walletId, options) {
        return exports.BchWalletControllerApiFp(this.configuration).getBalance1(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddress1(walletId, depositAddressId, options) {
        return exports.BchWalletControllerApiFp(this.configuration).getDepositAddress1(walletId, depositAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddresses2(walletId, pageable, condition, options) {
        return exports.BchWalletControllerApiFp(this.configuration).getDepositAddresses2(walletId, pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallet1(walletId, options) {
        return exports.BchWalletControllerApiFp(this.configuration).getMasterWallet1(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletInitialKey1(walletId, options) {
        return exports.BchWalletControllerApiFp(this.configuration).getMasterWalletInitialKey1(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets2(specs, options) {
        return exports.BchWalletControllerApiFp(this.configuration).getMasterWallets2(specs, options).then((request) => request(this.axios, this.basePath));
    }
    getWalletWithdrawalPolicies1(walletId, pageable, specs, options) {
        return exports.BchWalletControllerApiFp(this.configuration).getWalletWithdrawalPolicies1(walletId, pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, options) {
        return exports.BchWalletControllerApiFp(this.configuration).getWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, options).then((request) => request(this.axios, this.basePath));
    }
    inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletAccountKey1(walletId, patchAccountKeyRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).patchMasterWalletAccountKey1(walletId, patchAccountKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletName1(walletId, patchWalletNameRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).patchMasterWalletName1(walletId, patchWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).patchWalletWithdrawalPolicy1(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendTransaction1(walletId, createTransactionRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).sendTransaction1(walletId, createTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options) {
        return exports.BchWalletControllerApiFp(this.configuration).validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BchWalletControllerApi = BchWalletControllerApi;
exports.BchWithdrawalApprovalControllerApiAxiosParamCreator = function (configuration) {
    return {
        approveWithdrawalApproval1: async (withdrawalApprovalId, approveWithdrawalApprovalRequest, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling approveWithdrawalApproval1.');
            }
            if (approveWithdrawalApprovalRequest === null || approveWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('approveWithdrawalApprovalRequest', 'Required parameter approveWithdrawalApprovalRequest was null or undefined when calling approveWithdrawalApproval1.');
            }
            const localVarPath = `/api/v2/bch/withdrawal-approvals/{withdrawalApprovalId}/approve`
                .replace(`{${"withdrawalApprovalId"}}`, encodeURIComponent(String(withdrawalApprovalId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof approveWithdrawalApprovalRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(approveWithdrawalApprovalRequest !== undefined ? approveWithdrawalApprovalRequest : {}) : (approveWithdrawalApprovalRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        rejectWithdrawalApproval1: async (withdrawalApprovalId, rejectWithdrawalApprovalRequest, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling rejectWithdrawalApproval1.');
            }
            if (rejectWithdrawalApprovalRequest === null || rejectWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('rejectWithdrawalApprovalRequest', 'Required parameter rejectWithdrawalApprovalRequest was null or undefined when calling rejectWithdrawalApproval1.');
            }
            const localVarPath = `/api/v2/bch/withdrawal-approvals/{withdrawalApprovalId}/reject`
                .replace(`{${"withdrawalApprovalId"}}`, encodeURIComponent(String(withdrawalApprovalId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof rejectWithdrawalApprovalRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(rejectWithdrawalApprovalRequest !== undefined ? rejectWithdrawalApprovalRequest : {}) : (rejectWithdrawalApprovalRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.BchWithdrawalApprovalControllerApiFp = function (configuration) {
    return {
        async approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.BchWithdrawalApprovalControllerApiAxiosParamCreator(configuration).approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.BchWithdrawalApprovalControllerApiAxiosParamCreator(configuration).rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BchWithdrawalApprovalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            return exports.BchWithdrawalApprovalControllerApiFp(configuration).approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
        rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            return exports.BchWithdrawalApprovalControllerApiFp(configuration).rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class BchWithdrawalApprovalControllerApi extends base_1.BaseAPI {
    approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
        return exports.BchWithdrawalApprovalControllerApiFp(this.configuration).approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
    rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
        return exports.BchWithdrawalApprovalControllerApiFp(this.configuration).rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BchWithdrawalApprovalControllerApi = BchWithdrawalApprovalControllerApi;
exports.InternalControllerApiAxiosParamCreator = function (configuration) {
    return {
        getTransfer5: async (transferId, options = {}) => {
            if (transferId === null || transferId === undefined) {
                throw new base_1.RequiredError('transferId', 'Required parameter transferId was null or undefined when calling getTransfer5.');
            }
            const localVarPath = `/api/v2/btc/internal/transfers/{transferId}`
                .replace(`{${"transferId"}}`, encodeURIComponent(String(transferId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getTransfers7: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers7.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getTransfers7.');
            }
            const localVarPath = `/api/v2/btc/internal/transfers`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.InternalControllerApiFp = function (configuration) {
    return {
        async getTransfer5(transferId, options) {
            const localVarAxiosArgs = await exports.InternalControllerApiAxiosParamCreator(configuration).getTransfer5(transferId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers7(pageable, specs, options) {
            const localVarAxiosArgs = await exports.InternalControllerApiAxiosParamCreator(configuration).getTransfers7(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.InternalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getTransfer5(transferId, options) {
            return exports.InternalControllerApiFp(configuration).getTransfer5(transferId, options).then((request) => request(axios, basePath));
        },
        getTransfers7(pageable, specs, options) {
            return exports.InternalControllerApiFp(configuration).getTransfers7(pageable, specs, options).then((request) => request(axios, basePath));
        },
    };
};
class InternalControllerApi extends base_1.BaseAPI {
    getTransfer5(transferId, options) {
        return exports.InternalControllerApiFp(this.configuration).getTransfer5(transferId, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers7(pageable, specs, options) {
        return exports.InternalControllerApiFp(this.configuration).getTransfers7(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.InternalControllerApi = InternalControllerApi;
exports.LtcAdminControllerApiAxiosParamCreator = function (configuration) {
    return {
        getDepositAddresses1: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getDepositAddresses1.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getDepositAddresses1.');
            }
            const localVarPath = `/api/v2/ltc/admin/deposit-addresses`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getExternalWithdrawals: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getExternalWithdrawals.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getExternalWithdrawals.');
            }
            const localVarPath = `/api/v2/ltc/admin/external-withdrawals`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWallets1: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getMasterWallets1.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getMasterWallets1.');
            }
            const localVarPath = `/api/v2/ltc/admin/master-wallets`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getTransfers2: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers2.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getTransfers2.');
            }
            const localVarPath = `/api/v2/ltc/admin/transfers`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.LtcAdminControllerApiFp = function (configuration) {
    return {
        async getDepositAddresses1(pageable, condition, options) {
            const localVarAxiosArgs = await exports.LtcAdminControllerApiAxiosParamCreator(configuration).getDepositAddresses1(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getExternalWithdrawals(pageable, condition, options) {
            const localVarAxiosArgs = await exports.LtcAdminControllerApiAxiosParamCreator(configuration).getExternalWithdrawals(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets1(pageable, condition, options) {
            const localVarAxiosArgs = await exports.LtcAdminControllerApiAxiosParamCreator(configuration).getMasterWallets1(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers2(pageable, condition, options) {
            const localVarAxiosArgs = await exports.LtcAdminControllerApiAxiosParamCreator(configuration).getTransfers2(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.LtcAdminControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getDepositAddresses1(pageable, condition, options) {
            return exports.LtcAdminControllerApiFp(configuration).getDepositAddresses1(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getExternalWithdrawals(pageable, condition, options) {
            return exports.LtcAdminControllerApiFp(configuration).getExternalWithdrawals(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getMasterWallets1(pageable, condition, options) {
            return exports.LtcAdminControllerApiFp(configuration).getMasterWallets1(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getTransfers2(pageable, condition, options) {
            return exports.LtcAdminControllerApiFp(configuration).getTransfers2(pageable, condition, options).then((request) => request(axios, basePath));
        },
    };
};
class LtcAdminControllerApi extends base_1.BaseAPI {
    getDepositAddresses1(pageable, condition, options) {
        return exports.LtcAdminControllerApiFp(this.configuration).getDepositAddresses1(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getExternalWithdrawals(pageable, condition, options) {
        return exports.LtcAdminControllerApiFp(this.configuration).getExternalWithdrawals(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets1(pageable, condition, options) {
        return exports.LtcAdminControllerApiFp(this.configuration).getMasterWallets1(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers2(pageable, condition, options) {
        return exports.LtcAdminControllerApiFp(this.configuration).getTransfers2(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.LtcAdminControllerApi = LtcAdminControllerApi;
exports.LtcInternalControllerApiAxiosParamCreator = function (configuration) {
    return {
        getTransfer1: async (transferId, options = {}) => {
            if (transferId === null || transferId === undefined) {
                throw new base_1.RequiredError('transferId', 'Required parameter transferId was null or undefined when calling getTransfer1.');
            }
            const localVarPath = `/api/v2/ltc/internal/transfers/{transferId}`
                .replace(`{${"transferId"}}`, encodeURIComponent(String(transferId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getTransfers1: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers1.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getTransfers1.');
            }
            const localVarPath = `/api/v2/ltc/internal/transfers`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.LtcInternalControllerApiFp = function (configuration) {
    return {
        async getTransfer1(transferId, options) {
            const localVarAxiosArgs = await exports.LtcInternalControllerApiAxiosParamCreator(configuration).getTransfer1(transferId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers1(pageable, specs, options) {
            const localVarAxiosArgs = await exports.LtcInternalControllerApiAxiosParamCreator(configuration).getTransfers1(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.LtcInternalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getTransfer1(transferId, options) {
            return exports.LtcInternalControllerApiFp(configuration).getTransfer1(transferId, options).then((request) => request(axios, basePath));
        },
        getTransfers1(pageable, specs, options) {
            return exports.LtcInternalControllerApiFp(configuration).getTransfers1(pageable, specs, options).then((request) => request(axios, basePath));
        },
    };
};
class LtcInternalControllerApi extends base_1.BaseAPI {
    getTransfer1(transferId, options) {
        return exports.LtcInternalControllerApiFp(this.configuration).getTransfer1(transferId, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers1(pageable, specs, options) {
        return exports.LtcInternalControllerApiFp(this.configuration).getTransfers1(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.LtcInternalControllerApi = LtcInternalControllerApi;
exports.LtcTransferControllerApiAxiosParamCreator = function (configuration) {
    return {
        getTransfer: async (transferId, options = {}) => {
            if (transferId === null || transferId === undefined) {
                throw new base_1.RequiredError('transferId', 'Required parameter transferId was null or undefined when calling getTransfer.');
            }
            const localVarPath = `/api/v2/ltc/transfers/{transferId}`
                .replace(`{${"transferId"}}`, encodeURIComponent(String(transferId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getTransfers: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getTransfers.');
            }
            const localVarPath = `/api/v2/ltc/transfers`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.LtcTransferControllerApiFp = function (configuration) {
    return {
        async getTransfer(transferId, options) {
            const localVarAxiosArgs = await exports.LtcTransferControllerApiAxiosParamCreator(configuration).getTransfer(transferId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers(pageable, specs, options) {
            const localVarAxiosArgs = await exports.LtcTransferControllerApiAxiosParamCreator(configuration).getTransfers(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.LtcTransferControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getTransfer(transferId, options) {
            return exports.LtcTransferControllerApiFp(configuration).getTransfer(transferId, options).then((request) => request(axios, basePath));
        },
        getTransfers(pageable, specs, options) {
            return exports.LtcTransferControllerApiFp(configuration).getTransfers(pageable, specs, options).then((request) => request(axios, basePath));
        },
    };
};
class LtcTransferControllerApi extends base_1.BaseAPI {
    getTransfer(transferId, options) {
        return exports.LtcTransferControllerApiFp(this.configuration).getTransfer(transferId, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers(pageable, specs, options) {
        return exports.LtcTransferControllerApiFp(this.configuration).getTransfers(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.LtcTransferControllerApi = LtcTransferControllerApi;
exports.LtcWalletControllerApiAxiosParamCreator = function (configuration) {
    return {
        activateAllowedAddresses: async (walletId, activateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling activateAllowedAddresses.');
            }
            if (activateAllowedAddressesRequest === null || activateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('activateAllowedAddressesRequest', 'Required parameter activateAllowedAddressesRequest was null or undefined when calling activateAllowedAddresses.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/activate-allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof activateAllowedAddressesRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(activateAllowedAddressesRequest !== undefined ? activateAllowedAddressesRequest : {}) : (activateAllowedAddressesRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        activateMasterWallet: async (walletId, activateMasterWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling activateMasterWallet.');
            }
            if (activateMasterWalletRequest === null || activateMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('activateMasterWalletRequest', 'Required parameter activateMasterWalletRequest was null or undefined when calling activateMasterWallet.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/activate`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof activateMasterWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(activateMasterWalletRequest !== undefined ? activateMasterWalletRequest : {}) : (activateMasterWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        calculateEstimatedFee: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling calculateEstimatedFee.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/estimated-fee`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createAllowedAddress: async (walletId, createAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createAllowedAddress.');
            }
            if (createAllowedAddressRequest === null || createAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('createAllowedAddressRequest', 'Required parameter createAllowedAddressRequest was null or undefined when calling createAllowedAddress.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createAllowedAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createAllowedAddressRequest !== undefined ? createAllowedAddressRequest : {}) : (createAllowedAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createDepositAddress: async (walletId, createDepositAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createDepositAddress.');
            }
            if (createDepositAddressRequest === null || createDepositAddressRequest === undefined) {
                throw new base_1.RequiredError('createDepositAddressRequest', 'Required parameter createDepositAddressRequest was null or undefined when calling createDepositAddress.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/deposit-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createDepositAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createDepositAddressRequest !== undefined ? createDepositAddressRequest : {}) : (createDepositAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createMasterWallet1: async (createInactiveMasterWalletRequest, options = {}) => {
            if (createInactiveMasterWalletRequest === null || createInactiveMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('createInactiveMasterWalletRequest', 'Required parameter createInactiveMasterWalletRequest was null or undefined when calling createMasterWallet1.');
            }
            const localVarPath = `/api/v2/ltc/wallets`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createInactiveMasterWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createInactiveMasterWalletRequest !== undefined ? createInactiveMasterWalletRequest : {}) : (createInactiveMasterWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createRawTransaction: async (walletId, createRawTransactionRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createRawTransaction.');
            }
            if (createRawTransactionRequest === null || createRawTransactionRequest === undefined) {
                throw new base_1.RequiredError('createRawTransactionRequest', 'Required parameter createRawTransactionRequest was null or undefined when calling createRawTransaction.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/raw-transactions`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createRawTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createRawTransactionRequest !== undefined ? createRawTransactionRequest : {}) : (createRawTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createWalletWithdrawalPolicy: async (walletId, createWithdrawalPolicyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createWalletWithdrawalPolicy.');
            }
            if (createWithdrawalPolicyRequest === null || createWithdrawalPolicyRequest === undefined) {
                throw new base_1.RequiredError('createWithdrawalPolicyRequest', 'Required parameter createWithdrawalPolicyRequest was null or undefined when calling createWalletWithdrawalPolicy.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/withdrawal-policies`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createWithdrawalPolicyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createWithdrawalPolicyRequest !== undefined ? createWithdrawalPolicyRequest : {}) : (createWithdrawalPolicyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        deleteAllowedAddress: async (walletId, allowedAddressId, deleteAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling deleteAllowedAddress.');
            }
            if (allowedAddressId === null || allowedAddressId === undefined) {
                throw new base_1.RequiredError('allowedAddressId', 'Required parameter allowedAddressId was null or undefined when calling deleteAllowedAddress.');
            }
            if (deleteAllowedAddressRequest === null || deleteAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('deleteAllowedAddressRequest', 'Required parameter deleteAllowedAddressRequest was null or undefined when calling deleteAllowedAddress.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"allowedAddressId"}}`, encodeURIComponent(String(allowedAddressId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'DELETE' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof deleteAllowedAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(deleteAllowedAddressRequest !== undefined ? deleteAllowedAddressRequest : {}) : (deleteAllowedAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getAllowedAddress: async (walletId, allowedAddressId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddress.');
            }
            if (allowedAddressId === null || allowedAddressId === undefined) {
                throw new base_1.RequiredError('allowedAddressId', 'Required parameter allowedAddressId was null or undefined when calling getAllowedAddress.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"allowedAddressId"}}`, encodeURIComponent(String(allowedAddressId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getAllowedAddresses: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddresses.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllowedAddresses.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getBalance: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getBalance.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/balance`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getDepositAddress: async (walletId, depositAddressId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getDepositAddress.');
            }
            if (depositAddressId === null || depositAddressId === undefined) {
                throw new base_1.RequiredError('depositAddressId', 'Required parameter depositAddressId was null or undefined when calling getDepositAddress.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/deposit-addresses/{depositAddressId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"depositAddressId"}}`, encodeURIComponent(String(depositAddressId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getDepositAddresses: async (walletId, pageable, condition, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getDepositAddresses.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getDepositAddresses.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getDepositAddresses.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/deposit-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWallet: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWallet.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWalletInitialKey: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletInitialKey.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/initial-key`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWallets: async (specs, options = {}) => {
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getMasterWallets.');
            }
            const localVarPath = `/api/v2/ltc/wallets`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getWalletWithdrawalPolicies: async (walletId, pageable, specs, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getWalletWithdrawalPolicies.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getWalletWithdrawalPolicies.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getWalletWithdrawalPolicies.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/withdrawal-policies`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getWalletWithdrawalPolicy: async (walletId, withdrawalPolicyId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getWalletWithdrawalPolicy.');
            }
            if (withdrawalPolicyId === null || withdrawalPolicyId === undefined) {
                throw new base_1.RequiredError('withdrawalPolicyId', 'Required parameter withdrawalPolicyId was null or undefined when calling getWalletWithdrawalPolicy.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/withdrawal-policies/{withdrawalPolicyId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"withdrawalPolicyId"}}`, encodeURIComponent(String(withdrawalPolicyId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        inactivateAllowedAddresses: async (walletId, inactivateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling inactivateAllowedAddresses.');
            }
            if (inactivateAllowedAddressesRequest === null || inactivateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('inactivateAllowedAddressesRequest', 'Required parameter inactivateAllowedAddressesRequest was null or undefined when calling inactivateAllowedAddresses.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/inactivate-allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof inactivateAllowedAddressesRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(inactivateAllowedAddressesRequest !== undefined ? inactivateAllowedAddressesRequest : {}) : (inactivateAllowedAddressesRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchMasterWalletAccountKey: async (walletId, patchAccountKeyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletAccountKey.');
            }
            if (patchAccountKeyRequest === null || patchAccountKeyRequest === undefined) {
                throw new base_1.RequiredError('patchAccountKeyRequest', 'Required parameter patchAccountKeyRequest was null or undefined when calling patchMasterWalletAccountKey.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/account-key`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'PATCH' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof patchAccountKeyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(patchAccountKeyRequest !== undefined ? patchAccountKeyRequest : {}) : (patchAccountKeyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchMasterWalletName: async (walletId, patchWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletName.');
            }
            if (patchWalletNameRequest === null || patchWalletNameRequest === undefined) {
                throw new base_1.RequiredError('patchWalletNameRequest', 'Required parameter patchWalletNameRequest was null or undefined when calling patchMasterWalletName.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/name`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'PATCH' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof patchWalletNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(patchWalletNameRequest !== undefined ? patchWalletNameRequest : {}) : (patchWalletNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchWalletWithdrawalPolicy: async (walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchWalletWithdrawalPolicy.');
            }
            if (withdrawalPolicyId === null || withdrawalPolicyId === undefined) {
                throw new base_1.RequiredError('withdrawalPolicyId', 'Required parameter withdrawalPolicyId was null or undefined when calling patchWalletWithdrawalPolicy.');
            }
            if (patchWithdrawalPolicyRequest === null || patchWithdrawalPolicyRequest === undefined) {
                throw new base_1.RequiredError('patchWithdrawalPolicyRequest', 'Required parameter patchWithdrawalPolicyRequest was null or undefined when calling patchWalletWithdrawalPolicy.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/withdrawal-policies/{withdrawalPolicyId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"withdrawalPolicyId"}}`, encodeURIComponent(String(withdrawalPolicyId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'PATCH' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof patchWithdrawalPolicyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(patchWithdrawalPolicyRequest !== undefined ? patchWithdrawalPolicyRequest : {}) : (patchWithdrawalPolicyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        sendTransaction: async (walletId, createTransactionRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling sendTransaction.');
            }
            if (createTransactionRequest === null || createTransactionRequest === undefined) {
                throw new base_1.RequiredError('createTransactionRequest', 'Required parameter createTransactionRequest was null or undefined when calling sendTransaction.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/transactions`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createTransactionRequest !== undefined ? createTransactionRequest : {}) : (createTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        validateIsAllowedAddress: async (walletId, validateIsAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling validateIsAllowedAddress.');
            }
            if (validateIsAllowedAddressRequest === null || validateIsAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('validateIsAllowedAddressRequest', 'Required parameter validateIsAllowedAddressRequest was null or undefined when calling validateIsAllowedAddress.');
            }
            const localVarPath = `/api/v2/ltc/wallets/{walletId}/allowed-addresses/validate`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof validateIsAllowedAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(validateIsAllowedAddressRequest !== undefined ? validateIsAllowedAddressRequest : {}) : (validateIsAllowedAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.LtcWalletControllerApiFp = function (configuration) {
    return {
        async activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async activateMasterWallet(walletId, activateMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).activateMasterWallet(walletId, activateMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async calculateEstimatedFee(walletId, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).calculateEstimatedFee(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createAllowedAddress(walletId, createAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).createAllowedAddress(walletId, createAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createDepositAddress(walletId, createDepositAddressRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).createDepositAddress(walletId, createDepositAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createMasterWallet1(createInactiveMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).createMasterWallet1(createInactiveMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createRawTransaction(walletId, createRawTransactionRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).createRawTransaction(walletId, createRawTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddress(walletId, allowedAddressId, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).getAllowedAddress(walletId, allowedAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddresses(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).getAllowedAddresses(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getBalance(walletId, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).getBalance(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddress(walletId, depositAddressId, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).getDepositAddress(walletId, depositAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddresses(walletId, pageable, condition, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).getDepositAddresses(walletId, pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallet(walletId, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).getMasterWallet(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletInitialKey(walletId, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).getMasterWalletInitialKey(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets(specs, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).getMasterWallets(specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWalletWithdrawalPolicies(walletId, pageable, specs, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).getWalletWithdrawalPolicies(walletId, pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletName(walletId, patchWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).patchMasterWalletName(walletId, patchWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendTransaction(walletId, createTransactionRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).sendTransaction(walletId, createTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.LtcWalletControllerApiAxiosParamCreator(configuration).validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.LtcWalletControllerApiFactory = function (configuration, basePath, axios) {
    return {
        activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        activateMasterWallet(walletId, activateMasterWalletRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).activateMasterWallet(walletId, activateMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        calculateEstimatedFee(walletId, options) {
            return exports.LtcWalletControllerApiFp(configuration).calculateEstimatedFee(walletId, options).then((request) => request(axios, basePath));
        },
        createAllowedAddress(walletId, createAllowedAddressRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).createAllowedAddress(walletId, createAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        createDepositAddress(walletId, createDepositAddressRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).createDepositAddress(walletId, createDepositAddressRequest, options).then((request) => request(axios, basePath));
        },
        createMasterWallet1(createInactiveMasterWalletRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).createMasterWallet1(createInactiveMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        createRawTransaction(walletId, createRawTransactionRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).createRawTransaction(walletId, createRawTransactionRequest, options).then((request) => request(axios, basePath));
        },
        createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        getAllowedAddress(walletId, allowedAddressId, options) {
            return exports.LtcWalletControllerApiFp(configuration).getAllowedAddress(walletId, allowedAddressId, options).then((request) => request(axios, basePath));
        },
        getAllowedAddresses(walletId, pageable, options) {
            return exports.LtcWalletControllerApiFp(configuration).getAllowedAddresses(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        getBalance(walletId, options) {
            return exports.LtcWalletControllerApiFp(configuration).getBalance(walletId, options).then((request) => request(axios, basePath));
        },
        getDepositAddress(walletId, depositAddressId, options) {
            return exports.LtcWalletControllerApiFp(configuration).getDepositAddress(walletId, depositAddressId, options).then((request) => request(axios, basePath));
        },
        getDepositAddresses(walletId, pageable, condition, options) {
            return exports.LtcWalletControllerApiFp(configuration).getDepositAddresses(walletId, pageable, condition, options).then((request) => request(axios, basePath));
        },
        getMasterWallet(walletId, options) {
            return exports.LtcWalletControllerApiFp(configuration).getMasterWallet(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletInitialKey(walletId, options) {
            return exports.LtcWalletControllerApiFp(configuration).getMasterWalletInitialKey(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWallets(specs, options) {
            return exports.LtcWalletControllerApiFp(configuration).getMasterWallets(specs, options).then((request) => request(axios, basePath));
        },
        getWalletWithdrawalPolicies(walletId, pageable, specs, options) {
            return exports.LtcWalletControllerApiFp(configuration).getWalletWithdrawalPolicies(walletId, pageable, specs, options).then((request) => request(axios, basePath));
        },
        getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options) {
            return exports.LtcWalletControllerApiFp(configuration).getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options).then((request) => request(axios, basePath));
        },
        inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletName(walletId, patchWalletNameRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).patchMasterWalletName(walletId, patchWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        sendTransaction(walletId, createTransactionRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).sendTransaction(walletId, createTransactionRequest, options).then((request) => request(axios, basePath));
        },
        validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options) {
            return exports.LtcWalletControllerApiFp(configuration).validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class LtcWalletControllerApi extends base_1.BaseAPI {
    activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    activateMasterWallet(walletId, activateMasterWalletRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).activateMasterWallet(walletId, activateMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    calculateEstimatedFee(walletId, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).calculateEstimatedFee(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    createAllowedAddress(walletId, createAllowedAddressRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).createAllowedAddress(walletId, createAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createDepositAddress(walletId, createDepositAddressRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).createDepositAddress(walletId, createDepositAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createMasterWallet1(createInactiveMasterWalletRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).createMasterWallet1(createInactiveMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createRawTransaction(walletId, createRawTransactionRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).createRawTransaction(walletId, createRawTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddress(walletId, allowedAddressId, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).getAllowedAddress(walletId, allowedAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddresses(walletId, pageable, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).getAllowedAddresses(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getBalance(walletId, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).getBalance(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddress(walletId, depositAddressId, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).getDepositAddress(walletId, depositAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddresses(walletId, pageable, condition, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).getDepositAddresses(walletId, pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallet(walletId, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).getMasterWallet(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletInitialKey(walletId, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).getMasterWalletInitialKey(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets(specs, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).getMasterWallets(specs, options).then((request) => request(this.axios, this.basePath));
    }
    getWalletWithdrawalPolicies(walletId, pageable, specs, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).getWalletWithdrawalPolicies(walletId, pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options).then((request) => request(this.axios, this.basePath));
    }
    inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletName(walletId, patchWalletNameRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).patchMasterWalletName(walletId, patchWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendTransaction(walletId, createTransactionRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).sendTransaction(walletId, createTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options) {
        return exports.LtcWalletControllerApiFp(this.configuration).validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.LtcWalletControllerApi = LtcWalletControllerApi;
exports.LtcWithdrawalApprovalControllerApiAxiosParamCreator = function (configuration) {
    return {
        approveWithdrawalApproval: async (withdrawalApprovalId, approveWithdrawalApprovalRequest, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling approveWithdrawalApproval.');
            }
            if (approveWithdrawalApprovalRequest === null || approveWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('approveWithdrawalApprovalRequest', 'Required parameter approveWithdrawalApprovalRequest was null or undefined when calling approveWithdrawalApproval.');
            }
            const localVarPath = `/api/v2/ltc/withdrawal-approvals/{withdrawalApprovalId}/approve`
                .replace(`{${"withdrawalApprovalId"}}`, encodeURIComponent(String(withdrawalApprovalId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof approveWithdrawalApprovalRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(approveWithdrawalApprovalRequest !== undefined ? approveWithdrawalApprovalRequest : {}) : (approveWithdrawalApprovalRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        rejectWithdrawalApproval: async (withdrawalApprovalId, rejectWithdrawalApprovalRequest, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling rejectWithdrawalApproval.');
            }
            if (rejectWithdrawalApprovalRequest === null || rejectWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('rejectWithdrawalApprovalRequest', 'Required parameter rejectWithdrawalApprovalRequest was null or undefined when calling rejectWithdrawalApproval.');
            }
            const localVarPath = `/api/v2/ltc/withdrawal-approvals/{withdrawalApprovalId}/reject`
                .replace(`{${"withdrawalApprovalId"}}`, encodeURIComponent(String(withdrawalApprovalId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof rejectWithdrawalApprovalRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(rejectWithdrawalApprovalRequest !== undefined ? rejectWithdrawalApprovalRequest : {}) : (rejectWithdrawalApprovalRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.LtcWithdrawalApprovalControllerApiFp = function (configuration) {
    return {
        async approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.LtcWithdrawalApprovalControllerApiAxiosParamCreator(configuration).approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.LtcWithdrawalApprovalControllerApiAxiosParamCreator(configuration).rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.LtcWithdrawalApprovalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            return exports.LtcWithdrawalApprovalControllerApiFp(configuration).approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
        rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            return exports.LtcWithdrawalApprovalControllerApiFp(configuration).rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class LtcWithdrawalApprovalControllerApi extends base_1.BaseAPI {
    approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
        return exports.LtcWithdrawalApprovalControllerApiFp(this.configuration).approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
    rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
        return exports.LtcWithdrawalApprovalControllerApiFp(this.configuration).rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.LtcWithdrawalApprovalControllerApi = LtcWithdrawalApprovalControllerApi;
exports.TransferControllerApiAxiosParamCreator = function (configuration) {
    return {
        getTransfer4: async (transferId, options = {}) => {
            if (transferId === null || transferId === undefined) {
                throw new base_1.RequiredError('transferId', 'Required parameter transferId was null or undefined when calling getTransfer4.');
            }
            const localVarPath = `/api/v2/btc/transfers/{transferId}`
                .replace(`{${"transferId"}}`, encodeURIComponent(String(transferId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getTransfers6: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers6.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getTransfers6.');
            }
            const localVarPath = `/api/v2/btc/transfers`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.TransferControllerApiFp = function (configuration) {
    return {
        async getTransfer4(transferId, options) {
            const localVarAxiosArgs = await exports.TransferControllerApiAxiosParamCreator(configuration).getTransfer4(transferId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers6(pageable, specs, options) {
            const localVarAxiosArgs = await exports.TransferControllerApiAxiosParamCreator(configuration).getTransfers6(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.TransferControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getTransfer4(transferId, options) {
            return exports.TransferControllerApiFp(configuration).getTransfer4(transferId, options).then((request) => request(axios, basePath));
        },
        getTransfers6(pageable, specs, options) {
            return exports.TransferControllerApiFp(configuration).getTransfers6(pageable, specs, options).then((request) => request(axios, basePath));
        },
    };
};
class TransferControllerApi extends base_1.BaseAPI {
    getTransfer4(transferId, options) {
        return exports.TransferControllerApiFp(this.configuration).getTransfer4(transferId, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers6(pageable, specs, options) {
        return exports.TransferControllerApiFp(this.configuration).getTransfers6(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.TransferControllerApi = TransferControllerApi;
exports.WalletControllerApiAxiosParamCreator = function (configuration) {
    return {
        activateAllowedAddresses2: async (walletId, activateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling activateAllowedAddresses2.');
            }
            if (activateAllowedAddressesRequest === null || activateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('activateAllowedAddressesRequest', 'Required parameter activateAllowedAddressesRequest was null or undefined when calling activateAllowedAddresses2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/activate-allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof activateAllowedAddressesRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(activateAllowedAddressesRequest !== undefined ? activateAllowedAddressesRequest : {}) : (activateAllowedAddressesRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        activateMasterWallet2: async (walletId, activateMasterWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling activateMasterWallet2.');
            }
            if (activateMasterWalletRequest === null || activateMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('activateMasterWalletRequest', 'Required parameter activateMasterWalletRequest was null or undefined when calling activateMasterWallet2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/activate`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof activateMasterWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(activateMasterWalletRequest !== undefined ? activateMasterWalletRequest : {}) : (activateMasterWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        calculateEstimatedFee2: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling calculateEstimatedFee2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/estimated-fee`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createAllowedAddress2: async (walletId, createAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createAllowedAddress2.');
            }
            if (createAllowedAddressRequest === null || createAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('createAllowedAddressRequest', 'Required parameter createAllowedAddressRequest was null or undefined when calling createAllowedAddress2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createAllowedAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createAllowedAddressRequest !== undefined ? createAllowedAddressRequest : {}) : (createAllowedAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createDepositAddress2: async (walletId, createDepositAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createDepositAddress2.');
            }
            if (createDepositAddressRequest === null || createDepositAddressRequest === undefined) {
                throw new base_1.RequiredError('createDepositAddressRequest', 'Required parameter createDepositAddressRequest was null or undefined when calling createDepositAddress2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/deposit-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createDepositAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createDepositAddressRequest !== undefined ? createDepositAddressRequest : {}) : (createDepositAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createMasterWallet3: async (createInactiveMasterWalletRequest, options = {}) => {
            if (createInactiveMasterWalletRequest === null || createInactiveMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('createInactiveMasterWalletRequest', 'Required parameter createInactiveMasterWalletRequest was null or undefined when calling createMasterWallet3.');
            }
            const localVarPath = `/api/v2/btc/wallets`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createInactiveMasterWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createInactiveMasterWalletRequest !== undefined ? createInactiveMasterWalletRequest : {}) : (createInactiveMasterWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createRawTransaction2: async (walletId, createRawTransactionRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createRawTransaction2.');
            }
            if (createRawTransactionRequest === null || createRawTransactionRequest === undefined) {
                throw new base_1.RequiredError('createRawTransactionRequest', 'Required parameter createRawTransactionRequest was null or undefined when calling createRawTransaction2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/raw-transactions`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createRawTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createRawTransactionRequest !== undefined ? createRawTransactionRequest : {}) : (createRawTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createWalletWithdrawalPolicy2: async (walletId, createWithdrawalPolicyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createWalletWithdrawalPolicy2.');
            }
            if (createWithdrawalPolicyRequest === null || createWithdrawalPolicyRequest === undefined) {
                throw new base_1.RequiredError('createWithdrawalPolicyRequest', 'Required parameter createWithdrawalPolicyRequest was null or undefined when calling createWalletWithdrawalPolicy2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/withdrawal-policies`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createWithdrawalPolicyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createWithdrawalPolicyRequest !== undefined ? createWithdrawalPolicyRequest : {}) : (createWithdrawalPolicyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        deleteAllowedAddress2: async (walletId, allowedAddressId, deleteAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling deleteAllowedAddress2.');
            }
            if (allowedAddressId === null || allowedAddressId === undefined) {
                throw new base_1.RequiredError('allowedAddressId', 'Required parameter allowedAddressId was null or undefined when calling deleteAllowedAddress2.');
            }
            if (deleteAllowedAddressRequest === null || deleteAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('deleteAllowedAddressRequest', 'Required parameter deleteAllowedAddressRequest was null or undefined when calling deleteAllowedAddress2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"allowedAddressId"}}`, encodeURIComponent(String(allowedAddressId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'DELETE' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof deleteAllowedAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(deleteAllowedAddressRequest !== undefined ? deleteAllowedAddressRequest : {}) : (deleteAllowedAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getAllowedAddress2: async (walletId, allowedAddressId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddress2.');
            }
            if (allowedAddressId === null || allowedAddressId === undefined) {
                throw new base_1.RequiredError('allowedAddressId', 'Required parameter allowedAddressId was null or undefined when calling getAllowedAddress2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"allowedAddressId"}}`, encodeURIComponent(String(allowedAddressId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getAllowedAddresses2: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddresses2.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllowedAddresses2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getBalance2: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getBalance2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/balance`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getDepositAddress2: async (walletId, depositAddressId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getDepositAddress2.');
            }
            if (depositAddressId === null || depositAddressId === undefined) {
                throw new base_1.RequiredError('depositAddressId', 'Required parameter depositAddressId was null or undefined when calling getDepositAddress2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/deposit-addresses/{depositAddressId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"depositAddressId"}}`, encodeURIComponent(String(depositAddressId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getDepositAddresses4: async (walletId, pageable, condition, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getDepositAddresses4.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getDepositAddresses4.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getDepositAddresses4.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/deposit-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (condition !== undefined) {
                localVarQueryParameter['condition'] = condition;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWallet2: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWallet2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWalletInitialKey2: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletInitialKey2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/initial-key`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWallets4: async (specs, options = {}) => {
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getMasterWallets4.');
            }
            const localVarPath = `/api/v2/btc/wallets`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getWalletWithdrawalPolicies2: async (walletId, pageable, specs, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getWalletWithdrawalPolicies2.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getWalletWithdrawalPolicies2.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getWalletWithdrawalPolicies2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/withdrawal-policies`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (pageable !== undefined) {
                localVarQueryParameter['pageable'] = pageable;
            }
            if (specs !== undefined) {
                localVarQueryParameter['specs'] = specs;
            }
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getWalletWithdrawalPolicy2: async (walletId, withdrawalPolicyId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getWalletWithdrawalPolicy2.');
            }
            if (withdrawalPolicyId === null || withdrawalPolicyId === undefined) {
                throw new base_1.RequiredError('withdrawalPolicyId', 'Required parameter withdrawalPolicyId was null or undefined when calling getWalletWithdrawalPolicy2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/withdrawal-policies/{withdrawalPolicyId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"withdrawalPolicyId"}}`, encodeURIComponent(String(withdrawalPolicyId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        inactivateAllowedAddresses2: async (walletId, inactivateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling inactivateAllowedAddresses2.');
            }
            if (inactivateAllowedAddressesRequest === null || inactivateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('inactivateAllowedAddressesRequest', 'Required parameter inactivateAllowedAddressesRequest was null or undefined when calling inactivateAllowedAddresses2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/inactivate-allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof inactivateAllowedAddressesRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(inactivateAllowedAddressesRequest !== undefined ? inactivateAllowedAddressesRequest : {}) : (inactivateAllowedAddressesRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchMasterWalletAccountKey2: async (walletId, patchAccountKeyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletAccountKey2.');
            }
            if (patchAccountKeyRequest === null || patchAccountKeyRequest === undefined) {
                throw new base_1.RequiredError('patchAccountKeyRequest', 'Required parameter patchAccountKeyRequest was null or undefined when calling patchMasterWalletAccountKey2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/account-key`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'PATCH' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof patchAccountKeyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(patchAccountKeyRequest !== undefined ? patchAccountKeyRequest : {}) : (patchAccountKeyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchMasterWalletName2: async (walletId, patchWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletName2.');
            }
            if (patchWalletNameRequest === null || patchWalletNameRequest === undefined) {
                throw new base_1.RequiredError('patchWalletNameRequest', 'Required parameter patchWalletNameRequest was null or undefined when calling patchMasterWalletName2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/name`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'PATCH' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof patchWalletNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(patchWalletNameRequest !== undefined ? patchWalletNameRequest : {}) : (patchWalletNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchWalletWithdrawalPolicy2: async (walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchWalletWithdrawalPolicy2.');
            }
            if (withdrawalPolicyId === null || withdrawalPolicyId === undefined) {
                throw new base_1.RequiredError('withdrawalPolicyId', 'Required parameter withdrawalPolicyId was null or undefined when calling patchWalletWithdrawalPolicy2.');
            }
            if (patchWithdrawalPolicyRequest === null || patchWithdrawalPolicyRequest === undefined) {
                throw new base_1.RequiredError('patchWithdrawalPolicyRequest', 'Required parameter patchWithdrawalPolicyRequest was null or undefined when calling patchWalletWithdrawalPolicy2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/withdrawal-policies/{withdrawalPolicyId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"withdrawalPolicyId"}}`, encodeURIComponent(String(withdrawalPolicyId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'PATCH' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof patchWithdrawalPolicyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(patchWithdrawalPolicyRequest !== undefined ? patchWithdrawalPolicyRequest : {}) : (patchWithdrawalPolicyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        sendTransaction2: async (walletId, createTransactionRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling sendTransaction2.');
            }
            if (createTransactionRequest === null || createTransactionRequest === undefined) {
                throw new base_1.RequiredError('createTransactionRequest', 'Required parameter createTransactionRequest was null or undefined when calling sendTransaction2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/transactions`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof createTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createTransactionRequest !== undefined ? createTransactionRequest : {}) : (createTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        validateIsAllowedAddress2: async (walletId, validateIsAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling validateIsAllowedAddress2.');
            }
            if (validateIsAllowedAddressRequest === null || validateIsAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('validateIsAllowedAddressRequest', 'Required parameter validateIsAllowedAddressRequest was null or undefined when calling validateIsAllowedAddress2.');
            }
            const localVarPath = `/api/v2/btc/wallets/{walletId}/allowed-addresses/validate`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof validateIsAllowedAddressRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(validateIsAllowedAddressRequest !== undefined ? validateIsAllowedAddressRequest : {}) : (validateIsAllowedAddressRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.WalletControllerApiFp = function (configuration) {
    return {
        async activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async activateMasterWallet2(walletId, activateMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).activateMasterWallet2(walletId, activateMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async calculateEstimatedFee2(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).calculateEstimatedFee2(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createAllowedAddress2(walletId, createAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createAllowedAddress2(walletId, createAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createDepositAddress2(walletId, createDepositAddressRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createDepositAddress2(walletId, createDepositAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createMasterWallet3(createInactiveMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createMasterWallet3(createInactiveMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createRawTransaction2(walletId, createRawTransactionRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createRawTransaction2(walletId, createRawTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddress2(walletId, allowedAddressId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getAllowedAddress2(walletId, allowedAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddresses2(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getAllowedAddresses2(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getBalance2(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getBalance2(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddress2(walletId, depositAddressId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getDepositAddress2(walletId, depositAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddresses4(walletId, pageable, condition, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getDepositAddresses4(walletId, pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallet2(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWallet2(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletInitialKey2(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWalletInitialKey2(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets4(specs, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWallets4(specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWalletWithdrawalPolicies2(walletId, pageable, specs, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getWalletWithdrawalPolicies2(walletId, pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletAccountKey2(walletId, patchAccountKeyRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchMasterWalletAccountKey2(walletId, patchAccountKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletName2(walletId, patchWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchMasterWalletName2(walletId, patchWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendTransaction2(walletId, createTransactionRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).sendTransaction2(walletId, createTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.WalletControllerApiFactory = function (configuration, basePath, axios) {
    return {
        activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options) {
            return exports.WalletControllerApiFp(configuration).activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        activateMasterWallet2(walletId, activateMasterWalletRequest, options) {
            return exports.WalletControllerApiFp(configuration).activateMasterWallet2(walletId, activateMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        calculateEstimatedFee2(walletId, options) {
            return exports.WalletControllerApiFp(configuration).calculateEstimatedFee2(walletId, options).then((request) => request(axios, basePath));
        },
        createAllowedAddress2(walletId, createAllowedAddressRequest, options) {
            return exports.WalletControllerApiFp(configuration).createAllowedAddress2(walletId, createAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        createDepositAddress2(walletId, createDepositAddressRequest, options) {
            return exports.WalletControllerApiFp(configuration).createDepositAddress2(walletId, createDepositAddressRequest, options).then((request) => request(axios, basePath));
        },
        createMasterWallet3(createInactiveMasterWalletRequest, options) {
            return exports.WalletControllerApiFp(configuration).createMasterWallet3(createInactiveMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        createRawTransaction2(walletId, createRawTransactionRequest, options) {
            return exports.WalletControllerApiFp(configuration).createRawTransaction2(walletId, createRawTransactionRequest, options).then((request) => request(axios, basePath));
        },
        createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options) {
            return exports.WalletControllerApiFp(configuration).createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            return exports.WalletControllerApiFp(configuration).deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        getAllowedAddress2(walletId, allowedAddressId, options) {
            return exports.WalletControllerApiFp(configuration).getAllowedAddress2(walletId, allowedAddressId, options).then((request) => request(axios, basePath));
        },
        getAllowedAddresses2(walletId, pageable, options) {
            return exports.WalletControllerApiFp(configuration).getAllowedAddresses2(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        getBalance2(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getBalance2(walletId, options).then((request) => request(axios, basePath));
        },
        getDepositAddress2(walletId, depositAddressId, options) {
            return exports.WalletControllerApiFp(configuration).getDepositAddress2(walletId, depositAddressId, options).then((request) => request(axios, basePath));
        },
        getDepositAddresses4(walletId, pageable, condition, options) {
            return exports.WalletControllerApiFp(configuration).getDepositAddresses4(walletId, pageable, condition, options).then((request) => request(axios, basePath));
        },
        getMasterWallet2(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWallet2(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletInitialKey2(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWalletInitialKey2(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWallets4(specs, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWallets4(specs, options).then((request) => request(axios, basePath));
        },
        getWalletWithdrawalPolicies2(walletId, pageable, specs, options) {
            return exports.WalletControllerApiFp(configuration).getWalletWithdrawalPolicies2(walletId, pageable, specs, options).then((request) => request(axios, basePath));
        },
        getWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, options) {
            return exports.WalletControllerApiFp(configuration).getWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, options).then((request) => request(axios, basePath));
        },
        inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options) {
            return exports.WalletControllerApiFp(configuration).inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletAccountKey2(walletId, patchAccountKeyRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchMasterWalletAccountKey2(walletId, patchAccountKeyRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletName2(walletId, patchWalletNameRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchMasterWalletName2(walletId, patchWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        sendTransaction2(walletId, createTransactionRequest, options) {
            return exports.WalletControllerApiFp(configuration).sendTransaction2(walletId, createTransactionRequest, options).then((request) => request(axios, basePath));
        },
        validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options) {
            return exports.WalletControllerApiFp(configuration).validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class WalletControllerApi extends base_1.BaseAPI {
    activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    activateMasterWallet2(walletId, activateMasterWalletRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).activateMasterWallet2(walletId, activateMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    calculateEstimatedFee2(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).calculateEstimatedFee2(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    createAllowedAddress2(walletId, createAllowedAddressRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createAllowedAddress2(walletId, createAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createDepositAddress2(walletId, createDepositAddressRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createDepositAddress2(walletId, createDepositAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createMasterWallet3(createInactiveMasterWalletRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createMasterWallet3(createInactiveMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createRawTransaction2(walletId, createRawTransactionRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createRawTransaction2(walletId, createRawTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddress2(walletId, allowedAddressId, options) {
        return exports.WalletControllerApiFp(this.configuration).getAllowedAddress2(walletId, allowedAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddresses2(walletId, pageable, options) {
        return exports.WalletControllerApiFp(this.configuration).getAllowedAddresses2(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getBalance2(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getBalance2(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddress2(walletId, depositAddressId, options) {
        return exports.WalletControllerApiFp(this.configuration).getDepositAddress2(walletId, depositAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddresses4(walletId, pageable, condition, options) {
        return exports.WalletControllerApiFp(this.configuration).getDepositAddresses4(walletId, pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallet2(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWallet2(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletInitialKey2(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWalletInitialKey2(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets4(specs, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWallets4(specs, options).then((request) => request(this.axios, this.basePath));
    }
    getWalletWithdrawalPolicies2(walletId, pageable, specs, options) {
        return exports.WalletControllerApiFp(this.configuration).getWalletWithdrawalPolicies2(walletId, pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, options) {
        return exports.WalletControllerApiFp(this.configuration).getWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, options).then((request) => request(this.axios, this.basePath));
    }
    inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletAccountKey2(walletId, patchAccountKeyRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchMasterWalletAccountKey2(walletId, patchAccountKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletName2(walletId, patchWalletNameRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchMasterWalletName2(walletId, patchWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchWalletWithdrawalPolicy2(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendTransaction2(walletId, createTransactionRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).sendTransaction2(walletId, createTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.WalletControllerApi = WalletControllerApi;
exports.WithdrawalApprovalControllerApiAxiosParamCreator = function (configuration) {
    return {
        approveWithdrawalApproval2: async (withdrawalApprovalId, approveWithdrawalApprovalRequest, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling approveWithdrawalApproval2.');
            }
            if (approveWithdrawalApprovalRequest === null || approveWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('approveWithdrawalApprovalRequest', 'Required parameter approveWithdrawalApprovalRequest was null or undefined when calling approveWithdrawalApproval2.');
            }
            const localVarPath = `/api/v2/btc/withdrawal-approvals/{withdrawalApprovalId}/approve`
                .replace(`{${"withdrawalApprovalId"}}`, encodeURIComponent(String(withdrawalApprovalId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof approveWithdrawalApprovalRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(approveWithdrawalApprovalRequest !== undefined ? approveWithdrawalApprovalRequest : {}) : (approveWithdrawalApprovalRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        rejectWithdrawalApproval2: async (withdrawalApprovalId, rejectWithdrawalApprovalRequest, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling rejectWithdrawalApproval2.');
            }
            if (rejectWithdrawalApprovalRequest === null || rejectWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('rejectWithdrawalApprovalRequest', 'Required parameter rejectWithdrawalApprovalRequest was null or undefined when calling rejectWithdrawalApproval2.');
            }
            const localVarPath = `/api/v2/btc/withdrawal-approvals/{withdrawalApprovalId}/reject`
                .replace(`{${"withdrawalApprovalId"}}`, encodeURIComponent(String(withdrawalApprovalId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign(Object.assign(Object.assign({}, localVarUrlObj.query), localVarQueryParameter), options.query);
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            const needsSerialization = (typeof rejectWithdrawalApprovalRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(rejectWithdrawalApprovalRequest !== undefined ? rejectWithdrawalApprovalRequest : {}) : (rejectWithdrawalApprovalRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.WithdrawalApprovalControllerApiFp = function (configuration) {
    return {
        async approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.WithdrawalApprovalControllerApiAxiosParamCreator(configuration).approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.WithdrawalApprovalControllerApiAxiosParamCreator(configuration).rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.WithdrawalApprovalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            return exports.WithdrawalApprovalControllerApiFp(configuration).approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
        rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            return exports.WithdrawalApprovalControllerApiFp(configuration).rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class WithdrawalApprovalControllerApi extends base_1.BaseAPI {
    approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
        return exports.WithdrawalApprovalControllerApiFp(this.configuration).approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
    rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
        return exports.WithdrawalApprovalControllerApiFp(this.configuration).rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.WithdrawalApprovalControllerApi = WithdrawalApprovalControllerApi;
//# sourceMappingURL=api.js.map