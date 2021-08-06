import { Env } from "../sdk";
import { BlockchainType } from "../blockchain";
import { toSnakeCase } from "./string";

export const baseUrls = new Map<Env, string>();
baseUrls.set(Env.Local, "http://localhost:8080/api/v2");
baseUrls.set(Env.Test, "https://test.wallet.henesis.io/api/v2");
baseUrls.set(Env.Dev, "https://dev.wallet.henesis.io/api/v2");
baseUrls.set(Env.Prod, "https://wallet.henesis.io/api/v2");

export const removePrefixApi = (url: string) => {
  return url.replace("/api/v2", "");
};

export const makePrefixPathByBlockchainType = (blockchain?: BlockchainType) => {
  if (!blockchain) {
    return "";
  }
  const blockchainByType: Record<BlockchainType, string> = {
    [BlockchainType.ETHEREUM]: "/eth",
    [BlockchainType.KLAYTN]: "/klay",
    [BlockchainType.BITCOIN]: "/btc",
    [BlockchainType.LITECOIN]: "/ltc",
    [BlockchainType.FILECOIN]: "/fil",
    [BlockchainType.BINANCE_SMART_CHAIN]: "/bsc",
  };
  return blockchainByType[blockchain];
};

export const makeQueryString = (options?: object) => {
  if (!options) {
    return "";
  }
  return Object.keys(options)
    .filter((key) => options[key] !== undefined && options[key] !== null)
    .map((key) => `${toSnakeCase(key)}=${options[key]}`)
    .join("&");
};
