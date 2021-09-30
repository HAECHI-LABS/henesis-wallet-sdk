"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAPILogging = exports.enhancedBlockchainClient = exports.HttpClient = void 0;
const chalk_1 = __importDefault(require("chalk"));
const axios_1 = __importDefault(require("axios"));
const hmac_sha256_1 = __importDefault(require("crypto-js/hmac-sha256"));
const enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
const common_1 = require("./utils/common");
const url_1 = require("./utils/url");
const chalk_2 = require("./utils/chalk");
const packageJson = require("../package.json");
class HttpClient {
    constructor(options) {
        this.baseUrl = options.url;
        this.secret = options.secret;
        this.accessToken = options.accessToken;
        this.env = options.env;
        this.client = this.makeSDKClient();
        this.apiClient = this.makeApiClient();
        return new AxiosMethodProxy(this, this.client);
    }
    makeSDKClient() {
        const client = this.makeClient();
        client.interceptors.request.use((config) => {
            config.data = common_1.ObjectConverter.toSnakeCase(config.data);
            return config;
        });
        client.interceptors.response.use((response) => {
            if (response.data) {
                return common_1.ObjectConverter.toCamelCase(response.data);
            }
            return response;
        }, (error) => {
            if (error.response) {
                error.response.data = common_1.ObjectConverter.toCamelCase(error.response.data);
            }
            return Promise.reject(error);
        });
        return client;
    }
    makeApiClient() {
        const client = this.makeClient();
        client.defaults.baseURL = url_1.removePrefixApi(client.defaults.baseURL);
        client.interceptors.request.use((config) => {
            if (config.data) {
                const dataObj = JSON.parse(config.data);
                config.data = common_1.ObjectConverter.toSnakeCase(dataObj);
            }
            return config;
        });
        client.interceptors.response.use((response) => {
            if (response.data) {
                response.data = common_1.ObjectConverter.toCamelCase(response.data);
            }
            return response;
        }, (error) => {
            if (error.response) {
                error.response.data = common_1.ObjectConverter.toCamelCase(error.response.data);
            }
            return error;
        });
        return client;
    }
    makeClient() {
        const client = axios_1.default.create({
            baseURL: this.baseUrl,
            timeout: 30000,
            validateStatus(status) {
                return status >= 200 && status < 300;
            },
        });
        client.interceptors.request.use((config) => {
            config.headers["If-Modified-Since"] = "Mon, 26 Jul 1997 05:00:00 GMT";
            if (this.accessToken) {
                config.headers.Authorization = `Bearer ${this.accessToken}`;
            }
            const timestamp = Date.now();
            if (this.secret) {
                let body = "";
                if (config.data) {
                    body =
                        typeof config.data !== "string"
                            ? JSON.stringify(config.data)
                            : config.data;
                }
                const path = config.baseURL + config.url + (config.params ? config.params : "");
                const message = config.method.toUpperCase() + path + body + timestamp;
                config.headers["X-Henesis-Signature"] = this.createSig(message);
            }
            config.headers["X-Henesis-Timestamp"] = timestamp;
            config.headers["X-Henesis-User-Agent"] =
                typeof window !== "undefined"
                    ? window.navigator.userAgent
                    : `HenesisWallet/${packageJson.version}`;
            return config;
        });
        if ([0].some((env) => env === this.env)) {
            client.interceptors.response.use((response) => {
                const apiLogging = exports.makeAPILogging(response);
                console.log(chalk_1.default.green(`Status : ${apiLogging.response.status}`));
                console.log(chalk_2.syntaxHighlight(apiLogging));
                return response;
            }, (error) => {
                if (error.response) {
                    const apiLogging = exports.makeAPILogging(error.response);
                    console.log(chalk_1.default.red(`Status : ${apiLogging.response.status}`));
                    console.log(chalk_2.syntaxHighlight(apiLogging));
                }
                return Promise.reject(error);
            });
        }
        return client;
    }
    createSig(message) {
        return enc_base64_1.default.stringify(hmac_sha256_1.default(message, this.secret));
    }
}
exports.HttpClient = HttpClient;
exports.enhancedBlockchainClient = (client, blockchain) => {
    const prefixPath = url_1.makePrefixPathByBlockchainType(blockchain);
    return Object.assign(Object.assign({}, client), { get(url) {
            return client.get(`${prefixPath}${url}`);
        },
        delete(url, config) {
            return client.delete(`${prefixPath}${url}`, config);
        },
        options(url) {
            return client.options(`${prefixPath}${url}`);
        },
        post(url, data) {
            return client.post(`${prefixPath}${url}`, data);
        },
        put(url, data) {
            return client.put(`${prefixPath}${url}`, data);
        },
        patch(url, data) {
            return client.patch(`${prefixPath}${url}`, data);
        } });
};
exports.makeAPILogging = (source) => {
    var _a;
    if (!source) {
        return;
    }
    const DEFAULT_CONTENT_TYPES_RX = /^(image)\/.*$/i;
    const ignoreContentTypes = DEFAULT_CONTENT_TYPES_RX;
    const config = source.config || {};
    const request = {
        url: `${(_a = config.baseURL) !== null && _a !== void 0 ? _a : ""}${config.url}`,
        method: config.method,
        data: config.data || null,
        headers: config.headers,
        params: config.params || null,
    };
    const responseHeaders = source.headers || {};
    const contentType = responseHeaders["content-type"] || responseHeaders["Content-Type"];
    const useRealBody = (typeof source.data === "string" || typeof source.data === "object") &&
        !ignoreContentTypes.test(contentType || "");
    const body = useRealBody ? source.data : `~~~ skipped ~~~`;
    const response = {
        body,
        status: source.status,
        headers: responseHeaders,
    };
    return {
        request,
        response,
    };
};
class AxiosMethodProxy {
    constructor(target, axiosInstance) {
        return new Proxy(target, {
            get: (target, name) => {
                const method = axiosInstance[name];
                if (method === undefined) {
                    return target[name];
                }
                function ProxyMethod(...args) {
                    return method.apply(axiosInstance, args);
                }
                ProxyMethod.method = method;
                ProxyMethod.request = function () {
                    return method;
                };
                return ProxyMethod;
            },
        });
    }
}
//# sourceMappingURL=httpClient.js.map