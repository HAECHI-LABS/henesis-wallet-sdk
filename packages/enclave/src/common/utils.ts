import express from "express";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import url, { UrlWithStringQuery } from "url";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import { CacheStrategy, CacheStrategyContext } from "@type-cacheable/core";

export function pagination<T>(
  req: express.Request,
  paginationObject: Pagination<T>
): Pagination<T | any> {
  return {
    pagination: {
      nextUrl:
        paginationObject.pagination.nextUrl !== null
          ? parsePaginationUrl(
              req,
              url.parse(paginationObject.pagination.nextUrl)
            )
          : null,
      previousUrl:
        paginationObject.pagination.previousUrl !== null
          ? parsePaginationUrl(
              req,
              url.parse(paginationObject.pagination.previousUrl)
            )
          : null,
      totalCount: paginationObject.pagination.totalCount,
    },
    results: paginationObject.results,
  };
}

export function bnToHexString<T>(convertObj: T): any {
  if (Array.isArray(convertObj)) {
    return convertObj.map((i) => bnToHexString(i));
  }

  if (typeof convertObj === "object") {
    if (!convertObj) {
      return null;
    }
    const n = {};

    Object.keys(convertObj).forEach((k) => {
      if (!convertObj[k]) {
        n[k] = convertObj[k];
        return;
      }
      if (convertObj[k].constructor["name"] === "BN") {
        n[k] = BNConverter.bnToHexString(convertObj[k]);
        return;
      }
      if (typeof convertObj[k] === "object") {
        n[k] = bnToHexString(convertObj[k]);
        return;
      }
      n[k] = convertObj[k];
    });
    return n;
  }
  return convertObj;
}

export type CacheFilter = (value) => boolean;

// referenced at https://github.com/joshuaslate/type-cacheable/blob/main/packages/core/lib/strategies/DefaultStrategy.ts
export class DefaultFilterCacheStrategy implements CacheStrategy {
  private readonly filter: CacheFilter;

  constructor(filter: CacheFilter) {
    this.filter = filter;
  }

  async handle(context: CacheStrategyContext): Promise<any> {
    try {
      const cachedValue = await context.client.get(context.key);

      // If a value for the cacheKey was found in cache, simply return that.
      if (cachedValue !== undefined && cachedValue !== null) {
        return cachedValue;
      }
    } catch (err) {
      if (context.fallbackClient) {
        try {
          const cachedValue = await context.fallbackClient.get(context.key);

          // If a value for the cacheKey was found in cache, simply return that.
          if (cachedValue !== undefined && cachedValue !== null) {
            return cachedValue;
          }
        } catch (err) {}
      }

      if (context.debug) {
        console.warn(
          `type-cacheable Cacheable cache miss on method ${context.originalMethod.name} due to client error: ${err.message}`
        );
      }
    }

    // On a cache miss, run the decorated method and cache its return value.
    const result = await context.originalMethod!.apply(
      context.originalMethodScope,
      context.originalMethodArgs
    );
    if (!this.filter(result)) {
      return result;
    }

    try {
      await context.client.set(context.key, result, context.ttl);
    } catch (err) {
      if (context.fallbackClient) {
        try {
          await context.fallbackClient.set(context.key, result, context.ttl);
        } catch (err) {}
      }

      if (context.debug) {
        console.warn(
          `type-cacheable Cacheable set cache failure on method ${context.originalMethod.name} due to client error: ${err.message}`
        );
      }
    }

    return result;
  }
}

function parsePaginationUrl(
  req: express.Request,
  url: UrlWithStringQuery | null
): string | null {
  if (!url) {
    return null;
  }
  const host: { name: string; port: string } = {
    name: req.get("host").split(":")[0],
    port: req.get("host").split(":")[1] ?? null,
  };
  return `${req.protocol}://${host.name}${!host.port ? "" : `:${host.port}`}${
    url.path
  }`;
}

function parseErrorMessage(message: string): any {
  try {
    return JSON.parse(message);
  } catch (e) {
    return { error: message };
  }
}
