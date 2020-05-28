import { Env } from './sdk';
import { Client } from './httpClient';

export interface ModuleOptions {
  client: Client;
  env: Env;
}
