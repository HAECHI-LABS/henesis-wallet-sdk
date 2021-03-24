import express from "express";
import url, { UrlWithStringQuery } from "url";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import { Controller } from "tsoa";
import { Pagination } from "./types";

export default abstract class AbstractController extends Controller {
  protected pagination<T>(
    req: express.Request,
    paginationObject: Pagination<T>
  ): Pagination<T | any> {
    return {
      pagination: {
        nextUrl:
          paginationObject.pagination.nextUrl !== null
            ? this.parsePaginationUrl(
                req,
                url.parse(paginationObject.pagination.nextUrl)
              )
            : null,
        previousUrl:
          paginationObject.pagination.previousUrl !== null
            ? this.parsePaginationUrl(
                req,
                url.parse(paginationObject.pagination.previousUrl)
              )
            : null,
        totalCount: paginationObject.pagination.totalCount,
      },
      results: paginationObject.results,
    };
  }

  protected bnToHexString<T>(convertObj: T): any {
    if (Array.isArray(convertObj)) {
      return convertObj.map((i) => this.bnToHexString(i));
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
          n[k] = this.bnToHexString(convertObj[k]);
          return;
        }
        n[k] = convertObj[k];
      });
      return n;
    }
    return convertObj;
  }

  private parsePaginationUrl(
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
}
