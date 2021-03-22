import { Client } from "./httpClient";
import { Env } from "./sdk";

export type ModuleOptions = {
  client: Client;
  env: Env;
};
