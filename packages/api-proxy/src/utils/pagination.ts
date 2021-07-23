import { PaginationMeta } from "@haechi-labs/henesis-wallet-core/lib/paginationMeta";
import express from "express";

const makePaginationQueryString = (options?: object) => {
  if (!options) {
    return "";
  }
  const queryString = Object.keys(options)
    .filter((key) => options[key] !== undefined)
    .filter((key) => key !== "page")
    .map((key) => `${key}=${options[key]}`)
    .join("&");

  return `${queryString ? `?${queryString}` : ""}`;
};

const nextUrl = (
  path: string,
  totalCount: number,
  page: number,
  size: number,
  options?: object
) => {
  return totalCount / size > ++page
    ? `${path}${makePaginationQueryString(options)}&page=${page}`
    : null;
};

const previousUrl = (
  path: string,
  totalCount: number,
  page: number,
  options?: object
) => {
  return page-- != 0
    ? `${path}${makePaginationQueryString(options)}&page=${page}`
    : null;
};

export function getPaginationMeta(
  path: string,
  page: number,
  size: number,
  totalCount: number,
  options?: object
): PaginationMeta {
  const next = nextUrl(path, totalCount, page, size, options);
  const previous = previousUrl(path, totalCount, page, options);
  return {
    nextUrl: next,
    previousUrl: previous,
    totalCount: totalCount,
  };
}

export function getBaseUrlWithPath(request: express.Request) {
  return `${request.protocol}://${request.headers.host}${request.path}`;
}
