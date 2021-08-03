import express from "express";
import { toCamelCase } from "@haechi-labs/henesis-wallet-core/lib/utils/string";

export function changeUrlHost(url: string, request: express.Request) {
  if (url == undefined) {
    return url;
  }
  const index = url.indexOf("?");
  return `${request.protocol}://${request.headers.host}${request.path}${toCamelCase(url.slice(index))}`;
}
