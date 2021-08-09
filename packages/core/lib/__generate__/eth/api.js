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
exports.WalletControllerApi = exports.WalletControllerApiFactory = exports.WalletControllerApiFp = exports.WalletControllerApiAxiosParamCreator = exports.TransactionControllerApi = exports.TransactionControllerApiFactory = exports.TransactionControllerApiFp = exports.TransactionControllerApiAxiosParamCreator = exports.MethodGasUsageControllerApi = exports.MethodGasUsageControllerApiFactory = exports.MethodGasUsageControllerApiFp = exports.MethodGasUsageControllerApiAxiosParamCreator = exports.KlayWithdrawalApprovalControllerApi = exports.KlayWithdrawalApprovalControllerApiFactory = exports.KlayWithdrawalApprovalControllerApiFp = exports.KlayWithdrawalApprovalControllerApiAxiosParamCreator = exports.KlayWalletControllerApi = exports.KlayWalletControllerApiFactory = exports.KlayWalletControllerApiFp = exports.KlayWalletControllerApiAxiosParamCreator = exports.KlayTransactionControllerApi = exports.KlayTransactionControllerApiFactory = exports.KlayTransactionControllerApiFp = exports.KlayTransactionControllerApiAxiosParamCreator = exports.KlayOperationControllerApi = exports.KlayOperationControllerApiFactory = exports.KlayOperationControllerApiFp = exports.KlayOperationControllerApiAxiosParamCreator = exports.KlayMethodGasUsageControllerApi = exports.KlayMethodGasUsageControllerApiFactory = exports.KlayMethodGasUsageControllerApiFp = exports.KlayMethodGasUsageControllerApiAxiosParamCreator = exports.KlayInternalControllerApi = exports.KlayInternalControllerApiFactory = exports.KlayInternalControllerApiFp = exports.KlayInternalControllerApiAxiosParamCreator = exports.KlayHenesisKeyControllerApi = exports.KlayHenesisKeyControllerApiFactory = exports.KlayHenesisKeyControllerApiFp = exports.KlayHenesisKeyControllerApiAxiosParamCreator = exports.KlayGasPriceControllerApi = exports.KlayGasPriceControllerApiFactory = exports.KlayGasPriceControllerApiFp = exports.KlayGasPriceControllerApiAxiosParamCreator = exports.KlayEventControllerApi = exports.KlayEventControllerApiFactory = exports.KlayEventControllerApiFp = exports.KlayEventControllerApiAxiosParamCreator = exports.KlayCoinControllerApi = exports.KlayCoinControllerApiFactory = exports.KlayCoinControllerApiFp = exports.KlayCoinControllerApiAxiosParamCreator = exports.KlayAdminControllerApi = exports.KlayAdminControllerApiFactory = exports.KlayAdminControllerApiFp = exports.KlayAdminControllerApiAxiosParamCreator = exports.EventControllerApi = exports.EventControllerApiFactory = exports.EventControllerApiFp = exports.EventControllerApiAxiosParamCreator = exports.EthWithdrawalApprovalControllerApi = exports.EthWithdrawalApprovalControllerApiFactory = exports.EthWithdrawalApprovalControllerApiFp = exports.EthWithdrawalApprovalControllerApiAxiosParamCreator = exports.EthWalletControllerApi = exports.EthWalletControllerApiFactory = exports.EthWalletControllerApiFp = exports.EthWalletControllerApiAxiosParamCreator = exports.EthTransactionControllerApi = exports.EthTransactionControllerApiFactory = exports.EthTransactionControllerApiFp = exports.EthTransactionControllerApiAxiosParamCreator = exports.EthOperationControllerApi = exports.EthOperationControllerApiFactory = exports.EthOperationControllerApiFp = exports.EthOperationControllerApiAxiosParamCreator = exports.EthMethodGasUsageControllerApi = exports.EthMethodGasUsageControllerApiFactory = exports.EthMethodGasUsageControllerApiFp = exports.EthMethodGasUsageControllerApiAxiosParamCreator = exports.EthInternalControllerApi = exports.EthInternalControllerApiFactory = exports.EthInternalControllerApiFp = exports.EthInternalControllerApiAxiosParamCreator = exports.EthHenesisKeyControllerApi = exports.EthHenesisKeyControllerApiFactory = exports.EthHenesisKeyControllerApiFp = exports.EthHenesisKeyControllerApiAxiosParamCreator = exports.EthGasPriceControllerApi = exports.EthGasPriceControllerApiFactory = exports.EthGasPriceControllerApiFp = exports.EthGasPriceControllerApiAxiosParamCreator = exports.EthEventControllerApi = exports.EthEventControllerApiFactory = exports.EthEventControllerApiFp = exports.EthEventControllerApiAxiosParamCreator = exports.EthCoinControllerApi = exports.EthCoinControllerApiFactory = exports.EthCoinControllerApiFp = exports.EthCoinControllerApiAxiosParamCreator = exports.EthAdminControllerApi = exports.EthAdminControllerApiFactory = exports.EthAdminControllerApiFp = exports.EthAdminControllerApiAxiosParamCreator = exports.CoinControllerApi = exports.CoinControllerApiFactory = exports.CoinControllerApiFp = exports.CoinControllerApiAxiosParamCreator = exports.BscWithdrawalApprovalControllerApi = exports.BscWithdrawalApprovalControllerApiFactory = exports.BscWithdrawalApprovalControllerApiFp = exports.BscWithdrawalApprovalControllerApiAxiosParamCreator = exports.BscWalletControllerApi = exports.BscWalletControllerApiFactory = exports.BscWalletControllerApiFp = exports.BscWalletControllerApiAxiosParamCreator = exports.BscTransactionControllerApi = exports.BscTransactionControllerApiFactory = exports.BscTransactionControllerApiFp = exports.BscTransactionControllerApiAxiosParamCreator = exports.BscOperationControllerApi = exports.BscOperationControllerApiFactory = exports.BscOperationControllerApiFp = exports.BscOperationControllerApiAxiosParamCreator = exports.BscMethodGasUsageControllerApi = exports.BscMethodGasUsageControllerApiFactory = exports.BscMethodGasUsageControllerApiFp = exports.BscMethodGasUsageControllerApiAxiosParamCreator = exports.BscInternalControllerApi = exports.BscInternalControllerApiFactory = exports.BscInternalControllerApiFp = exports.BscInternalControllerApiAxiosParamCreator = exports.BscHenesisKeyControllerApi = exports.BscHenesisKeyControllerApiFactory = exports.BscHenesisKeyControllerApiFp = exports.BscHenesisKeyControllerApiAxiosParamCreator = exports.BscGasPriceControllerApi = exports.BscGasPriceControllerApiFactory = exports.BscGasPriceControllerApiFp = exports.BscGasPriceControllerApiAxiosParamCreator = exports.BscEventControllerApi = exports.BscEventControllerApiFactory = exports.BscEventControllerApiFp = exports.BscEventControllerApiAxiosParamCreator = exports.BscCoinControllerApi = exports.BscCoinControllerApiFactory = exports.BscCoinControllerApiFp = exports.BscCoinControllerApiAxiosParamCreator = exports.BscAdminControllerApi = exports.BscAdminControllerApiFactory = exports.BscAdminControllerApiFp = exports.BscAdminControllerApiAxiosParamCreator = exports.WithdrawalPolicyType = exports.WhitelistType = exports.WalletType = exports.WalletStatus = exports.UserWalletDTOBlockchainEnum = exports.UpdateCoinRequestAttributesEnum = exports.TransferType = exports.TransactionType = exports.TransactionStatus = exports.FlushTransactionValueTransferEventDTOStatus = exports.EventStatus = exports.CreateWithdrawalPolicyRequestTypeEnum = exports.CreateHenesisKeyRequestWalletTypeEnum = exports.CreateCoinRequestAttributesEnum = exports.CoinType = exports.CoinDTOAttributesEnum = exports.Blockchain = exports.BindHenesisKeyToWalletDTOBlockchainEnum = exports.AllowedCoinType = void 0;
const globalImportUrl = __importStar(require("url"));
const axios_1 = __importDefault(require("axios"));
const base_1 = require("./base");
var AllowedCoinType;
(function (AllowedCoinType) {
    AllowedCoinType["ALL"] = "ALL";
    AllowedCoinType["SINGLE"] = "SINGLE";
})(AllowedCoinType = exports.AllowedCoinType || (exports.AllowedCoinType = {}));
var BindHenesisKeyToWalletDTOBlockchainEnum;
(function (BindHenesisKeyToWalletDTOBlockchainEnum) {
    BindHenesisKeyToWalletDTOBlockchainEnum["ETHEREUM"] = "ETHEREUM";
    BindHenesisKeyToWalletDTOBlockchainEnum["KLAYTN"] = "KLAYTN";
    BindHenesisKeyToWalletDTOBlockchainEnum["BITCOIN"] = "BITCOIN";
    BindHenesisKeyToWalletDTOBlockchainEnum["FILECOIN"] = "FILECOIN";
    BindHenesisKeyToWalletDTOBlockchainEnum["BINANCESMARTCHAIN"] = "BINANCE_SMART_CHAIN";
})(BindHenesisKeyToWalletDTOBlockchainEnum = exports.BindHenesisKeyToWalletDTOBlockchainEnum || (exports.BindHenesisKeyToWalletDTOBlockchainEnum = {}));
var Blockchain;
(function (Blockchain) {
    Blockchain["ETHEREUM"] = "ETHEREUM";
    Blockchain["KLAYTN"] = "KLAYTN";
    Blockchain["BITCOIN"] = "BITCOIN";
    Blockchain["FILECOIN"] = "FILECOIN";
    Blockchain["BINANCESMARTCHAIN"] = "BINANCE_SMART_CHAIN";
})(Blockchain = exports.Blockchain || (exports.Blockchain = {}));
var CoinDTOAttributesEnum;
(function (CoinDTOAttributesEnum) {
    CoinDTOAttributesEnum["STANDARD"] = "ERC20_STANDARD";
    CoinDTOAttributesEnum["NONSTANDARDRETURNTYPE"] = "ERC20_NON_STANDARD_RETURN_TYPE";
    CoinDTOAttributesEnum["REBASE"] = "ERC20_REBASE";
    CoinDTOAttributesEnum["PAUSABLE"] = "ERC20_PAUSABLE";
})(CoinDTOAttributesEnum = exports.CoinDTOAttributesEnum || (exports.CoinDTOAttributesEnum = {}));
var CoinType;
(function (CoinType) {
    CoinType["ETHEREUM"] = "ETHEREUM";
    CoinType["KLAYTN"] = "KLAYTN";
    CoinType["BITCOIN"] = "BITCOIN";
    CoinType["FILECOIN"] = "FILECOIN";
    CoinType["BINANCESMARTCHAIN"] = "BINANCE_SMART_CHAIN";
    CoinType["TOKEN"] = "TOKEN";
})(CoinType = exports.CoinType || (exports.CoinType = {}));
var CreateCoinRequestAttributesEnum;
(function (CreateCoinRequestAttributesEnum) {
    CreateCoinRequestAttributesEnum["STANDARD"] = "ERC20_STANDARD";
    CreateCoinRequestAttributesEnum["NONSTANDARDRETURNTYPE"] = "ERC20_NON_STANDARD_RETURN_TYPE";
    CreateCoinRequestAttributesEnum["REBASE"] = "ERC20_REBASE";
    CreateCoinRequestAttributesEnum["PAUSABLE"] = "ERC20_PAUSABLE";
})(CreateCoinRequestAttributesEnum = exports.CreateCoinRequestAttributesEnum || (exports.CreateCoinRequestAttributesEnum = {}));
var CreateHenesisKeyRequestWalletTypeEnum;
(function (CreateHenesisKeyRequestWalletTypeEnum) {
    CreateHenesisKeyRequestWalletTypeEnum["DEFAULT"] = "DEFAULT";
    CreateHenesisKeyRequestWalletTypeEnum["BOOST"] = "BOOST";
})(CreateHenesisKeyRequestWalletTypeEnum = exports.CreateHenesisKeyRequestWalletTypeEnum || (exports.CreateHenesisKeyRequestWalletTypeEnum = {}));
var CreateWithdrawalPolicyRequestTypeEnum;
(function (CreateWithdrawalPolicyRequestTypeEnum) {
    CreateWithdrawalPolicyRequestTypeEnum["DAILY"] = "DAILY";
    CreateWithdrawalPolicyRequestTypeEnum["TRANSACTION"] = "TRANSACTION";
})(CreateWithdrawalPolicyRequestTypeEnum = exports.CreateWithdrawalPolicyRequestTypeEnum || (exports.CreateWithdrawalPolicyRequestTypeEnum = {}));
var EventStatus;
(function (EventStatus) {
    EventStatus["PENDINGAPPROVAL"] = "PENDING_APPROVAL";
    EventStatus["REJECTED"] = "REJECTED";
    EventStatus["REQUESTED"] = "REQUESTED";
    EventStatus["PENDING"] = "PENDING";
    EventStatus["FAILED"] = "FAILED";
    EventStatus["REVERTED"] = "REVERTED";
    EventStatus["REPLACED"] = "REPLACED";
    EventStatus["MINED"] = "MINED";
    EventStatus["CONFIRMED"] = "CONFIRMED";
})(EventStatus = exports.EventStatus || (exports.EventStatus = {}));
var FlushTransactionValueTransferEventDTOStatus;
(function (FlushTransactionValueTransferEventDTOStatus) {
    FlushTransactionValueTransferEventDTOStatus["NOTMINED"] = "NOT_MINED";
    FlushTransactionValueTransferEventDTOStatus["FIRST"] = "FIRST";
    FlushTransactionValueTransferEventDTOStatus["NOTFIRST"] = "NOT_FIRST";
})(FlushTransactionValueTransferEventDTOStatus = exports.FlushTransactionValueTransferEventDTOStatus || (exports.FlushTransactionValueTransferEventDTOStatus = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDINGAPPROVAL"] = "PENDING_APPROVAL";
    TransactionStatus["REJECTED"] = "REJECTED";
    TransactionStatus["REQUESTED"] = "REQUESTED";
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["FAILED"] = "FAILED";
    TransactionStatus["MINED"] = "MINED";
    TransactionStatus["REVERTED"] = "REVERTED";
    TransactionStatus["INTERNALREVERTED"] = "INTERNAL_REVERTED";
    TransactionStatus["CONFIRMED"] = "CONFIRMED";
    TransactionStatus["REPLACED"] = "REPLACED";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["WITHDRAWAL"] = "WITHDRAWAL";
    TransactionType["DEPOSIT"] = "DEPOSIT";
    TransactionType["UNKNOWNEXTERNALCALL"] = "UNKNOWN_EXTERNAL_CALL";
    TransactionType["SMARTCONTRACTCALL"] = "SMART_CONTRACT_CALL";
    TransactionType["MASTERWALLETDEPLOYMENT"] = "MASTER_WALLET_DEPLOYMENT";
    TransactionType["USERWALLETDEPLOYMENT"] = "USER_WALLET_DEPLOYMENT";
    TransactionType["FLUSH"] = "FLUSH";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var TransferType;
(function (TransferType) {
    TransferType["WITHDRAWAL"] = "WITHDRAWAL";
    TransferType["DEPOSIT"] = "DEPOSIT";
})(TransferType = exports.TransferType || (exports.TransferType = {}));
var UpdateCoinRequestAttributesEnum;
(function (UpdateCoinRequestAttributesEnum) {
    UpdateCoinRequestAttributesEnum["STANDARD"] = "ERC20_STANDARD";
    UpdateCoinRequestAttributesEnum["NONSTANDARDRETURNTYPE"] = "ERC20_NON_STANDARD_RETURN_TYPE";
    UpdateCoinRequestAttributesEnum["REBASE"] = "ERC20_REBASE";
    UpdateCoinRequestAttributesEnum["PAUSABLE"] = "ERC20_PAUSABLE";
})(UpdateCoinRequestAttributesEnum = exports.UpdateCoinRequestAttributesEnum || (exports.UpdateCoinRequestAttributesEnum = {}));
var UserWalletDTOBlockchainEnum;
(function (UserWalletDTOBlockchainEnum) {
    UserWalletDTOBlockchainEnum["ETHEREUM"] = "ETHEREUM";
    UserWalletDTOBlockchainEnum["KLAYTN"] = "KLAYTN";
    UserWalletDTOBlockchainEnum["BITCOIN"] = "BITCOIN";
    UserWalletDTOBlockchainEnum["FILECOIN"] = "FILECOIN";
    UserWalletDTOBlockchainEnum["BINANCESMARTCHAIN"] = "BINANCE_SMART_CHAIN";
})(UserWalletDTOBlockchainEnum = exports.UserWalletDTOBlockchainEnum || (exports.UserWalletDTOBlockchainEnum = {}));
var WalletStatus;
(function (WalletStatus) {
    WalletStatus["INACTIVE"] = "INACTIVE";
    WalletStatus["ACTIVE"] = "ACTIVE";
    WalletStatus["CREATING"] = "CREATING";
    WalletStatus["FAILED"] = "FAILED";
})(WalletStatus = exports.WalletStatus || (exports.WalletStatus = {}));
var WalletType;
(function (WalletType) {
    WalletType["MASTERWALLET"] = "MASTER_WALLET";
    WalletType["USERWALLET"] = "USER_WALLET";
})(WalletType = exports.WalletType || (exports.WalletType = {}));
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
exports.BscAdminControllerApiAxiosParamCreator = function (configuration) {
    return {
        getCoin2: async (coinId, options = {}) => {
            if (coinId === null || coinId === undefined) {
                throw new base_1.RequiredError('coinId', 'Required parameter coinId was null or undefined when calling getCoin2.');
            }
            const localVarPath = `/api/v2/bnb/admin/coins/{coinId}`
                .replace(`{${"coinId"}}`, encodeURIComponent(String(coinId)));
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
        getExternalWithdrawals1: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getExternalWithdrawals1.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getExternalWithdrawals1.');
            }
            const localVarPath = `/api/v2/bnb/admin/external-withdrawals`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
        getMasterWallets2: async (pageable, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getMasterWallets2.');
            }
            const localVarPath = `/api/v2/bnb/admin/master-wallets`;
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
        getUserWallets2: async (pageable, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getUserWallets2.');
            }
            const localVarPath = `/api/v2/bnb/admin/user-wallets`;
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
        getValueTransferEvents5: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getValueTransferEvents5.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getValueTransferEvents5.');
            }
            const localVarPath = `/api/v2/bnb/admin/value-transfer-events`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
exports.BscAdminControllerApiFp = function (configuration) {
    return {
        async getCoin2(coinId, options) {
            const localVarAxiosArgs = await exports.BscAdminControllerApiAxiosParamCreator(configuration).getCoin2(coinId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getExternalWithdrawals1(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.BscAdminControllerApiAxiosParamCreator(configuration).getExternalWithdrawals1(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets2(pageable, options) {
            const localVarAxiosArgs = await exports.BscAdminControllerApiAxiosParamCreator(configuration).getMasterWallets2(pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWallets2(pageable, options) {
            const localVarAxiosArgs = await exports.BscAdminControllerApiAxiosParamCreator(configuration).getUserWallets2(pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getValueTransferEvents5(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.BscAdminControllerApiAxiosParamCreator(configuration).getValueTransferEvents5(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BscAdminControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getCoin2(coinId, options) {
            return exports.BscAdminControllerApiFp(configuration).getCoin2(coinId, options).then((request) => request(axios, basePath));
        },
        getExternalWithdrawals1(pageable, searchCondition, options) {
            return exports.BscAdminControllerApiFp(configuration).getExternalWithdrawals1(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
        getMasterWallets2(pageable, options) {
            return exports.BscAdminControllerApiFp(configuration).getMasterWallets2(pageable, options).then((request) => request(axios, basePath));
        },
        getUserWallets2(pageable, options) {
            return exports.BscAdminControllerApiFp(configuration).getUserWallets2(pageable, options).then((request) => request(axios, basePath));
        },
        getValueTransferEvents5(pageable, searchCondition, options) {
            return exports.BscAdminControllerApiFp(configuration).getValueTransferEvents5(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class BscAdminControllerApi extends base_1.BaseAPI {
    getCoin2(coinId, options) {
        return exports.BscAdminControllerApiFp(this.configuration).getCoin2(coinId, options).then((request) => request(this.axios, this.basePath));
    }
    getExternalWithdrawals1(pageable, searchCondition, options) {
        return exports.BscAdminControllerApiFp(this.configuration).getExternalWithdrawals1(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets2(pageable, options) {
        return exports.BscAdminControllerApiFp(this.configuration).getMasterWallets2(pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWallets2(pageable, options) {
        return exports.BscAdminControllerApiFp(this.configuration).getUserWallets2(pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getValueTransferEvents5(pageable, searchCondition, options) {
        return exports.BscAdminControllerApiFp(this.configuration).getValueTransferEvents5(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BscAdminControllerApi = BscAdminControllerApi;
exports.BscCoinControllerApiAxiosParamCreator = function (configuration) {
    return {
        createCoin1: async (createCoinRequest, options = {}) => {
            if (createCoinRequest === null || createCoinRequest === undefined) {
                throw new base_1.RequiredError('createCoinRequest', 'Required parameter createCoinRequest was null or undefined when calling createCoin1.');
            }
            const localVarPath = `/api/v2/bnb/coins`;
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
            const needsSerialization = (typeof createCoinRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createCoinRequest !== undefined ? createCoinRequest : {}) : (createCoinRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        deleteCoin1: async (symbol, options = {}) => {
            if (symbol === null || symbol === undefined) {
                throw new base_1.RequiredError('symbol', 'Required parameter symbol was null or undefined when calling deleteCoin1.');
            }
            const localVarPath = `/api/v2/bnb/coins/{symbol}`
                .replace(`{${"symbol"}}`, encodeURIComponent(String(symbol)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'DELETE' }, baseOptions), options);
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
        getAllCoins2: async (flag, options = {}) => {
            if (flag === null || flag === undefined) {
                throw new base_1.RequiredError('flag', 'Required parameter flag was null or undefined when calling getAllCoins2.');
            }
            const localVarPath = `/api/v2/bnb/coins`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (flag !== undefined) {
                localVarQueryParameter['flag'] = flag;
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
        getCoin3: async (symbol, options = {}) => {
            if (symbol === null || symbol === undefined) {
                throw new base_1.RequiredError('symbol', 'Required parameter symbol was null or undefined when calling getCoin3.');
            }
            const localVarPath = `/api/v2/bnb/coins/{symbol}`
                .replace(`{${"symbol"}}`, encodeURIComponent(String(symbol)));
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
        patchCoin1: async (updateCoinRequest, options = {}) => {
            if (updateCoinRequest === null || updateCoinRequest === undefined) {
                throw new base_1.RequiredError('updateCoinRequest', 'Required parameter updateCoinRequest was null or undefined when calling patchCoin1.');
            }
            const localVarPath = `/api/v2/bnb/coins`;
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
            const needsSerialization = (typeof updateCoinRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateCoinRequest !== undefined ? updateCoinRequest : {}) : (updateCoinRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.BscCoinControllerApiFp = function (configuration) {
    return {
        async createCoin1(createCoinRequest, options) {
            const localVarAxiosArgs = await exports.BscCoinControllerApiAxiosParamCreator(configuration).createCoin1(createCoinRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteCoin1(symbol, options) {
            const localVarAxiosArgs = await exports.BscCoinControllerApiAxiosParamCreator(configuration).deleteCoin1(symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllCoins2(flag, options) {
            const localVarAxiosArgs = await exports.BscCoinControllerApiAxiosParamCreator(configuration).getAllCoins2(flag, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getCoin3(symbol, options) {
            const localVarAxiosArgs = await exports.BscCoinControllerApiAxiosParamCreator(configuration).getCoin3(symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchCoin1(updateCoinRequest, options) {
            const localVarAxiosArgs = await exports.BscCoinControllerApiAxiosParamCreator(configuration).patchCoin1(updateCoinRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BscCoinControllerApiFactory = function (configuration, basePath, axios) {
    return {
        createCoin1(createCoinRequest, options) {
            return exports.BscCoinControllerApiFp(configuration).createCoin1(createCoinRequest, options).then((request) => request(axios, basePath));
        },
        deleteCoin1(symbol, options) {
            return exports.BscCoinControllerApiFp(configuration).deleteCoin1(symbol, options).then((request) => request(axios, basePath));
        },
        getAllCoins2(flag, options) {
            return exports.BscCoinControllerApiFp(configuration).getAllCoins2(flag, options).then((request) => request(axios, basePath));
        },
        getCoin3(symbol, options) {
            return exports.BscCoinControllerApiFp(configuration).getCoin3(symbol, options).then((request) => request(axios, basePath));
        },
        patchCoin1(updateCoinRequest, options) {
            return exports.BscCoinControllerApiFp(configuration).patchCoin1(updateCoinRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class BscCoinControllerApi extends base_1.BaseAPI {
    createCoin1(createCoinRequest, options) {
        return exports.BscCoinControllerApiFp(this.configuration).createCoin1(createCoinRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteCoin1(symbol, options) {
        return exports.BscCoinControllerApiFp(this.configuration).deleteCoin1(symbol, options).then((request) => request(this.axios, this.basePath));
    }
    getAllCoins2(flag, options) {
        return exports.BscCoinControllerApiFp(this.configuration).getAllCoins2(flag, options).then((request) => request(this.axios, this.basePath));
    }
    getCoin3(symbol, options) {
        return exports.BscCoinControllerApiFp(this.configuration).getCoin3(symbol, options).then((request) => request(this.axios, this.basePath));
    }
    patchCoin1(updateCoinRequest, options) {
        return exports.BscCoinControllerApiFp(this.configuration).patchCoin1(updateCoinRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BscCoinControllerApi = BscCoinControllerApi;
exports.BscEventControllerApiAxiosParamCreator = function (configuration) {
    return {
        getCallEvents3: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getCallEvents3.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getCallEvents3.');
            }
            const localVarPath = `/api/v2/bnb/call-events`;
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
        getValueTransferEvents4: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getValueTransferEvents4.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getValueTransferEvents4.');
            }
            const localVarPath = `/api/v2/bnb/value-transfer-events`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
exports.BscEventControllerApiFp = function (configuration) {
    return {
        async getCallEvents3(pageable, specs, options) {
            const localVarAxiosArgs = await exports.BscEventControllerApiAxiosParamCreator(configuration).getCallEvents3(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getValueTransferEvents4(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.BscEventControllerApiAxiosParamCreator(configuration).getValueTransferEvents4(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BscEventControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getCallEvents3(pageable, specs, options) {
            return exports.BscEventControllerApiFp(configuration).getCallEvents3(pageable, specs, options).then((request) => request(axios, basePath));
        },
        getValueTransferEvents4(pageable, searchCondition, options) {
            return exports.BscEventControllerApiFp(configuration).getValueTransferEvents4(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class BscEventControllerApi extends base_1.BaseAPI {
    getCallEvents3(pageable, specs, options) {
        return exports.BscEventControllerApiFp(this.configuration).getCallEvents3(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getValueTransferEvents4(pageable, searchCondition, options) {
        return exports.BscEventControllerApiFp(this.configuration).getValueTransferEvents4(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BscEventControllerApi = BscEventControllerApi;
exports.BscGasPriceControllerApiAxiosParamCreator = function (configuration) {
    return {
        getGasPrice1: async (options = {}) => {
            const localVarPath = `/api/v2/bnb/gas-price`;
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
exports.BscGasPriceControllerApiFp = function (configuration) {
    return {
        async getGasPrice1(options) {
            const localVarAxiosArgs = await exports.BscGasPriceControllerApiAxiosParamCreator(configuration).getGasPrice1(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BscGasPriceControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getGasPrice1(options) {
            return exports.BscGasPriceControllerApiFp(configuration).getGasPrice1(options).then((request) => request(axios, basePath));
        },
    };
};
class BscGasPriceControllerApi extends base_1.BaseAPI {
    getGasPrice1(options) {
        return exports.BscGasPriceControllerApiFp(this.configuration).getGasPrice1(options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BscGasPriceControllerApi = BscGasPriceControllerApi;
exports.BscHenesisKeyControllerApiAxiosParamCreator = function (configuration) {
    return {
        createExampleHenesisKey1: async (options = {}) => {
            const localVarPath = `/api/v2/bnb/henesis-keys/example`;
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
        createTransaction1: async (createTransactionRequest, options = {}) => {
            if (createTransactionRequest === null || createTransactionRequest === undefined) {
                throw new base_1.RequiredError('createTransactionRequest', 'Required parameter createTransactionRequest was null or undefined when calling createTransaction1.');
            }
            const localVarPath = `/api/v2/bnb/henesis-keys/transactions`;
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
        getHenesisKey1: async (options = {}) => {
            const localVarPath = `/api/v2/bnb/henesis-keys/me`;
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
        getHenesisKeyBalance1: async (options = {}) => {
            const localVarPath = `/api/v2/bnb/henesis-keys/balance`;
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
        getHistoriesCsv1: async (createdAtGte, createdAtLt, options = {}) => {
            if (createdAtGte === null || createdAtGte === undefined) {
                throw new base_1.RequiredError('createdAtGte', 'Required parameter createdAtGte was null or undefined when calling getHistoriesCsv1.');
            }
            if (createdAtLt === null || createdAtLt === undefined) {
                throw new base_1.RequiredError('createdAtLt', 'Required parameter createdAtLt was null or undefined when calling getHistoriesCsv1.');
            }
            const localVarPath = `/api/v2/bnb/henesis-keys/histories/csv`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (createdAtGte !== undefined) {
                localVarQueryParameter['created_at_gte'] = createdAtGte;
            }
            if (createdAtLt !== undefined) {
                localVarQueryParameter['created_at_lt'] = createdAtLt;
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
        getTransactionHistories1: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransactionHistories1.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getTransactionHistories1.');
            }
            const localVarPath = `/api/v2/bnb/henesis-keys/histories`;
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
exports.BscHenesisKeyControllerApiFp = function (configuration) {
    return {
        async createExampleHenesisKey1(options) {
            const localVarAxiosArgs = await exports.BscHenesisKeyControllerApiAxiosParamCreator(configuration).createExampleHenesisKey1(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createTransaction1(createTransactionRequest, options) {
            const localVarAxiosArgs = await exports.BscHenesisKeyControllerApiAxiosParamCreator(configuration).createTransaction1(createTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getHenesisKey1(options) {
            const localVarAxiosArgs = await exports.BscHenesisKeyControllerApiAxiosParamCreator(configuration).getHenesisKey1(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getHenesisKeyBalance1(options) {
            const localVarAxiosArgs = await exports.BscHenesisKeyControllerApiAxiosParamCreator(configuration).getHenesisKeyBalance1(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getHistoriesCsv1(createdAtGte, createdAtLt, options) {
            const localVarAxiosArgs = await exports.BscHenesisKeyControllerApiAxiosParamCreator(configuration).getHistoriesCsv1(createdAtGte, createdAtLt, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransactionHistories1(pageable, specs, options) {
            const localVarAxiosArgs = await exports.BscHenesisKeyControllerApiAxiosParamCreator(configuration).getTransactionHistories1(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BscHenesisKeyControllerApiFactory = function (configuration, basePath, axios) {
    return {
        createExampleHenesisKey1(options) {
            return exports.BscHenesisKeyControllerApiFp(configuration).createExampleHenesisKey1(options).then((request) => request(axios, basePath));
        },
        createTransaction1(createTransactionRequest, options) {
            return exports.BscHenesisKeyControllerApiFp(configuration).createTransaction1(createTransactionRequest, options).then((request) => request(axios, basePath));
        },
        getHenesisKey1(options) {
            return exports.BscHenesisKeyControllerApiFp(configuration).getHenesisKey1(options).then((request) => request(axios, basePath));
        },
        getHenesisKeyBalance1(options) {
            return exports.BscHenesisKeyControllerApiFp(configuration).getHenesisKeyBalance1(options).then((request) => request(axios, basePath));
        },
        getHistoriesCsv1(createdAtGte, createdAtLt, options) {
            return exports.BscHenesisKeyControllerApiFp(configuration).getHistoriesCsv1(createdAtGte, createdAtLt, options).then((request) => request(axios, basePath));
        },
        getTransactionHistories1(pageable, specs, options) {
            return exports.BscHenesisKeyControllerApiFp(configuration).getTransactionHistories1(pageable, specs, options).then((request) => request(axios, basePath));
        },
    };
};
class BscHenesisKeyControllerApi extends base_1.BaseAPI {
    createExampleHenesisKey1(options) {
        return exports.BscHenesisKeyControllerApiFp(this.configuration).createExampleHenesisKey1(options).then((request) => request(this.axios, this.basePath));
    }
    createTransaction1(createTransactionRequest, options) {
        return exports.BscHenesisKeyControllerApiFp(this.configuration).createTransaction1(createTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getHenesisKey1(options) {
        return exports.BscHenesisKeyControllerApiFp(this.configuration).getHenesisKey1(options).then((request) => request(this.axios, this.basePath));
    }
    getHenesisKeyBalance1(options) {
        return exports.BscHenesisKeyControllerApiFp(this.configuration).getHenesisKeyBalance1(options).then((request) => request(this.axios, this.basePath));
    }
    getHistoriesCsv1(createdAtGte, createdAtLt, options) {
        return exports.BscHenesisKeyControllerApiFp(this.configuration).getHistoriesCsv1(createdAtGte, createdAtLt, options).then((request) => request(this.axios, this.basePath));
    }
    getTransactionHistories1(pageable, specs, options) {
        return exports.BscHenesisKeyControllerApiFp(this.configuration).getTransactionHistories1(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BscHenesisKeyControllerApi = BscHenesisKeyControllerApi;
exports.BscInternalControllerApiAxiosParamCreator = function (configuration) {
    return {
        getCallEvents2: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getCallEvents2.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getCallEvents2.');
            }
            const localVarPath = `/api/v2/bnb/internal/call-events`;
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
        getValueTransferEvents3: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getValueTransferEvents3.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getValueTransferEvents3.');
            }
            const localVarPath = `/api/v2/bnb/internal/value-transfer-events`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
exports.BscInternalControllerApiFp = function (configuration) {
    return {
        async getCallEvents2(pageable, specs, options) {
            const localVarAxiosArgs = await exports.BscInternalControllerApiAxiosParamCreator(configuration).getCallEvents2(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getValueTransferEvents3(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.BscInternalControllerApiAxiosParamCreator(configuration).getValueTransferEvents3(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BscInternalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getCallEvents2(pageable, specs, options) {
            return exports.BscInternalControllerApiFp(configuration).getCallEvents2(pageable, specs, options).then((request) => request(axios, basePath));
        },
        getValueTransferEvents3(pageable, searchCondition, options) {
            return exports.BscInternalControllerApiFp(configuration).getValueTransferEvents3(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class BscInternalControllerApi extends base_1.BaseAPI {
    getCallEvents2(pageable, specs, options) {
        return exports.BscInternalControllerApiFp(this.configuration).getCallEvents2(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getValueTransferEvents3(pageable, searchCondition, options) {
        return exports.BscInternalControllerApiFp(this.configuration).getValueTransferEvents3(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BscInternalControllerApi = BscInternalControllerApi;
exports.BscMethodGasUsageControllerApiAxiosParamCreator = function (configuration) {
    return {
        getMethodGasUsages1: async (name, options = {}) => {
            if (name === null || name === undefined) {
                throw new base_1.RequiredError('name', 'Required parameter name was null or undefined when calling getMethodGasUsages1.');
            }
            const localVarPath = `/api/v2/bnb/method-gas-usages`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
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
exports.BscMethodGasUsageControllerApiFp = function (configuration) {
    return {
        async getMethodGasUsages1(name, options) {
            const localVarAxiosArgs = await exports.BscMethodGasUsageControllerApiAxiosParamCreator(configuration).getMethodGasUsages1(name, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BscMethodGasUsageControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getMethodGasUsages1(name, options) {
            return exports.BscMethodGasUsageControllerApiFp(configuration).getMethodGasUsages1(name, options).then((request) => request(axios, basePath));
        },
    };
};
class BscMethodGasUsageControllerApi extends base_1.BaseAPI {
    getMethodGasUsages1(name, options) {
        return exports.BscMethodGasUsageControllerApiFp(this.configuration).getMethodGasUsages1(name, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BscMethodGasUsageControllerApi = BscMethodGasUsageControllerApi;
exports.BscOperationControllerApiAxiosParamCreator = function (configuration) {
    return {
        bindHenesisKeyToWallet1: async (keyId, bindHenesisKeyToWalletRequest, options = {}) => {
            if (keyId === null || keyId === undefined) {
                throw new base_1.RequiredError('keyId', 'Required parameter keyId was null or undefined when calling bindHenesisKeyToWallet1.');
            }
            if (bindHenesisKeyToWalletRequest === null || bindHenesisKeyToWalletRequest === undefined) {
                throw new base_1.RequiredError('bindHenesisKeyToWalletRequest', 'Required parameter bindHenesisKeyToWalletRequest was null or undefined when calling bindHenesisKeyToWallet1.');
            }
            const localVarPath = `/api/v2/bnb/operation/henesis-keys/{keyId}/bind`
                .replace(`{${"keyId"}}`, encodeURIComponent(String(keyId)));
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
            const needsSerialization = (typeof bindHenesisKeyToWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(bindHenesisKeyToWalletRequest !== undefined ? bindHenesisKeyToWalletRequest : {}) : (bindHenesisKeyToWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createHenesisKey1: async (createHenesisKeyRequest, options = {}) => {
            if (createHenesisKeyRequest === null || createHenesisKeyRequest === undefined) {
                throw new base_1.RequiredError('createHenesisKeyRequest', 'Required parameter createHenesisKeyRequest was null or undefined when calling createHenesisKey1.');
            }
            const localVarPath = `/api/v2/bnb/operation/henesis-keys`;
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
exports.BscOperationControllerApiFp = function (configuration) {
    return {
        async bindHenesisKeyToWallet1(keyId, bindHenesisKeyToWalletRequest, options) {
            const localVarAxiosArgs = await exports.BscOperationControllerApiAxiosParamCreator(configuration).bindHenesisKeyToWallet1(keyId, bindHenesisKeyToWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createHenesisKey1(createHenesisKeyRequest, options) {
            const localVarAxiosArgs = await exports.BscOperationControllerApiAxiosParamCreator(configuration).createHenesisKey1(createHenesisKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BscOperationControllerApiFactory = function (configuration, basePath, axios) {
    return {
        bindHenesisKeyToWallet1(keyId, bindHenesisKeyToWalletRequest, options) {
            return exports.BscOperationControllerApiFp(configuration).bindHenesisKeyToWallet1(keyId, bindHenesisKeyToWalletRequest, options).then((request) => request(axios, basePath));
        },
        createHenesisKey1(createHenesisKeyRequest, options) {
            return exports.BscOperationControllerApiFp(configuration).createHenesisKey1(createHenesisKeyRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class BscOperationControllerApi extends base_1.BaseAPI {
    bindHenesisKeyToWallet1(keyId, bindHenesisKeyToWalletRequest, options) {
        return exports.BscOperationControllerApiFp(this.configuration).bindHenesisKeyToWallet1(keyId, bindHenesisKeyToWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createHenesisKey1(createHenesisKeyRequest, options) {
        return exports.BscOperationControllerApiFp(this.configuration).createHenesisKey1(createHenesisKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BscOperationControllerApi = BscOperationControllerApi;
exports.BscTransactionControllerApiAxiosParamCreator = function (configuration) {
    return {
        getAllTransactions1: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllTransactions1.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getAllTransactions1.');
            }
            const localVarPath = `/api/v2/bnb/transactions`;
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
        getRawTransactionByHash1: async (transactionHash, options = {}) => {
            if (transactionHash === null || transactionHash === undefined) {
                throw new base_1.RequiredError('transactionHash', 'Required parameter transactionHash was null or undefined when calling getRawTransactionByHash1.');
            }
            const localVarPath = `/api/v2/bnb/raw-transactions/{transactionHash}`
                .replace(`{${"transactionHash"}}`, encodeURIComponent(String(transactionHash)));
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
        getTransactionById1: async (transactionId, options = {}) => {
            if (transactionId === null || transactionId === undefined) {
                throw new base_1.RequiredError('transactionId', 'Required parameter transactionId was null or undefined when calling getTransactionById1.');
            }
            const localVarPath = `/api/v2/bnb/transactions/{transactionId}`
                .replace(`{${"transactionId"}}`, encodeURIComponent(String(transactionId)));
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
exports.BscTransactionControllerApiFp = function (configuration) {
    return {
        async getAllTransactions1(pageable, specs, options) {
            const localVarAxiosArgs = await exports.BscTransactionControllerApiAxiosParamCreator(configuration).getAllTransactions1(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getRawTransactionByHash1(transactionHash, options) {
            const localVarAxiosArgs = await exports.BscTransactionControllerApiAxiosParamCreator(configuration).getRawTransactionByHash1(transactionHash, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransactionById1(transactionId, options) {
            const localVarAxiosArgs = await exports.BscTransactionControllerApiAxiosParamCreator(configuration).getTransactionById1(transactionId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BscTransactionControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getAllTransactions1(pageable, specs, options) {
            return exports.BscTransactionControllerApiFp(configuration).getAllTransactions1(pageable, specs, options).then((request) => request(axios, basePath));
        },
        getRawTransactionByHash1(transactionHash, options) {
            return exports.BscTransactionControllerApiFp(configuration).getRawTransactionByHash1(transactionHash, options).then((request) => request(axios, basePath));
        },
        getTransactionById1(transactionId, options) {
            return exports.BscTransactionControllerApiFp(configuration).getTransactionById1(transactionId, options).then((request) => request(axios, basePath));
        },
    };
};
class BscTransactionControllerApi extends base_1.BaseAPI {
    getAllTransactions1(pageable, specs, options) {
        return exports.BscTransactionControllerApiFp(this.configuration).getAllTransactions1(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getRawTransactionByHash1(transactionHash, options) {
        return exports.BscTransactionControllerApiFp(this.configuration).getRawTransactionByHash1(transactionHash, options).then((request) => request(this.axios, this.basePath));
    }
    getTransactionById1(transactionId, options) {
        return exports.BscTransactionControllerApiFp(this.configuration).getTransactionById1(transactionId, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BscTransactionControllerApi = BscTransactionControllerApi;
exports.BscWalletControllerApiAxiosParamCreator = function (configuration) {
    return {
        activateAllowedAddresses1: async (walletId, activateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling activateAllowedAddresses1.');
            }
            if (activateAllowedAddressesRequest === null || activateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('activateAllowedAddressesRequest', 'Required parameter activateAllowedAddressesRequest was null or undefined when calling activateAllowedAddresses1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/activate-allowed-addresses`
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
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/activate`
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
        createAllowedAddress1: async (walletId, createAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createAllowedAddress1.');
            }
            if (createAllowedAddressRequest === null || createAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('createAllowedAddressRequest', 'Required parameter createAllowedAddressRequest was null or undefined when calling createAllowedAddress1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/allowed-addresses`
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
        createMasterWallet2: async (createInactiveMasterWalletRequest, options = {}) => {
            if (createInactiveMasterWalletRequest === null || createInactiveMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('createInactiveMasterWalletRequest', 'Required parameter createInactiveMasterWalletRequest was null or undefined when calling createMasterWallet2.');
            }
            const localVarPath = `/api/v2/bnb/wallets`;
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
        createUserWallet1: async (walletId, createUserWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createUserWallet1.');
            }
            if (createUserWalletRequest === null || createUserWalletRequest === undefined) {
                throw new base_1.RequiredError('createUserWalletRequest', 'Required parameter createUserWalletRequest was null or undefined when calling createUserWallet1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/user-wallets`
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
            const needsSerialization = (typeof createUserWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createUserWalletRequest !== undefined ? createUserWalletRequest : {}) : (createUserWalletRequest || "");
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
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/withdrawal-policies`
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
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
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
        flush1: async (walletId, flushRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling flush1.');
            }
            if (flushRequest === null || flushRequest === undefined) {
                throw new base_1.RequiredError('flushRequest', 'Required parameter flushRequest was null or undefined when calling flush1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/flush`
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
        getAllWalletWithdrawalPolicies1: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllWalletWithdrawalPolicies1.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllWalletWithdrawalPolicies1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/withdrawal-policies`
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
        getAllowedAddress1: async (walletId, allowedAddressId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddress1.');
            }
            if (allowedAddressId === null || allowedAddressId === undefined) {
                throw new base_1.RequiredError('allowedAddressId', 'Required parameter allowedAddressId was null or undefined when calling getAllowedAddress1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
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
        getAllowedAddressesByCoinId2: async (walletId, coinId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddressesByCoinId2.');
            }
            if (coinId === null || coinId === undefined) {
                throw new base_1.RequiredError('coinId', 'Required parameter coinId was null or undefined when calling getAllowedAddressesByCoinId2.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllowedAddressesByCoinId2.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (coinId !== undefined) {
                localVarQueryParameter['coin_id'] = coinId;
            }
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
        getFlushTransaction1: async (walletId, transactionId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getFlushTransaction1.');
            }
            if (transactionId === null || transactionId === undefined) {
                throw new base_1.RequiredError('transactionId', 'Required parameter transactionId was null or undefined when calling getFlushTransaction1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/flush-transactions/{transactionId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"transactionId"}}`, encodeURIComponent(String(transactionId)));
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
        getFlushTransactions1: async (walletId, pageable, searchCondition, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getFlushTransactions1.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getFlushTransactions1.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getFlushTransactions1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/flush-transactions`
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
            const localVarPath = `/api/v2/bnb/wallets/{walletId}`
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
        getMasterWalletAccountKey1: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletAccountKey1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/account-key`
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
        getMasterWalletBalance1: async (walletId, symbol, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletBalance1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/balance`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (symbol !== undefined) {
                localVarQueryParameter['symbol'] = symbol;
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
        getMasterWalletInitialKey1: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletInitialKey1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/initial-key`
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
        getMasterWallets3: async (sort, options = {}) => {
            if (sort === null || sort === undefined) {
                throw new base_1.RequiredError('sort', 'Required parameter sort was null or undefined when calling getMasterWallets3.');
            }
            const localVarPath = `/api/v2/bnb/wallets`;
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
        getUserWallet1: async (walletId, userWalletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWallet1.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling getUserWallet1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/user-wallets/{userWalletId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
        getUserWalletBalance1: async (walletId, userWalletId, symbol, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWalletBalance1.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling getUserWalletBalance1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/user-wallets/{userWalletId}/balance`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (symbol !== undefined) {
                localVarQueryParameter['symbol'] = symbol;
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
        getUserWallets3: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWallets3.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getUserWallets3.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/user-wallets`
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
        inactivateAllowedAddresses1: async (walletId, inactivateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling inactivateAllowedAddresses1.');
            }
            if (inactivateAllowedAddressesRequest === null || inactivateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('inactivateAllowedAddressesRequest', 'Required parameter inactivateAllowedAddressesRequest was null or undefined when calling inactivateAllowedAddresses1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/inactivate-allowed-addresses`
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
        patchAccountKey1: async (walletId, updateAccountKeyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchAccountKey1.');
            }
            if (updateAccountKeyRequest === null || updateAccountKeyRequest === undefined) {
                throw new base_1.RequiredError('updateAccountKeyRequest', 'Required parameter updateAccountKeyRequest was null or undefined when calling patchAccountKey1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/account-key`
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
            const needsSerialization = (typeof updateAccountKeyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateAccountKeyRequest !== undefined ? updateAccountKeyRequest : {}) : (updateAccountKeyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchMasterWalletName1: async (walletId, changeWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletName1.');
            }
            if (changeWalletNameRequest === null || changeWalletNameRequest === undefined) {
                throw new base_1.RequiredError('changeWalletNameRequest', 'Required parameter changeWalletNameRequest was null or undefined when calling patchMasterWalletName1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/name`
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
            const needsSerialization = (typeof changeWalletNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(changeWalletNameRequest !== undefined ? changeWalletNameRequest : {}) : (changeWalletNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchUserWalletName1: async (walletId, userWalletId, changeWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchUserWalletName1.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling patchUserWalletName1.');
            }
            if (changeWalletNameRequest === null || changeWalletNameRequest === undefined) {
                throw new base_1.RequiredError('changeWalletNameRequest', 'Required parameter changeWalletNameRequest was null or undefined when calling patchUserWalletName1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/user-wallets/{userWalletId}/name`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
            const needsSerialization = (typeof changeWalletNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(changeWalletNameRequest !== undefined ? changeWalletNameRequest : {}) : (changeWalletNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchWalletWithdrawalPolicy1: async (walletId, policyId, patchWithdrawalPolicyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchWalletWithdrawalPolicy1.');
            }
            if (policyId === null || policyId === undefined) {
                throw new base_1.RequiredError('policyId', 'Required parameter policyId was null or undefined when calling patchWalletWithdrawalPolicy1.');
            }
            if (patchWithdrawalPolicyRequest === null || patchWithdrawalPolicyRequest === undefined) {
                throw new base_1.RequiredError('patchWithdrawalPolicyRequest', 'Required parameter patchWithdrawalPolicyRequest was null or undefined when calling patchWalletWithdrawalPolicy1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/withdrawal-policies/{policyId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"policyId"}}`, encodeURIComponent(String(policyId)));
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
        recreateMasterWallet1: async (walletId, recreateWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling recreateMasterWallet1.');
            }
            if (recreateWalletRequest === null || recreateWalletRequest === undefined) {
                throw new base_1.RequiredError('recreateWalletRequest', 'Required parameter recreateWalletRequest was null or undefined when calling recreateMasterWallet1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/recreate`
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
            const needsSerialization = (typeof recreateWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(recreateWalletRequest !== undefined ? recreateWalletRequest : {}) : (recreateWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        recreateUserWallet1: async (walletId, userWalletId, recreateWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling recreateUserWallet1.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling recreateUserWallet1.');
            }
            if (recreateWalletRequest === null || recreateWalletRequest === undefined) {
                throw new base_1.RequiredError('recreateWalletRequest', 'Required parameter recreateWalletRequest was null or undefined when calling recreateUserWallet1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/user-wallets/{userWalletId}/recreate`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
            const needsSerialization = (typeof recreateWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(recreateWalletRequest !== undefined ? recreateWalletRequest : {}) : (recreateWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        replaceTransaction1: async (replaceTransactionRequest, options = {}) => {
            if (replaceTransactionRequest === null || replaceTransactionRequest === undefined) {
                throw new base_1.RequiredError('replaceTransactionRequest', 'Required parameter replaceTransactionRequest was null or undefined when calling replaceTransaction1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/transactions/replace`;
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
            const needsSerialization = (typeof replaceTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(replaceTransactionRequest !== undefined ? replaceTransactionRequest : {}) : (replaceTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        resendTransaction1: async (resendTransactionRequest, options = {}) => {
            if (resendTransactionRequest === null || resendTransactionRequest === undefined) {
                throw new base_1.RequiredError('resendTransactionRequest', 'Required parameter resendTransactionRequest was null or undefined when calling resendTransaction1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/transactions/resend`;
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
            const needsSerialization = (typeof resendTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(resendTransactionRequest !== undefined ? resendTransactionRequest : {}) : (resendTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        sendBatchTransaction1: async (createBatchTransactionRequest, options = {}) => {
            if (createBatchTransactionRequest === null || createBatchTransactionRequest === undefined) {
                throw new base_1.RequiredError('createBatchTransactionRequest', 'Required parameter createBatchTransactionRequest was null or undefined when calling sendBatchTransaction1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/batch-transactions`;
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
            const needsSerialization = (typeof createBatchTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createBatchTransactionRequest !== undefined ? createBatchTransactionRequest : {}) : (createBatchTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        sendTransaction1: async (createMultiSigTransactionRequest, options = {}) => {
            if (createMultiSigTransactionRequest === null || createMultiSigTransactionRequest === undefined) {
                throw new base_1.RequiredError('createMultiSigTransactionRequest', 'Required parameter createMultiSigTransactionRequest was null or undefined when calling sendTransaction1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/transactions`;
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
        validateIsAllowedAddress1: async (walletId, validateIsAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling validateIsAllowedAddress1.');
            }
            if (validateIsAllowedAddressRequest === null || validateIsAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('validateIsAllowedAddressRequest', 'Required parameter validateIsAllowedAddressRequest was null or undefined when calling validateIsAllowedAddress1.');
            }
            const localVarPath = `/api/v2/bnb/wallets/{walletId}/allowed-addresses/validate`
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
exports.BscWalletControllerApiFp = function (configuration) {
    return {
        async activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async activateMasterWallet1(walletId, activateMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).activateMasterWallet1(walletId, activateMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createAllowedAddress1(walletId, createAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).createAllowedAddress1(walletId, createAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createMasterWallet2(createInactiveMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).createMasterWallet2(createInactiveMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createUserWallet1(walletId, createUserWalletRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).createUserWallet1(walletId, createUserWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async flush1(walletId, flushRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).flush1(walletId, flushRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllWalletWithdrawalPolicies1(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getAllWalletWithdrawalPolicies1(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddress1(walletId, allowedAddressId, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getAllowedAddress1(walletId, allowedAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddressesByCoinId2(walletId, coinId, pageable, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getAllowedAddressesByCoinId2(walletId, coinId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFlushTransaction1(walletId, transactionId, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getFlushTransaction1(walletId, transactionId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFlushTransactions1(walletId, pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getFlushTransactions1(walletId, pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallet1(walletId, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getMasterWallet1(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletAccountKey1(walletId, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getMasterWalletAccountKey1(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletBalance1(walletId, symbol, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getMasterWalletBalance1(walletId, symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletInitialKey1(walletId, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getMasterWalletInitialKey1(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets3(sort, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getMasterWallets3(sort, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWallet1(walletId, userWalletId, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getUserWallet1(walletId, userWalletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWalletBalance1(walletId, userWalletId, symbol, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getUserWalletBalance1(walletId, userWalletId, symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWallets3(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).getUserWallets3(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchAccountKey1(walletId, updateAccountKeyRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).patchAccountKey1(walletId, updateAccountKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletName1(walletId, changeWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).patchMasterWalletName1(walletId, changeWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchUserWalletName1(walletId, userWalletId, changeWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).patchUserWalletName1(walletId, userWalletId, changeWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchWalletWithdrawalPolicy1(walletId, policyId, patchWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).patchWalletWithdrawalPolicy1(walletId, policyId, patchWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async recreateMasterWallet1(walletId, recreateWalletRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).recreateMasterWallet1(walletId, recreateWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async recreateUserWallet1(walletId, userWalletId, recreateWalletRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).recreateUserWallet1(walletId, userWalletId, recreateWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async replaceTransaction1(replaceTransactionRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).replaceTransaction1(replaceTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async resendTransaction1(resendTransactionRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).resendTransaction1(resendTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendBatchTransaction1(createBatchTransactionRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).sendBatchTransaction1(createBatchTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendTransaction1(createMultiSigTransactionRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).sendTransaction1(createMultiSigTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.BscWalletControllerApiAxiosParamCreator(configuration).validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BscWalletControllerApiFactory = function (configuration, basePath, axios) {
    return {
        activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        activateMasterWallet1(walletId, activateMasterWalletRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).activateMasterWallet1(walletId, activateMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        createAllowedAddress1(walletId, createAllowedAddressRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).createAllowedAddress1(walletId, createAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        createMasterWallet2(createInactiveMasterWalletRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).createMasterWallet2(createInactiveMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        createUserWallet1(walletId, createUserWalletRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).createUserWallet1(walletId, createUserWalletRequest, options).then((request) => request(axios, basePath));
        },
        createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        flush1(walletId, flushRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).flush1(walletId, flushRequest, options).then((request) => request(axios, basePath));
        },
        getAllWalletWithdrawalPolicies1(walletId, pageable, options) {
            return exports.BscWalletControllerApiFp(configuration).getAllWalletWithdrawalPolicies1(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        getAllowedAddress1(walletId, allowedAddressId, options) {
            return exports.BscWalletControllerApiFp(configuration).getAllowedAddress1(walletId, allowedAddressId, options).then((request) => request(axios, basePath));
        },
        getAllowedAddressesByCoinId2(walletId, coinId, pageable, options) {
            return exports.BscWalletControllerApiFp(configuration).getAllowedAddressesByCoinId2(walletId, coinId, pageable, options).then((request) => request(axios, basePath));
        },
        getFlushTransaction1(walletId, transactionId, options) {
            return exports.BscWalletControllerApiFp(configuration).getFlushTransaction1(walletId, transactionId, options).then((request) => request(axios, basePath));
        },
        getFlushTransactions1(walletId, pageable, searchCondition, options) {
            return exports.BscWalletControllerApiFp(configuration).getFlushTransactions1(walletId, pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
        getMasterWallet1(walletId, options) {
            return exports.BscWalletControllerApiFp(configuration).getMasterWallet1(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletAccountKey1(walletId, options) {
            return exports.BscWalletControllerApiFp(configuration).getMasterWalletAccountKey1(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletBalance1(walletId, symbol, options) {
            return exports.BscWalletControllerApiFp(configuration).getMasterWalletBalance1(walletId, symbol, options).then((request) => request(axios, basePath));
        },
        getMasterWalletInitialKey1(walletId, options) {
            return exports.BscWalletControllerApiFp(configuration).getMasterWalletInitialKey1(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWallets3(sort, options) {
            return exports.BscWalletControllerApiFp(configuration).getMasterWallets3(sort, options).then((request) => request(axios, basePath));
        },
        getUserWallet1(walletId, userWalletId, options) {
            return exports.BscWalletControllerApiFp(configuration).getUserWallet1(walletId, userWalletId, options).then((request) => request(axios, basePath));
        },
        getUserWalletBalance1(walletId, userWalletId, symbol, options) {
            return exports.BscWalletControllerApiFp(configuration).getUserWalletBalance1(walletId, userWalletId, symbol, options).then((request) => request(axios, basePath));
        },
        getUserWallets3(walletId, pageable, options) {
            return exports.BscWalletControllerApiFp(configuration).getUserWallets3(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        patchAccountKey1(walletId, updateAccountKeyRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).patchAccountKey1(walletId, updateAccountKeyRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletName1(walletId, changeWalletNameRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).patchMasterWalletName1(walletId, changeWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchUserWalletName1(walletId, userWalletId, changeWalletNameRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).patchUserWalletName1(walletId, userWalletId, changeWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchWalletWithdrawalPolicy1(walletId, policyId, patchWithdrawalPolicyRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).patchWalletWithdrawalPolicy1(walletId, policyId, patchWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        recreateMasterWallet1(walletId, recreateWalletRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).recreateMasterWallet1(walletId, recreateWalletRequest, options).then((request) => request(axios, basePath));
        },
        recreateUserWallet1(walletId, userWalletId, recreateWalletRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).recreateUserWallet1(walletId, userWalletId, recreateWalletRequest, options).then((request) => request(axios, basePath));
        },
        replaceTransaction1(replaceTransactionRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).replaceTransaction1(replaceTransactionRequest, options).then((request) => request(axios, basePath));
        },
        resendTransaction1(resendTransactionRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).resendTransaction1(resendTransactionRequest, options).then((request) => request(axios, basePath));
        },
        sendBatchTransaction1(createBatchTransactionRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).sendBatchTransaction1(createBatchTransactionRequest, options).then((request) => request(axios, basePath));
        },
        sendTransaction1(createMultiSigTransactionRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).sendTransaction1(createMultiSigTransactionRequest, options).then((request) => request(axios, basePath));
        },
        validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options) {
            return exports.BscWalletControllerApiFp(configuration).validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class BscWalletControllerApi extends base_1.BaseAPI {
    activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).activateAllowedAddresses1(walletId, activateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    activateMasterWallet1(walletId, activateMasterWalletRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).activateMasterWallet1(walletId, activateMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createAllowedAddress1(walletId, createAllowedAddressRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).createAllowedAddress1(walletId, createAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createMasterWallet2(createInactiveMasterWalletRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).createMasterWallet2(createInactiveMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createUserWallet1(walletId, createUserWalletRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).createUserWallet1(walletId, createUserWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).createWalletWithdrawalPolicy1(walletId, createWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).deleteAllowedAddress1(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    flush1(walletId, flushRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).flush1(walletId, flushRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getAllWalletWithdrawalPolicies1(walletId, pageable, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getAllWalletWithdrawalPolicies1(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddress1(walletId, allowedAddressId, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getAllowedAddress1(walletId, allowedAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddressesByCoinId2(walletId, coinId, pageable, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getAllowedAddressesByCoinId2(walletId, coinId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getFlushTransaction1(walletId, transactionId, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getFlushTransaction1(walletId, transactionId, options).then((request) => request(this.axios, this.basePath));
    }
    getFlushTransactions1(walletId, pageable, searchCondition, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getFlushTransactions1(walletId, pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallet1(walletId, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getMasterWallet1(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletAccountKey1(walletId, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getMasterWalletAccountKey1(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletBalance1(walletId, symbol, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getMasterWalletBalance1(walletId, symbol, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletInitialKey1(walletId, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getMasterWalletInitialKey1(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets3(sort, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getMasterWallets3(sort, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWallet1(walletId, userWalletId, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getUserWallet1(walletId, userWalletId, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWalletBalance1(walletId, userWalletId, symbol, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getUserWalletBalance1(walletId, userWalletId, symbol, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWallets3(walletId, pageable, options) {
        return exports.BscWalletControllerApiFp(this.configuration).getUserWallets3(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).inactivateAllowedAddresses1(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchAccountKey1(walletId, updateAccountKeyRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).patchAccountKey1(walletId, updateAccountKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletName1(walletId, changeWalletNameRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).patchMasterWalletName1(walletId, changeWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchUserWalletName1(walletId, userWalletId, changeWalletNameRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).patchUserWalletName1(walletId, userWalletId, changeWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchWalletWithdrawalPolicy1(walletId, policyId, patchWithdrawalPolicyRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).patchWalletWithdrawalPolicy1(walletId, policyId, patchWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    recreateMasterWallet1(walletId, recreateWalletRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).recreateMasterWallet1(walletId, recreateWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    recreateUserWallet1(walletId, userWalletId, recreateWalletRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).recreateUserWallet1(walletId, userWalletId, recreateWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    replaceTransaction1(replaceTransactionRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).replaceTransaction1(replaceTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    resendTransaction1(resendTransactionRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).resendTransaction1(resendTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendBatchTransaction1(createBatchTransactionRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).sendBatchTransaction1(createBatchTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendTransaction1(createMultiSigTransactionRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).sendTransaction1(createMultiSigTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options) {
        return exports.BscWalletControllerApiFp(this.configuration).validateIsAllowedAddress1(walletId, validateIsAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BscWalletControllerApi = BscWalletControllerApi;
exports.BscWithdrawalApprovalControllerApiAxiosParamCreator = function (configuration) {
    return {
        approveWithdrawalApproval1: async (withdrawalApprovalId, approveWithdrawalApprovalRequest, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling approveWithdrawalApproval1.');
            }
            if (approveWithdrawalApprovalRequest === null || approveWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('approveWithdrawalApprovalRequest', 'Required parameter approveWithdrawalApprovalRequest was null or undefined when calling approveWithdrawalApproval1.');
            }
            const localVarPath = `/api/v2/bnb/withdrawal-approvals/{withdrawalApprovalId}/approve`
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
            const localVarPath = `/api/v2/bnb/withdrawal-approvals/{withdrawalApprovalId}/reject`
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
exports.BscWithdrawalApprovalControllerApiFp = function (configuration) {
    return {
        async approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.BscWithdrawalApprovalControllerApiAxiosParamCreator(configuration).approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.BscWithdrawalApprovalControllerApiAxiosParamCreator(configuration).rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.BscWithdrawalApprovalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            return exports.BscWithdrawalApprovalControllerApiFp(configuration).approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
        rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            return exports.BscWithdrawalApprovalControllerApiFp(configuration).rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class BscWithdrawalApprovalControllerApi extends base_1.BaseAPI {
    approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
        return exports.BscWithdrawalApprovalControllerApiFp(this.configuration).approveWithdrawalApproval1(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
    rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
        return exports.BscWithdrawalApprovalControllerApiFp(this.configuration).rejectWithdrawalApproval1(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.BscWithdrawalApprovalControllerApi = BscWithdrawalApprovalControllerApi;
exports.CoinControllerApiAxiosParamCreator = function (configuration) {
    return {
        getAllCoins: async (options = {}) => {
            const localVarPath = `/api/v1/coins`;
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
        getCoin6: async (symbol, blockchain, options = {}) => {
            if (symbol === null || symbol === undefined) {
                throw new base_1.RequiredError('symbol', 'Required parameter symbol was null or undefined when calling getCoin6.');
            }
            if (blockchain === null || blockchain === undefined) {
                throw new base_1.RequiredError('blockchain', 'Required parameter blockchain was null or undefined when calling getCoin6.');
            }
            const localVarPath = `/api/v1/coins/{symbol}`
                .replace(`{${"symbol"}}`, encodeURIComponent(String(symbol)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (blockchain !== undefined) {
                localVarQueryParameter['blockchain'] = blockchain;
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
exports.CoinControllerApiFp = function (configuration) {
    return {
        async getAllCoins(options) {
            const localVarAxiosArgs = await exports.CoinControllerApiAxiosParamCreator(configuration).getAllCoins(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getCoin6(symbol, blockchain, options) {
            const localVarAxiosArgs = await exports.CoinControllerApiAxiosParamCreator(configuration).getCoin6(symbol, blockchain, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.CoinControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getAllCoins(options) {
            return exports.CoinControllerApiFp(configuration).getAllCoins(options).then((request) => request(axios, basePath));
        },
        getCoin6(symbol, blockchain, options) {
            return exports.CoinControllerApiFp(configuration).getCoin6(symbol, blockchain, options).then((request) => request(axios, basePath));
        },
    };
};
class CoinControllerApi extends base_1.BaseAPI {
    getAllCoins(options) {
        return exports.CoinControllerApiFp(this.configuration).getAllCoins(options).then((request) => request(this.axios, this.basePath));
    }
    getCoin6(symbol, blockchain, options) {
        return exports.CoinControllerApiFp(this.configuration).getCoin6(symbol, blockchain, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.CoinControllerApi = CoinControllerApi;
exports.EthAdminControllerApiAxiosParamCreator = function (configuration) {
    return {
        getCoin1: async (coinId, options = {}) => {
            if (coinId === null || coinId === undefined) {
                throw new base_1.RequiredError('coinId', 'Required parameter coinId was null or undefined when calling getCoin1.');
            }
            const localVarPath = `/api/v2/eth/admin/coins/{coinId}`
                .replace(`{${"coinId"}}`, encodeURIComponent(String(coinId)));
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
        getExternalWithdrawals: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getExternalWithdrawals.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getExternalWithdrawals.');
            }
            const localVarPath = `/api/v2/eth/admin/external-withdrawals`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
        getMasterWallets: async (pageable, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getMasterWallets.');
            }
            const localVarPath = `/api/v2/eth/admin/master-wallets`;
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
        getUserWallets: async (pageable, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getUserWallets.');
            }
            const localVarPath = `/api/v2/eth/admin/user-wallets`;
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
        getValueTransferEvents1: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getValueTransferEvents1.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getValueTransferEvents1.');
            }
            const localVarPath = `/api/v2/eth/admin/value-transfer-events`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
exports.EthAdminControllerApiFp = function (configuration) {
    return {
        async getCoin1(coinId, options) {
            const localVarAxiosArgs = await exports.EthAdminControllerApiAxiosParamCreator(configuration).getCoin1(coinId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getExternalWithdrawals(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.EthAdminControllerApiAxiosParamCreator(configuration).getExternalWithdrawals(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets(pageable, options) {
            const localVarAxiosArgs = await exports.EthAdminControllerApiAxiosParamCreator(configuration).getMasterWallets(pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWallets(pageable, options) {
            const localVarAxiosArgs = await exports.EthAdminControllerApiAxiosParamCreator(configuration).getUserWallets(pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getValueTransferEvents1(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.EthAdminControllerApiAxiosParamCreator(configuration).getValueTransferEvents1(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EthAdminControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getCoin1(coinId, options) {
            return exports.EthAdminControllerApiFp(configuration).getCoin1(coinId, options).then((request) => request(axios, basePath));
        },
        getExternalWithdrawals(pageable, searchCondition, options) {
            return exports.EthAdminControllerApiFp(configuration).getExternalWithdrawals(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
        getMasterWallets(pageable, options) {
            return exports.EthAdminControllerApiFp(configuration).getMasterWallets(pageable, options).then((request) => request(axios, basePath));
        },
        getUserWallets(pageable, options) {
            return exports.EthAdminControllerApiFp(configuration).getUserWallets(pageable, options).then((request) => request(axios, basePath));
        },
        getValueTransferEvents1(pageable, searchCondition, options) {
            return exports.EthAdminControllerApiFp(configuration).getValueTransferEvents1(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class EthAdminControllerApi extends base_1.BaseAPI {
    getCoin1(coinId, options) {
        return exports.EthAdminControllerApiFp(this.configuration).getCoin1(coinId, options).then((request) => request(this.axios, this.basePath));
    }
    getExternalWithdrawals(pageable, searchCondition, options) {
        return exports.EthAdminControllerApiFp(this.configuration).getExternalWithdrawals(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets(pageable, options) {
        return exports.EthAdminControllerApiFp(this.configuration).getMasterWallets(pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWallets(pageable, options) {
        return exports.EthAdminControllerApiFp(this.configuration).getUserWallets(pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getValueTransferEvents1(pageable, searchCondition, options) {
        return exports.EthAdminControllerApiFp(this.configuration).getValueTransferEvents1(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EthAdminControllerApi = EthAdminControllerApi;
exports.EthCoinControllerApiAxiosParamCreator = function (configuration) {
    return {
        createCoin: async (createCoinRequest, options = {}) => {
            if (createCoinRequest === null || createCoinRequest === undefined) {
                throw new base_1.RequiredError('createCoinRequest', 'Required parameter createCoinRequest was null or undefined when calling createCoin.');
            }
            const localVarPath = `/api/v2/eth/coins`;
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
            const needsSerialization = (typeof createCoinRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createCoinRequest !== undefined ? createCoinRequest : {}) : (createCoinRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        deleteCoin: async (symbol, options = {}) => {
            if (symbol === null || symbol === undefined) {
                throw new base_1.RequiredError('symbol', 'Required parameter symbol was null or undefined when calling deleteCoin.');
            }
            const localVarPath = `/api/v2/eth/coins/{symbol}`
                .replace(`{${"symbol"}}`, encodeURIComponent(String(symbol)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'DELETE' }, baseOptions), options);
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
        getAllCoins1: async (flag, options = {}) => {
            if (flag === null || flag === undefined) {
                throw new base_1.RequiredError('flag', 'Required parameter flag was null or undefined when calling getAllCoins1.');
            }
            const localVarPath = `/api/v2/eth/coins`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (flag !== undefined) {
                localVarQueryParameter['flag'] = flag;
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
        getCoin: async (symbol, options = {}) => {
            if (symbol === null || symbol === undefined) {
                throw new base_1.RequiredError('symbol', 'Required parameter symbol was null or undefined when calling getCoin.');
            }
            const localVarPath = `/api/v2/eth/coins/{symbol}`
                .replace(`{${"symbol"}}`, encodeURIComponent(String(symbol)));
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
        patchCoin: async (updateCoinRequest, options = {}) => {
            if (updateCoinRequest === null || updateCoinRequest === undefined) {
                throw new base_1.RequiredError('updateCoinRequest', 'Required parameter updateCoinRequest was null or undefined when calling patchCoin.');
            }
            const localVarPath = `/api/v2/eth/coins`;
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
            const needsSerialization = (typeof updateCoinRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateCoinRequest !== undefined ? updateCoinRequest : {}) : (updateCoinRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.EthCoinControllerApiFp = function (configuration) {
    return {
        async createCoin(createCoinRequest, options) {
            const localVarAxiosArgs = await exports.EthCoinControllerApiAxiosParamCreator(configuration).createCoin(createCoinRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteCoin(symbol, options) {
            const localVarAxiosArgs = await exports.EthCoinControllerApiAxiosParamCreator(configuration).deleteCoin(symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllCoins1(flag, options) {
            const localVarAxiosArgs = await exports.EthCoinControllerApiAxiosParamCreator(configuration).getAllCoins1(flag, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getCoin(symbol, options) {
            const localVarAxiosArgs = await exports.EthCoinControllerApiAxiosParamCreator(configuration).getCoin(symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchCoin(updateCoinRequest, options) {
            const localVarAxiosArgs = await exports.EthCoinControllerApiAxiosParamCreator(configuration).patchCoin(updateCoinRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EthCoinControllerApiFactory = function (configuration, basePath, axios) {
    return {
        createCoin(createCoinRequest, options) {
            return exports.EthCoinControllerApiFp(configuration).createCoin(createCoinRequest, options).then((request) => request(axios, basePath));
        },
        deleteCoin(symbol, options) {
            return exports.EthCoinControllerApiFp(configuration).deleteCoin(symbol, options).then((request) => request(axios, basePath));
        },
        getAllCoins1(flag, options) {
            return exports.EthCoinControllerApiFp(configuration).getAllCoins1(flag, options).then((request) => request(axios, basePath));
        },
        getCoin(symbol, options) {
            return exports.EthCoinControllerApiFp(configuration).getCoin(symbol, options).then((request) => request(axios, basePath));
        },
        patchCoin(updateCoinRequest, options) {
            return exports.EthCoinControllerApiFp(configuration).patchCoin(updateCoinRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class EthCoinControllerApi extends base_1.BaseAPI {
    createCoin(createCoinRequest, options) {
        return exports.EthCoinControllerApiFp(this.configuration).createCoin(createCoinRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteCoin(symbol, options) {
        return exports.EthCoinControllerApiFp(this.configuration).deleteCoin(symbol, options).then((request) => request(this.axios, this.basePath));
    }
    getAllCoins1(flag, options) {
        return exports.EthCoinControllerApiFp(this.configuration).getAllCoins1(flag, options).then((request) => request(this.axios, this.basePath));
    }
    getCoin(symbol, options) {
        return exports.EthCoinControllerApiFp(this.configuration).getCoin(symbol, options).then((request) => request(this.axios, this.basePath));
    }
    patchCoin(updateCoinRequest, options) {
        return exports.EthCoinControllerApiFp(this.configuration).patchCoin(updateCoinRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EthCoinControllerApi = EthCoinControllerApi;
exports.EthEventControllerApiAxiosParamCreator = function (configuration) {
    return {
        getCallEvents1: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getCallEvents1.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getCallEvents1.');
            }
            const localVarPath = `/api/v2/eth/call-events`;
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
        getValueTransferEvents2: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getValueTransferEvents2.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getValueTransferEvents2.');
            }
            const localVarPath = `/api/v2/eth/value-transfer-events`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
exports.EthEventControllerApiFp = function (configuration) {
    return {
        async getCallEvents1(pageable, specs, options) {
            const localVarAxiosArgs = await exports.EthEventControllerApiAxiosParamCreator(configuration).getCallEvents1(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getValueTransferEvents2(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.EthEventControllerApiAxiosParamCreator(configuration).getValueTransferEvents2(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EthEventControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getCallEvents1(pageable, specs, options) {
            return exports.EthEventControllerApiFp(configuration).getCallEvents1(pageable, specs, options).then((request) => request(axios, basePath));
        },
        getValueTransferEvents2(pageable, searchCondition, options) {
            return exports.EthEventControllerApiFp(configuration).getValueTransferEvents2(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class EthEventControllerApi extends base_1.BaseAPI {
    getCallEvents1(pageable, specs, options) {
        return exports.EthEventControllerApiFp(this.configuration).getCallEvents1(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getValueTransferEvents2(pageable, searchCondition, options) {
        return exports.EthEventControllerApiFp(this.configuration).getValueTransferEvents2(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EthEventControllerApi = EthEventControllerApi;
exports.EthGasPriceControllerApiAxiosParamCreator = function (configuration) {
    return {
        getGasPrice: async (options = {}) => {
            const localVarPath = `/api/v2/eth/gas-price`;
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
exports.EthGasPriceControllerApiFp = function (configuration) {
    return {
        async getGasPrice(options) {
            const localVarAxiosArgs = await exports.EthGasPriceControllerApiAxiosParamCreator(configuration).getGasPrice(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EthGasPriceControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getGasPrice(options) {
            return exports.EthGasPriceControllerApiFp(configuration).getGasPrice(options).then((request) => request(axios, basePath));
        },
    };
};
class EthGasPriceControllerApi extends base_1.BaseAPI {
    getGasPrice(options) {
        return exports.EthGasPriceControllerApiFp(this.configuration).getGasPrice(options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EthGasPriceControllerApi = EthGasPriceControllerApi;
exports.EthHenesisKeyControllerApiAxiosParamCreator = function (configuration) {
    return {
        createExampleHenesisKey: async (options = {}) => {
            const localVarPath = `/api/v2/eth/henesis-keys/example`;
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
        createTransaction: async (createTransactionRequest, options = {}) => {
            if (createTransactionRequest === null || createTransactionRequest === undefined) {
                throw new base_1.RequiredError('createTransactionRequest', 'Required parameter createTransactionRequest was null or undefined when calling createTransaction.');
            }
            const localVarPath = `/api/v2/eth/henesis-keys/transactions`;
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
        getHenesisKey: async (options = {}) => {
            const localVarPath = `/api/v2/eth/henesis-keys/me`;
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
        getHenesisKeyBalance: async (options = {}) => {
            const localVarPath = `/api/v2/eth/henesis-keys/balance`;
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
        getHistoriesCsv: async (createdAtGte, createdAtLt, options = {}) => {
            if (createdAtGte === null || createdAtGte === undefined) {
                throw new base_1.RequiredError('createdAtGte', 'Required parameter createdAtGte was null or undefined when calling getHistoriesCsv.');
            }
            if (createdAtLt === null || createdAtLt === undefined) {
                throw new base_1.RequiredError('createdAtLt', 'Required parameter createdAtLt was null or undefined when calling getHistoriesCsv.');
            }
            const localVarPath = `/api/v2/eth/henesis-keys/histories/csv`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (createdAtGte !== undefined) {
                localVarQueryParameter['created_at_gte'] = createdAtGte;
            }
            if (createdAtLt !== undefined) {
                localVarQueryParameter['created_at_lt'] = createdAtLt;
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
        getTransactionHistories: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransactionHistories.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getTransactionHistories.');
            }
            const localVarPath = `/api/v2/eth/henesis-keys/histories`;
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
exports.EthHenesisKeyControllerApiFp = function (configuration) {
    return {
        async createExampleHenesisKey(options) {
            const localVarAxiosArgs = await exports.EthHenesisKeyControllerApiAxiosParamCreator(configuration).createExampleHenesisKey(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createTransaction(createTransactionRequest, options) {
            const localVarAxiosArgs = await exports.EthHenesisKeyControllerApiAxiosParamCreator(configuration).createTransaction(createTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getHenesisKey(options) {
            const localVarAxiosArgs = await exports.EthHenesisKeyControllerApiAxiosParamCreator(configuration).getHenesisKey(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getHenesisKeyBalance(options) {
            const localVarAxiosArgs = await exports.EthHenesisKeyControllerApiAxiosParamCreator(configuration).getHenesisKeyBalance(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getHistoriesCsv(createdAtGte, createdAtLt, options) {
            const localVarAxiosArgs = await exports.EthHenesisKeyControllerApiAxiosParamCreator(configuration).getHistoriesCsv(createdAtGte, createdAtLt, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransactionHistories(pageable, specs, options) {
            const localVarAxiosArgs = await exports.EthHenesisKeyControllerApiAxiosParamCreator(configuration).getTransactionHistories(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EthHenesisKeyControllerApiFactory = function (configuration, basePath, axios) {
    return {
        createExampleHenesisKey(options) {
            return exports.EthHenesisKeyControllerApiFp(configuration).createExampleHenesisKey(options).then((request) => request(axios, basePath));
        },
        createTransaction(createTransactionRequest, options) {
            return exports.EthHenesisKeyControllerApiFp(configuration).createTransaction(createTransactionRequest, options).then((request) => request(axios, basePath));
        },
        getHenesisKey(options) {
            return exports.EthHenesisKeyControllerApiFp(configuration).getHenesisKey(options).then((request) => request(axios, basePath));
        },
        getHenesisKeyBalance(options) {
            return exports.EthHenesisKeyControllerApiFp(configuration).getHenesisKeyBalance(options).then((request) => request(axios, basePath));
        },
        getHistoriesCsv(createdAtGte, createdAtLt, options) {
            return exports.EthHenesisKeyControllerApiFp(configuration).getHistoriesCsv(createdAtGte, createdAtLt, options).then((request) => request(axios, basePath));
        },
        getTransactionHistories(pageable, specs, options) {
            return exports.EthHenesisKeyControllerApiFp(configuration).getTransactionHistories(pageable, specs, options).then((request) => request(axios, basePath));
        },
    };
};
class EthHenesisKeyControllerApi extends base_1.BaseAPI {
    createExampleHenesisKey(options) {
        return exports.EthHenesisKeyControllerApiFp(this.configuration).createExampleHenesisKey(options).then((request) => request(this.axios, this.basePath));
    }
    createTransaction(createTransactionRequest, options) {
        return exports.EthHenesisKeyControllerApiFp(this.configuration).createTransaction(createTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getHenesisKey(options) {
        return exports.EthHenesisKeyControllerApiFp(this.configuration).getHenesisKey(options).then((request) => request(this.axios, this.basePath));
    }
    getHenesisKeyBalance(options) {
        return exports.EthHenesisKeyControllerApiFp(this.configuration).getHenesisKeyBalance(options).then((request) => request(this.axios, this.basePath));
    }
    getHistoriesCsv(createdAtGte, createdAtLt, options) {
        return exports.EthHenesisKeyControllerApiFp(this.configuration).getHistoriesCsv(createdAtGte, createdAtLt, options).then((request) => request(this.axios, this.basePath));
    }
    getTransactionHistories(pageable, specs, options) {
        return exports.EthHenesisKeyControllerApiFp(this.configuration).getTransactionHistories(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EthHenesisKeyControllerApi = EthHenesisKeyControllerApi;
exports.EthInternalControllerApiAxiosParamCreator = function (configuration) {
    return {
        getCallEvents: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getCallEvents.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getCallEvents.');
            }
            const localVarPath = `/api/v2/eth/internal/call-events`;
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
        getValueTransferEvents: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getValueTransferEvents.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getValueTransferEvents.');
            }
            const localVarPath = `/api/v2/eth/internal/value-transfer-events`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
exports.EthInternalControllerApiFp = function (configuration) {
    return {
        async getCallEvents(pageable, specs, options) {
            const localVarAxiosArgs = await exports.EthInternalControllerApiAxiosParamCreator(configuration).getCallEvents(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getValueTransferEvents(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.EthInternalControllerApiAxiosParamCreator(configuration).getValueTransferEvents(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EthInternalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getCallEvents(pageable, specs, options) {
            return exports.EthInternalControllerApiFp(configuration).getCallEvents(pageable, specs, options).then((request) => request(axios, basePath));
        },
        getValueTransferEvents(pageable, searchCondition, options) {
            return exports.EthInternalControllerApiFp(configuration).getValueTransferEvents(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class EthInternalControllerApi extends base_1.BaseAPI {
    getCallEvents(pageable, specs, options) {
        return exports.EthInternalControllerApiFp(this.configuration).getCallEvents(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getValueTransferEvents(pageable, searchCondition, options) {
        return exports.EthInternalControllerApiFp(this.configuration).getValueTransferEvents(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EthInternalControllerApi = EthInternalControllerApi;
exports.EthMethodGasUsageControllerApiAxiosParamCreator = function (configuration) {
    return {
        getMethodGasUsages: async (name, options = {}) => {
            if (name === null || name === undefined) {
                throw new base_1.RequiredError('name', 'Required parameter name was null or undefined when calling getMethodGasUsages.');
            }
            const localVarPath = `/api/v2/eth/method-gas-usages`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
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
exports.EthMethodGasUsageControllerApiFp = function (configuration) {
    return {
        async getMethodGasUsages(name, options) {
            const localVarAxiosArgs = await exports.EthMethodGasUsageControllerApiAxiosParamCreator(configuration).getMethodGasUsages(name, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EthMethodGasUsageControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getMethodGasUsages(name, options) {
            return exports.EthMethodGasUsageControllerApiFp(configuration).getMethodGasUsages(name, options).then((request) => request(axios, basePath));
        },
    };
};
class EthMethodGasUsageControllerApi extends base_1.BaseAPI {
    getMethodGasUsages(name, options) {
        return exports.EthMethodGasUsageControllerApiFp(this.configuration).getMethodGasUsages(name, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EthMethodGasUsageControllerApi = EthMethodGasUsageControllerApi;
exports.EthOperationControllerApiAxiosParamCreator = function (configuration) {
    return {
        bindHenesisKeyToWallet: async (keyId, bindHenesisKeyToWalletRequest, options = {}) => {
            if (keyId === null || keyId === undefined) {
                throw new base_1.RequiredError('keyId', 'Required parameter keyId was null or undefined when calling bindHenesisKeyToWallet.');
            }
            if (bindHenesisKeyToWalletRequest === null || bindHenesisKeyToWalletRequest === undefined) {
                throw new base_1.RequiredError('bindHenesisKeyToWalletRequest', 'Required parameter bindHenesisKeyToWalletRequest was null or undefined when calling bindHenesisKeyToWallet.');
            }
            const localVarPath = `/api/v2/eth/operation/henesis-keys/{keyId}/bind`
                .replace(`{${"keyId"}}`, encodeURIComponent(String(keyId)));
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
            const needsSerialization = (typeof bindHenesisKeyToWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(bindHenesisKeyToWalletRequest !== undefined ? bindHenesisKeyToWalletRequest : {}) : (bindHenesisKeyToWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createHenesisKey: async (createHenesisKeyRequest, options = {}) => {
            if (createHenesisKeyRequest === null || createHenesisKeyRequest === undefined) {
                throw new base_1.RequiredError('createHenesisKeyRequest', 'Required parameter createHenesisKeyRequest was null or undefined when calling createHenesisKey.');
            }
            const localVarPath = `/api/v2/eth/operation/henesis-keys`;
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
        getCoinByAddress: async (address, options = {}) => {
            if (address === null || address === undefined) {
                throw new base_1.RequiredError('address', 'Required parameter address was null or undefined when calling getCoinByAddress.');
            }
            const localVarPath = `/api/v2/eth/operation/coins/address/{address}`
                .replace(`{${"address"}}`, encodeURIComponent(String(address)));
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
exports.EthOperationControllerApiFp = function (configuration) {
    return {
        async bindHenesisKeyToWallet(keyId, bindHenesisKeyToWalletRequest, options) {
            const localVarAxiosArgs = await exports.EthOperationControllerApiAxiosParamCreator(configuration).bindHenesisKeyToWallet(keyId, bindHenesisKeyToWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createHenesisKey(createHenesisKeyRequest, options) {
            const localVarAxiosArgs = await exports.EthOperationControllerApiAxiosParamCreator(configuration).createHenesisKey(createHenesisKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getCoinByAddress(address, options) {
            const localVarAxiosArgs = await exports.EthOperationControllerApiAxiosParamCreator(configuration).getCoinByAddress(address, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EthOperationControllerApiFactory = function (configuration, basePath, axios) {
    return {
        bindHenesisKeyToWallet(keyId, bindHenesisKeyToWalletRequest, options) {
            return exports.EthOperationControllerApiFp(configuration).bindHenesisKeyToWallet(keyId, bindHenesisKeyToWalletRequest, options).then((request) => request(axios, basePath));
        },
        createHenesisKey(createHenesisKeyRequest, options) {
            return exports.EthOperationControllerApiFp(configuration).createHenesisKey(createHenesisKeyRequest, options).then((request) => request(axios, basePath));
        },
        getCoinByAddress(address, options) {
            return exports.EthOperationControllerApiFp(configuration).getCoinByAddress(address, options).then((request) => request(axios, basePath));
        },
    };
};
class EthOperationControllerApi extends base_1.BaseAPI {
    bindHenesisKeyToWallet(keyId, bindHenesisKeyToWalletRequest, options) {
        return exports.EthOperationControllerApiFp(this.configuration).bindHenesisKeyToWallet(keyId, bindHenesisKeyToWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createHenesisKey(createHenesisKeyRequest, options) {
        return exports.EthOperationControllerApiFp(this.configuration).createHenesisKey(createHenesisKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getCoinByAddress(address, options) {
        return exports.EthOperationControllerApiFp(this.configuration).getCoinByAddress(address, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EthOperationControllerApi = EthOperationControllerApi;
exports.EthTransactionControllerApiAxiosParamCreator = function (configuration) {
    return {
        getAllTransactions: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllTransactions.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getAllTransactions.');
            }
            const localVarPath = `/api/v2/eth/transactions`;
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
        getRawTransactionByHash: async (transactionHash, options = {}) => {
            if (transactionHash === null || transactionHash === undefined) {
                throw new base_1.RequiredError('transactionHash', 'Required parameter transactionHash was null or undefined when calling getRawTransactionByHash.');
            }
            const localVarPath = `/api/v2/eth/raw-transactions/{transactionHash}`
                .replace(`{${"transactionHash"}}`, encodeURIComponent(String(transactionHash)));
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
        getTransactionById: async (transactionId, options = {}) => {
            if (transactionId === null || transactionId === undefined) {
                throw new base_1.RequiredError('transactionId', 'Required parameter transactionId was null or undefined when calling getTransactionById.');
            }
            const localVarPath = `/api/v2/eth/transactions/{transactionId}`
                .replace(`{${"transactionId"}}`, encodeURIComponent(String(transactionId)));
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
exports.EthTransactionControllerApiFp = function (configuration) {
    return {
        async getAllTransactions(pageable, specs, options) {
            const localVarAxiosArgs = await exports.EthTransactionControllerApiAxiosParamCreator(configuration).getAllTransactions(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getRawTransactionByHash(transactionHash, options) {
            const localVarAxiosArgs = await exports.EthTransactionControllerApiAxiosParamCreator(configuration).getRawTransactionByHash(transactionHash, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransactionById(transactionId, options) {
            const localVarAxiosArgs = await exports.EthTransactionControllerApiAxiosParamCreator(configuration).getTransactionById(transactionId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EthTransactionControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getAllTransactions(pageable, specs, options) {
            return exports.EthTransactionControllerApiFp(configuration).getAllTransactions(pageable, specs, options).then((request) => request(axios, basePath));
        },
        getRawTransactionByHash(transactionHash, options) {
            return exports.EthTransactionControllerApiFp(configuration).getRawTransactionByHash(transactionHash, options).then((request) => request(axios, basePath));
        },
        getTransactionById(transactionId, options) {
            return exports.EthTransactionControllerApiFp(configuration).getTransactionById(transactionId, options).then((request) => request(axios, basePath));
        },
    };
};
class EthTransactionControllerApi extends base_1.BaseAPI {
    getAllTransactions(pageable, specs, options) {
        return exports.EthTransactionControllerApiFp(this.configuration).getAllTransactions(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getRawTransactionByHash(transactionHash, options) {
        return exports.EthTransactionControllerApiFp(this.configuration).getRawTransactionByHash(transactionHash, options).then((request) => request(this.axios, this.basePath));
    }
    getTransactionById(transactionId, options) {
        return exports.EthTransactionControllerApiFp(this.configuration).getTransactionById(transactionId, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EthTransactionControllerApi = EthTransactionControllerApi;
exports.EthWalletControllerApiAxiosParamCreator = function (configuration) {
    return {
        activateAllowedAddresses: async (walletId, activateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling activateAllowedAddresses.');
            }
            if (activateAllowedAddressesRequest === null || activateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('activateAllowedAddressesRequest', 'Required parameter activateAllowedAddressesRequest was null or undefined when calling activateAllowedAddresses.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/activate-allowed-addresses`
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
            const localVarPath = `/api/v2/eth/wallets/{walletId}/activate`
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
        createAllowedAddress: async (walletId, createAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createAllowedAddress.');
            }
            if (createAllowedAddressRequest === null || createAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('createAllowedAddressRequest', 'Required parameter createAllowedAddressRequest was null or undefined when calling createAllowedAddress.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/allowed-addresses`
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
        createMasterWallet1: async (createInactiveMasterWalletRequest, options = {}) => {
            if (createInactiveMasterWalletRequest === null || createInactiveMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('createInactiveMasterWalletRequest', 'Required parameter createInactiveMasterWalletRequest was null or undefined when calling createMasterWallet1.');
            }
            const localVarPath = `/api/v2/eth/wallets`;
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
        createUserWallet: async (walletId, createUserWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createUserWallet.');
            }
            if (createUserWalletRequest === null || createUserWalletRequest === undefined) {
                throw new base_1.RequiredError('createUserWalletRequest', 'Required parameter createUserWalletRequest was null or undefined when calling createUserWallet.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/user-wallets`
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
            const needsSerialization = (typeof createUserWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createUserWalletRequest !== undefined ? createUserWalletRequest : {}) : (createUserWalletRequest || "");
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
            const localVarPath = `/api/v2/eth/wallets/{walletId}/withdrawal-policies`
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
            const localVarPath = `/api/v2/eth/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
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
        flush: async (walletId, flushRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling flush.');
            }
            if (flushRequest === null || flushRequest === undefined) {
                throw new base_1.RequiredError('flushRequest', 'Required parameter flushRequest was null or undefined when calling flush.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/flush`
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
        getAllWalletWithdrawalPolicies: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllWalletWithdrawalPolicies.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllWalletWithdrawalPolicies.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/withdrawal-policies`
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
        getAllowedAddress: async (walletId, allowedAddressId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddress.');
            }
            if (allowedAddressId === null || allowedAddressId === undefined) {
                throw new base_1.RequiredError('allowedAddressId', 'Required parameter allowedAddressId was null or undefined when calling getAllowedAddress.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
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
        getAllowedAddressesByCoinId1: async (walletId, coinId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddressesByCoinId1.');
            }
            if (coinId === null || coinId === undefined) {
                throw new base_1.RequiredError('coinId', 'Required parameter coinId was null or undefined when calling getAllowedAddressesByCoinId1.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllowedAddressesByCoinId1.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (coinId !== undefined) {
                localVarQueryParameter['coin_id'] = coinId;
            }
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
        getFlushTransaction: async (walletId, transactionId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getFlushTransaction.');
            }
            if (transactionId === null || transactionId === undefined) {
                throw new base_1.RequiredError('transactionId', 'Required parameter transactionId was null or undefined when calling getFlushTransaction.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/flush-transactions/{transactionId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"transactionId"}}`, encodeURIComponent(String(transactionId)));
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
        getFlushTransactions: async (walletId, pageable, searchCondition, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getFlushTransactions.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getFlushTransactions.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getFlushTransactions.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/flush-transactions`
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
            const localVarPath = `/api/v2/eth/wallets/{walletId}`
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
        getMasterWalletAccountKey: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletAccountKey.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/account-key`
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
        getMasterWalletBalance: async (walletId, symbol, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletBalance.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/balance`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (symbol !== undefined) {
                localVarQueryParameter['symbol'] = symbol;
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
        getMasterWalletInitialKey: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletInitialKey.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/initial-key`
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
        getMasterWalletNonce: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletNonce.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/nonce`
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
        getMasterWallets1: async (sort, options = {}) => {
            if (sort === null || sort === undefined) {
                throw new base_1.RequiredError('sort', 'Required parameter sort was null or undefined when calling getMasterWallets1.');
            }
            const localVarPath = `/api/v2/eth/wallets`;
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
        getUserWallet: async (walletId, userWalletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWallet.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling getUserWallet.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/user-wallets/{userWalletId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
        getUserWalletBalance: async (walletId, userWalletId, symbol, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWalletBalance.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling getUserWalletBalance.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/user-wallets/{userWalletId}/balance`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (symbol !== undefined) {
                localVarQueryParameter['symbol'] = symbol;
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
        getUserWalletNonce: async (walletId, userWalletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWalletNonce.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling getUserWalletNonce.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/user-wallets/{userWalletId}/nonce`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
        getUserWallets1: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWallets1.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getUserWallets1.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/user-wallets`
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
        inactivateAllowedAddresses: async (walletId, inactivateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling inactivateAllowedAddresses.');
            }
            if (inactivateAllowedAddressesRequest === null || inactivateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('inactivateAllowedAddressesRequest', 'Required parameter inactivateAllowedAddressesRequest was null or undefined when calling inactivateAllowedAddresses.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/inactivate-allowed-addresses`
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
        patchAccountKey: async (walletId, updateAccountKeyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchAccountKey.');
            }
            if (updateAccountKeyRequest === null || updateAccountKeyRequest === undefined) {
                throw new base_1.RequiredError('updateAccountKeyRequest', 'Required parameter updateAccountKeyRequest was null or undefined when calling patchAccountKey.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/account-key`
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
            const needsSerialization = (typeof updateAccountKeyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateAccountKeyRequest !== undefined ? updateAccountKeyRequest : {}) : (updateAccountKeyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchMasterWalletName: async (walletId, changeWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletName.');
            }
            if (changeWalletNameRequest === null || changeWalletNameRequest === undefined) {
                throw new base_1.RequiredError('changeWalletNameRequest', 'Required parameter changeWalletNameRequest was null or undefined when calling patchMasterWalletName.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/name`
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
            const needsSerialization = (typeof changeWalletNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(changeWalletNameRequest !== undefined ? changeWalletNameRequest : {}) : (changeWalletNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchUserWalletName: async (walletId, userWalletId, changeWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchUserWalletName.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling patchUserWalletName.');
            }
            if (changeWalletNameRequest === null || changeWalletNameRequest === undefined) {
                throw new base_1.RequiredError('changeWalletNameRequest', 'Required parameter changeWalletNameRequest was null or undefined when calling patchUserWalletName.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/user-wallets/{userWalletId}/name`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
            const needsSerialization = (typeof changeWalletNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(changeWalletNameRequest !== undefined ? changeWalletNameRequest : {}) : (changeWalletNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchWalletWithdrawalPolicy: async (walletId, policyId, patchWithdrawalPolicyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchWalletWithdrawalPolicy.');
            }
            if (policyId === null || policyId === undefined) {
                throw new base_1.RequiredError('policyId', 'Required parameter policyId was null or undefined when calling patchWalletWithdrawalPolicy.');
            }
            if (patchWithdrawalPolicyRequest === null || patchWithdrawalPolicyRequest === undefined) {
                throw new base_1.RequiredError('patchWithdrawalPolicyRequest', 'Required parameter patchWithdrawalPolicyRequest was null or undefined when calling patchWalletWithdrawalPolicy.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/withdrawal-policies/{policyId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"policyId"}}`, encodeURIComponent(String(policyId)));
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
        recreateMasterWallet: async (walletId, recreateWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling recreateMasterWallet.');
            }
            if (recreateWalletRequest === null || recreateWalletRequest === undefined) {
                throw new base_1.RequiredError('recreateWalletRequest', 'Required parameter recreateWalletRequest was null or undefined when calling recreateMasterWallet.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/recreate`
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
            const needsSerialization = (typeof recreateWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(recreateWalletRequest !== undefined ? recreateWalletRequest : {}) : (recreateWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        recreateUserWallet: async (walletId, userWalletId, recreateWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling recreateUserWallet.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling recreateUserWallet.');
            }
            if (recreateWalletRequest === null || recreateWalletRequest === undefined) {
                throw new base_1.RequiredError('recreateWalletRequest', 'Required parameter recreateWalletRequest was null or undefined when calling recreateUserWallet.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/user-wallets/{userWalletId}/recreate`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
            const needsSerialization = (typeof recreateWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(recreateWalletRequest !== undefined ? recreateWalletRequest : {}) : (recreateWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        replaceTransaction: async (replaceTransactionRequest, options = {}) => {
            if (replaceTransactionRequest === null || replaceTransactionRequest === undefined) {
                throw new base_1.RequiredError('replaceTransactionRequest', 'Required parameter replaceTransactionRequest was null or undefined when calling replaceTransaction.');
            }
            const localVarPath = `/api/v2/eth/wallets/transactions/replace`;
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
            const needsSerialization = (typeof replaceTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(replaceTransactionRequest !== undefined ? replaceTransactionRequest : {}) : (replaceTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        resendTransaction: async (resendTransactionRequest, options = {}) => {
            if (resendTransactionRequest === null || resendTransactionRequest === undefined) {
                throw new base_1.RequiredError('resendTransactionRequest', 'Required parameter resendTransactionRequest was null or undefined when calling resendTransaction.');
            }
            const localVarPath = `/api/v2/eth/wallets/transactions/resend`;
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
            const needsSerialization = (typeof resendTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(resendTransactionRequest !== undefined ? resendTransactionRequest : {}) : (resendTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        sendBatchTransaction: async (createBatchTransactionRequest, options = {}) => {
            if (createBatchTransactionRequest === null || createBatchTransactionRequest === undefined) {
                throw new base_1.RequiredError('createBatchTransactionRequest', 'Required parameter createBatchTransactionRequest was null or undefined when calling sendBatchTransaction.');
            }
            const localVarPath = `/api/v2/eth/wallets/batch-transactions`;
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
            const needsSerialization = (typeof createBatchTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createBatchTransactionRequest !== undefined ? createBatchTransactionRequest : {}) : (createBatchTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        sendTransaction: async (createMultiSigTransactionRequest, options = {}) => {
            if (createMultiSigTransactionRequest === null || createMultiSigTransactionRequest === undefined) {
                throw new base_1.RequiredError('createMultiSigTransactionRequest', 'Required parameter createMultiSigTransactionRequest was null or undefined when calling sendTransaction.');
            }
            const localVarPath = `/api/v2/eth/wallets/transactions`;
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
        validateIsAllowedAddress: async (walletId, validateIsAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling validateIsAllowedAddress.');
            }
            if (validateIsAllowedAddressRequest === null || validateIsAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('validateIsAllowedAddressRequest', 'Required parameter validateIsAllowedAddressRequest was null or undefined when calling validateIsAllowedAddress.');
            }
            const localVarPath = `/api/v2/eth/wallets/{walletId}/allowed-addresses/validate`
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
exports.EthWalletControllerApiFp = function (configuration) {
    return {
        async activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async activateMasterWallet(walletId, activateMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).activateMasterWallet(walletId, activateMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createAllowedAddress(walletId, createAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).createAllowedAddress(walletId, createAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createMasterWallet1(createInactiveMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).createMasterWallet1(createInactiveMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createUserWallet(walletId, createUserWalletRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).createUserWallet(walletId, createUserWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async flush(walletId, flushRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).flush(walletId, flushRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllWalletWithdrawalPolicies(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getAllWalletWithdrawalPolicies(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddress(walletId, allowedAddressId, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getAllowedAddress(walletId, allowedAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddressesByCoinId1(walletId, coinId, pageable, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getAllowedAddressesByCoinId1(walletId, coinId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFlushTransaction(walletId, transactionId, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getFlushTransaction(walletId, transactionId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getFlushTransactions(walletId, pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getFlushTransactions(walletId, pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallet(walletId, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getMasterWallet(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletAccountKey(walletId, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getMasterWalletAccountKey(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletBalance(walletId, symbol, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getMasterWalletBalance(walletId, symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletInitialKey(walletId, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getMasterWalletInitialKey(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletNonce(walletId, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getMasterWalletNonce(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets1(sort, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getMasterWallets1(sort, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWallet(walletId, userWalletId, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getUserWallet(walletId, userWalletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWalletBalance(walletId, userWalletId, symbol, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getUserWalletBalance(walletId, userWalletId, symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWalletNonce(walletId, userWalletId, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getUserWalletNonce(walletId, userWalletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWallets1(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).getUserWallets1(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchAccountKey(walletId, updateAccountKeyRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).patchAccountKey(walletId, updateAccountKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletName(walletId, changeWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).patchMasterWalletName(walletId, changeWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchUserWalletName(walletId, userWalletId, changeWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).patchUserWalletName(walletId, userWalletId, changeWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchWalletWithdrawalPolicy(walletId, policyId, patchWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).patchWalletWithdrawalPolicy(walletId, policyId, patchWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async recreateMasterWallet(walletId, recreateWalletRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).recreateMasterWallet(walletId, recreateWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async recreateUserWallet(walletId, userWalletId, recreateWalletRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).recreateUserWallet(walletId, userWalletId, recreateWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async replaceTransaction(replaceTransactionRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).replaceTransaction(replaceTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async resendTransaction(resendTransactionRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).resendTransaction(resendTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendBatchTransaction(createBatchTransactionRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).sendBatchTransaction(createBatchTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendTransaction(createMultiSigTransactionRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).sendTransaction(createMultiSigTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.EthWalletControllerApiAxiosParamCreator(configuration).validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EthWalletControllerApiFactory = function (configuration, basePath, axios) {
    return {
        activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        activateMasterWallet(walletId, activateMasterWalletRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).activateMasterWallet(walletId, activateMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        createAllowedAddress(walletId, createAllowedAddressRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).createAllowedAddress(walletId, createAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        createMasterWallet1(createInactiveMasterWalletRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).createMasterWallet1(createInactiveMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        createUserWallet(walletId, createUserWalletRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).createUserWallet(walletId, createUserWalletRequest, options).then((request) => request(axios, basePath));
        },
        createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        flush(walletId, flushRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).flush(walletId, flushRequest, options).then((request) => request(axios, basePath));
        },
        getAllWalletWithdrawalPolicies(walletId, pageable, options) {
            return exports.EthWalletControllerApiFp(configuration).getAllWalletWithdrawalPolicies(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        getAllowedAddress(walletId, allowedAddressId, options) {
            return exports.EthWalletControllerApiFp(configuration).getAllowedAddress(walletId, allowedAddressId, options).then((request) => request(axios, basePath));
        },
        getAllowedAddressesByCoinId1(walletId, coinId, pageable, options) {
            return exports.EthWalletControllerApiFp(configuration).getAllowedAddressesByCoinId1(walletId, coinId, pageable, options).then((request) => request(axios, basePath));
        },
        getFlushTransaction(walletId, transactionId, options) {
            return exports.EthWalletControllerApiFp(configuration).getFlushTransaction(walletId, transactionId, options).then((request) => request(axios, basePath));
        },
        getFlushTransactions(walletId, pageable, searchCondition, options) {
            return exports.EthWalletControllerApiFp(configuration).getFlushTransactions(walletId, pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
        getMasterWallet(walletId, options) {
            return exports.EthWalletControllerApiFp(configuration).getMasterWallet(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletAccountKey(walletId, options) {
            return exports.EthWalletControllerApiFp(configuration).getMasterWalletAccountKey(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletBalance(walletId, symbol, options) {
            return exports.EthWalletControllerApiFp(configuration).getMasterWalletBalance(walletId, symbol, options).then((request) => request(axios, basePath));
        },
        getMasterWalletInitialKey(walletId, options) {
            return exports.EthWalletControllerApiFp(configuration).getMasterWalletInitialKey(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletNonce(walletId, options) {
            return exports.EthWalletControllerApiFp(configuration).getMasterWalletNonce(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWallets1(sort, options) {
            return exports.EthWalletControllerApiFp(configuration).getMasterWallets1(sort, options).then((request) => request(axios, basePath));
        },
        getUserWallet(walletId, userWalletId, options) {
            return exports.EthWalletControllerApiFp(configuration).getUserWallet(walletId, userWalletId, options).then((request) => request(axios, basePath));
        },
        getUserWalletBalance(walletId, userWalletId, symbol, options) {
            return exports.EthWalletControllerApiFp(configuration).getUserWalletBalance(walletId, userWalletId, symbol, options).then((request) => request(axios, basePath));
        },
        getUserWalletNonce(walletId, userWalletId, options) {
            return exports.EthWalletControllerApiFp(configuration).getUserWalletNonce(walletId, userWalletId, options).then((request) => request(axios, basePath));
        },
        getUserWallets1(walletId, pageable, options) {
            return exports.EthWalletControllerApiFp(configuration).getUserWallets1(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        patchAccountKey(walletId, updateAccountKeyRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).patchAccountKey(walletId, updateAccountKeyRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletName(walletId, changeWalletNameRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).patchMasterWalletName(walletId, changeWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchUserWalletName(walletId, userWalletId, changeWalletNameRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).patchUserWalletName(walletId, userWalletId, changeWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchWalletWithdrawalPolicy(walletId, policyId, patchWithdrawalPolicyRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).patchWalletWithdrawalPolicy(walletId, policyId, patchWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        recreateMasterWallet(walletId, recreateWalletRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).recreateMasterWallet(walletId, recreateWalletRequest, options).then((request) => request(axios, basePath));
        },
        recreateUserWallet(walletId, userWalletId, recreateWalletRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).recreateUserWallet(walletId, userWalletId, recreateWalletRequest, options).then((request) => request(axios, basePath));
        },
        replaceTransaction(replaceTransactionRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).replaceTransaction(replaceTransactionRequest, options).then((request) => request(axios, basePath));
        },
        resendTransaction(resendTransactionRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).resendTransaction(resendTransactionRequest, options).then((request) => request(axios, basePath));
        },
        sendBatchTransaction(createBatchTransactionRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).sendBatchTransaction(createBatchTransactionRequest, options).then((request) => request(axios, basePath));
        },
        sendTransaction(createMultiSigTransactionRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).sendTransaction(createMultiSigTransactionRequest, options).then((request) => request(axios, basePath));
        },
        validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options) {
            return exports.EthWalletControllerApiFp(configuration).validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class EthWalletControllerApi extends base_1.BaseAPI {
    activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).activateAllowedAddresses(walletId, activateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    activateMasterWallet(walletId, activateMasterWalletRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).activateMasterWallet(walletId, activateMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createAllowedAddress(walletId, createAllowedAddressRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).createAllowedAddress(walletId, createAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createMasterWallet1(createInactiveMasterWalletRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).createMasterWallet1(createInactiveMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createUserWallet(walletId, createUserWalletRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).createUserWallet(walletId, createUserWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).createWalletWithdrawalPolicy(walletId, createWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).deleteAllowedAddress(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    flush(walletId, flushRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).flush(walletId, flushRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getAllWalletWithdrawalPolicies(walletId, pageable, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getAllWalletWithdrawalPolicies(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddress(walletId, allowedAddressId, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getAllowedAddress(walletId, allowedAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddressesByCoinId1(walletId, coinId, pageable, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getAllowedAddressesByCoinId1(walletId, coinId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getFlushTransaction(walletId, transactionId, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getFlushTransaction(walletId, transactionId, options).then((request) => request(this.axios, this.basePath));
    }
    getFlushTransactions(walletId, pageable, searchCondition, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getFlushTransactions(walletId, pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallet(walletId, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getMasterWallet(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletAccountKey(walletId, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getMasterWalletAccountKey(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletBalance(walletId, symbol, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getMasterWalletBalance(walletId, symbol, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletInitialKey(walletId, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getMasterWalletInitialKey(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletNonce(walletId, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getMasterWalletNonce(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets1(sort, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getMasterWallets1(sort, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWallet(walletId, userWalletId, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getUserWallet(walletId, userWalletId, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWalletBalance(walletId, userWalletId, symbol, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getUserWalletBalance(walletId, userWalletId, symbol, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWalletNonce(walletId, userWalletId, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getUserWalletNonce(walletId, userWalletId, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWallets1(walletId, pageable, options) {
        return exports.EthWalletControllerApiFp(this.configuration).getUserWallets1(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).inactivateAllowedAddresses(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchAccountKey(walletId, updateAccountKeyRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).patchAccountKey(walletId, updateAccountKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletName(walletId, changeWalletNameRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).patchMasterWalletName(walletId, changeWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchUserWalletName(walletId, userWalletId, changeWalletNameRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).patchUserWalletName(walletId, userWalletId, changeWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchWalletWithdrawalPolicy(walletId, policyId, patchWithdrawalPolicyRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).patchWalletWithdrawalPolicy(walletId, policyId, patchWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    recreateMasterWallet(walletId, recreateWalletRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).recreateMasterWallet(walletId, recreateWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    recreateUserWallet(walletId, userWalletId, recreateWalletRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).recreateUserWallet(walletId, userWalletId, recreateWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    replaceTransaction(replaceTransactionRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).replaceTransaction(replaceTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    resendTransaction(resendTransactionRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).resendTransaction(resendTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendBatchTransaction(createBatchTransactionRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).sendBatchTransaction(createBatchTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendTransaction(createMultiSigTransactionRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).sendTransaction(createMultiSigTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options) {
        return exports.EthWalletControllerApiFp(this.configuration).validateIsAllowedAddress(walletId, validateIsAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EthWalletControllerApi = EthWalletControllerApi;
exports.EthWithdrawalApprovalControllerApiAxiosParamCreator = function (configuration) {
    return {
        approveWithdrawalApproval: async (withdrawalApprovalId, approveWithdrawalApprovalRequest, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling approveWithdrawalApproval.');
            }
            if (approveWithdrawalApprovalRequest === null || approveWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('approveWithdrawalApprovalRequest', 'Required parameter approveWithdrawalApprovalRequest was null or undefined when calling approveWithdrawalApproval.');
            }
            const localVarPath = `/api/v2/eth/withdrawal-approvals/{withdrawalApprovalId}/approve`
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
            const localVarPath = `/api/v2/eth/withdrawal-approvals/{withdrawalApprovalId}/reject`
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
exports.EthWithdrawalApprovalControllerApiFp = function (configuration) {
    return {
        async approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.EthWithdrawalApprovalControllerApiAxiosParamCreator(configuration).approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.EthWithdrawalApprovalControllerApiAxiosParamCreator(configuration).rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EthWithdrawalApprovalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            return exports.EthWithdrawalApprovalControllerApiFp(configuration).approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
        rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            return exports.EthWithdrawalApprovalControllerApiFp(configuration).rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class EthWithdrawalApprovalControllerApi extends base_1.BaseAPI {
    approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
        return exports.EthWithdrawalApprovalControllerApiFp(this.configuration).approveWithdrawalApproval(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
    rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
        return exports.EthWithdrawalApprovalControllerApiFp(this.configuration).rejectWithdrawalApproval(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EthWithdrawalApprovalControllerApi = EthWithdrawalApprovalControllerApi;
exports.EventControllerApiAxiosParamCreator = function (configuration) {
    return {
        getCallEvents6: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getCallEvents6.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getCallEvents6.');
            }
            const localVarPath = `/api/v1/call-events`;
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
        getValueTransferEvents9: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getValueTransferEvents9.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getValueTransferEvents9.');
            }
            const localVarPath = `/api/v1/value-transfer-events`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
exports.EventControllerApiFp = function (configuration) {
    return {
        async getCallEvents6(pageable, specs, options) {
            const localVarAxiosArgs = await exports.EventControllerApiAxiosParamCreator(configuration).getCallEvents6(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getValueTransferEvents9(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.EventControllerApiAxiosParamCreator(configuration).getValueTransferEvents9(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.EventControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getCallEvents6(pageable, specs, options) {
            return exports.EventControllerApiFp(configuration).getCallEvents6(pageable, specs, options).then((request) => request(axios, basePath));
        },
        getValueTransferEvents9(pageable, searchCondition, options) {
            return exports.EventControllerApiFp(configuration).getValueTransferEvents9(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class EventControllerApi extends base_1.BaseAPI {
    getCallEvents6(pageable, specs, options) {
        return exports.EventControllerApiFp(this.configuration).getCallEvents6(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getValueTransferEvents9(pageable, searchCondition, options) {
        return exports.EventControllerApiFp(this.configuration).getValueTransferEvents9(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.EventControllerApi = EventControllerApi;
exports.KlayAdminControllerApiAxiosParamCreator = function (configuration) {
    return {
        getCoin5: async (coinId, options = {}) => {
            if (coinId === null || coinId === undefined) {
                throw new base_1.RequiredError('coinId', 'Required parameter coinId was null or undefined when calling getCoin5.');
            }
            const localVarPath = `/api/v2/klay/admin/coins/{coinId}`
                .replace(`{${"coinId"}}`, encodeURIComponent(String(coinId)));
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
        getExternalWithdrawals2: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getExternalWithdrawals2.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getExternalWithdrawals2.');
            }
            const localVarPath = `/api/v2/klay/admin/external-withdrawals`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
        getMasterWallets5: async (pageable, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getMasterWallets5.');
            }
            const localVarPath = `/api/v2/klay/admin/master-wallets`;
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
        getUserWallets5: async (pageable, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getUserWallets5.');
            }
            const localVarPath = `/api/v2/klay/admin/user-wallets`;
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
        getValueTransferEvents8: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getValueTransferEvents8.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getValueTransferEvents8.');
            }
            const localVarPath = `/api/v2/klay/admin/value-transfer-events`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
exports.KlayAdminControllerApiFp = function (configuration) {
    return {
        async getCoin5(coinId, options) {
            const localVarAxiosArgs = await exports.KlayAdminControllerApiAxiosParamCreator(configuration).getCoin5(coinId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getExternalWithdrawals2(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.KlayAdminControllerApiAxiosParamCreator(configuration).getExternalWithdrawals2(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets5(pageable, options) {
            const localVarAxiosArgs = await exports.KlayAdminControllerApiAxiosParamCreator(configuration).getMasterWallets5(pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWallets5(pageable, options) {
            const localVarAxiosArgs = await exports.KlayAdminControllerApiAxiosParamCreator(configuration).getUserWallets5(pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getValueTransferEvents8(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.KlayAdminControllerApiAxiosParamCreator(configuration).getValueTransferEvents8(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.KlayAdminControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getCoin5(coinId, options) {
            return exports.KlayAdminControllerApiFp(configuration).getCoin5(coinId, options).then((request) => request(axios, basePath));
        },
        getExternalWithdrawals2(pageable, searchCondition, options) {
            return exports.KlayAdminControllerApiFp(configuration).getExternalWithdrawals2(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
        getMasterWallets5(pageable, options) {
            return exports.KlayAdminControllerApiFp(configuration).getMasterWallets5(pageable, options).then((request) => request(axios, basePath));
        },
        getUserWallets5(pageable, options) {
            return exports.KlayAdminControllerApiFp(configuration).getUserWallets5(pageable, options).then((request) => request(axios, basePath));
        },
        getValueTransferEvents8(pageable, searchCondition, options) {
            return exports.KlayAdminControllerApiFp(configuration).getValueTransferEvents8(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class KlayAdminControllerApi extends base_1.BaseAPI {
    getCoin5(coinId, options) {
        return exports.KlayAdminControllerApiFp(this.configuration).getCoin5(coinId, options).then((request) => request(this.axios, this.basePath));
    }
    getExternalWithdrawals2(pageable, searchCondition, options) {
        return exports.KlayAdminControllerApiFp(this.configuration).getExternalWithdrawals2(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets5(pageable, options) {
        return exports.KlayAdminControllerApiFp(this.configuration).getMasterWallets5(pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWallets5(pageable, options) {
        return exports.KlayAdminControllerApiFp(this.configuration).getUserWallets5(pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getValueTransferEvents8(pageable, searchCondition, options) {
        return exports.KlayAdminControllerApiFp(this.configuration).getValueTransferEvents8(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.KlayAdminControllerApi = KlayAdminControllerApi;
exports.KlayCoinControllerApiAxiosParamCreator = function (configuration) {
    return {
        createCoin2: async (createCoinRequest, options = {}) => {
            if (createCoinRequest === null || createCoinRequest === undefined) {
                throw new base_1.RequiredError('createCoinRequest', 'Required parameter createCoinRequest was null or undefined when calling createCoin2.');
            }
            const localVarPath = `/api/v2/klay/coins`;
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
            const needsSerialization = (typeof createCoinRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createCoinRequest !== undefined ? createCoinRequest : {}) : (createCoinRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        deleteCoin2: async (symbol, options = {}) => {
            if (symbol === null || symbol === undefined) {
                throw new base_1.RequiredError('symbol', 'Required parameter symbol was null or undefined when calling deleteCoin2.');
            }
            const localVarPath = `/api/v2/klay/coins/{symbol}`
                .replace(`{${"symbol"}}`, encodeURIComponent(String(symbol)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'DELETE' }, baseOptions), options);
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
        getAllCoins3: async (flag, options = {}) => {
            if (flag === null || flag === undefined) {
                throw new base_1.RequiredError('flag', 'Required parameter flag was null or undefined when calling getAllCoins3.');
            }
            const localVarPath = `/api/v2/klay/coins`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (flag !== undefined) {
                localVarQueryParameter['flag'] = flag;
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
        getCoin4: async (symbol, options = {}) => {
            if (symbol === null || symbol === undefined) {
                throw new base_1.RequiredError('symbol', 'Required parameter symbol was null or undefined when calling getCoin4.');
            }
            const localVarPath = `/api/v2/klay/coins/{symbol}`
                .replace(`{${"symbol"}}`, encodeURIComponent(String(symbol)));
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
        patchCoin2: async (updateCoinRequest, options = {}) => {
            if (updateCoinRequest === null || updateCoinRequest === undefined) {
                throw new base_1.RequiredError('updateCoinRequest', 'Required parameter updateCoinRequest was null or undefined when calling patchCoin2.');
            }
            const localVarPath = `/api/v2/klay/coins`;
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
            const needsSerialization = (typeof updateCoinRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateCoinRequest !== undefined ? updateCoinRequest : {}) : (updateCoinRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.KlayCoinControllerApiFp = function (configuration) {
    return {
        async createCoin2(createCoinRequest, options) {
            const localVarAxiosArgs = await exports.KlayCoinControllerApiAxiosParamCreator(configuration).createCoin2(createCoinRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteCoin2(symbol, options) {
            const localVarAxiosArgs = await exports.KlayCoinControllerApiAxiosParamCreator(configuration).deleteCoin2(symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllCoins3(flag, options) {
            const localVarAxiosArgs = await exports.KlayCoinControllerApiAxiosParamCreator(configuration).getAllCoins3(flag, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getCoin4(symbol, options) {
            const localVarAxiosArgs = await exports.KlayCoinControllerApiAxiosParamCreator(configuration).getCoin4(symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchCoin2(updateCoinRequest, options) {
            const localVarAxiosArgs = await exports.KlayCoinControllerApiAxiosParamCreator(configuration).patchCoin2(updateCoinRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.KlayCoinControllerApiFactory = function (configuration, basePath, axios) {
    return {
        createCoin2(createCoinRequest, options) {
            return exports.KlayCoinControllerApiFp(configuration).createCoin2(createCoinRequest, options).then((request) => request(axios, basePath));
        },
        deleteCoin2(symbol, options) {
            return exports.KlayCoinControllerApiFp(configuration).deleteCoin2(symbol, options).then((request) => request(axios, basePath));
        },
        getAllCoins3(flag, options) {
            return exports.KlayCoinControllerApiFp(configuration).getAllCoins3(flag, options).then((request) => request(axios, basePath));
        },
        getCoin4(symbol, options) {
            return exports.KlayCoinControllerApiFp(configuration).getCoin4(symbol, options).then((request) => request(axios, basePath));
        },
        patchCoin2(updateCoinRequest, options) {
            return exports.KlayCoinControllerApiFp(configuration).patchCoin2(updateCoinRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class KlayCoinControllerApi extends base_1.BaseAPI {
    createCoin2(createCoinRequest, options) {
        return exports.KlayCoinControllerApiFp(this.configuration).createCoin2(createCoinRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteCoin2(symbol, options) {
        return exports.KlayCoinControllerApiFp(this.configuration).deleteCoin2(symbol, options).then((request) => request(this.axios, this.basePath));
    }
    getAllCoins3(flag, options) {
        return exports.KlayCoinControllerApiFp(this.configuration).getAllCoins3(flag, options).then((request) => request(this.axios, this.basePath));
    }
    getCoin4(symbol, options) {
        return exports.KlayCoinControllerApiFp(this.configuration).getCoin4(symbol, options).then((request) => request(this.axios, this.basePath));
    }
    patchCoin2(updateCoinRequest, options) {
        return exports.KlayCoinControllerApiFp(this.configuration).patchCoin2(updateCoinRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.KlayCoinControllerApi = KlayCoinControllerApi;
exports.KlayEventControllerApiAxiosParamCreator = function (configuration) {
    return {
        getCallEvents5: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getCallEvents5.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getCallEvents5.');
            }
            const localVarPath = `/api/v2/klay/call-events`;
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
        getValueTransferEvents7: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getValueTransferEvents7.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getValueTransferEvents7.');
            }
            const localVarPath = `/api/v2/klay/value-transfer-events`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
exports.KlayEventControllerApiFp = function (configuration) {
    return {
        async getCallEvents5(pageable, specs, options) {
            const localVarAxiosArgs = await exports.KlayEventControllerApiAxiosParamCreator(configuration).getCallEvents5(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getValueTransferEvents7(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.KlayEventControllerApiAxiosParamCreator(configuration).getValueTransferEvents7(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.KlayEventControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getCallEvents5(pageable, specs, options) {
            return exports.KlayEventControllerApiFp(configuration).getCallEvents5(pageable, specs, options).then((request) => request(axios, basePath));
        },
        getValueTransferEvents7(pageable, searchCondition, options) {
            return exports.KlayEventControllerApiFp(configuration).getValueTransferEvents7(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class KlayEventControllerApi extends base_1.BaseAPI {
    getCallEvents5(pageable, specs, options) {
        return exports.KlayEventControllerApiFp(this.configuration).getCallEvents5(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getValueTransferEvents7(pageable, searchCondition, options) {
        return exports.KlayEventControllerApiFp(this.configuration).getValueTransferEvents7(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.KlayEventControllerApi = KlayEventControllerApi;
exports.KlayGasPriceControllerApiAxiosParamCreator = function (configuration) {
    return {
        getGasPrice2: async (options = {}) => {
            const localVarPath = `/api/v2/klay/gas-price`;
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
exports.KlayGasPriceControllerApiFp = function (configuration) {
    return {
        async getGasPrice2(options) {
            const localVarAxiosArgs = await exports.KlayGasPriceControllerApiAxiosParamCreator(configuration).getGasPrice2(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.KlayGasPriceControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getGasPrice2(options) {
            return exports.KlayGasPriceControllerApiFp(configuration).getGasPrice2(options).then((request) => request(axios, basePath));
        },
    };
};
class KlayGasPriceControllerApi extends base_1.BaseAPI {
    getGasPrice2(options) {
        return exports.KlayGasPriceControllerApiFp(this.configuration).getGasPrice2(options).then((request) => request(this.axios, this.basePath));
    }
}
exports.KlayGasPriceControllerApi = KlayGasPriceControllerApi;
exports.KlayHenesisKeyControllerApiAxiosParamCreator = function (configuration) {
    return {
        createExampleHenesisKey2: async (options = {}) => {
            const localVarPath = `/api/v2/klay/henesis-keys/example`;
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
        createTransaction2: async (createTransactionRequest, options = {}) => {
            if (createTransactionRequest === null || createTransactionRequest === undefined) {
                throw new base_1.RequiredError('createTransactionRequest', 'Required parameter createTransactionRequest was null or undefined when calling createTransaction2.');
            }
            const localVarPath = `/api/v2/klay/henesis-keys/transactions`;
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
        getHenesisKey2: async (options = {}) => {
            const localVarPath = `/api/v2/klay/henesis-keys/me`;
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
        getHenesisKeyBalance2: async (options = {}) => {
            const localVarPath = `/api/v2/klay/henesis-keys/balance`;
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
        getHistoriesCsv2: async (createdAtGte, createdAtLt, options = {}) => {
            if (createdAtGte === null || createdAtGte === undefined) {
                throw new base_1.RequiredError('createdAtGte', 'Required parameter createdAtGte was null or undefined when calling getHistoriesCsv2.');
            }
            if (createdAtLt === null || createdAtLt === undefined) {
                throw new base_1.RequiredError('createdAtLt', 'Required parameter createdAtLt was null or undefined when calling getHistoriesCsv2.');
            }
            const localVarPath = `/api/v2/klay/henesis-keys/histories/csv`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (createdAtGte !== undefined) {
                localVarQueryParameter['created_at_gte'] = createdAtGte;
            }
            if (createdAtLt !== undefined) {
                localVarQueryParameter['created_at_lt'] = createdAtLt;
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
        getTransactionHistories2: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getTransactionHistories2.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getTransactionHistories2.');
            }
            const localVarPath = `/api/v2/klay/henesis-keys/histories`;
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
exports.KlayHenesisKeyControllerApiFp = function (configuration) {
    return {
        async createExampleHenesisKey2(options) {
            const localVarAxiosArgs = await exports.KlayHenesisKeyControllerApiAxiosParamCreator(configuration).createExampleHenesisKey2(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createTransaction2(createTransactionRequest, options) {
            const localVarAxiosArgs = await exports.KlayHenesisKeyControllerApiAxiosParamCreator(configuration).createTransaction2(createTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getHenesisKey2(options) {
            const localVarAxiosArgs = await exports.KlayHenesisKeyControllerApiAxiosParamCreator(configuration).getHenesisKey2(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getHenesisKeyBalance2(options) {
            const localVarAxiosArgs = await exports.KlayHenesisKeyControllerApiAxiosParamCreator(configuration).getHenesisKeyBalance2(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getHistoriesCsv2(createdAtGte, createdAtLt, options) {
            const localVarAxiosArgs = await exports.KlayHenesisKeyControllerApiAxiosParamCreator(configuration).getHistoriesCsv2(createdAtGte, createdAtLt, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransactionHistories2(pageable, specs, options) {
            const localVarAxiosArgs = await exports.KlayHenesisKeyControllerApiAxiosParamCreator(configuration).getTransactionHistories2(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.KlayHenesisKeyControllerApiFactory = function (configuration, basePath, axios) {
    return {
        createExampleHenesisKey2(options) {
            return exports.KlayHenesisKeyControllerApiFp(configuration).createExampleHenesisKey2(options).then((request) => request(axios, basePath));
        },
        createTransaction2(createTransactionRequest, options) {
            return exports.KlayHenesisKeyControllerApiFp(configuration).createTransaction2(createTransactionRequest, options).then((request) => request(axios, basePath));
        },
        getHenesisKey2(options) {
            return exports.KlayHenesisKeyControllerApiFp(configuration).getHenesisKey2(options).then((request) => request(axios, basePath));
        },
        getHenesisKeyBalance2(options) {
            return exports.KlayHenesisKeyControllerApiFp(configuration).getHenesisKeyBalance2(options).then((request) => request(axios, basePath));
        },
        getHistoriesCsv2(createdAtGte, createdAtLt, options) {
            return exports.KlayHenesisKeyControllerApiFp(configuration).getHistoriesCsv2(createdAtGte, createdAtLt, options).then((request) => request(axios, basePath));
        },
        getTransactionHistories2(pageable, specs, options) {
            return exports.KlayHenesisKeyControllerApiFp(configuration).getTransactionHistories2(pageable, specs, options).then((request) => request(axios, basePath));
        },
    };
};
class KlayHenesisKeyControllerApi extends base_1.BaseAPI {
    createExampleHenesisKey2(options) {
        return exports.KlayHenesisKeyControllerApiFp(this.configuration).createExampleHenesisKey2(options).then((request) => request(this.axios, this.basePath));
    }
    createTransaction2(createTransactionRequest, options) {
        return exports.KlayHenesisKeyControllerApiFp(this.configuration).createTransaction2(createTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getHenesisKey2(options) {
        return exports.KlayHenesisKeyControllerApiFp(this.configuration).getHenesisKey2(options).then((request) => request(this.axios, this.basePath));
    }
    getHenesisKeyBalance2(options) {
        return exports.KlayHenesisKeyControllerApiFp(this.configuration).getHenesisKeyBalance2(options).then((request) => request(this.axios, this.basePath));
    }
    getHistoriesCsv2(createdAtGte, createdAtLt, options) {
        return exports.KlayHenesisKeyControllerApiFp(this.configuration).getHistoriesCsv2(createdAtGte, createdAtLt, options).then((request) => request(this.axios, this.basePath));
    }
    getTransactionHistories2(pageable, specs, options) {
        return exports.KlayHenesisKeyControllerApiFp(this.configuration).getTransactionHistories2(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.KlayHenesisKeyControllerApi = KlayHenesisKeyControllerApi;
exports.KlayInternalControllerApiAxiosParamCreator = function (configuration) {
    return {
        getCallEvents4: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getCallEvents4.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getCallEvents4.');
            }
            const localVarPath = `/api/v2/klay/internal/call-events`;
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
        getValueTransferEvents6: async (pageable, searchCondition, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getValueTransferEvents6.');
            }
            if (searchCondition === null || searchCondition === undefined) {
                throw new base_1.RequiredError('searchCondition', 'Required parameter searchCondition was null or undefined when calling getValueTransferEvents6.');
            }
            const localVarPath = `/api/v2/klay/internal/value-transfer-events`;
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
            if (searchCondition !== undefined) {
                localVarQueryParameter['searchCondition'] = searchCondition;
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
exports.KlayInternalControllerApiFp = function (configuration) {
    return {
        async getCallEvents4(pageable, specs, options) {
            const localVarAxiosArgs = await exports.KlayInternalControllerApiAxiosParamCreator(configuration).getCallEvents4(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getValueTransferEvents6(pageable, searchCondition, options) {
            const localVarAxiosArgs = await exports.KlayInternalControllerApiAxiosParamCreator(configuration).getValueTransferEvents6(pageable, searchCondition, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.KlayInternalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getCallEvents4(pageable, specs, options) {
            return exports.KlayInternalControllerApiFp(configuration).getCallEvents4(pageable, specs, options).then((request) => request(axios, basePath));
        },
        getValueTransferEvents6(pageable, searchCondition, options) {
            return exports.KlayInternalControllerApiFp(configuration).getValueTransferEvents6(pageable, searchCondition, options).then((request) => request(axios, basePath));
        },
    };
};
class KlayInternalControllerApi extends base_1.BaseAPI {
    getCallEvents4(pageable, specs, options) {
        return exports.KlayInternalControllerApiFp(this.configuration).getCallEvents4(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getValueTransferEvents6(pageable, searchCondition, options) {
        return exports.KlayInternalControllerApiFp(this.configuration).getValueTransferEvents6(pageable, searchCondition, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.KlayInternalControllerApi = KlayInternalControllerApi;
exports.KlayMethodGasUsageControllerApiAxiosParamCreator = function (configuration) {
    return {
        getMethodGasUsages2: async (name, options = {}) => {
            if (name === null || name === undefined) {
                throw new base_1.RequiredError('name', 'Required parameter name was null or undefined when calling getMethodGasUsages2.');
            }
            const localVarPath = `/api/v2/klay/method-gas-usages`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
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
exports.KlayMethodGasUsageControllerApiFp = function (configuration) {
    return {
        async getMethodGasUsages2(name, options) {
            const localVarAxiosArgs = await exports.KlayMethodGasUsageControllerApiAxiosParamCreator(configuration).getMethodGasUsages2(name, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.KlayMethodGasUsageControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getMethodGasUsages2(name, options) {
            return exports.KlayMethodGasUsageControllerApiFp(configuration).getMethodGasUsages2(name, options).then((request) => request(axios, basePath));
        },
    };
};
class KlayMethodGasUsageControllerApi extends base_1.BaseAPI {
    getMethodGasUsages2(name, options) {
        return exports.KlayMethodGasUsageControllerApiFp(this.configuration).getMethodGasUsages2(name, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.KlayMethodGasUsageControllerApi = KlayMethodGasUsageControllerApi;
exports.KlayOperationControllerApiAxiosParamCreator = function (configuration) {
    return {
        bindHenesisKeyToWallet2: async (keyId, bindHenesisKeyToWalletRequest, options = {}) => {
            if (keyId === null || keyId === undefined) {
                throw new base_1.RequiredError('keyId', 'Required parameter keyId was null or undefined when calling bindHenesisKeyToWallet2.');
            }
            if (bindHenesisKeyToWalletRequest === null || bindHenesisKeyToWalletRequest === undefined) {
                throw new base_1.RequiredError('bindHenesisKeyToWalletRequest', 'Required parameter bindHenesisKeyToWalletRequest was null or undefined when calling bindHenesisKeyToWallet2.');
            }
            const localVarPath = `/api/v2/klay/operation/henesis-keys/{keyId}/bind`
                .replace(`{${"keyId"}}`, encodeURIComponent(String(keyId)));
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
            const needsSerialization = (typeof bindHenesisKeyToWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(bindHenesisKeyToWalletRequest !== undefined ? bindHenesisKeyToWalletRequest : {}) : (bindHenesisKeyToWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createHenesisKey2: async (createHenesisKeyRequest, options = {}) => {
            if (createHenesisKeyRequest === null || createHenesisKeyRequest === undefined) {
                throw new base_1.RequiredError('createHenesisKeyRequest', 'Required parameter createHenesisKeyRequest was null or undefined when calling createHenesisKey2.');
            }
            const localVarPath = `/api/v2/klay/operation/henesis-keys`;
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
        getCoinByAddress1: async (address, options = {}) => {
            if (address === null || address === undefined) {
                throw new base_1.RequiredError('address', 'Required parameter address was null or undefined when calling getCoinByAddress1.');
            }
            const localVarPath = `/api/v2/klay/operation/coins/address/{address}`
                .replace(`{${"address"}}`, encodeURIComponent(String(address)));
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
exports.KlayOperationControllerApiFp = function (configuration) {
    return {
        async bindHenesisKeyToWallet2(keyId, bindHenesisKeyToWalletRequest, options) {
            const localVarAxiosArgs = await exports.KlayOperationControllerApiAxiosParamCreator(configuration).bindHenesisKeyToWallet2(keyId, bindHenesisKeyToWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createHenesisKey2(createHenesisKeyRequest, options) {
            const localVarAxiosArgs = await exports.KlayOperationControllerApiAxiosParamCreator(configuration).createHenesisKey2(createHenesisKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getCoinByAddress1(address, options) {
            const localVarAxiosArgs = await exports.KlayOperationControllerApiAxiosParamCreator(configuration).getCoinByAddress1(address, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.KlayOperationControllerApiFactory = function (configuration, basePath, axios) {
    return {
        bindHenesisKeyToWallet2(keyId, bindHenesisKeyToWalletRequest, options) {
            return exports.KlayOperationControllerApiFp(configuration).bindHenesisKeyToWallet2(keyId, bindHenesisKeyToWalletRequest, options).then((request) => request(axios, basePath));
        },
        createHenesisKey2(createHenesisKeyRequest, options) {
            return exports.KlayOperationControllerApiFp(configuration).createHenesisKey2(createHenesisKeyRequest, options).then((request) => request(axios, basePath));
        },
        getCoinByAddress1(address, options) {
            return exports.KlayOperationControllerApiFp(configuration).getCoinByAddress1(address, options).then((request) => request(axios, basePath));
        },
    };
};
class KlayOperationControllerApi extends base_1.BaseAPI {
    bindHenesisKeyToWallet2(keyId, bindHenesisKeyToWalletRequest, options) {
        return exports.KlayOperationControllerApiFp(this.configuration).bindHenesisKeyToWallet2(keyId, bindHenesisKeyToWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createHenesisKey2(createHenesisKeyRequest, options) {
        return exports.KlayOperationControllerApiFp(this.configuration).createHenesisKey2(createHenesisKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getCoinByAddress1(address, options) {
        return exports.KlayOperationControllerApiFp(this.configuration).getCoinByAddress1(address, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.KlayOperationControllerApi = KlayOperationControllerApi;
exports.KlayTransactionControllerApiAxiosParamCreator = function (configuration) {
    return {
        getAllTransactions2: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllTransactions2.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getAllTransactions2.');
            }
            const localVarPath = `/api/v2/klay/transactions`;
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
        getRawTransactionByHash2: async (transactionHash, options = {}) => {
            if (transactionHash === null || transactionHash === undefined) {
                throw new base_1.RequiredError('transactionHash', 'Required parameter transactionHash was null or undefined when calling getRawTransactionByHash2.');
            }
            const localVarPath = `/api/v2/klay/raw-transactions/{transactionHash}`
                .replace(`{${"transactionHash"}}`, encodeURIComponent(String(transactionHash)));
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
        getTransactionById2: async (transactionId, options = {}) => {
            if (transactionId === null || transactionId === undefined) {
                throw new base_1.RequiredError('transactionId', 'Required parameter transactionId was null or undefined when calling getTransactionById2.');
            }
            const localVarPath = `/api/v2/klay/transactions/{transactionId}`
                .replace(`{${"transactionId"}}`, encodeURIComponent(String(transactionId)));
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
exports.KlayTransactionControllerApiFp = function (configuration) {
    return {
        async getAllTransactions2(pageable, specs, options) {
            const localVarAxiosArgs = await exports.KlayTransactionControllerApiAxiosParamCreator(configuration).getAllTransactions2(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getRawTransactionByHash2(transactionHash, options) {
            const localVarAxiosArgs = await exports.KlayTransactionControllerApiAxiosParamCreator(configuration).getRawTransactionByHash2(transactionHash, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransactionById2(transactionId, options) {
            const localVarAxiosArgs = await exports.KlayTransactionControllerApiAxiosParamCreator(configuration).getTransactionById2(transactionId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.KlayTransactionControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getAllTransactions2(pageable, specs, options) {
            return exports.KlayTransactionControllerApiFp(configuration).getAllTransactions2(pageable, specs, options).then((request) => request(axios, basePath));
        },
        getRawTransactionByHash2(transactionHash, options) {
            return exports.KlayTransactionControllerApiFp(configuration).getRawTransactionByHash2(transactionHash, options).then((request) => request(axios, basePath));
        },
        getTransactionById2(transactionId, options) {
            return exports.KlayTransactionControllerApiFp(configuration).getTransactionById2(transactionId, options).then((request) => request(axios, basePath));
        },
    };
};
class KlayTransactionControllerApi extends base_1.BaseAPI {
    getAllTransactions2(pageable, specs, options) {
        return exports.KlayTransactionControllerApiFp(this.configuration).getAllTransactions2(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getRawTransactionByHash2(transactionHash, options) {
        return exports.KlayTransactionControllerApiFp(this.configuration).getRawTransactionByHash2(transactionHash, options).then((request) => request(this.axios, this.basePath));
    }
    getTransactionById2(transactionId, options) {
        return exports.KlayTransactionControllerApiFp(this.configuration).getTransactionById2(transactionId, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.KlayTransactionControllerApi = KlayTransactionControllerApi;
exports.KlayWalletControllerApiAxiosParamCreator = function (configuration) {
    return {
        activateAllowedAddresses2: async (walletId, activateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling activateAllowedAddresses2.');
            }
            if (activateAllowedAddressesRequest === null || activateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('activateAllowedAddressesRequest', 'Required parameter activateAllowedAddressesRequest was null or undefined when calling activateAllowedAddresses2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/activate-allowed-addresses`
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
            const localVarPath = `/api/v2/klay/wallets/{walletId}/activate`
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
        createAllowedAddress2: async (walletId, createAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createAllowedAddress2.');
            }
            if (createAllowedAddressRequest === null || createAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('createAllowedAddressRequest', 'Required parameter createAllowedAddressRequest was null or undefined when calling createAllowedAddress2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/allowed-addresses`
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
        createMasterWallet3: async (createInactiveMasterWalletRequest, options = {}) => {
            if (createInactiveMasterWalletRequest === null || createInactiveMasterWalletRequest === undefined) {
                throw new base_1.RequiredError('createInactiveMasterWalletRequest', 'Required parameter createInactiveMasterWalletRequest was null or undefined when calling createMasterWallet3.');
            }
            const localVarPath = `/api/v2/klay/wallets`;
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
        createUserWallet2: async (walletId, createUserWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createUserWallet2.');
            }
            if (createUserWalletRequest === null || createUserWalletRequest === undefined) {
                throw new base_1.RequiredError('createUserWalletRequest', 'Required parameter createUserWalletRequest was null or undefined when calling createUserWallet2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/user-wallets`
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
            const needsSerialization = (typeof createUserWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createUserWalletRequest !== undefined ? createUserWalletRequest : {}) : (createUserWalletRequest || "");
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
            const localVarPath = `/api/v2/klay/wallets/{walletId}/withdrawal-policies`
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
            const localVarPath = `/api/v2/klay/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
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
        getAllWalletWithdrawalPolicies2: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllWalletWithdrawalPolicies2.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllWalletWithdrawalPolicies2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/withdrawal-policies`
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
        getAllowedAddress2: async (walletId, allowedAddressId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddress2.');
            }
            if (allowedAddressId === null || allowedAddressId === undefined) {
                throw new base_1.RequiredError('allowedAddressId', 'Required parameter allowedAddressId was null or undefined when calling getAllowedAddress2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/allowed-addresses/{allowedAddressId}`
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
        getAllowedAddressesByCoinId3: async (walletId, coinId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getAllowedAddressesByCoinId3.');
            }
            if (coinId === null || coinId === undefined) {
                throw new base_1.RequiredError('coinId', 'Required parameter coinId was null or undefined when calling getAllowedAddressesByCoinId3.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllowedAddressesByCoinId3.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/allowed-addresses`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (coinId !== undefined) {
                localVarQueryParameter['coin_id'] = coinId;
            }
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
        getMasterWallet2: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWallet2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}`
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
        getMasterWalletAccountKey2: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletAccountKey2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/account-key`
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
        getMasterWalletBalance2: async (walletId, symbol, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletBalance2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/balance`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (symbol !== undefined) {
                localVarQueryParameter['symbol'] = symbol;
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
        getMasterWalletInitialKey2: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletInitialKey2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/initial-key`
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
        getMasterWalletNonce1: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletNonce1.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/nonce`
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
        getMasterWallets4: async (sort, options = {}) => {
            if (sort === null || sort === undefined) {
                throw new base_1.RequiredError('sort', 'Required parameter sort was null or undefined when calling getMasterWallets4.');
            }
            const localVarPath = `/api/v2/klay/wallets`;
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
        getUserWallet2: async (walletId, userWalletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWallet2.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling getUserWallet2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/user-wallets/{userWalletId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
        getUserWalletBalance2: async (walletId, userWalletId, symbol, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWalletBalance2.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling getUserWalletBalance2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/user-wallets/{userWalletId}/balance`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (symbol !== undefined) {
                localVarQueryParameter['symbol'] = symbol;
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
        getUserWalletNonce1: async (walletId, userWalletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWalletNonce1.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling getUserWalletNonce1.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/user-wallets/{userWalletId}/nonce`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
        getUserWallets4: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWallets4.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getUserWallets4.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/user-wallets`
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
        inactivateAllowedAddresses2: async (walletId, inactivateAllowedAddressesRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling inactivateAllowedAddresses2.');
            }
            if (inactivateAllowedAddressesRequest === null || inactivateAllowedAddressesRequest === undefined) {
                throw new base_1.RequiredError('inactivateAllowedAddressesRequest', 'Required parameter inactivateAllowedAddressesRequest was null or undefined when calling inactivateAllowedAddresses2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/inactivate-allowed-addresses`
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
        patchAccountKey2: async (walletId, updateAccountKeyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchAccountKey2.');
            }
            if (updateAccountKeyRequest === null || updateAccountKeyRequest === undefined) {
                throw new base_1.RequiredError('updateAccountKeyRequest', 'Required parameter updateAccountKeyRequest was null or undefined when calling patchAccountKey2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/account-key`
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
            const needsSerialization = (typeof updateAccountKeyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateAccountKeyRequest !== undefined ? updateAccountKeyRequest : {}) : (updateAccountKeyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchMasterWalletName2: async (walletId, changeWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletName2.');
            }
            if (changeWalletNameRequest === null || changeWalletNameRequest === undefined) {
                throw new base_1.RequiredError('changeWalletNameRequest', 'Required parameter changeWalletNameRequest was null or undefined when calling patchMasterWalletName2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/name`
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
            const needsSerialization = (typeof changeWalletNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(changeWalletNameRequest !== undefined ? changeWalletNameRequest : {}) : (changeWalletNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchUserWalletName2: async (walletId, userWalletId, changeWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchUserWalletName2.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling patchUserWalletName2.');
            }
            if (changeWalletNameRequest === null || changeWalletNameRequest === undefined) {
                throw new base_1.RequiredError('changeWalletNameRequest', 'Required parameter changeWalletNameRequest was null or undefined when calling patchUserWalletName2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/user-wallets/{userWalletId}/name`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
            const needsSerialization = (typeof changeWalletNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(changeWalletNameRequest !== undefined ? changeWalletNameRequest : {}) : (changeWalletNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchWalletWithdrawalPolicy2: async (walletId, policyId, patchWithdrawalPolicyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchWalletWithdrawalPolicy2.');
            }
            if (policyId === null || policyId === undefined) {
                throw new base_1.RequiredError('policyId', 'Required parameter policyId was null or undefined when calling patchWalletWithdrawalPolicy2.');
            }
            if (patchWithdrawalPolicyRequest === null || patchWithdrawalPolicyRequest === undefined) {
                throw new base_1.RequiredError('patchWithdrawalPolicyRequest', 'Required parameter patchWithdrawalPolicyRequest was null or undefined when calling patchWalletWithdrawalPolicy2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/withdrawal-policies/{policyId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"policyId"}}`, encodeURIComponent(String(policyId)));
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
        recreateMasterWallet2: async (walletId, recreateWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling recreateMasterWallet2.');
            }
            if (recreateWalletRequest === null || recreateWalletRequest === undefined) {
                throw new base_1.RequiredError('recreateWalletRequest', 'Required parameter recreateWalletRequest was null or undefined when calling recreateMasterWallet2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/recreate`
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
            const needsSerialization = (typeof recreateWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(recreateWalletRequest !== undefined ? recreateWalletRequest : {}) : (recreateWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        recreateUserWallet2: async (walletId, userWalletId, recreateWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling recreateUserWallet2.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling recreateUserWallet2.');
            }
            if (recreateWalletRequest === null || recreateWalletRequest === undefined) {
                throw new base_1.RequiredError('recreateWalletRequest', 'Required parameter recreateWalletRequest was null or undefined when calling recreateUserWallet2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/user-wallets/{userWalletId}/recreate`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
            const needsSerialization = (typeof recreateWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(recreateWalletRequest !== undefined ? recreateWalletRequest : {}) : (recreateWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        resendTransaction2: async (resendTransactionRequest, options = {}) => {
            if (resendTransactionRequest === null || resendTransactionRequest === undefined) {
                throw new base_1.RequiredError('resendTransactionRequest', 'Required parameter resendTransactionRequest was null or undefined when calling resendTransaction2.');
            }
            const localVarPath = `/api/v2/klay/wallets/transactions/resend`;
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
            const needsSerialization = (typeof resendTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(resendTransactionRequest !== undefined ? resendTransactionRequest : {}) : (resendTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        sendBatchTransaction2: async (createBatchTransactionRequest, options = {}) => {
            if (createBatchTransactionRequest === null || createBatchTransactionRequest === undefined) {
                throw new base_1.RequiredError('createBatchTransactionRequest', 'Required parameter createBatchTransactionRequest was null or undefined when calling sendBatchTransaction2.');
            }
            const localVarPath = `/api/v2/klay/wallets/batch-transactions`;
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
            const needsSerialization = (typeof createBatchTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createBatchTransactionRequest !== undefined ? createBatchTransactionRequest : {}) : (createBatchTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        sendTransaction2: async (createMultiSigTransactionRequest, options = {}) => {
            if (createMultiSigTransactionRequest === null || createMultiSigTransactionRequest === undefined) {
                throw new base_1.RequiredError('createMultiSigTransactionRequest', 'Required parameter createMultiSigTransactionRequest was null or undefined when calling sendTransaction2.');
            }
            const localVarPath = `/api/v2/klay/wallets/transactions`;
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
        validateIsAllowedAddress2: async (walletId, validateIsAllowedAddressRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling validateIsAllowedAddress2.');
            }
            if (validateIsAllowedAddressRequest === null || validateIsAllowedAddressRequest === undefined) {
                throw new base_1.RequiredError('validateIsAllowedAddressRequest', 'Required parameter validateIsAllowedAddressRequest was null or undefined when calling validateIsAllowedAddress2.');
            }
            const localVarPath = `/api/v2/klay/wallets/{walletId}/allowed-addresses/validate`
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
exports.KlayWalletControllerApiFp = function (configuration) {
    return {
        async activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async activateMasterWallet2(walletId, activateMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).activateMasterWallet2(walletId, activateMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createAllowedAddress2(walletId, createAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).createAllowedAddress2(walletId, createAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createMasterWallet3(createInactiveMasterWalletRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).createMasterWallet3(createInactiveMasterWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createUserWallet2(walletId, createUserWalletRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).createUserWallet2(walletId, createUserWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllWalletWithdrawalPolicies2(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getAllWalletWithdrawalPolicies2(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddress2(walletId, allowedAddressId, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getAllowedAddress2(walletId, allowedAddressId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedAddressesByCoinId3(walletId, coinId, pageable, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getAllowedAddressesByCoinId3(walletId, coinId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallet2(walletId, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getMasterWallet2(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletAccountKey2(walletId, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getMasterWalletAccountKey2(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletBalance2(walletId, symbol, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getMasterWalletBalance2(walletId, symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletInitialKey2(walletId, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getMasterWalletInitialKey2(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletNonce1(walletId, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getMasterWalletNonce1(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets4(sort, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getMasterWallets4(sort, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWallet2(walletId, userWalletId, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getUserWallet2(walletId, userWalletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWalletBalance2(walletId, userWalletId, symbol, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getUserWalletBalance2(walletId, userWalletId, symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWalletNonce1(walletId, userWalletId, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getUserWalletNonce1(walletId, userWalletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWallets4(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).getUserWallets4(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchAccountKey2(walletId, updateAccountKeyRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).patchAccountKey2(walletId, updateAccountKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletName2(walletId, changeWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).patchMasterWalletName2(walletId, changeWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchUserWalletName2(walletId, userWalletId, changeWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).patchUserWalletName2(walletId, userWalletId, changeWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchWalletWithdrawalPolicy2(walletId, policyId, patchWithdrawalPolicyRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).patchWalletWithdrawalPolicy2(walletId, policyId, patchWithdrawalPolicyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async recreateMasterWallet2(walletId, recreateWalletRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).recreateMasterWallet2(walletId, recreateWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async recreateUserWallet2(walletId, userWalletId, recreateWalletRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).recreateUserWallet2(walletId, userWalletId, recreateWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async resendTransaction2(resendTransactionRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).resendTransaction2(resendTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendBatchTransaction2(createBatchTransactionRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).sendBatchTransaction2(createBatchTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendTransaction2(createMultiSigTransactionRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).sendTransaction2(createMultiSigTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options) {
            const localVarAxiosArgs = await exports.KlayWalletControllerApiAxiosParamCreator(configuration).validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.KlayWalletControllerApiFactory = function (configuration, basePath, axios) {
    return {
        activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        activateMasterWallet2(walletId, activateMasterWalletRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).activateMasterWallet2(walletId, activateMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        createAllowedAddress2(walletId, createAllowedAddressRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).createAllowedAddress2(walletId, createAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        createMasterWallet3(createInactiveMasterWalletRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).createMasterWallet3(createInactiveMasterWalletRequest, options).then((request) => request(axios, basePath));
        },
        createUserWallet2(walletId, createUserWalletRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).createUserWallet2(walletId, createUserWalletRequest, options).then((request) => request(axios, basePath));
        },
        createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
        getAllWalletWithdrawalPolicies2(walletId, pageable, options) {
            return exports.KlayWalletControllerApiFp(configuration).getAllWalletWithdrawalPolicies2(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        getAllowedAddress2(walletId, allowedAddressId, options) {
            return exports.KlayWalletControllerApiFp(configuration).getAllowedAddress2(walletId, allowedAddressId, options).then((request) => request(axios, basePath));
        },
        getAllowedAddressesByCoinId3(walletId, coinId, pageable, options) {
            return exports.KlayWalletControllerApiFp(configuration).getAllowedAddressesByCoinId3(walletId, coinId, pageable, options).then((request) => request(axios, basePath));
        },
        getMasterWallet2(walletId, options) {
            return exports.KlayWalletControllerApiFp(configuration).getMasterWallet2(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletAccountKey2(walletId, options) {
            return exports.KlayWalletControllerApiFp(configuration).getMasterWalletAccountKey2(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletBalance2(walletId, symbol, options) {
            return exports.KlayWalletControllerApiFp(configuration).getMasterWalletBalance2(walletId, symbol, options).then((request) => request(axios, basePath));
        },
        getMasterWalletInitialKey2(walletId, options) {
            return exports.KlayWalletControllerApiFp(configuration).getMasterWalletInitialKey2(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletNonce1(walletId, options) {
            return exports.KlayWalletControllerApiFp(configuration).getMasterWalletNonce1(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWallets4(sort, options) {
            return exports.KlayWalletControllerApiFp(configuration).getMasterWallets4(sort, options).then((request) => request(axios, basePath));
        },
        getUserWallet2(walletId, userWalletId, options) {
            return exports.KlayWalletControllerApiFp(configuration).getUserWallet2(walletId, userWalletId, options).then((request) => request(axios, basePath));
        },
        getUserWalletBalance2(walletId, userWalletId, symbol, options) {
            return exports.KlayWalletControllerApiFp(configuration).getUserWalletBalance2(walletId, userWalletId, symbol, options).then((request) => request(axios, basePath));
        },
        getUserWalletNonce1(walletId, userWalletId, options) {
            return exports.KlayWalletControllerApiFp(configuration).getUserWalletNonce1(walletId, userWalletId, options).then((request) => request(axios, basePath));
        },
        getUserWallets4(walletId, pageable, options) {
            return exports.KlayWalletControllerApiFp(configuration).getUserWallets4(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(axios, basePath));
        },
        patchAccountKey2(walletId, updateAccountKeyRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).patchAccountKey2(walletId, updateAccountKeyRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletName2(walletId, changeWalletNameRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).patchMasterWalletName2(walletId, changeWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchUserWalletName2(walletId, userWalletId, changeWalletNameRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).patchUserWalletName2(walletId, userWalletId, changeWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchWalletWithdrawalPolicy2(walletId, policyId, patchWithdrawalPolicyRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).patchWalletWithdrawalPolicy2(walletId, policyId, patchWithdrawalPolicyRequest, options).then((request) => request(axios, basePath));
        },
        recreateMasterWallet2(walletId, recreateWalletRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).recreateMasterWallet2(walletId, recreateWalletRequest, options).then((request) => request(axios, basePath));
        },
        recreateUserWallet2(walletId, userWalletId, recreateWalletRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).recreateUserWallet2(walletId, userWalletId, recreateWalletRequest, options).then((request) => request(axios, basePath));
        },
        resendTransaction2(resendTransactionRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).resendTransaction2(resendTransactionRequest, options).then((request) => request(axios, basePath));
        },
        sendBatchTransaction2(createBatchTransactionRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).sendBatchTransaction2(createBatchTransactionRequest, options).then((request) => request(axios, basePath));
        },
        sendTransaction2(createMultiSigTransactionRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).sendTransaction2(createMultiSigTransactionRequest, options).then((request) => request(axios, basePath));
        },
        validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options) {
            return exports.KlayWalletControllerApiFp(configuration).validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class KlayWalletControllerApi extends base_1.BaseAPI {
    activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).activateAllowedAddresses2(walletId, activateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    activateMasterWallet2(walletId, activateMasterWalletRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).activateMasterWallet2(walletId, activateMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createAllowedAddress2(walletId, createAllowedAddressRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).createAllowedAddress2(walletId, createAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createMasterWallet3(createInactiveMasterWalletRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).createMasterWallet3(createInactiveMasterWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createUserWallet2(walletId, createUserWalletRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).createUserWallet2(walletId, createUserWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).createWalletWithdrawalPolicy2(walletId, createWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).deleteAllowedAddress2(walletId, allowedAddressId, deleteAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getAllWalletWithdrawalPolicies2(walletId, pageable, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getAllWalletWithdrawalPolicies2(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddress2(walletId, allowedAddressId, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getAllowedAddress2(walletId, allowedAddressId, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedAddressesByCoinId3(walletId, coinId, pageable, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getAllowedAddressesByCoinId3(walletId, coinId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallet2(walletId, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getMasterWallet2(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletAccountKey2(walletId, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getMasterWalletAccountKey2(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletBalance2(walletId, symbol, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getMasterWalletBalance2(walletId, symbol, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletInitialKey2(walletId, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getMasterWalletInitialKey2(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletNonce1(walletId, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getMasterWalletNonce1(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets4(sort, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getMasterWallets4(sort, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWallet2(walletId, userWalletId, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getUserWallet2(walletId, userWalletId, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWalletBalance2(walletId, userWalletId, symbol, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getUserWalletBalance2(walletId, userWalletId, symbol, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWalletNonce1(walletId, userWalletId, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getUserWalletNonce1(walletId, userWalletId, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWallets4(walletId, pageable, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).getUserWallets4(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).inactivateAllowedAddresses2(walletId, inactivateAllowedAddressesRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchAccountKey2(walletId, updateAccountKeyRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).patchAccountKey2(walletId, updateAccountKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletName2(walletId, changeWalletNameRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).patchMasterWalletName2(walletId, changeWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchUserWalletName2(walletId, userWalletId, changeWalletNameRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).patchUserWalletName2(walletId, userWalletId, changeWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchWalletWithdrawalPolicy2(walletId, policyId, patchWithdrawalPolicyRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).patchWalletWithdrawalPolicy2(walletId, policyId, patchWithdrawalPolicyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    recreateMasterWallet2(walletId, recreateWalletRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).recreateMasterWallet2(walletId, recreateWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    recreateUserWallet2(walletId, userWalletId, recreateWalletRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).recreateUserWallet2(walletId, userWalletId, recreateWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    resendTransaction2(resendTransactionRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).resendTransaction2(resendTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendBatchTransaction2(createBatchTransactionRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).sendBatchTransaction2(createBatchTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendTransaction2(createMultiSigTransactionRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).sendTransaction2(createMultiSigTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options) {
        return exports.KlayWalletControllerApiFp(this.configuration).validateIsAllowedAddress2(walletId, validateIsAllowedAddressRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.KlayWalletControllerApi = KlayWalletControllerApi;
exports.KlayWithdrawalApprovalControllerApiAxiosParamCreator = function (configuration) {
    return {
        approveWithdrawalApproval2: async (withdrawalApprovalId, approveWithdrawalApprovalRequest, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling approveWithdrawalApproval2.');
            }
            if (approveWithdrawalApprovalRequest === null || approveWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('approveWithdrawalApprovalRequest', 'Required parameter approveWithdrawalApprovalRequest was null or undefined when calling approveWithdrawalApproval2.');
            }
            const localVarPath = `/api/v2/klay/withdrawal-approvals/{withdrawalApprovalId}/approve`
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
            const localVarPath = `/api/v2/klay/withdrawal-approvals/{withdrawalApprovalId}/reject`
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
exports.KlayWithdrawalApprovalControllerApiFp = function (configuration) {
    return {
        async approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.KlayWithdrawalApprovalControllerApiAxiosParamCreator(configuration).approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.KlayWithdrawalApprovalControllerApiAxiosParamCreator(configuration).rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.KlayWithdrawalApprovalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
            return exports.KlayWithdrawalApprovalControllerApiFp(configuration).approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
        rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
            return exports.KlayWithdrawalApprovalControllerApiFp(configuration).rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class KlayWithdrawalApprovalControllerApi extends base_1.BaseAPI {
    approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options) {
        return exports.KlayWithdrawalApprovalControllerApiFp(this.configuration).approveWithdrawalApproval2(withdrawalApprovalId, approveWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
    rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options) {
        return exports.KlayWithdrawalApprovalControllerApiFp(this.configuration).rejectWithdrawalApproval2(withdrawalApprovalId, rejectWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.KlayWithdrawalApprovalControllerApi = KlayWithdrawalApprovalControllerApi;
exports.MethodGasUsageControllerApiAxiosParamCreator = function (configuration) {
    return {
        getMethodGasUsages3: async (blockchain, name, options = {}) => {
            const localVarPath = `/api/v1/method-gas-usages`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (blockchain !== undefined) {
                localVarQueryParameter['blockchain'] = blockchain;
            }
            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
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
exports.MethodGasUsageControllerApiFp = function (configuration) {
    return {
        async getMethodGasUsages3(blockchain, name, options) {
            const localVarAxiosArgs = await exports.MethodGasUsageControllerApiAxiosParamCreator(configuration).getMethodGasUsages3(blockchain, name, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.MethodGasUsageControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getMethodGasUsages3(blockchain, name, options) {
            return exports.MethodGasUsageControllerApiFp(configuration).getMethodGasUsages3(blockchain, name, options).then((request) => request(axios, basePath));
        },
    };
};
class MethodGasUsageControllerApi extends base_1.BaseAPI {
    getMethodGasUsages3(blockchain, name, options) {
        return exports.MethodGasUsageControllerApiFp(this.configuration).getMethodGasUsages3(blockchain, name, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.MethodGasUsageControllerApi = MethodGasUsageControllerApi;
exports.TransactionControllerApiAxiosParamCreator = function (configuration) {
    return {
        getAllTransactions3: async (pageable, specs, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllTransactions3.');
            }
            if (specs === null || specs === undefined) {
                throw new base_1.RequiredError('specs', 'Required parameter specs was null or undefined when calling getAllTransactions3.');
            }
            const localVarPath = `/api/v1/transactions`;
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
        getTransactionById3: async (blockchain, transactionId, options = {}) => {
            if (blockchain === null || blockchain === undefined) {
                throw new base_1.RequiredError('blockchain', 'Required parameter blockchain was null or undefined when calling getTransactionById3.');
            }
            if (transactionId === null || transactionId === undefined) {
                throw new base_1.RequiredError('transactionId', 'Required parameter transactionId was null or undefined when calling getTransactionById3.');
            }
            const localVarPath = `/api/v1/transactions/{transactionId}`
                .replace(`{${"transactionId"}}`, encodeURIComponent(String(transactionId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (blockchain !== undefined) {
                localVarQueryParameter['blockchain'] = blockchain;
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
exports.TransactionControllerApiFp = function (configuration) {
    return {
        async getAllTransactions3(pageable, specs, options) {
            const localVarAxiosArgs = await exports.TransactionControllerApiAxiosParamCreator(configuration).getAllTransactions3(pageable, specs, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getTransactionById3(blockchain, transactionId, options) {
            const localVarAxiosArgs = await exports.TransactionControllerApiAxiosParamCreator(configuration).getTransactionById3(blockchain, transactionId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.TransactionControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getAllTransactions3(pageable, specs, options) {
            return exports.TransactionControllerApiFp(configuration).getAllTransactions3(pageable, specs, options).then((request) => request(axios, basePath));
        },
        getTransactionById3(blockchain, transactionId, options) {
            return exports.TransactionControllerApiFp(configuration).getTransactionById3(blockchain, transactionId, options).then((request) => request(axios, basePath));
        },
    };
};
class TransactionControllerApi extends base_1.BaseAPI {
    getAllTransactions3(pageable, specs, options) {
        return exports.TransactionControllerApiFp(this.configuration).getAllTransactions3(pageable, specs, options).then((request) => request(this.axios, this.basePath));
    }
    getTransactionById3(blockchain, transactionId, options) {
        return exports.TransactionControllerApiFp(this.configuration).getTransactionById3(blockchain, transactionId, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.TransactionControllerApi = TransactionControllerApi;
exports.WalletControllerApiAxiosParamCreator = function (configuration) {
    return {
        createMasterWallet: async (createMasterWalletRequestV1, options = {}) => {
            if (createMasterWalletRequestV1 === null || createMasterWalletRequestV1 === undefined) {
                throw new base_1.RequiredError('createMasterWalletRequestV1', 'Required parameter createMasterWalletRequestV1 was null or undefined when calling createMasterWallet.');
            }
            const localVarPath = `/api/v1/wallets`;
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
            const needsSerialization = (typeof createMasterWalletRequestV1 !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createMasterWalletRequestV1 !== undefined ? createMasterWalletRequestV1 : {}) : (createMasterWalletRequestV1 || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createUserWallet3: async (walletId, createUserWalletRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling createUserWallet3.');
            }
            if (createUserWalletRequest === null || createUserWalletRequest === undefined) {
                throw new base_1.RequiredError('createUserWalletRequest', 'Required parameter createUserWalletRequest was null or undefined when calling createUserWallet3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/user-wallets`
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
            const needsSerialization = (typeof createUserWalletRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createUserWalletRequest !== undefined ? createUserWalletRequest : {}) : (createUserWalletRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getMasterWallet3: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWallet3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}`
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
        getMasterWalletAccountKey3: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletAccountKey3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/account-key`
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
        getMasterWalletBalance3: async (walletId, symbol, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletBalance3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/balance`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (symbol !== undefined) {
                localVarQueryParameter['symbol'] = symbol;
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
        getMasterWalletInitialKey3: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletInitialKey3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/initial-key`
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
        getMasterWalletNonce2: async (walletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getMasterWalletNonce2.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/nonce`
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
        getMasterWallets6: async (sort, options = {}) => {
            if (sort === null || sort === undefined) {
                throw new base_1.RequiredError('sort', 'Required parameter sort was null or undefined when calling getMasterWallets6.');
            }
            const localVarPath = `/api/v1/wallets`;
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
        getUserWallet3: async (walletId, userWalletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWallet3.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling getUserWallet3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/user-wallets/{userWalletId}`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
        getUserWalletBalance3: async (walletId, userWalletId, symbol, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWalletBalance3.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling getUserWalletBalance3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/user-wallets/{userWalletId}/balance`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (symbol !== undefined) {
                localVarQueryParameter['symbol'] = symbol;
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
        getUserWalletNonce2: async (walletId, userWalletId, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWalletNonce2.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling getUserWalletNonce2.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/user-wallets/{userWalletId}/nonce`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
        getUserWallets6: async (walletId, pageable, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling getUserWallets6.');
            }
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getUserWallets6.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/user-wallets`
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
        patchAccountKey3: async (walletId, updateAccountKeyRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchAccountKey3.');
            }
            if (updateAccountKeyRequest === null || updateAccountKeyRequest === undefined) {
                throw new base_1.RequiredError('updateAccountKeyRequest', 'Required parameter updateAccountKeyRequest was null or undefined when calling patchAccountKey3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/account-key`
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
            const needsSerialization = (typeof updateAccountKeyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateAccountKeyRequest !== undefined ? updateAccountKeyRequest : {}) : (updateAccountKeyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchMasterWalletName3: async (walletId, changeWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchMasterWalletName3.');
            }
            if (changeWalletNameRequest === null || changeWalletNameRequest === undefined) {
                throw new base_1.RequiredError('changeWalletNameRequest', 'Required parameter changeWalletNameRequest was null or undefined when calling patchMasterWalletName3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/name`
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
            const needsSerialization = (typeof changeWalletNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(changeWalletNameRequest !== undefined ? changeWalletNameRequest : {}) : (changeWalletNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchUserWalletName3: async (walletId, userWalletId, changeWalletNameRequest, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling patchUserWalletName3.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling patchUserWalletName3.');
            }
            if (changeWalletNameRequest === null || changeWalletNameRequest === undefined) {
                throw new base_1.RequiredError('changeWalletNameRequest', 'Required parameter changeWalletNameRequest was null or undefined when calling patchUserWalletName3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/user-wallets/{userWalletId}/name`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
            const needsSerialization = (typeof changeWalletNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(changeWalletNameRequest !== undefined ? changeWalletNameRequest : {}) : (changeWalletNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        recreateMasterWallet3: async (walletId, recreateWalletRequestV1, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling recreateMasterWallet3.');
            }
            if (recreateWalletRequestV1 === null || recreateWalletRequestV1 === undefined) {
                throw new base_1.RequiredError('recreateWalletRequestV1', 'Required parameter recreateWalletRequestV1 was null or undefined when calling recreateMasterWallet3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/recreate`
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
            const needsSerialization = (typeof recreateWalletRequestV1 !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(recreateWalletRequestV1 !== undefined ? recreateWalletRequestV1 : {}) : (recreateWalletRequestV1 || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        recreateUserWallet3: async (walletId, userWalletId, recreateWalletRequestV1, options = {}) => {
            if (walletId === null || walletId === undefined) {
                throw new base_1.RequiredError('walletId', 'Required parameter walletId was null or undefined when calling recreateUserWallet3.');
            }
            if (userWalletId === null || userWalletId === undefined) {
                throw new base_1.RequiredError('userWalletId', 'Required parameter userWalletId was null or undefined when calling recreateUserWallet3.');
            }
            if (recreateWalletRequestV1 === null || recreateWalletRequestV1 === undefined) {
                throw new base_1.RequiredError('recreateWalletRequestV1', 'Required parameter recreateWalletRequestV1 was null or undefined when calling recreateUserWallet3.');
            }
            const localVarPath = `/api/v1/wallets/{walletId}/user-wallets/{userWalletId}/recreate`
                .replace(`{${"walletId"}}`, encodeURIComponent(String(walletId)))
                .replace(`{${"userWalletId"}}`, encodeURIComponent(String(userWalletId)));
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
            const needsSerialization = (typeof recreateWalletRequestV1 !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(recreateWalletRequestV1 !== undefined ? recreateWalletRequestV1 : {}) : (recreateWalletRequestV1 || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        sendBatchTransaction3: async (createBatchTransactionRequest, options = {}) => {
            if (createBatchTransactionRequest === null || createBatchTransactionRequest === undefined) {
                throw new base_1.RequiredError('createBatchTransactionRequest', 'Required parameter createBatchTransactionRequest was null or undefined when calling sendBatchTransaction3.');
            }
            const localVarPath = `/api/v1/wallets/batch-transactions`;
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
            const needsSerialization = (typeof createBatchTransactionRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createBatchTransactionRequest !== undefined ? createBatchTransactionRequest : {}) : (createBatchTransactionRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        sendTransaction3: async (createMultiSigTransactionRequestV1, options = {}) => {
            if (createMultiSigTransactionRequestV1 === null || createMultiSigTransactionRequestV1 === undefined) {
                throw new base_1.RequiredError('createMultiSigTransactionRequestV1', 'Required parameter createMultiSigTransactionRequestV1 was null or undefined when calling sendTransaction3.');
            }
            const localVarPath = `/api/v1/wallets/transactions`;
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
            const needsSerialization = (typeof createMultiSigTransactionRequestV1 !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createMultiSigTransactionRequestV1 !== undefined ? createMultiSigTransactionRequestV1 : {}) : (createMultiSigTransactionRequestV1 || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.WalletControllerApiFp = function (configuration) {
    return {
        async createMasterWallet(createMasterWalletRequestV1, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createMasterWallet(createMasterWalletRequestV1, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createUserWallet3(walletId, createUserWalletRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).createUserWallet3(walletId, createUserWalletRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallet3(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWallet3(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletAccountKey3(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWalletAccountKey3(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletBalance3(walletId, symbol, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWalletBalance3(walletId, symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletInitialKey3(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWalletInitialKey3(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWalletNonce2(walletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWalletNonce2(walletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getMasterWallets6(sort, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getMasterWallets6(sort, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWallet3(walletId, userWalletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getUserWallet3(walletId, userWalletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWalletBalance3(walletId, userWalletId, symbol, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getUserWalletBalance3(walletId, userWalletId, symbol, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWalletNonce2(walletId, userWalletId, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getUserWalletNonce2(walletId, userWalletId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getUserWallets6(walletId, pageable, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).getUserWallets6(walletId, pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchAccountKey3(walletId, updateAccountKeyRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchAccountKey3(walletId, updateAccountKeyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchMasterWalletName3(walletId, changeWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchMasterWalletName3(walletId, changeWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchUserWalletName3(walletId, userWalletId, changeWalletNameRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).patchUserWalletName3(walletId, userWalletId, changeWalletNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async recreateMasterWallet3(walletId, recreateWalletRequestV1, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).recreateMasterWallet3(walletId, recreateWalletRequestV1, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async recreateUserWallet3(walletId, userWalletId, recreateWalletRequestV1, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).recreateUserWallet3(walletId, userWalletId, recreateWalletRequestV1, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendBatchTransaction3(createBatchTransactionRequest, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).sendBatchTransaction3(createBatchTransactionRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async sendTransaction3(createMultiSigTransactionRequestV1, options) {
            const localVarAxiosArgs = await exports.WalletControllerApiAxiosParamCreator(configuration).sendTransaction3(createMultiSigTransactionRequestV1, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.WalletControllerApiFactory = function (configuration, basePath, axios) {
    return {
        createMasterWallet(createMasterWalletRequestV1, options) {
            return exports.WalletControllerApiFp(configuration).createMasterWallet(createMasterWalletRequestV1, options).then((request) => request(axios, basePath));
        },
        createUserWallet3(walletId, createUserWalletRequest, options) {
            return exports.WalletControllerApiFp(configuration).createUserWallet3(walletId, createUserWalletRequest, options).then((request) => request(axios, basePath));
        },
        getMasterWallet3(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWallet3(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletAccountKey3(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWalletAccountKey3(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletBalance3(walletId, symbol, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWalletBalance3(walletId, symbol, options).then((request) => request(axios, basePath));
        },
        getMasterWalletInitialKey3(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWalletInitialKey3(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWalletNonce2(walletId, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWalletNonce2(walletId, options).then((request) => request(axios, basePath));
        },
        getMasterWallets6(sort, options) {
            return exports.WalletControllerApiFp(configuration).getMasterWallets6(sort, options).then((request) => request(axios, basePath));
        },
        getUserWallet3(walletId, userWalletId, options) {
            return exports.WalletControllerApiFp(configuration).getUserWallet3(walletId, userWalletId, options).then((request) => request(axios, basePath));
        },
        getUserWalletBalance3(walletId, userWalletId, symbol, options) {
            return exports.WalletControllerApiFp(configuration).getUserWalletBalance3(walletId, userWalletId, symbol, options).then((request) => request(axios, basePath));
        },
        getUserWalletNonce2(walletId, userWalletId, options) {
            return exports.WalletControllerApiFp(configuration).getUserWalletNonce2(walletId, userWalletId, options).then((request) => request(axios, basePath));
        },
        getUserWallets6(walletId, pageable, options) {
            return exports.WalletControllerApiFp(configuration).getUserWallets6(walletId, pageable, options).then((request) => request(axios, basePath));
        },
        patchAccountKey3(walletId, updateAccountKeyRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchAccountKey3(walletId, updateAccountKeyRequest, options).then((request) => request(axios, basePath));
        },
        patchMasterWalletName3(walletId, changeWalletNameRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchMasterWalletName3(walletId, changeWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        patchUserWalletName3(walletId, userWalletId, changeWalletNameRequest, options) {
            return exports.WalletControllerApiFp(configuration).patchUserWalletName3(walletId, userWalletId, changeWalletNameRequest, options).then((request) => request(axios, basePath));
        },
        recreateMasterWallet3(walletId, recreateWalletRequestV1, options) {
            return exports.WalletControllerApiFp(configuration).recreateMasterWallet3(walletId, recreateWalletRequestV1, options).then((request) => request(axios, basePath));
        },
        recreateUserWallet3(walletId, userWalletId, recreateWalletRequestV1, options) {
            return exports.WalletControllerApiFp(configuration).recreateUserWallet3(walletId, userWalletId, recreateWalletRequestV1, options).then((request) => request(axios, basePath));
        },
        sendBatchTransaction3(createBatchTransactionRequest, options) {
            return exports.WalletControllerApiFp(configuration).sendBatchTransaction3(createBatchTransactionRequest, options).then((request) => request(axios, basePath));
        },
        sendTransaction3(createMultiSigTransactionRequestV1, options) {
            return exports.WalletControllerApiFp(configuration).sendTransaction3(createMultiSigTransactionRequestV1, options).then((request) => request(axios, basePath));
        },
    };
};
class WalletControllerApi extends base_1.BaseAPI {
    createMasterWallet(createMasterWalletRequestV1, options) {
        return exports.WalletControllerApiFp(this.configuration).createMasterWallet(createMasterWalletRequestV1, options).then((request) => request(this.axios, this.basePath));
    }
    createUserWallet3(walletId, createUserWalletRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).createUserWallet3(walletId, createUserWalletRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallet3(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWallet3(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletAccountKey3(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWalletAccountKey3(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletBalance3(walletId, symbol, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWalletBalance3(walletId, symbol, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletInitialKey3(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWalletInitialKey3(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWalletNonce2(walletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWalletNonce2(walletId, options).then((request) => request(this.axios, this.basePath));
    }
    getMasterWallets6(sort, options) {
        return exports.WalletControllerApiFp(this.configuration).getMasterWallets6(sort, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWallet3(walletId, userWalletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getUserWallet3(walletId, userWalletId, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWalletBalance3(walletId, userWalletId, symbol, options) {
        return exports.WalletControllerApiFp(this.configuration).getUserWalletBalance3(walletId, userWalletId, symbol, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWalletNonce2(walletId, userWalletId, options) {
        return exports.WalletControllerApiFp(this.configuration).getUserWalletNonce2(walletId, userWalletId, options).then((request) => request(this.axios, this.basePath));
    }
    getUserWallets6(walletId, pageable, options) {
        return exports.WalletControllerApiFp(this.configuration).getUserWallets6(walletId, pageable, options).then((request) => request(this.axios, this.basePath));
    }
    patchAccountKey3(walletId, updateAccountKeyRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchAccountKey3(walletId, updateAccountKeyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchMasterWalletName3(walletId, changeWalletNameRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchMasterWalletName3(walletId, changeWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchUserWalletName3(walletId, userWalletId, changeWalletNameRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).patchUserWalletName3(walletId, userWalletId, changeWalletNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    recreateMasterWallet3(walletId, recreateWalletRequestV1, options) {
        return exports.WalletControllerApiFp(this.configuration).recreateMasterWallet3(walletId, recreateWalletRequestV1, options).then((request) => request(this.axios, this.basePath));
    }
    recreateUserWallet3(walletId, userWalletId, recreateWalletRequestV1, options) {
        return exports.WalletControllerApiFp(this.configuration).recreateUserWallet3(walletId, userWalletId, recreateWalletRequestV1, options).then((request) => request(this.axios, this.basePath));
    }
    sendBatchTransaction3(createBatchTransactionRequest, options) {
        return exports.WalletControllerApiFp(this.configuration).sendBatchTransaction3(createBatchTransactionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    sendTransaction3(createMultiSigTransactionRequestV1, options) {
        return exports.WalletControllerApiFp(this.configuration).sendTransaction3(createMultiSigTransactionRequestV1, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.WalletControllerApi = WalletControllerApi;
//# sourceMappingURL=api.js.map