import { Client } from "src/httpClient";
import { Env } from "src/sdk";

export interface ModuleOptions {
  client: Client;
  env: Env;
}
