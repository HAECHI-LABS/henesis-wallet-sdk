import axios, { AxiosInstance } from 'axios';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { Converter } from './utils';
import { Env } from './sdk';

export interface ClientOptions {
  accessToken: string;
  secret: string;
  url?: string;
  env?: Env;
}

export class HttpClient {
  private readonly baseUrl: string = 'http://wallet-test.henesis.io/api/v1';

  private readonly client: AxiosInstance;

  private readonly accessToken: string;

  private readonly secret: string;

  constructor(params: ClientOptions) {
    if (params.url !== null) {
      this.baseUrl = params.url;
    }
    this.secret = params.secret;
    this.accessToken = params.accessToken;
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      validateStatus(status) {
        return status >= 200 && status < 300; // default
      },
    });

    this.client.interceptors.request.use((config) => {
      config.headers['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }

      const timestamp = Date.now();
      if (this.secret) {
        const body = JSON.stringify(config.data);
        const message = timestamp + body;
        config.headers['X-Henesis-Signature'] = this.createSig(message);
      }
      config.headers['X-Henesis-Timestamp'] = timestamp;
      return config;
    });

    this.client.interceptors.request.use((config) => {
      config.data = Converter.toSnakeCase(config.data);
      return config;
    });

    this.client.interceptors.response.use((response) => {
      if (response.data) {
        return Converter.toCamelCase(response.data);
      }
      return response;
    }, (error) => {
      if (error.response) {
        return Promise.reject(Converter.toCamelCase(error.response.data));
      }
      return Promise.reject(error);
    });

    return new AxiosMethodProxy(this, this.client) as any;
  }

  // todo: implement sign
  createSig(message: string): string {
    return Base64.stringify(hmacSHA256(message, this.secret));
  }
}

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
