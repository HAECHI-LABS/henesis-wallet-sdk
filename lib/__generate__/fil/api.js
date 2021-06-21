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
exports.WalletControllerApi = exports.WalletControllerApiFactory = exports.WalletControllerApiFp = exports.WalletControllerApiAxiosParamCreator = exports.TransferControllerApi = exports.TransferControllerApiFactory = exports.TransferControllerApiFp = exports.TransferControllerApiAxiosParamCreator = exports.OperationControllerApi = exports.OperationControllerApiFactory = exports.OperationControllerApiFp = exports.OperationControllerApiAxiosParamCreator = exports.NetworkControllerApi = exports.NetworkControllerApiFactory = exports.NetworkControllerApiFp = exports.NetworkControllerApiAxiosParamCreator = exports.InternalControllerApi = exports.InternalControllerApiFactory = exports.InternalControllerApiFp = exports.InternalControllerApiAxiosParamCreator = exports.FeeWalletControllerApi = exports.FeeWalletControllerApiFactory = exports.FeeWalletControllerApiFp = exports.FeeWalletControllerApiAxiosParamCreator = exports.WalletStatus = exports.TransferType = exports.TransferStatus = exports.DepositAddressLockStatus = void 0;
const globalImportUrl = __importStar(require("url"));
const axios_1 = __importDefault(require("axios"));
const base_1 = require("./base");
var DepositAddressLockStatus;
(function (DepositAddressLockStatus) {
    DepositAddressLockStatus["LOCKED"] = "LOCKED";
    DepositAddressLockStatus["UNLOCKED"] = "UNLOCKED";
})(DepositAddressLockStatus = exports.DepositAddressLockStatus || (exports.DepositAddressLockStatus = {}));
var TransferStatus;
(function (TransferStatus) {
    TransferStatus["REQUESTED"] = "REQUESTED";
    TransferStatus["PENDING"] = "PENDING";
    TransferStatus["FAILED"] = "FAILED";
    TransferStatus["MINED"] = "MINED";
    TransferStatus["REVERTED"] = "REVERTED";
    TransferStatus["CONFIRMED"] = "CONFIRMED";
})(TransferStatus = exports.TransferStatus || (exports.TransferStatus = {}));
var TransferType;
(function (TransferType) {
    TransferType["WITHDRAWAL"] = "WITHDRAWAL";
    TransferType["DEPOSIT"] = "DEPOSIT";
})(TransferType = exports.TransferType || (exports.TransferType = {}));
var WalletStatus;
(function (WalletStatus) {
    WalletStatus["INACTIVE"] = "INACTIVE";
    WalletStatus["ACTIVE"] = "ACTIVE";
    WalletStatus["CREATING"] = "CREATING";
    WalletStatus["FAILED"] = "FAILED";
})(WalletStatus = exports.WalletStatus || (exports.WalletStatus = {}));
exports.FeeWalletControllerApiAxiosParamCreator = function (configuration) {
    return {
        getFeeHistories: async (pageable, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getFeeHistories.');
            }
            const localVarPath = `/api/v2/fil/fee-wallets/histories`;
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
        getFeeWallet: async (options = {}) => {
            const localVarPath = `/api/v2/fil/fee-wallets/me`;
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
        getFeeWalletBalance: async (options = {}) => {
            const localVarPath = `/api/v2/fil/fee-wallets/balance`;
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
    };
};
exports.FeeWalletControllerApiFp = function (configuration) {
    return {
        async getFeeHistories(pageable, options) {
            const localVarAxiosArgs = await exports.FeeWalletControllerApiAxiosParamCreator(configuration).getFeeHistories(pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFeeWallet(options) {
            const localVarAxiosArgs = await exports.FeeWalletControllerApiAxiosParamCreator(configuration).getFeeWallet(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFeeWalletBalance(options) {
            const localVarAxiosArgs = await exports.FeeWalletControllerApiAxiosParamCreator(configuration).getFeeWalletBalance(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.FeeWalletControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getFeeHistories(pageable, options) {
            return exports.FeeWalletControllerApiFp(configuration).getFeeHistories(pageable, options).then((request) => request(axios, basePath));
        },
        getFeeWallet(options) {
            return exports.FeeWalletControllerApiFp(configuration).getFeeWallet(options).then((request) => request(axios, basePath));
        },
        getFeeWalletBalance(options) {
            return exports.FeeWalletControllerApiFp(configuration).getFeeWalletBalance(options).then((request) => request(axios, basePath));
        },
    };
};
class FeeWalletControllerApi extends base_1.BaseAPI {
    getFeeHistories(pageable, options) {
        return exports.FeeWalletControllerApiFp(this.configuration).getFeeHistories(pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getFeeWallet(options) {
        return exports.FeeWalletControllerApiFp(this.configuration).getFeeWallet(options).then((request) => request(this.axios, this.basePath));
    }
    getFeeWalletBalance(options) {
        return exports.FeeWalletControllerApiFp(this.configuration).getFeeWalletBalance(options).then((request) => request(this.axios, this.basePath));
    }
}
exports.FeeWalletControllerApi = FeeWalletControllerApi;
exports.InternalControllerApiAxiosParamCreator = function (configuration) {
    return {
        getFlush1: async (flushId, options = {}) => {
            if (flushId === null || flushId === undefined) {
                throw new base_1.RequiredError('flushId', 'Required parameter flushId was null or undefined when calling getFlush1.');
            }
            const localVarPath = `/api/v2/fil/internal/flushes/{flushId}`
                .replace(`{${"flushId"}}`, encodeURIComponent(String(flushId)));
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
        getFlushes1: async (pageable, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getFlushes1.');
            }
            const localVarPath = `/api/v2/fil/internal/flushes`;
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
        getTransfer1: async (transferId, options = {}) => {
            if (transferId === null || transferId === undefined) {
                throw new base_1.RequiredError('transferId', 'Required parameter transferId was null or undefined when calling getTransfer1.');
            }
            const localVarPath = `/api/v2/fil/internal/transfers/{transferId}`
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
        getTransfers: async (pageable, transferSearchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers.');
            }
            if (transferSearchCondition === null || transferSearchCondition === undefined) {
                throw new base_1.RequiredError('transferSearchCondition', 'Required parameter transferSearchCondition was null or undefined when calling getTransfers.');
            }
            const localVarPath = `/api/v2/fil/internal/transfers`;
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
            if (transferSearchCondition !== undefined) {
                localVarQueryParameter['transferSearchCondition'] = transferSearchCondition;
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
        async getFlush1(flushId, options) {
            const localVarAxiosArgs = await exports.InternalControllerApiAxiosParamCreator(configuration).getFlush1(flushId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFlushes1(pageable, options) {
            const localVarAxiosArgs = await exports.InternalControllerApiAxiosParamCreator(configuration).getFlushes1(pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfer1(transferId, options) {
            const localVarAxiosArgs = await exports.InternalControllerApiAxiosParamCreator(configuration).getTransfer1(transferId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers(pageable, transferSearchCondition, options) {
            const localVarAxiosArgs = await exports.InternalControllerApiAxiosParamCreator(configuration).getTransfers(pageable, transferSearchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.InternalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getFlush1(flushId, options) {
            return exports.InternalControllerApiFp(configuration).getFlush1(flushId, options).then((request) => request(axios, basePath));
        },
        getFlushes1(pageable, options) {
            return exports.InternalControllerApiFp(configuration).getFlushes1(pageable, options).then((request) => request(axios, basePath));
        },
        getTransfer1(transferId, options) {
            return exports.InternalControllerApiFp(configuration).getTransfer1(transferId, options).then((request) => request(axios, basePath));
        },
        getTransfers(pageable, transferSearchCondition, options) {
            return exports.InternalControllerApiFp(configuration).getTransfers(pageable, transferSearchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class InternalControllerApi extends base_1.BaseAPI {
    getFlush1(flushId, options) {
        return exports.InternalControllerApiFp(this.configuration).getFlush1(flushId, options).then((request) => request(this.axios, this.basePath));
    }
    getFlushes1(pageable, options) {
        return exports.InternalControllerApiFp(this.configuration).getFlushes1(pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfer1(transferId, options) {
        return exports.InternalControllerApiFp(this.configuration).getTransfer1(transferId, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers(pageable, transferSearchCondition, options) {
        return exports.InternalControllerApiFp(this.configuration).getTransfers(pageable, transferSearchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.InternalControllerApi = InternalControllerApi;
exports.NetworkControllerApiAxiosParamCreator = function (configuration) {
    return {
        getGasPremium: async (getGasPremiumRequest, options = {}) => {
            if (getGasPremiumRequest === null || getGasPremiumRequest === undefined) {
                throw new base_1.RequiredError('getGasPremiumRequest', 'Required parameter getGasPremiumRequest was null or undefined when calling getGasPremium.');
            }
            const localVarPath = `/api/v2/fil/network/gas-premium`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (getGasPremiumRequest !== undefined) {
                localVarQueryParameter['getGasPremiumRequest'] = getGasPremiumRequest;
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
exports.NetworkControllerApiFp = function (configuration) {
    return {
        async getGasPremium(getGasPremiumRequest, options) {
            const localVarAxiosArgs = await exports.NetworkControllerApiAxiosParamCreator(configuration).getGasPremium(getGasPremiumRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.NetworkControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getGasPremium(getGasPremiumRequest, options) {
            return exports.NetworkControllerApiFp(configuration).getGasPremium(getGasPremiumRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class NetworkControllerApi extends base_1.BaseAPI {
    getGasPremium(getGasPremiumRequest, options) {
        return exports.NetworkControllerApiFp(this.configuration).getGasPremium(getGasPremiumRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.NetworkControllerApi = NetworkControllerApi;
exports.OperationControllerApiAxiosParamCreator = function (configuration) {
    return {
        createHenesisKey: async (createHenesisKeyRequest, options = {}) => {
            if (createHenesisKeyRequest === null || createHenesisKeyRequest === undefined) {
                throw new base_1.RequiredError('createHenesisKeyRequest', 'Required parameter createHenesisKeyRequest was null or undefined when calling createHenesisKey.');
            }
            const localVarPath = `/api/v2/fil/operation/henesis-keys`;
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
            const needsSerialization = (typeof createHenesisKeyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createHenesisKeyRequest !== undefined ? createHenesisKeyRequest : {}) : (createHenesisKeyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.OperationControllerApiFp = function (configuration) {
    return {
        async createHenesisKey(createHenesisKeyRequest, options) {
            const localVarAxiosArgs = await exports.OperationControllerApiAxiosParamCreator(configuration).createHenesisKey(createHenesisKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.OperationControllerApiFactory = function (configuration, basePath, axios) {
    return {
        createHenesisKey(createHenesisKeyRequest, options) {
            return exports.OperationControllerApiFp(configuration).createHenesisKey(createHenesisKeyRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class OperationControllerApi extends base_1.BaseAPI {
    createHenesisKey(createHenesisKeyRequest, options) {
        return exports.OperationControllerApiFp(this.configuration).createHenesisKey(createHenesisKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.OperationControllerApi = OperationControllerApi;
exports.TransferControllerApiAxiosParamCreator = function (configuration) {
    return {
        getTransfer: async (transferId, options = {}) => {
            if (transferId === null || transferId === undefined) {
                throw new base_1.RequiredError('transferId', 'Required parameter transferId was null or undefined when calling getTransfer.');
            }
            const localVarPath = `/api/v2/fil/transfers/{transferId}`
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
        getTransfers1: async (pageable, transferSearchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransfers1.');
            }
            if (transferSearchCondition === null || transferSearchCondition === undefined) {
                throw new base_1.RequiredError('transferSearchCondition', 'Required parameter transferSearchCondition was null or undefined when calling getTransfers1.');
            }
            const localVarPath = `/api/v2/fil/transfers`;
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
            if (transferSearchCondition !== undefined) {
                localVarQueryParameter['transferSearchCondition'] = transferSearchCondition;
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
        async getTransfer(transferId, options) {
            const localVarAxiosArgs = await exports.TransferControllerApiAxiosParamCreator(configuration).getTransfer(transferId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransfers1(pageable, transferSearchCondition, options) {
            const localVarAxiosArgs = await exports.TransferControllerApiAxiosParamCreator(configuration).getTransfers1(pageable, transferSearchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.TransferControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getTransfer(transferId, options) {
            return exports.TransferControllerApiFp(configuration).getTransfer(transferId, options).then((request) => request(axios, basePath));
        },
        getTransfers1(pageable, transferSearchCondition, options) {
            return exports.TransferControllerApiFp(configuration).getTransfers1(pageable, transferSearchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class TransferControllerApi extends base_1.BaseAPI {
    getTransfer(transferId, options) {
        return exports.TransferControllerApiFp(this.configuration).getTransfer(transferId, options).then((request) => request(this.axios, this.basePath));
    }
    getTransfers1(pageable, transferSearchCondition, options) {
        return exports.TransferControllerApiFp(this.configuration).getTransfers1(pageable, transferSearchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.TransferControllerApi = TransferControllerApi;
exports.WalletControllerApiAxiosParamCreator = function (configuration) {
    return {
        createDepositAddress: async (walletId, createDepositAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createDepositAddress.');
            }
            if (createDepositAddressRequest === null || createDepositAddressRequest === undefined) {
                throw new base_1.RequiredError('createDepositAddressRequest', 'Required parameter createDepositAddressRequest was null or undefined when calling createDepositAddress.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/deposit-addresses`
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
        createWallet: async (createWalletRequest, options = {}) => {
            if (createWalletRequest === null || createWalletRequest === undefined) {
                throw new base_1.RequiredError('createWalletRequest', 'Required parameter createWalletRequest was null or undefined when calling createWallet.');
            }
            const localVarPath = `/api/v2/fil/wallets`;
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
            const needsSerialization = (typeof createWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createWalletRequest !== undefined ? createWalletRequest : {}) : (createWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        flush: async (walletId, flushRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling flush.');
            }
            if (flushRequest === null || flushRequest === undefined) {
                throw new base_1.RequiredError('flushRequest', 'Required parameter flushRequest was null or undefined when calling flush.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/flushes`
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
            const needsSerialization = (typeof flushRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(flushRequest !== undefined ? flushRequest : {}) : (flushRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getBalance: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getBalance.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/balance`
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
            const localVarPath = `/api/v2/fil/wallets/{walletId}/deposit-addresses/{depositAddressId}`
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
        getDepositAddresses: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getDepositAddresses.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getDepositAddresses.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/deposit-addresses`
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
        getFlush: async (walletId, flushId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getFlush.');
            }
            if (flushId === null || flushId === undefined) {
                throw new base_1.RequiredError('flushId', 'Required parameter flushId was null or undefined when calling getFlush.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/flushes/{flushId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"flushId"}}`, encodeURIComponent(String(flushId)));
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
        getFlushes: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getFlushes.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getFlushes.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/flushes`
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
        getWallet: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getWallet.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}`
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
        getWalletInitialKey: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getWalletInitialKey.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/initial-key`
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
        getWallets: async (sort, options = {}) => {
            if (sort === null || sort === undefined) {
                throw new base_1.RequiredError('sort', 'Required parameter sort was null or undefined when calling getWallets.');
            }
            const localVarPath = `/api/v2/fil/wallets`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
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
        patchDepositAddressName: async (walletId, depositAddressId, patchWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchDepositAddressName.');
            }
            if (depositAddressId === null || depositAddressId === undefined) {
                throw new base_1.RequiredError('depositAddressId', 'Required parameter depositAddressId was null or undefined when calling patchDepositAddressName.');
            }
            if (patchWalletNameRequest === null || patchWalletNameRequest === undefined) {
                throw new base_1.RequiredError('patchWalletNameRequest', 'Required parameter patchWalletNameRequest was null or undefined when calling patchDepositAddressName.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/deposit-addresses/{depositAddressId}/name`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"depositAddressId"}}`, encodeURIComponent(String(depositAddressId)));
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
        patchWalletAccountKey: async (walletId, patchAccountKeyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchWalletAccountKey.');
            }
            if (patchAccountKeyRequest === null || patchAccountKeyRequest === undefined) {
                throw new base_1.RequiredError('patchAccountKeyRequest', 'Required parameter patchAccountKeyRequest was null or undefined when calling patchWalletAccountKey.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/account-key`
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
        patchWalletName: async (walletId, patchWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchWalletName.');
            }
            if (patchWalletNameRequest === null || patchWalletNameRequest === undefined) {
                throw new base_1.RequiredError('patchWalletNameRequest', 'Required parameter patchWalletNameRequest was null or undefined when calling patchWalletName.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/name`
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
        recreateWallet: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling recreateWallet.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/recreate`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
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
        sendTransaction: async (walletId, createTransactionRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling sendTransaction.');
            }
            if (createTransactionRequest === null || createTransactionRequest === undefined) {
                throw new base_1.RequiredError('createTransactionRequest', 'Required parameter createTransactionRequest was null or undefined when calling sendTransaction.');
            }
            const localVarPath = `/api/v2/fil/wallets/{walletId}/transactions`
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
    };
};
exports.WalletControllerApiFp = function (configuration) {
    return {
        async createDepositAddress(walletId, createDepositAddressRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createDepositAddress(walletId, createDepositAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createWallet(createWalletRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createWallet(createWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async flush(walletId, flushRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).flush(walletId, flushRequest, options);
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
        async getDepositAddresses(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getDepositAddresses(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFlush(walletId, flushId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getFlush(walletId, flushId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFlushes(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getFlushes(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWallet(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getWallet(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWalletInitialKey(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getWalletInitialKey(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWallets(sort, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getWallets(sort, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchDepositAddressName(walletId, depositAddressId, patchWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchDepositAddressName(walletId, depositAddressId, patchWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchWalletAccountKey(walletId, patchAccountKeyRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchWalletAccountKey(walletId, patchAccountKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchWalletName(walletId, patchWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchWalletName(walletId, patchWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async recreateWallet(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).recreateWallet(walletId, options);
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
    };
};
exports.WalletControllerApiFactory = function (configuration, basePath, axios) {
    return {
        createDepositAddress(walletId, createDepositAddressRequest, options) {
            return exports.WalletControllerApiFp(configuration).createDepositAddress(walletId, createDepositAddressRequest, options).then((request) => request(axios, basePath));
        },
        createWallet(createWalletRequest, options) {
            return exports.WalletControllerApiFp(configuration).createWallet(createWalletRequest, options).then((request) => request(axios, basePath));
        },
        flush(walletId, flushRequest, options) {
            return exports.WalletControllerApiFp(configuration).flush(walletId, flushRequest, options).then((request) => request(axios, basePath));
        },
        getBalance(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getBalance(walletId, options).then((request) => request(axios, basePath));
        },
        getDepositAddress(walletId, depositAddressId, options) {
            return exports.WalletControllerApiFp(configuration).getDepositAddress(walletId, depositAddressId, options).then((request) => request(axios, basePath));
        },
        getDepositAddresses(walletId, pageable, options) {
            return exports.WalletControllerApiFp(configuration).getDepositAddresses(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        getFlush(walletId, flushId, options) {
            return exports.WalletControllerApiFp(configuration).getFlush(walletId, flushId, options).then((request) => request(axios, basePath));
        },
        getFlushes(walletId, pageable, options) {
            return exports.WalletControllerApiFp(configuration).getFlushes(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        getWallet(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getWallet(walletId, options).then((request) => request(axios, basePath));
        },
        getWalletInitialKey(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getWalletInitialKey(walletId, options).then((request) => request(axios, basePath));
        },
        getWallets(sort, options) {
            return exports.WalletControllerApiFp(configuration).getWallets(sort, options).then((request) => request(axios, basePath));
        },
        patchDepositAddressName(walletId, depositAddressId, patchWalletNameRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchDepositAddressName(walletId, depositAddressId, patchWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchWalletAccountKey(walletId, patchAccountKeyRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchWalletAccountKey(walletId, patchAccountKeyRequest, options).then((request) => request(axios, basePath));
        },
        patchWalletName(walletId, patchWalletNameRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchWalletName(walletId, patchWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        recreateWallet(walletId, options) {
            return exports.WalletControllerApiFp(configuration).recreateWallet(walletId, options).then((request) => request(axios, basePath));
        },
        sendTransaction(walletId, createTransactionRequest, options) {
            return exports.WalletControllerApiFp(configuration).sendTransaction(walletId, createTransactionRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class WalletControllerApi extends base_1.BaseAPI {
    createDepositAddress(walletId, createDepositAddressRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createDepositAddress(walletId, createDepositAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createWallet(createWalletRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createWallet(createWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    flush(walletId, flushRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).flush(walletId, flushRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getBalance(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getBalance(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddress(walletId, depositAddressId, options) {
        return exports.WalletControllerApiFp(this.configuration).getDepositAddress(walletId, depositAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddresses(walletId, pageable, options) {
        return exports.WalletControllerApiFp(this.configuration).getDepositAddresses(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getFlush(walletId, flushId, options) {
        return exports.WalletControllerApiFp(this.configuration).getFlush(walletId, flushId, options).then((request) => request(this.axios, this.basePath));
    }
    getFlushes(walletId, pageable, options) {
        return exports.WalletControllerApiFp(this.configuration).getFlushes(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getWallet(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getWallet(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getWalletInitialKey(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getWalletInitialKey(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getWallets(sort, options) {
        return exports.WalletControllerApiFp(this.configuration).getWallets(sort, options).then((request) => request(this.axios, this.basePath));
    }
    patchDepositAddressName(walletId, depositAddressId, patchWalletNameRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchDepositAddressName(walletId, depositAddressId, patchWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchWalletAccountKey(walletId, patchAccountKeyRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchWalletAccountKey(walletId, patchAccountKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchWalletName(walletId, patchWalletNameRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchWalletName(walletId, patchWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    recreateWallet(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).recreateWallet(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    sendTransaction(walletId, createTransactionRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).sendTransaction(walletId, createTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.WalletControllerApi = WalletControllerApi;
//# sourceMappingURL=api.js.map