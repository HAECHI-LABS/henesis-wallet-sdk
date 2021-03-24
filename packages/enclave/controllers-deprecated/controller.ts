import express from "express";
import { MiddleWare } from "../src/types";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import url, { UrlWithStringQuery } from "url";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import BN from "bn.js";
import {
  ErrorCode,
  HttpStatus,
} from "@haechi-labs/henesis-wallet-core/lib/error";

export default abstract class AbstractController {
  protected router = express.Router();

  protected abstract initRoutes();

  protected promiseWrapper(
    promiseRequestHandler: Function,
    successStatusCode?: number
  ): MiddleWare {
    const self = this;

    return function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      Promise.resolve(promiseRequestHandler.bind(self, req, res, next)())
        .then((result) => {
          const status: number = successStatusCode || 200;
          if (result) {
            return res.status(status).send(result);
          }
          return res.sendStatus(status);
        })
        .catch((error) => {
          try {
            const err = self.parseError(error.response.data);
            const result = self.parseErrorMessage(err.message);
            const status = error.response.status || 500;
            res.status(status).json(result);
          } catch (e) {
            const errorMessage = error.message;
            const httpStatus =
              error.httpStatus || HttpStatus.INTERNAL_SERVER_ERROR;
            const errorCode = error.errorCode || ErrorCode.INTERNAL_SERVER;
            res.status(httpStatus).json({
              error: {
                message: errorMessage,
                code: errorCode,
              },
            });
          }
        });
    };
  }

  private parseError(error: any): any {
    if (error instanceof Error) {
      return error;
    }
    if (typeof error === "string") {
      return new Error(error);
    }
    return new Error(JSON.stringify(error));
  }

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

  private parseErrorMessage(message: string): any {
    try {
      return JSON.parse(message);
    } catch (e) {
      return { error: message };
    }
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

  getRoutes(): express.Router {
    return this.router;
  }
}
