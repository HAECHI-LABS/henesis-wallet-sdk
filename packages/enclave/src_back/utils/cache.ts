import { CacheStrategy, CacheStrategyContext } from "@type-cacheable/core";

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
