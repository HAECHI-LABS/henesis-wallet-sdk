import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import pjson from '../package.json';

export interface SDKOptions {
  accessToken: string;
  secret: string;
}

export class SDK {
  private readonly baseUrl: string = 'https://wallet.henesis.io';
  private readonly accessToken: string;
  private readonly secret: string;
  private readonly version: string;
  private readonly wallets: any;
  private readonly client: AxiosInstance;

  // todo: validation params;
  constructor(params: SDKOptions) {
    this.secret = params.secret;
    this.accessToken = params.accessToken;
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
    });

    this.version = pjson.version;
    this.client.interceptors.request.use(config => {
      config.headers['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
      config.headers['X-Henesis-SDK-Version'] = this.version;
      config.headers['Authorization'] = 'Bearer ' + this.accessToken;

      const timestamp = Date.now();
      const body = JSON.stringify(config.data);
      const message = timestamp + body;
      config.headers['X-Henesis-Signature'] = this.createSig(message);
      config.headers['X-Henesis-Timestamp'] = timestamp;
      return config;
    });
  }

  // todo: implement sign
  createSig(message: String): String {
    return message;
  }
}