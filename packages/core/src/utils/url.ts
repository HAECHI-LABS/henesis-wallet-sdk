import { Env } from "../sdk";
import { BlockchainType } from "../blockchain";
import { toSnakeCase } from "./string";

export const baseUrls = new Map<Env, string>();
baseUrls.set(Env.Local, "http://localhost:8080/api/v1");
baseUrls.set(Env.Test, "https://test.wallet.henesis.io/api/v1");
baseUrls.set(Env.Dev, "https://dev.wallet.henesis.io/api/v1");
baseUrls.set(Env.Prod, "https://wallet.henesis.io/api/v1");

export const makePrefixPathByBlockchainType = (blockchain?: BlockchainType) => {
  if (!blockchain) {
    return "";
  }
  const blockchainByType: Record<BlockchainType, string> = {
    [BlockchainType.Ethereum]: "/eth",
    [BlockchainType.Klaytn]: "/klay",
    [BlockchainType.BitCoin]: "/btc",
  };
  return blockchainByType[blockchain];
};

export const makeQueryString = (options?: object) => {
  if (!options) {
    return "";
  }
  return Object.keys(options)
    .filter((key) => !!options[key])
    .map((key) => `${toSnakeCase(key)}=${options[key]}`)
    .join("&");
};
