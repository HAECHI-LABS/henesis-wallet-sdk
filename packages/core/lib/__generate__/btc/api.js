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
exports.WithdrawalApprovalControllerApi = exports.WithdrawalApprovalControllerApiFactory = exports.WithdrawalApprovalControllerApiFp = exports.WithdrawalApprovalControllerApiAxiosParamCreator = exports.WalletControllerApi = exports.WalletControllerApiFactory = exports.WalletControllerApiFp = exports.WalletControllerApiAxiosParamCreator = exports.TransferControllerApi = exports.TransferControllerApiFactory = exports.TransferControllerApiFp = exports.TransferControllerApiAxiosParamCreator = exports.InternalControllerApi = exports.InternalControllerApiFactory = exports.InternalControllerApiFp = exports.InternalControllerApiAxiosParamCreator = exports.AdminControllerApi = exports.AdminControllerApiFactory = exports.AdminControllerApiFp = exports.AdminControllerApiAxiosParamCreator = exports.WithdrawalPolicyType = exports.WhitelistType = exports.WalletStatus = exports.WalletDTOStatusEnum = exports.WalletDTOTypeEnum = exports.WalletDTOBlockchainEnum = exports.TransferType = exports.TransferStatus = exports.SimplifiedTransferDTOStatusEnum = exports.SimplifiedTransferDTOTypeEnum = exports.CoinSymbol = exports.Blockchain = exports.AllowedCoinType = void 0;
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
})(Blockchain = exports.Blockchain || (exports.Blockchain = {}));
var CoinSymbol;
(function (CoinSymbol) {
    CoinSymbol["ETH"] = "ETH";
    CoinSymbol["KLAY"] = "KLAY";
    CoinSymbol["BTC"] = "BTC";
    CoinSymbol["FIL"] = "FIL";
    CoinSymbol["BNB"] = "BNB";
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
        getDepositAddresses1: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getDepositAddresses1.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getDepositAddresses1.');
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
        getExternalWithdrawals: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getExternalWithdrawals.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getExternalWithdrawals.');
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
        getMasterWallets1: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getMasterWallets1.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getMasterWallets1.');
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
        getTransfers2: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers2.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getTransfers2.');
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
        async getDepositAddresses1(pageable, condition, options) {
            const localVarAxiosArgs = await exports.AdminControllerApiAxiosParamCreator(configuration).getDepositAddresses1(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getExternalWithdrawals(pageable, condition, options) {
            const localVarAxiosArgs = await exports.AdminControllerApiAxiosParamCreator(configuration).getExternalWithdrawals(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets1(pageable, condition, options) {
            const localVarAxiosArgs = await exports.AdminControllerApiAxiosParamCreator(configuration).getMasterWallets1(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers2(pageable, condition, options) {
            const localVarAxiosArgs = await exports.AdminControllerApiAxiosParamCreator(configuration).getTransfers2(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.AdminControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getDepositAddresses1(pageable, condition, options) {
            return exports.AdminControllerApiFp(configuration).getDepositAddresses1(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getExternalWithdrawals(pageable, condition, options) {
            return exports.AdminControllerApiFp(configuration).getExternalWithdrawals(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getMasterWallets1(pageable, condition, options) {
            return exports.AdminControllerApiFp(configuration).getMasterWallets1(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getTransfers2(pageable, condition, options) {
            return exports.AdminControllerApiFp(configuration).getTransfers2(pageable, condition, options).then((request) => request(axios, basePath));
        },
    };
};
class AdminControllerApi extends base_1.BaseAPI {
    getDepositAddresses1(pageable, condition, options) {
        return exports.AdminControllerApiFp(this.configuration).getDepositAddresses1(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getExternalWithdrawals(pageable, condition, options) {
        return exports.AdminControllerApiFp(this.configuration).getExternalWithdrawals(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets1(pageable, condition, options) {
        return exports.AdminControllerApiFp(this.configuration).getMasterWallets1(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers2(pageable, condition, options) {
        return exports.AdminControllerApiFp(this.configuration).getTransfers2(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.AdminControllerApi = AdminControllerApi;
exports.InternalControllerApiAxiosParamCreator = function (configuration) {
    return {
        getTransfer: async (transferId, options = {}) => {
            if (transferId === null || transferId === undefined) {
                throw new base_1.RequiredError('transferId', 'Required parameter transferId was null or undefined when calling getTransfer.');
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
        getTransfers: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getTransfers.');
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
        async getTransfer(transferId, options) {
            const localVarAxiosArgs = await exports.InternalControllerApiAxiosParamCreator(configuration).getTransfer(transferId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers(pageable, specs, options) {
            const localVarAxiosArgs = await exports.InternalControllerApiAxiosParamCreator(configuration).getTransfers(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.InternalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getTransfer(transferId, options) {
            return exports.InternalControllerApiFp(configuration).getTransfer(transferId, options).then((request) => request(axios, basePath));
        },
        getTransfers(pageable, specs, options) {
            return exports.InternalControllerApiFp(configuration).getTransfers(pageable, specs, options).then((request) => request(axios, basePath));
        },
    };
};
class InternalControllerApi extends base_1.BaseAPI {
    getTransfer(transferId, options) {
        return exports.InternalControllerApiFp(this.configuration).getTransfer(transferId, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers(pageable, specs, options) {
        return exports.InternalControllerApiFp(this.configuration).getTransfers(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.InternalControllerApi = InternalControllerApi;
exports.TransferControllerApiAxiosParamCreator = function (configuration) {
    return {
        getTransfer1: async (transferId, options = {}) => {
            if (transferId === null || transferId === undefined) {
                throw new base_1.RequiredError('transferId', 'Required parameter transferId was null or undefined when calling getTransfer1.');
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
        getTransfers1: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers1.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getTransfers1.');
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
        async getTransfer1(transferId, options) {
            const localVarAxiosArgs = await exports.TransferControllerApiAxiosParamCreator(configuration).getTransfer1(transferId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers1(pageable, specs, options) {
            const localVarAxiosArgs = await exports.TransferControllerApiAxiosParamCreator(configuration).getTransfers1(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.TransferControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getTransfer1(transferId, options) {
            return exports.TransferControllerApiFp(configuration).getTransfer1(transferId, options).then((request) => request(axios, basePath));
        },
        getTransfers1(pageable, specs, options) {
            return exports.TransferControllerApiFp(configuration).getTransfers1(pageable, specs, options).then((request) => request(axios, basePath));
        },
    };
};
class TransferControllerApi extends base_1.BaseAPI {
    getTransfer1(transferId, options) {
        return exports.TransferControllerApiFp(this.configuration).getTransfer1(transferId, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers1(pageable, specs, options) {
        return exports.TransferControllerApiFp(this.configuration).getTransfers1(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.TransferControllerApi = TransferControllerApi;
exports.WalletControllerApiAxiosParamCreator = function (configuration) {
    return {
        activateAllowedAddresses: async (walletId, activateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling activateAllowedAddresses.');
            }
            if (activateAllowedAddressesRequest === null || activateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('activateAllowedAddressesRequest', 'Required parameter activateAllowedAddressesRequest was null or undefined when calling activateAllowedAddresses.');
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
        activateMasterWallet: async (walletId, activateMasterWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling activateMasterWallet.');
            }
            if (activateMasterWalletRequest === null || activateMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('activateMasterWalletRequest', 'Required parameter activateMasterWalletRequest was null or undefined when calling activateMasterWallet.');
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
        calculateEstimatedFee: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling calculateEstimatedFee.');
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
        createAllowedAddress: async (walletId, createAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createAllowedAddress.');
            }
            if (createAllowedAddressRequest === null || createAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('createAllowedAddressRequest', 'Required parameter createAllowedAddressRequest was null or undefined when calling createAllowedAddress.');
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
        createDepositAddress: async (walletId, createDepositAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createDepositAddress.');
            }
            if (createDepositAddressRequest === null || createDepositAddressRequest === undefined) {
                throw new base_1.RequiredError('createDepositAddressRequest', 'Required parameter createDepositAddressRequest was null or undefined when calling createDepositAddress.');
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
        createMasterWallet1: async (createInactiveMasterWalletRequest, options = {}) => {
            if (createInactiveMasterWalletRequest === null || createInactiveMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('createInactiveMasterWalletRequest', 'Required parameter createInactiveMasterWalletRequest was null or undefined when calling createMasterWallet1.');
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
        createRawTransaction: async (walletId, createRawTransactionRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createRawTransaction.');
            }
            if (createRawTransactionRequest === null || createRawTransactionRequest === undefined) {
                throw new base_1.RequiredError('createRawTransactionRequest', 'Required parameter createRawTransactionRequest was null or undefined when calling createRawTransaction.');
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
        createWalletWithdrawalPolicy: async (walletId, createWithdrawalPolicyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createWalletWithdrawalPolicy.');
            }
            if (createWithdrawalPolicyRequest === null || createWithdrawalPolicyRequest === undefined) {
                throw new base_1.RequiredError('createWithdrawalPolicyRequest', 'Required parameter createWithdrawalPolicyRequest was null or undefined when calling createWalletWithdrawalPolicy.');
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
        getAllowedAddress: async (walletId, allowedAddressId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddress.');
            }
            if (allowedAddressId === null || allowedAddressId === undefined) {
                throw new base_1.RequiredError('allowedAddressId', 'Required parameter allowedAddressId was null or undefined when calling getAllowedAddress.');
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
        getAllowedAddresses: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddresses.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllowedAddresses.');
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
        getBalance: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getBalance.');
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
        getDepositAddress: async (walletId, depositAddressId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getDepositAddress.');
            }
            if (depositAddressId === null || depositAddressId === undefined) {
                throw new base_1.RequiredError('depositAddressId', 'Required parameter depositAddressId was null or undefined when calling getDepositAddress.');
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
        getMasterWallet: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWallet.');
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
        getMasterWalletInitialKey: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletInitialKey.');
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
        getMasterWallets: async (specs, options = {}) => {
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getMasterWallets.');
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
        getWalletWithdrawalPolicy: async (walletId, withdrawalPolicyId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getWalletWithdrawalPolicy.');
            }
            if (withdrawalPolicyId === null || withdrawalPolicyId === undefined) {
                throw new base_1.RequiredError('withdrawalPolicyId', 'Required parameter withdrawalPolicyId was null or undefined when calling getWalletWithdrawalPolicy.');
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
        inactivateAllowedAddresses: async (walletId, inactivateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling inactivateAllowedAddresses.');
            }
            if (inactivateAllowedAddressesRequest === null || inactivateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('inactivateAllowedAddressesRequest', 'Required parameter inactivateAllowedAddressesRequest was null or undefined when calling inactivateAllowedAddresses.');
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
        patchMasterWalletAccountKey: async (walletId, patchAccountKeyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletAccountKey.');
            }
            if (patchAccountKeyRequest === null || patchAccountKeyRequest === undefined) {
                throw new base_1.RequiredError('patchAccountKeyRequest', 'Required parameter patchAccountKeyRequest was null or undefined when calling patchMasterWalletAccountKey.');
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
        patchMasterWalletName: async (walletId, patchWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletName.');
            }
            if (patchWalletNameRequest === null || patchWalletNameRequest === undefined) {
                throw new base_1.RequiredError('patchWalletNameRequest', 'Required parameter patchWalletNameRequest was null or undefined when calling patchMasterWalletName.');
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
        sendTransaction: async (walletId, createTransactionRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling sendTransaction.');
            }
            if (createTransactionRequest === null || createTransactionRequest === undefined) {
                throw new base_1.RequiredError('createTransactionRequest', 'Required parameter createTransactionRequest was null or undefined when calling sendTransaction.');
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
        validateIsAllowedAddress: async (walletId, validateIsAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling validateIsAllowedAddress.');
            }
            if (validateIsAllowedAddressRequest === null || validateIsAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('validateIsAllowedAddressRequest', 'Required parameter validateIsAllowedAddressRequest was null or undefined when calling validateIsAllowedAddress.');
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
        async activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async activateMasterWallet(walletId, activateMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).activateMasterWallet(walletId, activateMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async calculateEstimatedFee(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).calculateEstimatedFee(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createAllowedAddress(walletId, createAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createAllowedAddress(walletId, createAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createDepositAddress(walletId, createDepositAddressRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createDepositAddress(walletId, createDepositAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createMasterWallet1(createInactiveMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createMasterWallet1(createInactiveMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createRawTransaction(walletId, createRawTransactionRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createRawTransaction(walletId, createRawTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddress(walletId, allowedAddressId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getAllowedAddress(walletId, allowedAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddresses(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getAllowedAddresses(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getBalance(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getBalance(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddress(walletId, depositAddressId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getDepositAddress(walletId, depositAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddresses(walletId, pageable, condition, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getDepositAddresses(walletId, pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallet(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWallet(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletInitialKey(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWalletInitialKey(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets(specs, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWallets(specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWalletWithdrawalPolicies(walletId, pageable, specs, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getWalletWithdrawalPolicies(walletId, pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletName(walletId, patchWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchMasterWalletName(walletId, patchWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendTransaction(walletId, createTransactionRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).sendTransaction(walletId, createTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.WalletControllerApiFactory = function (configuration, basePath, axios) {
    return {
        activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options) {
            return exports.WalletControllerApiFp(configuration).activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        activateMasterWallet(walletId, activateMasterWalletRequest, options) {
            return exports.WalletControllerApiFp(configuration).activateMasterWallet(walletId, activateMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        calculateEstimatedFee(walletId, options) {
            return exports.WalletControllerApiFp(configuration).calculateEstimatedFee(walletId, options).then((request) => request(axios, basePath));
        },
        createAllowedAddress(walletId, createAllowedAddressRequest, options) {
            return exports.WalletControllerApiFp(configuration).createAllowedAddress(walletId, createAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        createDepositAddress(walletId, createDepositAddressRequest, options) {
            return exports.WalletControllerApiFp(configuration).createDepositAddress(walletId, createDepositAddressRequest, options).then((request) => request(axios, basePath));
        },
        createMasterWallet1(createInactiveMasterWalletRequest, options) {
            return exports.WalletControllerApiFp(configuration).createMasterWallet1(createInactiveMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        createRawTransaction(walletId, createRawTransactionRequest, options) {
            return exports.WalletControllerApiFp(configuration).createRawTransaction(walletId, createRawTransactionRequest, options).then((request) => request(axios, basePath));
        },
        createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options) {
            return exports.WalletControllerApiFp(configuration).createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            return exports.WalletControllerApiFp(configuration).deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        getAllowedAddress(walletId, allowedAddressId, options) {
            return exports.WalletControllerApiFp(configuration).getAllowedAddress(walletId, allowedAddressId, options).then((request) => request(axios, basePath));
        },
        getAllowedAddresses(walletId, pageable, options) {
            return exports.WalletControllerApiFp(configuration).getAllowedAddresses(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        getBalance(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getBalance(walletId, options).then((request) => request(axios, basePath));
        },
        getDepositAddress(walletId, depositAddressId, options) {
            return exports.WalletControllerApiFp(configuration).getDepositAddress(walletId, depositAddressId, options).then((request) => request(axios, basePath));
        },
        getDepositAddresses(walletId, pageable, condition, options) {
            return exports.WalletControllerApiFp(configuration).getDepositAddresses(walletId, pageable, condition, options).then((request) => request(axios, basePath));
        },
        getMasterWallet(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWallet(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletInitialKey(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWalletInitialKey(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWallets(specs, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWallets(specs, options).then((request) => request(axios, basePath));
        },
        getWalletWithdrawalPolicies(walletId, pageable, specs, options) {
            return exports.WalletControllerApiFp(configuration).getWalletWithdrawalPolicies(walletId, pageable, specs, options).then((request) => request(axios, basePath));
        },
        getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options) {
            return exports.WalletControllerApiFp(configuration).getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options).then((request) => request(axios, basePath));
        },
        inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options) {
            return exports.WalletControllerApiFp(configuration).inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletName(walletId, patchWalletNameRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchMasterWalletName(walletId, patchWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        sendTransaction(walletId, createTransactionRequest, options) {
            return exports.WalletControllerApiFp(configuration).sendTransaction(walletId, createTransactionRequest, options).then((request) => request(axios, basePath));
        },
        validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options) {
            return exports.WalletControllerApiFp(configuration).validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class WalletControllerApi extends base_1.BaseAPI {
    activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    activateMasterWallet(walletId, activateMasterWalletRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).activateMasterWallet(walletId, activateMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    calculateEstimatedFee(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).calculateEstimatedFee(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    createAllowedAddress(walletId, createAllowedAddressRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createAllowedAddress(walletId, createAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createDepositAddress(walletId, createDepositAddressRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createDepositAddress(walletId, createDepositAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createMasterWallet1(createInactiveMasterWalletRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createMasterWallet1(createInactiveMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createRawTransaction(walletId, createRawTransactionRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createRawTransaction(walletId, createRawTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddress(walletId, allowedAddressId, options) {
        return exports.WalletControllerApiFp(this.configuration).getAllowedAddress(walletId, allowedAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddresses(walletId, pageable, options) {
        return exports.WalletControllerApiFp(this.configuration).getAllowedAddresses(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getBalance(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getBalance(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddress(walletId, depositAddressId, options) {
        return exports.WalletControllerApiFp(this.configuration).getDepositAddress(walletId, depositAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddresses(walletId, pageable, condition, options) {
        return exports.WalletControllerApiFp(this.configuration).getDepositAddresses(walletId, pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallet(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWallet(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletInitialKey(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWalletInitialKey(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets(specs, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWallets(specs, options).then((request) => request(this.axios, this.basePath));
    }
    getWalletWithdrawalPolicies(walletId, pageable, specs, options) {
        return exports.WalletControllerApiFp(this.configuration).getWalletWithdrawalPolicies(walletId, pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options) {
        return exports.WalletControllerApiFp(this.configuration).getWalletWithdrawalPolicy(walletId, withdrawalPolicyId, options).then((request) => request(this.axios, this.basePath));
    }
    inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchMasterWalletAccountKey(walletId, patchAccountKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletName(walletId, patchWalletNameRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchMasterWalletName(walletId, patchWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchWalletWithdrawalPolicy(walletId, withdrawalPolicyId, patchWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendTransaction(walletId, createTransactionRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).sendTransaction(walletId, createTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.WalletControllerApi = WalletControllerApi;
exports.WithdrawalApprovalControllerApiAxiosParamCreator = function (configuration) {
    return {
        approveWithdrawalApproval: async (withdrawalApprovalId, approveWithdrawalApprovalRequest, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling approveWithdrawalApproval.');
            }
            if (approveWithdrawalApprovalRequest === null || approveWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('approveWithdrawalApprovalRequest', 'Required parameter approveWithdrawalApprovalRequest was null or undefined when calling approveWithdrawalApproval.');
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
        rejectWithdrawalApproval: async (withdrawalApprovalId, rejectWithdrawalApprovalRequest, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling rejectWithdrawalApproval.');
            }
            if (rejectWithdrawalApprovalRequest === null || rejectWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('rejectWithdrawalApprovalRequest', 'Required parameter rejectWithdrawalApprovalRequest was null or undefined when calling rejectWithdrawalApproval.');
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
        async approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.WithdrawalApprovalControllerApiAxiosParamCreator(configuration).approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.WithdrawalApprovalControllerApiAxiosParamCreator(configuration).rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.WithdrawalApprovalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            return exports.WithdrawalApprovalControllerApiFp(configuration).approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
        rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            return exports.WithdrawalApprovalControllerApiFp(configuration).rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class WithdrawalApprovalControllerApi extends base_1.BaseAPI {
    approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
        return exports.WithdrawalApprovalControllerApiFp(this.configuration).approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
    rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
        return exports.WithdrawalApprovalControllerApiFp(this.configuration).rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.WithdrawalApprovalControllerApi = WithdrawalApprovalControllerApi;
//# sourceMappingURL=api.js.map