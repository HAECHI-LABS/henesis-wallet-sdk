import express from 'express';
import { MiddleWare } from '../types';
import { Pagination } from '@haechi-labs/henesis-wallet-core/lib/types';
import url, { UrlWithStringQuery } from 'url';

export default abstract class AbstractController {
  protected router = express.Router();

  protected abstract initRoutes();

  protected promiseWrapper(
    promiseRequestHandler: Function,
    successStatusCode?: number,
  ): MiddleWare {
    const self = this;

    return function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
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
            if (status === 500) {
              console.log(err.stack);
            } else if (!(status >= 200 && status < 300)) {
              console.log(`Error : status ${status}
${err.message}`);
            }
            res.status(status).json(result);
          } catch (e) {
            console.log(error);
            res.status(500).json(self.parseErrorMessage(error.toString()));
          }
        });
    };
  }

  protected pagination<T>(
    req: express.Request,
    paginationObject: Pagination<T>,
  ): Pagination<T | any> {
    return {
      pagination: {
        nextUrl:
          paginationObject.pagination.nextUrl !== null
            ? this.parsePaginationUrl(
                req,
                url.parse(paginationObject.pagination.nextUrl),
              )
            : null,
        previousUrl:
          paginationObject.pagination.previousUrl !== null
            ? this.parsePaginationUrl(
                req,
                url.parse(paginationObject.pagination.previousUrl),
              )
            : null,
        totalCount: paginationObject.pagination.totalCount,
      },
      results: paginationObject.results,
    };
  }

  private parseError(error: any): any {
    if (error instanceof Error) {
      return error;
    }
    if (typeof error === 'string') {
      return new Error(error);
    }
    return new Error(JSON.stringify(error));
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
    url: UrlWithStringQuery | null,
  ): string | null {
    if (!url) {
      return null;
    }
    const host: { name: string; port: string } = {
      name: req.get('host').split(':')[0],
      port: req.get('host').split(':')[1] ?? null,
    };
    return `${req.protocol}://${host.name}${!host.port ? '' : `:${host.port}`}${
      url.path
    }`;
  }

  public getRoutes(): express.Router {
    return this.router;
  }
}
