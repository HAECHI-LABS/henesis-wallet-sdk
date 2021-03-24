import express from "express";
import {
  ErrorCode,
  HttpStatus,
} from "@haechi-labs/henesis-wallet-core/lib/error";

export default (
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    console.log(error);
    const err = parseError(error.response.data);
    const result = parseErrorMessage(error.message);
    const status = error.response.status || 500;
    res.status(status).json(result);
  } catch (e) {
    const errorMessage = error.message;
    const httpStatus = error.httpStatus || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorCode = error.errorCode || ErrorCode.INTERNAL_SERVER;
    res.status(httpStatus).json({
      error: {
        message: errorMessage,
        code: errorCode,
      },
    });
  }
  next();
};

function parseError(error: any): any {
  if (error instanceof Error) {
    return error;
  }
  if (typeof error === "string") {
    return new Error(error);
  }
  return new Error(JSON.stringify(error));
}

function parseErrorMessage(message: string): any {
  try {
    return JSON.parse(message);
  } catch (e) {
    return { error: message };
  }
}
