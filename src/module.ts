import { Client, Env } from "./sdk";

export interface ModuleOptions {
  client: Client;
  env: Env;
}

export abstract class SubModule {
  abstract getBaseUrl(): string
}