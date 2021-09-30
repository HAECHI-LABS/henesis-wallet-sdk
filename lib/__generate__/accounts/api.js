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
exports.WithdrawalApprovalControllerApi = exports.WithdrawalApprovalControllerApiFactory = exports.WithdrawalApprovalControllerApiFp = exports.WithdrawalApprovalControllerApiAxiosParamCreator = exports.OrganizationControllerApi = exports.OrganizationControllerApiFactory = exports.OrganizationControllerApiFp = exports.OrganizationControllerApiAxiosParamCreator = exports.OperationControllerApi = exports.OperationControllerApiFactory = exports.OperationControllerApiFp = exports.OperationControllerApiAxiosParamCreator = exports.NoticeControllerApi = exports.NoticeControllerApiFactory = exports.NoticeControllerApiFp = exports.NoticeControllerApiAxiosParamCreator = exports.IdentityControllerApi = exports.IdentityControllerApiFactory = exports.IdentityControllerApiFp = exports.IdentityControllerApiAxiosParamCreator = exports.AccountControllerApi = exports.AccountControllerApiFactory = exports.AccountControllerApiFp = exports.AccountControllerApiAxiosParamCreator = exports.WithdrawalApprovalStatus = exports.Role = exports.NotifyRequestTargetsEnum = exports.NotificationPayloadDtoLanguageEnum = exports.LoginIpStatus = exports.HenesisLocaleLanguageEnum = exports.CoinRequestStatus = exports.ClientIdentityMethodEnum = exports.ClaimTypeEnum = exports.Cause = exports.Blockchain = exports.ApproveCoinListingRequestRequestAttributesEnum = void 0;
const globalImportUrl = __importStar(require("url"));
const axios_1 = __importDefault(require("axios"));
const base_1 = require("./base");
var ApproveCoinListingRequestRequestAttributesEnum;
(function (ApproveCoinListingRequestRequestAttributesEnum) {
    ApproveCoinListingRequestRequestAttributesEnum["STANDARD"] = "ERC20_STANDARD";
    ApproveCoinListingRequestRequestAttributesEnum["NONSTANDARDRETURNTYPE"] = "ERC20_NON_STANDARD_RETURN_TYPE";
    ApproveCoinListingRequestRequestAttributesEnum["REBASE"] = "ERC20_REBASE";
    ApproveCoinListingRequestRequestAttributesEnum["PAUSABLE"] = "ERC20_PAUSABLE";
})(ApproveCoinListingRequestRequestAttributesEnum = exports.ApproveCoinListingRequestRequestAttributesEnum || (exports.ApproveCoinListingRequestRequestAttributesEnum = {}));
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
var Cause;
(function (Cause) {
    Cause["SECURITYISSUE"] = "SECURITY_ISSUE";
    Cause["SOURCECODEFORBIDDEN"] = "SOURCE_CODE_FORBIDDEN";
    Cause["OTHER"] = "OTHER";
})(Cause = exports.Cause || (exports.Cause = {}));
var ClaimTypeEnum;
(function (ClaimTypeEnum) {
    ClaimTypeEnum["LONG"] = "LONG";
    ClaimTypeEnum["SHORT"] = "SHORT";
})(ClaimTypeEnum = exports.ClaimTypeEnum || (exports.ClaimTypeEnum = {}));
var ClientIdentityMethodEnum;
(function (ClientIdentityMethodEnum) {
    ClientIdentityMethodEnum["GET"] = "GET";
    ClientIdentityMethodEnum["HEAD"] = "HEAD";
    ClientIdentityMethodEnum["POST"] = "POST";
    ClientIdentityMethodEnum["PUT"] = "PUT";
    ClientIdentityMethodEnum["PATCH"] = "PATCH";
    ClientIdentityMethodEnum["DELETE"] = "DELETE";
    ClientIdentityMethodEnum["OPTIONS"] = "OPTIONS";
    ClientIdentityMethodEnum["TRACE"] = "TRACE";
})(ClientIdentityMethodEnum = exports.ClientIdentityMethodEnum || (exports.ClientIdentityMethodEnum = {}));
var CoinRequestStatus;
(function (CoinRequestStatus) {
    CoinRequestStatus["INSPECTING"] = "INSPECTING";
    CoinRequestStatus["REJECTED"] = "REJECTED";
    CoinRequestStatus["CANCELED"] = "CANCELED";
    CoinRequestStatus["APPROVED"] = "APPROVED";
})(CoinRequestStatus = exports.CoinRequestStatus || (exports.CoinRequestStatus = {}));
var HenesisLocaleLanguageEnum;
(function (HenesisLocaleLanguageEnum) {
    HenesisLocaleLanguageEnum["KO"] = "KO";
    HenesisLocaleLanguageEnum["EN"] = "EN";
})(HenesisLocaleLanguageEnum = exports.HenesisLocaleLanguageEnum || (exports.HenesisLocaleLanguageEnum = {}));
var LoginIpStatus;
(function (LoginIpStatus) {
    LoginIpStatus["REQUESTED"] = "REQUESTED";
    LoginIpStatus["VERIFIED"] = "VERIFIED";
})(LoginIpStatus = exports.LoginIpStatus || (exports.LoginIpStatus = {}));
var NotificationPayloadDtoLanguageEnum;
(function (NotificationPayloadDtoLanguageEnum) {
    NotificationPayloadDtoLanguageEnum["KO"] = "KO";
    NotificationPayloadDtoLanguageEnum["EN"] = "EN";
})(NotificationPayloadDtoLanguageEnum = exports.NotificationPayloadDtoLanguageEnum || (exports.NotificationPayloadDtoLanguageEnum = {}));
var NotifyRequestTargetsEnum;
(function (NotifyRequestTargetsEnum) {
    NotifyRequestTargetsEnum["COIN"] = "COIN";
    NotifyRequestTargetsEnum["VIEWER"] = "VIEWER";
    NotifyRequestTargetsEnum["ADMIN"] = "ADMIN";
    NotifyRequestTargetsEnum["HAECHI"] = "HAECHI";
    NotifyRequestTargetsEnum["SPENDER"] = "SPENDER";
})(NotifyRequestTargetsEnum = exports.NotifyRequestTargetsEnum || (exports.NotifyRequestTargetsEnum = {}));
var Role;
(function (Role) {
    Role["COIN"] = "COIN";
    Role["VIEWER"] = "VIEWER";
    Role["ADMIN"] = "ADMIN";
    Role["HAECHI"] = "HAECHI";
    Role["SPENDER"] = "SPENDER";
})(Role = exports.Role || (exports.Role = {}));
var WithdrawalApprovalStatus;
(function (WithdrawalApprovalStatus) {
    WithdrawalApprovalStatus["PENDING"] = "PENDING";
    WithdrawalApprovalStatus["REJECTED"] = "REJECTED";
    WithdrawalApprovalStatus["APPROVED"] = "APPROVED";
})(WithdrawalApprovalStatus = exports.WithdrawalApprovalStatus || (exports.WithdrawalApprovalStatus = {}));
exports.AccountControllerApiAxiosParamCreator = function (configuration) {
    return {
        changeAccountName: async (changeAccountNameRequest, options = {}) => {
            if (changeAccountNameRequest === null || changeAccountNameRequest === undefined) {
                throw new base_1.RequiredError('changeAccountNameRequest', 'Required parameter changeAccountNameRequest was null or undefined when calling changeAccountName.');
            }
            const localVarPath = `/api/v2/accounts/name`;
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
            const needsSerialization = (typeof changeAccountNameRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(changeAccountNameRequest !== undefined ? changeAccountNameRequest : {}) : (changeAccountNameRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createAccessToken1: async (refreshAccessTokenRequest, options = {}) => {
            if (refreshAccessTokenRequest === null || refreshAccessTokenRequest === undefined) {
                throw new base_1.RequiredError('refreshAccessTokenRequest', 'Required parameter refreshAccessTokenRequest was null or undefined when calling createAccessToken1.');
            }
            const localVarPath = `/api/v2/accounts/token`;
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
            const needsSerialization = (typeof refreshAccessTokenRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(refreshAccessTokenRequest !== undefined ? refreshAccessTokenRequest : {}) : (refreshAccessTokenRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        deleteAccessToken: async (options = {}) => {
            const localVarPath = `/api/v2/accounts/token`;
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
        getAccessToken: async (options = {}) => {
            const localVarPath = `/api/v2/accounts/token`;
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
        getAccount: async (options = {}) => {
            const localVarPath = `/api/v2/accounts/me`;
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
        login: async (inlineObject, options = {}) => {
            if (inlineObject === null || inlineObject === undefined) {
                throw new base_1.RequiredError('inlineObject', 'Required parameter inlineObject was null or undefined when calling login.');
            }
            const localVarPath = `/api/v2/accounts/login`;
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
            const needsSerialization = (typeof inlineObject !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(inlineObject !== undefined ? inlineObject : {}) : (inlineObject || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        signup: async (signUpRequest, options = {}) => {
            if (signUpRequest === null || signUpRequest === undefined) {
                throw new base_1.RequiredError('signUpRequest', 'Required parameter signUpRequest was null or undefined when calling signup.');
            }
            const localVarPath = `/api/v2/accounts/signup`;
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
            const needsSerialization = (typeof signUpRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(signUpRequest !== undefined ? signUpRequest : {}) : (signUpRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        updateLanguage: async (updateLanguageRequest, options = {}) => {
            if (updateLanguageRequest === null || updateLanguageRequest === undefined) {
                throw new base_1.RequiredError('updateLanguageRequest', 'Required parameter updateLanguageRequest was null or undefined when calling updateLanguage.');
            }
            const localVarPath = `/api/v2/accounts/language`;
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
            const needsSerialization = (typeof updateLanguageRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateLanguageRequest !== undefined ? updateLanguageRequest : {}) : (updateLanguageRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        updateOTPInitialize: async (updateOTPInitializeRequest, options = {}) => {
            if (updateOTPInitializeRequest === null || updateOTPInitializeRequest === undefined) {
                throw new base_1.RequiredError('updateOTPInitializeRequest', 'Required parameter updateOTPInitializeRequest was null or undefined when calling updateOTPInitialize.');
            }
            const localVarPath = `/api/v2/accounts/otp-initialize`;
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
            const needsSerialization = (typeof updateOTPInitializeRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateOTPInitializeRequest !== undefined ? updateOTPInitializeRequest : {}) : (updateOTPInitializeRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        updateOrganization: async (updateOrganizationRequest, options = {}) => {
            if (updateOrganizationRequest === null || updateOrganizationRequest === undefined) {
                throw new base_1.RequiredError('updateOrganizationRequest', 'Required parameter updateOrganizationRequest was null or undefined when calling updateOrganization.');
            }
            const localVarPath = `/api/v2/accounts/organization`;
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
            const needsSerialization = (typeof updateOrganizationRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateOrganizationRequest !== undefined ? updateOrganizationRequest : {}) : (updateOrganizationRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        updatePassword: async (updatePasswordRequest, options = {}) => {
            if (updatePasswordRequest === null || updatePasswordRequest === undefined) {
                throw new base_1.RequiredError('updatePasswordRequest', 'Required parameter updatePasswordRequest was null or undefined when calling updatePassword.');
            }
            const localVarPath = `/api/v2/accounts/password`;
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
            const needsSerialization = (typeof updatePasswordRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updatePasswordRequest !== undefined ? updatePasswordRequest : {}) : (updatePasswordRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        verifyEmail: async (verifyEmailRequest, options = {}) => {
            if (verifyEmailRequest === null || verifyEmailRequest === undefined) {
                throw new base_1.RequiredError('verifyEmailRequest', 'Required parameter verifyEmailRequest was null or undefined when calling verifyEmail.');
            }
            const localVarPath = `/api/v2/accounts/verify-email`;
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
            const needsSerialization = (typeof verifyEmailRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(verifyEmailRequest !== undefined ? verifyEmailRequest : {}) : (verifyEmailRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        verifyIP: async (clientIdentity, identifier, options = {}) => {
            if (clientIdentity === null || clientIdentity === undefined) {
                throw new base_1.RequiredError('clientIdentity', 'Required parameter clientIdentity was null or undefined when calling verifyIP.');
            }
            if (identifier === null || identifier === undefined) {
                throw new base_1.RequiredError('identifier', 'Required parameter identifier was null or undefined when calling verifyIP.');
            }
            const localVarPath = `/api/v2/accounts/login/verify`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (clientIdentity !== undefined) {
                localVarQueryParameter['clientIdentity'] = clientIdentity;
            }
            if (identifier !== undefined) {
                localVarQueryParameter['identifier'] = identifier;
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
exports.AccountControllerApiFp = function (configuration) {
    return {
        async changeAccountName(changeAccountNameRequest, options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).changeAccountName(changeAccountNameRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createAccessToken1(refreshAccessTokenRequest, options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).createAccessToken1(refreshAccessTokenRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteAccessToken(options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).deleteAccessToken(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAccessToken(options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).getAccessToken(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAccount(options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).getAccount(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async login(inlineObject, options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).login(inlineObject, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async signup(signUpRequest, options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).signup(signUpRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async updateLanguage(updateLanguageRequest, options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).updateLanguage(updateLanguageRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async updateOTPInitialize(updateOTPInitializeRequest, options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).updateOTPInitialize(updateOTPInitializeRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async updateOrganization(updateOrganizationRequest, options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).updateOrganization(updateOrganizationRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async updatePassword(updatePasswordRequest, options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).updatePassword(updatePasswordRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async verifyEmail(verifyEmailRequest, options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).verifyEmail(verifyEmailRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async verifyIP(clientIdentity, identifier, options) {
            const localVarAxiosArgs = await exports.AccountControllerApiAxiosParamCreator(configuration).verifyIP(clientIdentity, identifier, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.AccountControllerApiFactory = function (configuration, basePath, axios) {
    return {
        changeAccountName(changeAccountNameRequest, options) {
            return exports.AccountControllerApiFp(configuration).changeAccountName(changeAccountNameRequest, options).then((request) => request(axios, basePath));
        },
        createAccessToken1(refreshAccessTokenRequest, options) {
            return exports.AccountControllerApiFp(configuration).createAccessToken1(refreshAccessTokenRequest, options).then((request) => request(axios, basePath));
        },
        deleteAccessToken(options) {
            return exports.AccountControllerApiFp(configuration).deleteAccessToken(options).then((request) => request(axios, basePath));
        },
        getAccessToken(options) {
            return exports.AccountControllerApiFp(configuration).getAccessToken(options).then((request) => request(axios, basePath));
        },
        getAccount(options) {
            return exports.AccountControllerApiFp(configuration).getAccount(options).then((request) => request(axios, basePath));
        },
        login(inlineObject, options) {
            return exports.AccountControllerApiFp(configuration).login(inlineObject, options).then((request) => request(axios, basePath));
        },
        signup(signUpRequest, options) {
            return exports.AccountControllerApiFp(configuration).signup(signUpRequest, options).then((request) => request(axios, basePath));
        },
        updateLanguage(updateLanguageRequest, options) {
            return exports.AccountControllerApiFp(configuration).updateLanguage(updateLanguageRequest, options).then((request) => request(axios, basePath));
        },
        updateOTPInitialize(updateOTPInitializeRequest, options) {
            return exports.AccountControllerApiFp(configuration).updateOTPInitialize(updateOTPInitializeRequest, options).then((request) => request(axios, basePath));
        },
        updateOrganization(updateOrganizationRequest, options) {
            return exports.AccountControllerApiFp(configuration).updateOrganization(updateOrganizationRequest, options).then((request) => request(axios, basePath));
        },
        updatePassword(updatePasswordRequest, options) {
            return exports.AccountControllerApiFp(configuration).updatePassword(updatePasswordRequest, options).then((request) => request(axios, basePath));
        },
        verifyEmail(verifyEmailRequest, options) {
            return exports.AccountControllerApiFp(configuration).verifyEmail(verifyEmailRequest, options).then((request) => request(axios, basePath));
        },
        verifyIP(clientIdentity, identifier, options) {
            return exports.AccountControllerApiFp(configuration).verifyIP(clientIdentity, identifier, options).then((request) => request(axios, basePath));
        },
    };
};
class AccountControllerApi extends base_1.BaseAPI {
    changeAccountName(changeAccountNameRequest, options) {
        return exports.AccountControllerApiFp(this.configuration).changeAccountName(changeAccountNameRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createAccessToken1(refreshAccessTokenRequest, options) {
        return exports.AccountControllerApiFp(this.configuration).createAccessToken1(refreshAccessTokenRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteAccessToken(options) {
        return exports.AccountControllerApiFp(this.configuration).deleteAccessToken(options).then((request) => request(this.axios, this.basePath));
    }
    getAccessToken(options) {
        return exports.AccountControllerApiFp(this.configuration).getAccessToken(options).then((request) => request(this.axios, this.basePath));
    }
    getAccount(options) {
        return exports.AccountControllerApiFp(this.configuration).getAccount(options).then((request) => request(this.axios, this.basePath));
    }
    login(inlineObject, options) {
        return exports.AccountControllerApiFp(this.configuration).login(inlineObject, options).then((request) => request(this.axios, this.basePath));
    }
    signup(signUpRequest, options) {
        return exports.AccountControllerApiFp(this.configuration).signup(signUpRequest, options).then((request) => request(this.axios, this.basePath));
    }
    updateLanguage(updateLanguageRequest, options) {
        return exports.AccountControllerApiFp(this.configuration).updateLanguage(updateLanguageRequest, options).then((request) => request(this.axios, this.basePath));
    }
    updateOTPInitialize(updateOTPInitializeRequest, options) {
        return exports.AccountControllerApiFp(this.configuration).updateOTPInitialize(updateOTPInitializeRequest, options).then((request) => request(this.axios, this.basePath));
    }
    updateOrganization(updateOrganizationRequest, options) {
        return exports.AccountControllerApiFp(this.configuration).updateOrganization(updateOrganizationRequest, options).then((request) => request(this.axios, this.basePath));
    }
    updatePassword(updatePasswordRequest, options) {
        return exports.AccountControllerApiFp(this.configuration).updatePassword(updatePasswordRequest, options).then((request) => request(this.axios, this.basePath));
    }
    verifyEmail(verifyEmailRequest, options) {
        return exports.AccountControllerApiFp(this.configuration).verifyEmail(verifyEmailRequest, options).then((request) => request(this.axios, this.basePath));
    }
    verifyIP(clientIdentity, identifier, options) {
        return exports.AccountControllerApiFp(this.configuration).verifyIP(clientIdentity, identifier, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.AccountControllerApi = AccountControllerApi;
exports.IdentityControllerApiAxiosParamCreator = function (configuration) {
    return {
        getVerifiedIdentity: async (claim, clientIdentity, accountId, options = {}) => {
            if (claim === null || claim === undefined) {
                throw new base_1.RequiredError('claim', 'Required parameter claim was null or undefined when calling getVerifiedIdentity.');
            }
            if (clientIdentity === null || clientIdentity === undefined) {
                throw new base_1.RequiredError('clientIdentity', 'Required parameter clientIdentity was null or undefined when calling getVerifiedIdentity.');
            }
            if (accountId === null || accountId === undefined) {
                throw new base_1.RequiredError('accountId', 'Required parameter accountId was null or undefined when calling getVerifiedIdentity.');
            }
            const localVarPath = `/api/v2/identities`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (claim !== undefined) {
                localVarQueryParameter['claim'] = claim;
            }
            if (clientIdentity !== undefined) {
                localVarQueryParameter['clientIdentity'] = clientIdentity;
            }
            if (accountId !== undefined) {
                localVarQueryParameter['accountId'] = accountId;
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
exports.IdentityControllerApiFp = function (configuration) {
    return {
        async getVerifiedIdentity(claim, clientIdentity, accountId, options) {
            const localVarAxiosArgs = await exports.IdentityControllerApiAxiosParamCreator(configuration).getVerifiedIdentity(claim, clientIdentity, accountId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.IdentityControllerApiFactory = function (configuration, basePath, axios) {
    return {
        getVerifiedIdentity(claim, clientIdentity, accountId, options) {
            return exports.IdentityControllerApiFp(configuration).getVerifiedIdentity(claim, clientIdentity, accountId, options).then((request) => request(axios, basePath));
        },
    };
};
class IdentityControllerApi extends base_1.BaseAPI {
    getVerifiedIdentity(claim, clientIdentity, accountId, options) {
        return exports.IdentityControllerApiFp(this.configuration).getVerifiedIdentity(claim, clientIdentity, accountId, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.IdentityControllerApi = IdentityControllerApi;
exports.NoticeControllerApiAxiosParamCreator = function (configuration) {
    return {
        createNotice: async (createNoticeRequest, options = {}) => {
            if (createNoticeRequest === null || createNoticeRequest === undefined) {
                throw new base_1.RequiredError('createNoticeRequest', 'Required parameter createNoticeRequest was null or undefined when calling createNotice.');
            }
            const localVarPath = `/api/v2/notices`;
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
            const needsSerialization = (typeof createNoticeRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createNoticeRequest !== undefined ? createNoticeRequest : {}) : (createNoticeRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        deleteNotice: async (noticeId, options = {}) => {
            if (noticeId === null || noticeId === undefined) {
                throw new base_1.RequiredError('noticeId', 'Required parameter noticeId was null or undefined when calling deleteNotice.');
            }
            const localVarPath = `/api/v2/notices/{noticeId}`
                .replace(`{${"noticeId"}}`, encodeURIComponent(String(noticeId)));
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
        getNotices: async (options = {}) => {
            const localVarPath = `/api/v2/notices`;
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
        updateNotice: async (noticeId, updateNoticeRequest, options = {}) => {
            if (noticeId === null || noticeId === undefined) {
                throw new base_1.RequiredError('noticeId', 'Required parameter noticeId was null or undefined when calling updateNotice.');
            }
            if (updateNoticeRequest === null || updateNoticeRequest === undefined) {
                throw new base_1.RequiredError('updateNoticeRequest', 'Required parameter updateNoticeRequest was null or undefined when calling updateNotice.');
            }
            const localVarPath = `/api/v2/notices/{noticeId}/title`
                .replace(`{${"noticeId"}}`, encodeURIComponent(String(noticeId)));
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
            const needsSerialization = (typeof updateNoticeRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateNoticeRequest !== undefined ? updateNoticeRequest : {}) : (updateNoticeRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        updateNoticeIsSeen: async (noticeId, updateNoticeIsSeenRequest, options = {}) => {
            if (noticeId === null || noticeId === undefined) {
                throw new base_1.RequiredError('noticeId', 'Required parameter noticeId was null or undefined when calling updateNoticeIsSeen.');
            }
            if (updateNoticeIsSeenRequest === null || updateNoticeIsSeenRequest === undefined) {
                throw new base_1.RequiredError('updateNoticeIsSeenRequest', 'Required parameter updateNoticeIsSeenRequest was null or undefined when calling updateNoticeIsSeen.');
            }
            const localVarPath = `/api/v2/notices/{noticeId}/is-seen`
                .replace(`{${"noticeId"}}`, encodeURIComponent(String(noticeId)));
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
            const needsSerialization = (typeof updateNoticeIsSeenRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(updateNoticeIsSeenRequest !== undefined ? updateNoticeIsSeenRequest : {}) : (updateNoticeIsSeenRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.NoticeControllerApiFp = function (configuration) {
    return {
        async createNotice(createNoticeRequest, options) {
            const localVarAxiosArgs = await exports.NoticeControllerApiAxiosParamCreator(configuration).createNotice(createNoticeRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteNotice(noticeId, options) {
            const localVarAxiosArgs = await exports.NoticeControllerApiAxiosParamCreator(configuration).deleteNotice(noticeId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getNotices(options) {
            const localVarAxiosArgs = await exports.NoticeControllerApiAxiosParamCreator(configuration).getNotices(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async updateNotice(noticeId, updateNoticeRequest, options) {
            const localVarAxiosArgs = await exports.NoticeControllerApiAxiosParamCreator(configuration).updateNotice(noticeId, updateNoticeRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async updateNoticeIsSeen(noticeId, updateNoticeIsSeenRequest, options) {
            const localVarAxiosArgs = await exports.NoticeControllerApiAxiosParamCreator(configuration).updateNoticeIsSeen(noticeId, updateNoticeIsSeenRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.NoticeControllerApiFactory = function (configuration, basePath, axios) {
    return {
        createNotice(createNoticeRequest, options) {
            return exports.NoticeControllerApiFp(configuration).createNotice(createNoticeRequest, options).then((request) => request(axios, basePath));
        },
        deleteNotice(noticeId, options) {
            return exports.NoticeControllerApiFp(configuration).deleteNotice(noticeId, options).then((request) => request(axios, basePath));
        },
        getNotices(options) {
            return exports.NoticeControllerApiFp(configuration).getNotices(options).then((request) => request(axios, basePath));
        },
        updateNotice(noticeId, updateNoticeRequest, options) {
            return exports.NoticeControllerApiFp(configuration).updateNotice(noticeId, updateNoticeRequest, options).then((request) => request(axios, basePath));
        },
        updateNoticeIsSeen(noticeId, updateNoticeIsSeenRequest, options) {
            return exports.NoticeControllerApiFp(configuration).updateNoticeIsSeen(noticeId, updateNoticeIsSeenRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class NoticeControllerApi extends base_1.BaseAPI {
    createNotice(createNoticeRequest, options) {
        return exports.NoticeControllerApiFp(this.configuration).createNotice(createNoticeRequest, options).then((request) => request(this.axios, this.basePath));
    }
    deleteNotice(noticeId, options) {
        return exports.NoticeControllerApiFp(this.configuration).deleteNotice(noticeId, options).then((request) => request(this.axios, this.basePath));
    }
    getNotices(options) {
        return exports.NoticeControllerApiFp(this.configuration).getNotices(options).then((request) => request(this.axios, this.basePath));
    }
    updateNotice(noticeId, updateNoticeRequest, options) {
        return exports.NoticeControllerApiFp(this.configuration).updateNotice(noticeId, updateNoticeRequest, options).then((request) => request(this.axios, this.basePath));
    }
    updateNoticeIsSeen(noticeId, updateNoticeIsSeenRequest, options) {
        return exports.NoticeControllerApiFp(this.configuration).updateNoticeIsSeen(noticeId, updateNoticeIsSeenRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.NoticeControllerApi = NoticeControllerApi;
exports.OperationControllerApiAxiosParamCreator = function (configuration) {
    return {
        activateOrganization: async (organizationId, options = {}) => {
            if (organizationId === null || organizationId === undefined) {
                throw new base_1.RequiredError('organizationId', 'Required parameter organizationId was null or undefined when calling activateOrganization.');
            }
            const localVarPath = `/api/v2/operation/organizations/{organizationId}/activate`
                .replace(`{${"organizationId"}}`, encodeURIComponent(String(organizationId)));
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
        approveCoinListingRequest: async (requestId, approveCoinListingRequestRequest, options = {}) => {
            if (requestId === null || requestId === undefined) {
                throw new base_1.RequiredError('requestId', 'Required parameter requestId was null or undefined when calling approveCoinListingRequest.');
            }
            if (approveCoinListingRequestRequest === null || approveCoinListingRequestRequest === undefined) {
                throw new base_1.RequiredError('approveCoinListingRequestRequest', 'Required parameter approveCoinListingRequestRequest was null or undefined when calling approveCoinListingRequest.');
            }
            const localVarPath = `/api/v2/operation/coin-listing-requests/{requestId}/approve`
                .replace(`{${"requestId"}}`, encodeURIComponent(String(requestId)));
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
            const needsSerialization = (typeof approveCoinListingRequestRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(approveCoinListingRequestRequest !== undefined ? approveCoinListingRequestRequest : {}) : (approveCoinListingRequestRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getAccount1: async (accountId, options = {}) => {
            if (accountId === null || accountId === undefined) {
                throw new base_1.RequiredError('accountId', 'Required parameter accountId was null or undefined when calling getAccount1.');
            }
            const localVarPath = `/api/v2/operation/accounts/{accountId}`
                .replace(`{${"accountId"}}`, encodeURIComponent(String(accountId)));
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
        getAccountByEmail: async (email, options = {}) => {
            if (email === null || email === undefined) {
                throw new base_1.RequiredError('email', 'Required parameter email was null or undefined when calling getAccountByEmail.');
            }
            const localVarPath = `/api/v2/operation/accounts`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (email !== undefined) {
                localVarQueryParameter['email'] = email;
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
        getAllAccountsByOrganizationId: async (organizationId, options = {}) => {
            if (organizationId === null || organizationId === undefined) {
                throw new base_1.RequiredError('organizationId', 'Required parameter organizationId was null or undefined when calling getAllAccountsByOrganizationId.');
            }
            const localVarPath = `/api/v2/operation/organizations/{organizationId}/accounts`
                .replace(`{${"organizationId"}}`, encodeURIComponent(String(organizationId)));
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
        getCoinListingRequest: async (requestId, options = {}) => {
            if (requestId === null || requestId === undefined) {
                throw new base_1.RequiredError('requestId', 'Required parameter requestId was null or undefined when calling getCoinListingRequest.');
            }
            const localVarPath = `/api/v2/operation/coin-listing-requests/{requestId}`
                .replace(`{${"requestId"}}`, encodeURIComponent(String(requestId)));
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
        getOrganizationInfo: async (organizationId, options = {}) => {
            if (organizationId === null || organizationId === undefined) {
                throw new base_1.RequiredError('organizationId', 'Required parameter organizationId was null or undefined when calling getOrganizationInfo.');
            }
            const localVarPath = `/api/v2/operation/organizations/{organizationId}`
                .replace(`{${"organizationId"}}`, encodeURIComponent(String(organizationId)));
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
        getOrganizationsInfo: async (options = {}) => {
            const localVarPath = `/api/v2/operation/organizations`;
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
        inactivateOrganization: async (organizationId, options = {}) => {
            if (organizationId === null || organizationId === undefined) {
                throw new base_1.RequiredError('organizationId', 'Required parameter organizationId was null or undefined when calling inactivateOrganization.');
            }
            const localVarPath = `/api/v2/operation/organizations/{organizationId}/inactivate`
                .replace(`{${"organizationId"}}`, encodeURIComponent(String(organizationId)));
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
        rejectCoinListingRequest: async (requestId, rejectCoinListingRequestRequest, options = {}) => {
            if (requestId === null || requestId === undefined) {
                throw new base_1.RequiredError('requestId', 'Required parameter requestId was null or undefined when calling rejectCoinListingRequest.');
            }
            if (rejectCoinListingRequestRequest === null || rejectCoinListingRequestRequest === undefined) {
                throw new base_1.RequiredError('rejectCoinListingRequestRequest', 'Required parameter rejectCoinListingRequestRequest was null or undefined when calling rejectCoinListingRequest.');
            }
            const localVarPath = `/api/v2/operation/coin-listing-requests/{requestId}/reject`
                .replace(`{${"requestId"}}`, encodeURIComponent(String(requestId)));
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
            const needsSerialization = (typeof rejectCoinListingRequestRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(rejectCoinListingRequestRequest !== undefined ? rejectCoinListingRequestRequest : {}) : (rejectCoinListingRequestRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.OperationControllerApiFp = function (configuration) {
    return {
        async activateOrganization(organizationId, options) {
            const localVarAxiosArgs = await exports.OperationControllerApiAxiosParamCreator(configuration).activateOrganization(organizationId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async approveCoinListingRequest(requestId, approveCoinListingRequestRequest, options) {
            const localVarAxiosArgs = await exports.OperationControllerApiAxiosParamCreator(configuration).approveCoinListingRequest(requestId, approveCoinListingRequestRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAccount1(accountId, options) {
            const localVarAxiosArgs = await exports.OperationControllerApiAxiosParamCreator(configuration).getAccount1(accountId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAccountByEmail(email, options) {
            const localVarAxiosArgs = await exports.OperationControllerApiAxiosParamCreator(configuration).getAccountByEmail(email, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllAccountsByOrganizationId(organizationId, options) {
            const localVarAxiosArgs = await exports.OperationControllerApiAxiosParamCreator(configuration).getAllAccountsByOrganizationId(organizationId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getCoinListingRequest(requestId, options) {
            const localVarAxiosArgs = await exports.OperationControllerApiAxiosParamCreator(configuration).getCoinListingRequest(requestId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getOrganizationInfo(organizationId, options) {
            const localVarAxiosArgs = await exports.OperationControllerApiAxiosParamCreator(configuration).getOrganizationInfo(organizationId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getOrganizationsInfo(options) {
            const localVarAxiosArgs = await exports.OperationControllerApiAxiosParamCreator(configuration).getOrganizationsInfo(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async inactivateOrganization(organizationId, options) {
            const localVarAxiosArgs = await exports.OperationControllerApiAxiosParamCreator(configuration).inactivateOrganization(organizationId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async rejectCoinListingRequest(requestId, rejectCoinListingRequestRequest, options) {
            const localVarAxiosArgs = await exports.OperationControllerApiAxiosParamCreator(configuration).rejectCoinListingRequest(requestId, rejectCoinListingRequestRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.OperationControllerApiFactory = function (configuration, basePath, axios) {
    return {
        activateOrganization(organizationId, options) {
            return exports.OperationControllerApiFp(configuration).activateOrganization(organizationId, options).then((request) => request(axios, basePath));
        },
        approveCoinListingRequest(requestId, approveCoinListingRequestRequest, options) {
            return exports.OperationControllerApiFp(configuration).approveCoinListingRequest(requestId, approveCoinListingRequestRequest, options).then((request) => request(axios, basePath));
        },
        getAccount1(accountId, options) {
            return exports.OperationControllerApiFp(configuration).getAccount1(accountId, options).then((request) => request(axios, basePath));
        },
        getAccountByEmail(email, options) {
            return exports.OperationControllerApiFp(configuration).getAccountByEmail(email, options).then((request) => request(axios, basePath));
        },
        getAllAccountsByOrganizationId(organizationId, options) {
            return exports.OperationControllerApiFp(configuration).getAllAccountsByOrganizationId(organizationId, options).then((request) => request(axios, basePath));
        },
        getCoinListingRequest(requestId, options) {
            return exports.OperationControllerApiFp(configuration).getCoinListingRequest(requestId, options).then((request) => request(axios, basePath));
        },
        getOrganizationInfo(organizationId, options) {
            return exports.OperationControllerApiFp(configuration).getOrganizationInfo(organizationId, options).then((request) => request(axios, basePath));
        },
        getOrganizationsInfo(options) {
            return exports.OperationControllerApiFp(configuration).getOrganizationsInfo(options).then((request) => request(axios, basePath));
        },
        inactivateOrganization(organizationId, options) {
            return exports.OperationControllerApiFp(configuration).inactivateOrganization(organizationId, options).then((request) => request(axios, basePath));
        },
        rejectCoinListingRequest(requestId, rejectCoinListingRequestRequest, options) {
            return exports.OperationControllerApiFp(configuration).rejectCoinListingRequest(requestId, rejectCoinListingRequestRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class OperationControllerApi extends base_1.BaseAPI {
    activateOrganization(organizationId, options) {
        return exports.OperationControllerApiFp(this.configuration).activateOrganization(organizationId, options).then((request) => request(this.axios, this.basePath));
    }
    approveCoinListingRequest(requestId, approveCoinListingRequestRequest, options) {
        return exports.OperationControllerApiFp(this.configuration).approveCoinListingRequest(requestId, approveCoinListingRequestRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getAccount1(accountId, options) {
        return exports.OperationControllerApiFp(this.configuration).getAccount1(accountId, options).then((request) => request(this.axios, this.basePath));
    }
    getAccountByEmail(email, options) {
        return exports.OperationControllerApiFp(this.configuration).getAccountByEmail(email, options).then((request) => request(this.axios, this.basePath));
    }
    getAllAccountsByOrganizationId(organizationId, options) {
        return exports.OperationControllerApiFp(this.configuration).getAllAccountsByOrganizationId(organizationId, options).then((request) => request(this.axios, this.basePath));
    }
    getCoinListingRequest(requestId, options) {
        return exports.OperationControllerApiFp(this.configuration).getCoinListingRequest(requestId, options).then((request) => request(this.axios, this.basePath));
    }
    getOrganizationInfo(organizationId, options) {
        return exports.OperationControllerApiFp(this.configuration).getOrganizationInfo(organizationId, options).then((request) => request(this.axios, this.basePath));
    }
    getOrganizationsInfo(options) {
        return exports.OperationControllerApiFp(this.configuration).getOrganizationsInfo(options).then((request) => request(this.axios, this.basePath));
    }
    inactivateOrganization(organizationId, options) {
        return exports.OperationControllerApiFp(this.configuration).inactivateOrganization(organizationId, options).then((request) => request(this.axios, this.basePath));
    }
    rejectCoinListingRequest(requestId, rejectCoinListingRequestRequest, options) {
        return exports.OperationControllerApiFp(this.configuration).rejectCoinListingRequest(requestId, rejectCoinListingRequestRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.OperationControllerApi = OperationControllerApi;
exports.OrganizationControllerApiAxiosParamCreator = function (configuration) {
    return {
        activateAllowedIps: async (activateAllowedIpsRequest, options = {}) => {
            if (activateAllowedIpsRequest === null || activateAllowedIpsRequest === undefined) {
                throw new base_1.RequiredError('activateAllowedIpsRequest', 'Required parameter activateAllowedIpsRequest was null or undefined when calling activateAllowedIps.');
            }
            const localVarPath = `/api/v2/organizations/activate-allowed-ips`;
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
            const needsSerialization = (typeof activateAllowedIpsRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(activateAllowedIpsRequest !== undefined ? activateAllowedIpsRequest : {}) : (activateAllowedIpsRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        cancelCoinListingRequest: async (requestId, options = {}) => {
            if (requestId === null || requestId === undefined) {
                throw new base_1.RequiredError('requestId', 'Required parameter requestId was null or undefined when calling cancelCoinListingRequest.');
            }
            const localVarPath = `/api/v2/organizations/coin-listing-requests/{requestId}/cancel`
                .replace(`{${"requestId"}}`, encodeURIComponent(String(requestId)));
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
        createAllowedIp: async (createAllowedIpRequest, options = {}) => {
            if (createAllowedIpRequest === null || createAllowedIpRequest === undefined) {
                throw new base_1.RequiredError('createAllowedIpRequest', 'Required parameter createAllowedIpRequest was null or undefined when calling createAllowedIp.');
            }
            const localVarPath = `/api/v2/organizations/allowed-ips`;
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
            const needsSerialization = (typeof createAllowedIpRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createAllowedIpRequest !== undefined ? createAllowedIpRequest : {}) : (createAllowedIpRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createCoinListingRequest: async (createCoinListingRequestRequest, options = {}) => {
            if (createCoinListingRequestRequest === null || createCoinListingRequestRequest === undefined) {
                throw new base_1.RequiredError('createCoinListingRequestRequest', 'Required parameter createCoinListingRequestRequest was null or undefined when calling createCoinListingRequest.');
            }
            const localVarPath = `/api/v2/organizations/coin-listing-requests`;
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
            const needsSerialization = (typeof createCoinListingRequestRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createCoinListingRequestRequest !== undefined ? createCoinListingRequestRequest : {}) : (createCoinListingRequestRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createOrganization: async (createOrganizationRequest, options = {}) => {
            if (createOrganizationRequest === null || createOrganizationRequest === undefined) {
                throw new base_1.RequiredError('createOrganizationRequest', 'Required parameter createOrganizationRequest was null or undefined when calling createOrganization.');
            }
            const localVarPath = `/api/v2/organizations`;
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
            const needsSerialization = (typeof createOrganizationRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createOrganizationRequest !== undefined ? createOrganizationRequest : {}) : (createOrganizationRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createSecret: async (options = {}) => {
            const localVarPath = `/api/v2/organizations/secret`;
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
        deleteAllowedIp: async (allowedIpId, deleteAllowedIpRequest, options = {}) => {
            if (allowedIpId === null || allowedIpId === undefined) {
                throw new base_1.RequiredError('allowedIpId', 'Required parameter allowedIpId was null or undefined when calling deleteAllowedIp.');
            }
            if (deleteAllowedIpRequest === null || deleteAllowedIpRequest === undefined) {
                throw new base_1.RequiredError('deleteAllowedIpRequest', 'Required parameter deleteAllowedIpRequest was null or undefined when calling deleteAllowedIp.');
            }
            const localVarPath = `/api/v2/organizations/allowed-ips/{allowedIpId}`
                .replace(`{${"allowedIpId"}}`, encodeURIComponent(String(allowedIpId)));
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
            const needsSerialization = (typeof deleteAllowedIpRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(deleteAllowedIpRequest !== undefined ? deleteAllowedIpRequest : {}) : (deleteAllowedIpRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getAccountByOrganizationId: async (options = {}) => {
            const localVarPath = `/api/v2/organizations/accounts`;
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
        getAllOrganizations: async (options = {}) => {
            const localVarPath = `/api/v2/organizations`;
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
        getAllowedIp: async (allowedIpId, options = {}) => {
            if (allowedIpId === null || allowedIpId === undefined) {
                throw new base_1.RequiredError('allowedIpId', 'Required parameter allowedIpId was null or undefined when calling getAllowedIp.');
            }
            const localVarPath = `/api/v2/organizations/allowed-ips/{allowedIpId}`
                .replace(`{${"allowedIpId"}}`, encodeURIComponent(String(allowedIpId)));
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
        getAllowedIps: async (pageable, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getAllowedIps.');
            }
            const localVarPath = `/api/v2/organizations/allowed-ips`;
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
        getCoinContract: async (blockchain, address, options = {}) => {
            if (blockchain === null || blockchain === undefined) {
                throw new base_1.RequiredError('blockchain', 'Required parameter blockchain was null or undefined when calling getCoinContract.');
            }
            if (address === null || address === undefined) {
                throw new base_1.RequiredError('address', 'Required parameter address was null or undefined when calling getCoinContract.');
            }
            const localVarPath = `/api/v2/organizations/coin-contract`;
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
            if (address !== undefined) {
                localVarQueryParameter['address'] = address;
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
        getCoinListingRequests: async (options = {}) => {
            const localVarPath = `/api/v2/organizations/coin-listing-requests`;
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
        getOrganization: async (options = {}) => {
            const localVarPath = `/api/v2/organizations/me`;
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
        inactivateAllowedIps: async (inactivateAllowedIpsRequest, options = {}) => {
            if (inactivateAllowedIpsRequest === null || inactivateAllowedIpsRequest === undefined) {
                throw new base_1.RequiredError('inactivateAllowedIpsRequest', 'Required parameter inactivateAllowedIpsRequest was null or undefined when calling inactivateAllowedIps.');
            }
            const localVarPath = `/api/v2/organizations/inactivate-allowed-ips`;
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
            const needsSerialization = (typeof inactivateAllowedIpsRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(inactivateAllowedIpsRequest !== undefined ? inactivateAllowedIpsRequest : {}) : (inactivateAllowedIpsRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        notify: async (notifyRequest, options = {}) => {
            if (notifyRequest === null || notifyRequest === undefined) {
                throw new base_1.RequiredError('notifyRequest', 'Required parameter notifyRequest was null or undefined when calling notify.');
            }
            const localVarPath = `/api/v2/organizations/notify`;
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
            const needsSerialization = (typeof notifyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(notifyRequest !== undefined ? notifyRequest : {}) : (notifyRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchAccountRole: async (accountId, patchAccountRoleRequest, options = {}) => {
            if (accountId === null || accountId === undefined) {
                throw new base_1.RequiredError('accountId', 'Required parameter accountId was null or undefined when calling patchAccountRole.');
            }
            if (patchAccountRoleRequest === null || patchAccountRoleRequest === undefined) {
                throw new base_1.RequiredError('patchAccountRoleRequest', 'Required parameter patchAccountRoleRequest was null or undefined when calling patchAccountRole.');
            }
            const localVarPath = `/api/v2/organizations/accounts/{accountId}`
                .replace(`{${"accountId"}}`, encodeURIComponent(String(accountId)));
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
            const needsSerialization = (typeof patchAccountRoleRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(patchAccountRoleRequest !== undefined ? patchAccountRoleRequest : {}) : (patchAccountRoleRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        patchAllowedIpLabel: async (allowedIpId, patchAllowedIpLabelRequest, options = {}) => {
            if (allowedIpId === null || allowedIpId === undefined) {
                throw new base_1.RequiredError('allowedIpId', 'Required parameter allowedIpId was null or undefined when calling patchAllowedIpLabel.');
            }
            if (patchAllowedIpLabelRequest === null || patchAllowedIpLabelRequest === undefined) {
                throw new base_1.RequiredError('patchAllowedIpLabelRequest', 'Required parameter patchAllowedIpLabelRequest was null or undefined when calling patchAllowedIpLabel.');
            }
            const localVarPath = `/api/v2/organizations/allowed-ips/{allowedIpId}/label`
                .replace(`{${"allowedIpId"}}`, encodeURIComponent(String(allowedIpId)));
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
            const needsSerialization = (typeof patchAllowedIpLabelRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(patchAllowedIpLabelRequest !== undefined ? patchAllowedIpLabelRequest : {}) : (patchAllowedIpLabelRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.OrganizationControllerApiFp = function (configuration) {
    return {
        async activateAllowedIps(activateAllowedIpsRequest, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).activateAllowedIps(activateAllowedIpsRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async cancelCoinListingRequest(requestId, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).cancelCoinListingRequest(requestId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createAllowedIp(createAllowedIpRequest, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).createAllowedIp(createAllowedIpRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createCoinListingRequest(createCoinListingRequestRequest, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).createCoinListingRequest(createCoinListingRequestRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createOrganization(createOrganizationRequest, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).createOrganization(createOrganizationRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createSecret(options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).createSecret(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async deleteAllowedIp(allowedIpId, deleteAllowedIpRequest, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).deleteAllowedIp(allowedIpId, deleteAllowedIpRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAccountByOrganizationId(options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).getAccountByOrganizationId(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllOrganizations(options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).getAllOrganizations(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedIp(allowedIpId, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).getAllowedIp(allowedIpId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getAllowedIps(pageable, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).getAllowedIps(pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getCoinContract(blockchain, address, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).getCoinContract(blockchain, address, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getCoinListingRequests(options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).getCoinListingRequests(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getOrganization(options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).getOrganization(options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async inactivateAllowedIps(inactivateAllowedIpsRequest, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).inactivateAllowedIps(inactivateAllowedIpsRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async notify(notifyRequest, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).notify(notifyRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchAccountRole(accountId, patchAccountRoleRequest, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).patchAccountRole(accountId, patchAccountRoleRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async patchAllowedIpLabel(allowedIpId, patchAllowedIpLabelRequest, options) {
            const localVarAxiosArgs = await exports.OrganizationControllerApiAxiosParamCreator(configuration).patchAllowedIpLabel(allowedIpId, patchAllowedIpLabelRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.OrganizationControllerApiFactory = function (configuration, basePath, axios) {
    return {
        activateAllowedIps(activateAllowedIpsRequest, options) {
            return exports.OrganizationControllerApiFp(configuration).activateAllowedIps(activateAllowedIpsRequest, options).then((request) => request(axios, basePath));
        },
        cancelCoinListingRequest(requestId, options) {
            return exports.OrganizationControllerApiFp(configuration).cancelCoinListingRequest(requestId, options).then((request) => request(axios, basePath));
        },
        createAllowedIp(createAllowedIpRequest, options) {
            return exports.OrganizationControllerApiFp(configuration).createAllowedIp(createAllowedIpRequest, options).then((request) => request(axios, basePath));
        },
        createCoinListingRequest(createCoinListingRequestRequest, options) {
            return exports.OrganizationControllerApiFp(configuration).createCoinListingRequest(createCoinListingRequestRequest, options).then((request) => request(axios, basePath));
        },
        createOrganization(createOrganizationRequest, options) {
            return exports.OrganizationControllerApiFp(configuration).createOrganization(createOrganizationRequest, options).then((request) => request(axios, basePath));
        },
        createSecret(options) {
            return exports.OrganizationControllerApiFp(configuration).createSecret(options).then((request) => request(axios, basePath));
        },
        deleteAllowedIp(allowedIpId, deleteAllowedIpRequest, options) {
            return exports.OrganizationControllerApiFp(configuration).deleteAllowedIp(allowedIpId, deleteAllowedIpRequest, options).then((request) => request(axios, basePath));
        },
        getAccountByOrganizationId(options) {
            return exports.OrganizationControllerApiFp(configuration).getAccountByOrganizationId(options).then((request) => request(axios, basePath));
        },
        getAllOrganizations(options) {
            return exports.OrganizationControllerApiFp(configuration).getAllOrganizations(options).then((request) => request(axios, basePath));
        },
        getAllowedIp(allowedIpId, options) {
            return exports.OrganizationControllerApiFp(configuration).getAllowedIp(allowedIpId, options).then((request) => request(axios, basePath));
        },
        getAllowedIps(pageable, options) {
            return exports.OrganizationControllerApiFp(configuration).getAllowedIps(pageable, options).then((request) => request(axios, basePath));
        },
        getCoinContract(blockchain, address, options) {
            return exports.OrganizationControllerApiFp(configuration).getCoinContract(blockchain, address, options).then((request) => request(axios, basePath));
        },
        getCoinListingRequests(options) {
            return exports.OrganizationControllerApiFp(configuration).getCoinListingRequests(options).then((request) => request(axios, basePath));
        },
        getOrganization(options) {
            return exports.OrganizationControllerApiFp(configuration).getOrganization(options).then((request) => request(axios, basePath));
        },
        inactivateAllowedIps(inactivateAllowedIpsRequest, options) {
            return exports.OrganizationControllerApiFp(configuration).inactivateAllowedIps(inactivateAllowedIpsRequest, options).then((request) => request(axios, basePath));
        },
        notify(notifyRequest, options) {
            return exports.OrganizationControllerApiFp(configuration).notify(notifyRequest, options).then((request) => request(axios, basePath));
        },
        patchAccountRole(accountId, patchAccountRoleRequest, options) {
            return exports.OrganizationControllerApiFp(configuration).patchAccountRole(accountId, patchAccountRoleRequest, options).then((request) => request(axios, basePath));
        },
        patchAllowedIpLabel(allowedIpId, patchAllowedIpLabelRequest, options) {
            return exports.OrganizationControllerApiFp(configuration).patchAllowedIpLabel(allowedIpId, patchAllowedIpLabelRequest, options).then((request) => request(axios, basePath));
        },
    };
};
class OrganizationControllerApi extends base_1.BaseAPI {
    activateAllowedIps(activateAllowedIpsRequest, options) {
        return exports.OrganizationControllerApiFp(this.configuration).activateAllowedIps(activateAllowedIpsRequest, options).then((request) => request(this.axios, this.basePath));
    }
    cancelCoinListingRequest(requestId, options) {
        return exports.OrganizationControllerApiFp(this.configuration).cancelCoinListingRequest(requestId, options).then((request) => request(this.axios, this.basePath));
    }
    createAllowedIp(createAllowedIpRequest, options) {
        return exports.OrganizationControllerApiFp(this.configuration).createAllowedIp(createAllowedIpRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createCoinListingRequest(createCoinListingRequestRequest, options) {
        return exports.OrganizationControllerApiFp(this.configuration).createCoinListingRequest(createCoinListingRequestRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createOrganization(createOrganizationRequest, options) {
        return exports.OrganizationControllerApiFp(this.configuration).createOrganization(createOrganizationRequest, options).then((request) => request(this.axios, this.basePath));
    }
    createSecret(options) {
        return exports.OrganizationControllerApiFp(this.configuration).createSecret(options).then((request) => request(this.axios, this.basePath));
    }
    deleteAllowedIp(allowedIpId, deleteAllowedIpRequest, options) {
        return exports.OrganizationControllerApiFp(this.configuration).deleteAllowedIp(allowedIpId, deleteAllowedIpRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getAccountByOrganizationId(options) {
        return exports.OrganizationControllerApiFp(this.configuration).getAccountByOrganizationId(options).then((request) => request(this.axios, this.basePath));
    }
    getAllOrganizations(options) {
        return exports.OrganizationControllerApiFp(this.configuration).getAllOrganizations(options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedIp(allowedIpId, options) {
        return exports.OrganizationControllerApiFp(this.configuration).getAllowedIp(allowedIpId, options).then((request) => request(this.axios, this.basePath));
    }
    getAllowedIps(pageable, options) {
        return exports.OrganizationControllerApiFp(this.configuration).getAllowedIps(pageable, options).then((request) => request(this.axios, this.basePath));
    }
    getCoinContract(blockchain, address, options) {
        return exports.OrganizationControllerApiFp(this.configuration).getCoinContract(blockchain, address, options).then((request) => request(this.axios, this.basePath));
    }
    getCoinListingRequests(options) {
        return exports.OrganizationControllerApiFp(this.configuration).getCoinListingRequests(options).then((request) => request(this.axios, this.basePath));
    }
    getOrganization(options) {
        return exports.OrganizationControllerApiFp(this.configuration).getOrganization(options).then((request) => request(this.axios, this.basePath));
    }
    inactivateAllowedIps(inactivateAllowedIpsRequest, options) {
        return exports.OrganizationControllerApiFp(this.configuration).inactivateAllowedIps(inactivateAllowedIpsRequest, options).then((request) => request(this.axios, this.basePath));
    }
    notify(notifyRequest, options) {
        return exports.OrganizationControllerApiFp(this.configuration).notify(notifyRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchAccountRole(accountId, patchAccountRoleRequest, options) {
        return exports.OrganizationControllerApiFp(this.configuration).patchAccountRole(accountId, patchAccountRoleRequest, options).then((request) => request(this.axios, this.basePath));
    }
    patchAllowedIpLabel(allowedIpId, patchAllowedIpLabelRequest, options) {
        return exports.OrganizationControllerApiFp(this.configuration).patchAllowedIpLabel(allowedIpId, patchAllowedIpLabelRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.OrganizationControllerApi = OrganizationControllerApi;
exports.WithdrawalApprovalControllerApiAxiosParamCreator = function (configuration) {
    return {
        approve: async (withdrawalApprovalId, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling approve.');
            }
            const localVarPath = `/api/v2/withdrawal-approvals/{withdrawalApprovalId}/approve`
                .replace(`{${"withdrawalApprovalId"}}`, encodeURIComponent(String(withdrawalApprovalId)));
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
        cancelApproval: async (withdrawalApprovalId, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling cancelApproval.');
            }
            const localVarPath = `/api/v2/withdrawal-approvals/{withdrawalApprovalId}/cancel-approval`
                .replace(`{${"withdrawalApprovalId"}}`, encodeURIComponent(String(withdrawalApprovalId)));
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
        cancelRejection: async (withdrawalApprovalId, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling cancelRejection.');
            }
            const localVarPath = `/api/v2/withdrawal-approvals/{withdrawalApprovalId}/cancel-rejection`
                .replace(`{${"withdrawalApprovalId"}}`, encodeURIComponent(String(withdrawalApprovalId)));
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
        createWithdrawalApproval: async (createWithdrawalApprovalRequest, options = {}) => {
            if (createWithdrawalApprovalRequest === null || createWithdrawalApprovalRequest === undefined) {
                throw new base_1.RequiredError('createWithdrawalApprovalRequest', 'Required parameter createWithdrawalApprovalRequest was null or undefined when calling createWithdrawalApproval.');
            }
            const localVarPath = `/api/v2/withdrawal-approvals`;
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
            const needsSerialization = (typeof createWithdrawalApprovalRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(createWithdrawalApprovalRequest !== undefined ? createWithdrawalApprovalRequest : {}) : (createWithdrawalApprovalRequest || "");
            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getWithdrawalApproval: async (withdrawalApprovalId, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling getWithdrawalApproval.');
            }
            const localVarPath = `/api/v2/withdrawal-approvals/{withdrawalApprovalId}`
                .replace(`{${"withdrawalApprovalId"}}`, encodeURIComponent(String(withdrawalApprovalId)));
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
        getWithdrawalApprovals: async (pageable, options = {}) => {
            if (pageable === null || pageable === undefined) {
                throw new base_1.RequiredError('pageable', 'Required parameter pageable was null or undefined when calling getWithdrawalApprovals.');
            }
            const localVarPath = `/api/v2/withdrawal-approvals`;
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
        reject: async (withdrawalApprovalId, options = {}) => {
            if (withdrawalApprovalId === null || withdrawalApprovalId === undefined) {
                throw new base_1.RequiredError('withdrawalApprovalId', 'Required parameter withdrawalApprovalId was null or undefined when calling reject.');
            }
            const localVarPath = `/api/v2/withdrawal-approvals/{withdrawalApprovalId}/reject`
                .replace(`{${"withdrawalApprovalId"}}`, encodeURIComponent(String(withdrawalApprovalId)));
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
    };
};
exports.WithdrawalApprovalControllerApiFp = function (configuration) {
    return {
        async approve(withdrawalApprovalId, options) {
            const localVarAxiosArgs = await exports.WithdrawalApprovalControllerApiAxiosParamCreator(configuration).approve(withdrawalApprovalId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async cancelApproval(withdrawalApprovalId, options) {
            const localVarAxiosArgs = await exports.WithdrawalApprovalControllerApiAxiosParamCreator(configuration).cancelApproval(withdrawalApprovalId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async cancelRejection(withdrawalApprovalId, options) {
            const localVarAxiosArgs = await exports.WithdrawalApprovalControllerApiAxiosParamCreator(configuration).cancelRejection(withdrawalApprovalId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async createWithdrawalApproval(createWithdrawalApprovalRequest, options) {
            const localVarAxiosArgs = await exports.WithdrawalApprovalControllerApiAxiosParamCreator(configuration).createWithdrawalApproval(createWithdrawalApprovalRequest, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWithdrawalApproval(withdrawalApprovalId, options) {
            const localVarAxiosArgs = await exports.WithdrawalApprovalControllerApiAxiosParamCreator(configuration).getWithdrawalApproval(withdrawalApprovalId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async getWithdrawalApprovals(pageable, options) {
            const localVarAxiosArgs = await exports.WithdrawalApprovalControllerApiAxiosParamCreator(configuration).getWithdrawalApprovals(pageable, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
        async reject(withdrawalApprovalId, options) {
            const localVarAxiosArgs = await exports.WithdrawalApprovalControllerApiAxiosParamCreator(configuration).reject(withdrawalApprovalId, options);
            return (axios = axios_1.default, basePath = base_1.BASE_PATH) => {
                const axiosRequestArgs = Object.assign(Object.assign({}, localVarAxiosArgs.options), { url: basePath + localVarAxiosArgs.url });
                return axios.request(axiosRequestArgs);
            };
        },
    };
};
exports.WithdrawalApprovalControllerApiFactory = function (configuration, basePath, axios) {
    return {
        approve(withdrawalApprovalId, options) {
            return exports.WithdrawalApprovalControllerApiFp(configuration).approve(withdrawalApprovalId, options).then((request) => request(axios, basePath));
        },
        cancelApproval(withdrawalApprovalId, options) {
            return exports.WithdrawalApprovalControllerApiFp(configuration).cancelApproval(withdrawalApprovalId, options).then((request) => request(axios, basePath));
        },
        cancelRejection(withdrawalApprovalId, options) {
            return exports.WithdrawalApprovalControllerApiFp(configuration).cancelRejection(withdrawalApprovalId, options).then((request) => request(axios, basePath));
        },
        createWithdrawalApproval(createWithdrawalApprovalRequest, options) {
            return exports.WithdrawalApprovalControllerApiFp(configuration).createWithdrawalApproval(createWithdrawalApprovalRequest, options).then((request) => request(axios, basePath));
        },
        getWithdrawalApproval(withdrawalApprovalId, options) {
            return exports.WithdrawalApprovalControllerApiFp(configuration).getWithdrawalApproval(withdrawalApprovalId, options).then((request) => request(axios, basePath));
        },
        getWithdrawalApprovals(pageable, options) {
            return exports.WithdrawalApprovalControllerApiFp(configuration).getWithdrawalApprovals(pageable, options).then((request) => request(axios, basePath));
        },
        reject(withdrawalApprovalId, options) {
            return exports.WithdrawalApprovalControllerApiFp(configuration).reject(withdrawalApprovalId, options).then((request) => request(axios, basePath));
        },
    };
};
class WithdrawalApprovalControllerApi extends base_1.BaseAPI {
    approve(withdrawalApprovalId, options) {
        return exports.WithdrawalApprovalControllerApiFp(this.configuration).approve(withdrawalApprovalId, options).then((request) => request(this.axios, this.basePath));
    }
    cancelApproval(withdrawalApprovalId, options) {
        return exports.WithdrawalApprovalControllerApiFp(this.configuration).cancelApproval(withdrawalApprovalId, options).then((request) => request(this.axios, this.basePath));
    }
    cancelRejection(withdrawalApprovalId, options) {
        return exports.WithdrawalApprovalControllerApiFp(this.configuration).cancelRejection(withdrawalApprovalId, options).then((request) => request(this.axios, this.basePath));
    }
    createWithdrawalApproval(createWithdrawalApprovalRequest, options) {
        return exports.WithdrawalApprovalControllerApiFp(this.configuration).createWithdrawalApproval(createWithdrawalApprovalRequest, options).then((request) => request(this.axios, this.basePath));
    }
    getWithdrawalApproval(withdrawalApprovalId, options) {
        return exports.WithdrawalApprovalControllerApiFp(this.configuration).getWithdrawalApproval(withdrawalApprovalId, options).then((request) => request(this.axios, this.basePath));
    }
    getWithdrawalApprovals(pageable, options) {
        return exports.WithdrawalApprovalControllerApiFp(this.configuration).getWithdrawalApprovals(pageable, options).then((request) => request(this.axios, this.basePath));
    }
    reject(withdrawalApprovalId, options) {
        return exports.WithdrawalApprovalControllerApiFp(this.configuration).reject(withdrawalApprovalId, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.WithdrawalApprovalControllerApi = WithdrawalApprovalControllerApi;
//# sourceMappingURL=api.js.map