import chalk from "chalk";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";

import { ObjectConverter } from "./utils/common";
import { BlockchainType } from "./blockchain";
import { makePrefixPathByBlockchainType, removePrefixApi } from "./utils/url";
import { Env } from "./sdk";
import { syntaxHighlight } from "./utils/chalk";

const packageJson = require("../package.json");

export interface ClientOptions {
  accessToken: string;
  secret: string;
  url: string;
  env: Env;
}

export interface Client {
  get<T = any>(url: string): Promise<T>;

  delete<T = any>(url: string, config?: any): Promise<T>;

  options<T = any>(url: string): Promise<T>;

  post<T = any>(url: string, data?: any): Promise<T>;

  put<T = any>(url: string, data?: any): Promise<T>;

  patch<T = any>(url: string, data?: any): Promise<T>;
}

export const isSuccessStatus = (status: number) => {
  return status >= 200 && status < 300;
};

export class HttpClient {
  private readonly baseUrl: string;

  private readonly client: AxiosInstance;

  private readonly apiClient: AxiosInstance;

  private readonly billingApiClient: AxiosInstance;

  private readonly accessToken: string;

  private readonly secret: string;

  private readonly env: Env;

  constructor(options: ClientOptions) {
    this.baseUrl = options.url;
    this.secret = options.secret;
    this.accessToken = options.accessToken;
    this.env = options.env;
    this.client = this.makeSDKClient();
    this.apiClient = this.makeApiClient("");
    this.billingApiClient = this.makeApiClient("/billings");
    return new AxiosMethodProxy(this, this.client) as any;
  }

  private makeSDKClient(): AxiosInstance {
    const client = this.makeClient();
    client.interceptors.request.use((config) => {
      config.data = ObjectConverter.toSnakeCase(config.data);
      return config;
    });

    client.interceptors.response.use(
      (response) => {
        if (response.data) {
          return ObjectConverter.toCamelCase(response.data);
        }
        return response;
      },
      (error) => {
        if (error.response) {
          error.response.data = ObjectConverter.toCamelCase(
            error.response.data
          );
        }
        return Promise.reject(error);
      }
    );
    return client;
  }

  private makeApiClient(prefixPath: string): AxiosInstance {
    const client = this.makeClient();
    client.defaults.baseURL =
      removePrefixApi(client.defaults.baseURL) + prefixPath;
    client.interceptors.request.use((config) => {
      if (config.data) {
        const dataObj = JSON.parse(config.data);
        config.data = ObjectConverter.toSnakeCase(dataObj);
      }
      return config;
    });

    client.interceptors.response.use(
      (response) => {
        if (response.data) {
          response.data = ObjectConverter.toCamelCase(response.data);
        }
        return response;
      },
      (error) => {
        if (error.response) {
          error.response.data = ObjectConverter.toCamelCase(
            error.response.data
          );
        }
        return Promise.reject(error);
      }
    );
    return client;
  }

  private makeClient(): AxiosInstance {
    const client = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      validateStatus(status) {
        return isSuccessStatus(status); // default
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
        const path =
          config.baseURL + config.url + (config.params ? config.params : "");
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
    if ([Env.Local].some((env) => env === this.env)) {
      client.interceptors.response.use(
        (response) => {
          const apiLogging = makeAPILogging(response);
          console.log(
            chalk.green(`Response Status : ${apiLogging.response.status}`)
          );
          console.log(syntaxHighlight(apiLogging));
          return response;
        },
        (error) => {
          if (error.response) {
            const apiLogging = makeAPILogging(error.response);
            console.log(
              chalk.red(`Error Status : ${apiLogging.response.status}`)
            );
            console.log(syntaxHighlight(apiLogging));
          }
          return Promise.reject(error);
        }
      );
    }
    return client;
  }

  createSig(message: string): string {
    return Base64.stringify(hmacSHA256(message, this.secret));
  }
}

export const enhancedBlockchainClient = (
  client: Client,
  blockchain: BlockchainType
): Client => {
  const prefixPath = makePrefixPathByBlockchainType(blockchain);
  return enhancedPrefixClient(client, prefixPath);
};

export const enhancedPrefixClient = (
  client: Client,
  prefixPath: string
): Client => {
  return {
    ...client,
    get<T = any>(url: string): Promise<T> {
      return client.get(`${prefixPath}${url}`);
    },
    delete<T = any>(url: string, config?: any): Promise<T> {
      return client.delete(`${prefixPath}${url}`, config);
    },
    options<T = any>(url: string): Promise<T> {
      return client.options(`${prefixPath}${url}`);
    },
    post<T = any>(url: string, data?: any): Promise<T> {
      return client.post(`${prefixPath}${url}`, data);
    },
    put<T = any>(url: string, data?: any): Promise<T> {
      return client.put(`${prefixPath}${url}`, data);
    },
    patch<T = any>(url: string, data?: any): Promise<T> {
      return client.patch(`${prefixPath}${url}`, data);
    },
  };
};

export const makeAPILogging = (source?: AxiosResponse) => {
  if (!source) {
    return;
  }
  const DEFAULT_CONTENT_TYPES_RX = /^(image)\/.*$/i;
  const ignoreContentTypes = DEFAULT_CONTENT_TYPES_RX;
  const config = source.config || {};

  const request = {
    url: `${config.baseURL ?? ""}${config.url}`,
    method: config.method,
    data: config.data || null,
    headers: config.headers,
    params: config.params || null,
  };
  const responseHeaders = source.headers || {};
  const contentType =
    responseHeaders["content-type"] || responseHeaders["Content-Type"];
  const useRealBody =
    (typeof source.data === "string" || typeof source.data === "object") &&
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
  constructor(target, axiosInstance: AxiosInstance) {
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
