import { Client } from "./httpClient";
import { Env } from "./sdk";

export interface ModuleOptions {
  client: Client;
  env: Env;
}
