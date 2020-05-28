import axios, { AxiosInstance } from 'axios';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

import { ObjectConverter } from './utils';
import { BlockchainType } from './blockchain';
import { makePrefixPathByBlockchainType } from './url';

export interface ClientOptions {
  accessToken: string;
  secret: string;
  url: string;
}

export interface Client {
  get<T = any>(url: string): Promise<T>;

  delete<T = any>(url: string): Promise<T>;

  options<T = any>(url: string): Promise<T>;

  post<T = any>(url: string, data?: any): Promise<T>;

  put<T = any>(url: string, data?: any): Promise<T>;

  patch<T = any>(url: string, data?: any): Promise<T>;
}

export class HttpClient {
  private readonly baseUrl: string;

  private readonly client: AxiosInstance;

  private readonly accessToken: string;

  private readonly secret: string;

  constructor(options: ClientOptions) {
    this.baseUrl = options.url;
    this.secret = options.secret;
    this.accessToken = options.accessToken;
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      validateStatus(status) {
        return status >= 200 && status < 300; // default
      },
    });

    this.client.interceptors.request.use(config => {
      config.headers['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }

      const timestamp = Date.now();
      if (this.secret) {
        let body = '';
        if (config.data) {
          body = JSON.stringify(config.data);
        }
        const path =
          config.baseURL + config.url + (config.params ? config.params : '');
        const message = config.method.toUpperCase() + path + body + timestamp;
        config.headers['X-Henesis-Signature'] = this.createSig(message);
      }
      config.headers['X-Henesis-Timestamp'] = timestamp;
      return config;
    });

    this.client.interceptors.request.use(config => {
      config.data = ObjectConverter.toSnakeCase(config.data);
      return config;
    });

    this.client.interceptors.response.use(
      response => {
        if (response.data) {
          return ObjectConverter.toCamelCase(response.data);
        }
        return response;
      },
      error => {
        if (error.response) {
          return Promise.reject(
            ObjectConverter.toCamelCase(error.response.data),
          );
        }
        return Promise.reject(error);
      },
    );

    return new AxiosMethodProxy(this, this.client) as any;
  }

  createSig(message: string): string {
    return Base64.stringify(hmacSHA256(message, this.secret));
  }
}

export const enhancedBlockchainClient = (
  client: Client,
  blockchain: BlockchainType,
): Client => {
  const prefixPath = makePrefixPathByBlockchainType(blockchain);
  return {
    get<T = any>(url: string): Promise<T> {
      return client.get(`${url}${prefixPath}`);
    },
    delete<T = any>(url: string): Promise<T> {
      return client.delete(`${url}${prefixPath}`);
    },
    options<T = any>(url: string): Promise<T> {
      return client.delete(`${url}${prefixPath}`);
    },
    post<T = any>(url: string, data?: any): Promise<T> {
      return client.post(`${url}${prefixPath}`, data);
    },
    put<T = any>(url: string, data?: any): Promise<T> {
      return client.put(`${url}${prefixPath}`, data);
    },
    patch<T = any>(url: string, data?: any): Promise<T> {
      return client.patch(`${url}${prefixPath}`, data);
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
        ProxyMethod.request = function() {
          return method;
        };

        return ProxyMethod;
      },
    });
  }
}
