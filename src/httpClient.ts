import axios, { AxiosInstance } from "axios";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";

import { ObjectConverter } from "./utils/common";
import { BlockchainType } from "./blockchain";
import { makePrefixPathByBlockchainType, removePrefixApi } from "./utils/url";

const packageJson = require("../package.json");

export interface ClientOptions {
  accessToken: string;
  secret: string;
  url: string;
}

export interface Client {
  get<T = any>(url: string): Promise<T>;

  delete<T = any>(url: string, config?: any): Promise<T>;

  options<T = any>(url: string): Promise<T>;

  post<T = any>(url: string, data?: any): Promise<T>;

  put<T = any>(url: string, data?: any): Promise<T>;

  patch<T = any>(url: string, data?: any): Promise<T>;
}

export class HttpClient {
  private readonly baseUrl: string;

  private readonly client: AxiosInstance;

  private readonly apiClient: AxiosInstance;

  private readonly accessToken: string;

  private readonly secret: string;

  constructor(options: ClientOptions) {
    this.baseUrl = options.url;
    this.secret = options.secret;
    this.accessToken = options.accessToken;
    this.client = this.makeSDKClient();
    this.apiClient = this.makeApiClient();
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

  private makeApiClient(): AxiosInstance {
    const client = this.makeClient();
    client.defaults.baseURL = removePrefixApi(client.defaults.baseURL);
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
        return error;
      }
    );
    return client;
  }

  private makeClient(): AxiosInstance {
    const client = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      validateStatus(status) {
        return status >= 200 && status < 300; // default
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

class AxiosMethodProxy {
  constructor(target, axiosInstance: AxiosInstance) {
    return new Proxy(target, {
      get: (target, name) => {
        const method = axiosInstance[name];
        if (method === undefined) {
          return target[name];
        }

        function ProxyMethod() {
          return method.apply(axiosInstance, arguments);
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
