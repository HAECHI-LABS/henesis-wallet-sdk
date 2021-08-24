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
exports.WalletControllerApi = exports.WalletControllerApiFactory = exports.WalletControllerApiFp = exports.WalletControllerApiAxiosParamCreator = exports.TransferControllerApi = exports.TransferControllerApiFactory = exports.TransferControllerApiFp = exports.TransferControllerApiAxiosParamCreator = exports.OperationControllerApi = exports.OperationControllerApiFactory = exports.OperationControllerApiFp = exports.OperationControllerApiAxiosParamCreator = exports.NetworkControllerApi = exports.NetworkControllerApiFactory = exports.NetworkControllerApiFp = exports.NetworkControllerApiAxiosParamCreator = exports.InternalControllerApi = exports.InternalControllerApiFactory = exports.InternalControllerApiFp = exports.InternalControllerApiAxiosParamCreator = exports.FeeWalletControllerApi = exports.FeeWalletControllerApiFactory = exports.FeeWalletControllerApiFp = exports.FeeWalletControllerApiAxiosParamCreator = exports.WalletStatus = exports.TransferType = exports.TransferStatus = exports.FeeHistoryType = exports.FeeHistoryPaymentType = void 0;
const globalImportUrl = __importStar(require("url"));
const axios_1 = __importDefault(require("axios"));
const base_1 = require("./base");
var FeeHistoryPaymentType;
(function (FeeHistoryPaymentType) {
    FeeHistoryPaymentType["DEFAULTFEEWALLET"] = "DEFAULT_FEE_WALLET";
    FeeHistoryPaymentType["PROPOSALFEEWALLET"] = "PROPOSAL_FEE_WALLET";
    FeeHistoryPaymentType["DEPOSITADDRESS"] = "DEPOSIT_ADDRESS";
})(FeeHistoryPaymentType = exports.FeeHistoryPaymentType || (exports.FeeHistoryPaymentType = {}));
var FeeHistoryType;
(function (FeeHistoryType) {
    FeeHistoryType["WITHDRAWAL"] = "WITHDRAWAL";
    FeeHistoryType["FLUSH"] = "FLUSH";
    FeeHistoryType["WALLETDEPLOYMENT"] = "WALLET_DEPLOYMENT";
})(FeeHistoryType = exports.FeeHistoryType || (exports.FeeHistoryType = {}));
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
        getFeeHistories: async (pageable, condition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getFeeHistories.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getFeeHistories.');
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
        getFeeHistory: async (historyId, options = {}) => {
            if (historyId === null || historyId === undefined) {
                throw new base_1.RequiredError('historyId', 'Required parameter historyId was null or undefined when calling getFeeHistory.');
            }
            const localVarPath = `/api/v2/fil/fee-wallets/histories/{historyId}`
                .replace(`{${"historyId"}}`, encodeURIComponent(String(historyId)));
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
        async getFeeHistories(pageable, condition, options) {
            const localVarAxiosArgs = await exports.FeeWalletControllerApiAxiosParamCreator(configuration).getFeeHistories(pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFeeHistory(historyId, options) {
            const localVarAxiosArgs = await exports.FeeWalletControllerApiAxiosParamCreator(configuration).getFeeHistory(historyId, options);
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
        getFeeHistories(pageable, condition, options) {
            return exports.FeeWalletControllerApiFp(configuration).getFeeHistories(pageable, condition, options).then((request) => request(axios, basePath));
        },
        getFeeHistory(historyId, options) {
            return exports.FeeWalletControllerApiFp(configuration).getFeeHistory(historyId, options).then((request) => request(axios, basePath));
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
    getFeeHistories(pageable, condition, options) {
        return exports.FeeWalletControllerApiFp(this.configuration).getFeeHistories(pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getFeeHistory(historyId, options) {
        return exports.FeeWalletControllerApiFp(this.configuration).getFeeHistory(historyId, options).then((request) => request(this.axios, this.basePath));
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
        getFlushes: async (pageable, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getFlushes.');
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
        async getFlushes(pageable, options) {
            const localVarAxiosArgs = await exports.InternalControllerApiAxiosParamCreator(configuration).getFlushes(pageable, options);
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
        getFlushes(pageable, options) {
            return exports.InternalControllerApiFp(configuration).getFlushes(pageable, options).then((request) => request(axios, basePath));
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
    getFlushes(pageable, options) {
        return exports.InternalControllerApiFp(this.configuration).getFlushes(pageable, options).then((request) => request(this.axios, this.basePath));
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
        buildDepositAddressTransaction: async (masterWalletId, depositAddressId, buildTransactionRequest, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling buildDepositAddressTransaction.');
            }
            if (depositAddressId === null || depositAddressId === undefined) {
                throw new base_1.RequiredError('depositAddressId', 'Required parameter depositAddressId was null or undefined when calling buildDepositAddressTransaction.');
            }
            if (buildTransactionRequest === null || buildTransactionRequest === undefined) {
                throw new base_1.RequiredError('buildTransactionRequest', 'Required parameter buildTransactionRequest was null or undefined when calling buildDepositAddressTransaction.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/deposit-addresses/{depositAddressId}/transactions/build`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)))
                .replace(`{${"depositAddressId"}}`, encodeURIComponent(String(depositAddressId)));
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
            const needsSerialization = (typeof buildTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(buildTransactionRequest !== undefined ? buildTransactionRequest : {}) : (buildTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        buildFlush: async (masterWalletId, buildFlushRequest, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling buildFlush.');
            }
            if (buildFlushRequest === null || buildFlushRequest === undefined) {
                throw new base_1.RequiredError('buildFlushRequest', 'Required parameter buildFlushRequest was null or undefined when calling buildFlush.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/flushes/build`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
            const needsSerialization = (typeof buildFlushRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(buildFlushRequest !== undefined ? buildFlushRequest : {}) : (buildFlushRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        buildTransaction: async (masterWalletId, buildTransactionRequest, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling buildTransaction.');
            }
            if (buildTransactionRequest === null || buildTransactionRequest === undefined) {
                throw new base_1.RequiredError('buildTransactionRequest', 'Required parameter buildTransactionRequest was null or undefined when calling buildTransaction.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/transactions/build`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
            const needsSerialization = (typeof buildTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(buildTransactionRequest !== undefined ? buildTransactionRequest : {}) : (buildTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createDepositAddress: async (masterWalletId, createDepositAddressRequest, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling createDepositAddress.');
            }
            if (createDepositAddressRequest === null || createDepositAddressRequest === undefined) {
                throw new base_1.RequiredError('createDepositAddressRequest', 'Required parameter createDepositAddressRequest was null or undefined when calling createDepositAddress.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/deposit-addresses`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
        createMasterWallet: async (createMasterWalletRequest, options = {}) => {
            if (createMasterWalletRequest === null || createMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('createMasterWalletRequest', 'Required parameter createMasterWalletRequest was null or undefined when calling createMasterWallet.');
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
            const needsSerialization = (typeof createMasterWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createMasterWalletRequest !== undefined ? createMasterWalletRequest : {}) : (createMasterWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        flush: async (masterWalletId, createFlushRequest, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling flush.');
            }
            if (createFlushRequest === null || createFlushRequest === undefined) {
                throw new base_1.RequiredError('createFlushRequest', 'Required parameter createFlushRequest was null or undefined when calling flush.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/flushes`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
            const needsSerialization = (typeof createFlushRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createFlushRequest !== undefined ? createFlushRequest : {}) : (createFlushRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getAllMasterWallets: async (sort, condition, options = {}) => {
            if (sort === null || sort === undefined) {
                throw new base_1.RequiredError('sort', 'Required parameter sort was null or undefined when calling getAllMasterWallets.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getAllMasterWallets.');
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
        getBalance: async (masterWalletId, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling getBalance.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/balance`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
        getDepositAddress: async (masterWalletId, depositAddressId, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling getDepositAddress.');
            }
            if (depositAddressId === null || depositAddressId === undefined) {
                throw new base_1.RequiredError('depositAddressId', 'Required parameter depositAddressId was null or undefined when calling getDepositAddress.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/deposit-addresses/{depositAddressId}`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)))
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
        getDepositAddressBalance: async (masterWalletId, depositAddressId, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling getDepositAddressBalance.');
            }
            if (depositAddressId === null || depositAddressId === undefined) {
                throw new base_1.RequiredError('depositAddressId', 'Required parameter depositAddressId was null or undefined when calling getDepositAddressBalance.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/deposit-addresses/{depositAddressId}/balance`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)))
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
        getDepositAddresses: async (masterWalletId, pageable, condition, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling getDepositAddresses.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getDepositAddresses.');
            }
            if (condition === null || condition === undefined) {
                throw new base_1.RequiredError('condition', 'Required parameter condition was null or undefined when calling getDepositAddresses.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/deposit-addresses`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
        getDepositAddressesBalance: async (masterWalletId, ids, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling getDepositAddressesBalance.');
            }
            if (ids === null || ids === undefined) {
                throw new base_1.RequiredError('ids', 'Required parameter ids was null or undefined when calling getDepositAddressesBalance.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/deposit-addresses/balance`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (ids) {
                localVarQueryParameter['ids'] = ids;
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
        getFlush: async (masterWalletId, flushId, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling getFlush.');
            }
            if (flushId === null || flushId === undefined) {
                throw new base_1.RequiredError('flushId', 'Required parameter flushId was null or undefined when calling getFlush.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/flushes/{flushId}`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)))
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
        getFlushes1: async (masterWalletId, pageable, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling getFlushes1.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getFlushes1.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/flushes`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
        getMasterWallet: async (masterWalletId, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling getMasterWallet.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
        getMasterWalletInitialAccountKey: async (masterWalletId, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling getMasterWalletInitialAccountKey.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/initial-key`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
        patchDepositAddressName: async (masterWalletId, depositAddressId, patchWalletNameRequest, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling patchDepositAddressName.');
            }
            if (depositAddressId === null || depositAddressId === undefined) {
                throw new base_1.RequiredError('depositAddressId', 'Required parameter depositAddressId was null or undefined when calling patchDepositAddressName.');
            }
            if (patchWalletNameRequest === null || patchWalletNameRequest === undefined) {
                throw new base_1.RequiredError('patchWalletNameRequest', 'Required parameter patchWalletNameRequest was null or undefined when calling patchDepositAddressName.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/deposit-addresses/{depositAddressId}/name`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)))
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
        patchMasterWalletAccountKey: async (masterWalletId, patchAccountKeyRequest, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling patchMasterWalletAccountKey.');
            }
            if (patchAccountKeyRequest === null || patchAccountKeyRequest === undefined) {
                throw new base_1.RequiredError('patchAccountKeyRequest', 'Required parameter patchAccountKeyRequest was null or undefined when calling patchMasterWalletAccountKey.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/account-key`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
        patchWalletMasterName: async (masterWalletId, patchWalletNameRequest, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling patchWalletMasterName.');
            }
            if (patchWalletNameRequest === null || patchWalletNameRequest === undefined) {
                throw new base_1.RequiredError('patchWalletNameRequest', 'Required parameter patchWalletNameRequest was null or undefined when calling patchWalletMasterName.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/name`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
        recreateWallet: async (masterWalletId, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling recreateWallet.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/recreate`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
        sendTransaction: async (masterWalletId, depositAddressId, createTransactionRequest, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling sendTransaction.');
            }
            if (depositAddressId === null || depositAddressId === undefined) {
                throw new base_1.RequiredError('depositAddressId', 'Required parameter depositAddressId was null or undefined when calling sendTransaction.');
            }
            if (createTransactionRequest === null || createTransactionRequest === undefined) {
                throw new base_1.RequiredError('createTransactionRequest', 'Required parameter createTransactionRequest was null or undefined when calling sendTransaction.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/deposit-addresses/{depositAddressId}/transactions`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)))
                .replace(`{${"depositAddressId"}}`, encodeURIComponent(String(depositAddressId)));
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
        sendTransaction1: async (masterWalletId, createMultiSigTransactionRequest, options = {}) => {
            if (masterWalletId === null || masterWalletId === undefined) {
                throw new base_1.RequiredError('masterWalletId', 'Required parameter masterWalletId was null or undefined when calling sendTransaction1.');
            }
            if (createMultiSigTransactionRequest === null || createMultiSigTransactionRequest === undefined) {
                throw new base_1.RequiredError('createMultiSigTransactionRequest', 'Required parameter createMultiSigTransactionRequest was null or undefined when calling sendTransaction1.');
            }
            const localVarPath = `/api/v2/fil/wallets/{masterWalletId}/transactions`
                .replace(`{${"masterWalletId"}}`, encodeURIComponent(String(masterWalletId)));
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
            const needsSerialization = (typeof createMultiSigTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createMultiSigTransactionRequest !== undefined ? createMultiSigTransactionRequest : {}) : (createMultiSigTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.WalletControllerApiFp = function (configuration) {
    return {
        async buildDepositAddressTransaction(masterWalletId, depositAddressId, buildTransactionRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).buildDepositAddressTransaction(masterWalletId, depositAddressId, buildTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async buildFlush(masterWalletId, buildFlushRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).buildFlush(masterWalletId, buildFlushRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async buildTransaction(masterWalletId, buildTransactionRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).buildTransaction(masterWalletId, buildTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createDepositAddress(masterWalletId, createDepositAddressRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createDepositAddress(masterWalletId, createDepositAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createMasterWallet(createMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createMasterWallet(createMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async flush(masterWalletId, createFlushRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).flush(masterWalletId, createFlushRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllMasterWallets(sort, condition, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getAllMasterWallets(sort, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getBalance(masterWalletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getBalance(masterWalletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddress(masterWalletId, depositAddressId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getDepositAddress(masterWalletId, depositAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddressBalance(masterWalletId, depositAddressId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getDepositAddressBalance(masterWalletId, depositAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddresses(masterWalletId, pageable, condition, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getDepositAddresses(masterWalletId, pageable, condition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getDepositAddressesBalance(masterWalletId, ids, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getDepositAddressesBalance(masterWalletId, ids, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFlush(masterWalletId, flushId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getFlush(masterWalletId, flushId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFlushes1(masterWalletId, pageable, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getFlushes1(masterWalletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallet(masterWalletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWallet(masterWalletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletInitialAccountKey(masterWalletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWalletInitialAccountKey(masterWalletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchDepositAddressName(masterWalletId, depositAddressId, patchWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchDepositAddressName(masterWalletId, depositAddressId, patchWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletAccountKey(masterWalletId, patchAccountKeyRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchMasterWalletAccountKey(masterWalletId, patchAccountKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchWalletMasterName(masterWalletId, patchWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchWalletMasterName(masterWalletId, patchWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async recreateWallet(masterWalletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).recreateWallet(masterWalletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendTransaction(masterWalletId, depositAddressId, createTransactionRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).sendTransaction(masterWalletId, depositAddressId, createTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendTransaction1(masterWalletId, createMultiSigTransactionRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).sendTransaction1(masterWalletId, createMultiSigTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.WalletControllerApiFactory = function (configuration, basePath, axios) {
    return {
        buildDepositAddressTransaction(masterWalletId, depositAddressId, buildTransactionRequest, options) {
            return exports.WalletControllerApiFp(configuration).buildDepositAddressTransaction(masterWalletId, depositAddressId, buildTransactionRequest, options).then((request) => request(axios, basePath));
        },
        buildFlush(masterWalletId, buildFlushRequest, options) {
            return exports.WalletControllerApiFp(configuration).buildFlush(masterWalletId, buildFlushRequest, options).then((request) => request(axios, basePath));
        },
        buildTransaction(masterWalletId, buildTransactionRequest, options) {
            return exports.WalletControllerApiFp(configuration).buildTransaction(masterWalletId, buildTransactionRequest, options).then((request) => request(axios, basePath));
        },
        createDepositAddress(masterWalletId, createDepositAddressRequest, options) {
            return exports.WalletControllerApiFp(configuration).createDepositAddress(masterWalletId, createDepositAddressRequest, options).then((request) => request(axios, basePath));
        },
        createMasterWallet(createMasterWalletRequest, options) {
            return exports.WalletControllerApiFp(configuration).createMasterWallet(createMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        flush(masterWalletId, createFlushRequest, options) {
            return exports.WalletControllerApiFp(configuration).flush(masterWalletId, createFlushRequest, options).then((request) => request(axios, basePath));
        },
        getAllMasterWallets(sort, condition, options) {
            return exports.WalletControllerApiFp(configuration).getAllMasterWallets(sort, condition, options).then((request) => request(axios, basePath));
        },
        getBalance(masterWalletId, options) {
            return exports.WalletControllerApiFp(configuration).getBalance(masterWalletId, options).then((request) => request(axios, basePath));
        },
        getDepositAddress(masterWalletId, depositAddressId, options) {
            return exports.WalletControllerApiFp(configuration).getDepositAddress(masterWalletId, depositAddressId, options).then((request) => request(axios, basePath));
        },
        getDepositAddressBalance(masterWalletId, depositAddressId, options) {
            return exports.WalletControllerApiFp(configuration).getDepositAddressBalance(masterWalletId, depositAddressId, options).then((request) => request(axios, basePath));
        },
        getDepositAddresses(masterWalletId, pageable, condition, options) {
            return exports.WalletControllerApiFp(configuration).getDepositAddresses(masterWalletId, pageable, condition, options).then((request) => request(axios, basePath));
        },
        getDepositAddressesBalance(masterWalletId, ids, options) {
            return exports.WalletControllerApiFp(configuration).getDepositAddressesBalance(masterWalletId, ids, options).then((request) => request(axios, basePath));
        },
        getFlush(masterWalletId, flushId, options) {
            return exports.WalletControllerApiFp(configuration).getFlush(masterWalletId, flushId, options).then((request) => request(axios, basePath));
        },
        getFlushes1(masterWalletId, pageable, options) {
            return exports.WalletControllerApiFp(configuration).getFlushes1(masterWalletId, pageable, options).then((request) => request(axios, basePath));
        },
        getMasterWallet(masterWalletId, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWallet(masterWalletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletInitialAccountKey(masterWalletId, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWalletInitialAccountKey(masterWalletId, options).then((request) => request(axios, basePath));
        },
        patchDepositAddressName(masterWalletId, depositAddressId, patchWalletNameRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchDepositAddressName(masterWalletId, depositAddressId, patchWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletAccountKey(masterWalletId, patchAccountKeyRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchMasterWalletAccountKey(masterWalletId, patchAccountKeyRequest, options).then((request) => request(axios, basePath));
        },
        patchWalletMasterName(masterWalletId, patchWalletNameRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchWalletMasterName(masterWalletId, patchWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        recreateWallet(masterWalletId, options) {
            return exports.WalletControllerApiFp(configuration).recreateWallet(masterWalletId, options).then((request) => request(axios, basePath));
        },
        sendTransaction(masterWalletId, depositAddressId, createTransactionRequest, options) {
            return exports.WalletControllerApiFp(configuration).sendTransaction(masterWalletId, depositAddressId, createTransactionRequest, options).then((request) => request(axios, basePath));
        },
        sendTransaction1(masterWalletId, createMultiSigTransactionRequest, options) {
            return exports.WalletControllerApiFp(configuration).sendTransaction1(masterWalletId, createMultiSigTransactionRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class WalletControllerApi extends base_1.BaseAPI {
    buildDepositAddressTransaction(masterWalletId, depositAddressId, buildTransactionRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).buildDepositAddressTransaction(masterWalletId, depositAddressId, buildTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    buildFlush(masterWalletId, buildFlushRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).buildFlush(masterWalletId, buildFlushRequest, options).then((request) => request(this.axios, this.basePath));
    }
    buildTransaction(masterWalletId, buildTransactionRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).buildTransaction(masterWalletId, buildTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createDepositAddress(masterWalletId, createDepositAddressRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createDepositAddress(masterWalletId, createDepositAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createMasterWallet(createMasterWalletRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createMasterWallet(createMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    flush(masterWalletId, createFlushRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).flush(masterWalletId, createFlushRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getAllMasterWallets(sort, condition, options) {
        return exports.WalletControllerApiFp(this.configuration).getAllMasterWallets(sort, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getBalance(masterWalletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getBalance(masterWalletId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddress(masterWalletId, depositAddressId, options) {
        return exports.WalletControllerApiFp(this.configuration).getDepositAddress(masterWalletId, depositAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddressBalance(masterWalletId, depositAddressId, options) {
        return exports.WalletControllerApiFp(this.configuration).getDepositAddressBalance(masterWalletId, depositAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddresses(masterWalletId, pageable, condition, options) {
        return exports.WalletControllerApiFp(this.configuration).getDepositAddresses(masterWalletId, pageable, condition, options).then((request) => request(this.axios, this.basePath));
    }
    getDepositAddressesBalance(masterWalletId, ids, options) {
        return exports.WalletControllerApiFp(this.configuration).getDepositAddressesBalance(masterWalletId, ids, options).then((request) => request(this.axios, this.basePath));
    }
    getFlush(masterWalletId, flushId, options) {
        return exports.WalletControllerApiFp(this.configuration).getFlush(masterWalletId, flushId, options).then((request) => request(this.axios, this.basePath));
    }
    getFlushes1(masterWalletId, pageable, options) {
        return exports.WalletControllerApiFp(this.configuration).getFlushes1(masterWalletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallet(masterWalletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWallet(masterWalletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletInitialAccountKey(masterWalletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWalletInitialAccountKey(masterWalletId, options).then((request) => request(this.axios, this.basePath));
    }
    patchDepositAddressName(masterWalletId, depositAddressId, patchWalletNameRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchDepositAddressName(masterWalletId, depositAddressId, patchWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletAccountKey(masterWalletId, patchAccountKeyRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchMasterWalletAccountKey(masterWalletId, patchAccountKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchWalletMasterName(masterWalletId, patchWalletNameRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchWalletMasterName(masterWalletId, patchWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    recreateWallet(masterWalletId, options) {
        return exports.WalletControllerApiFp(this.configuration).recreateWallet(masterWalletId, options).then((request) => request(this.axios, this.basePath));
    }
    sendTransaction(masterWalletId, depositAddressId, createTransactionRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).sendTransaction(masterWalletId, depositAddressId, createTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendTransaction1(masterWalletId, createMultiSigTransactionRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).sendTransaction1(masterWalletId, createMultiSigTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.WalletControllerApi = WalletControllerApi;
//# sourceMappingURL=api.js.map