export enum HttpStatus {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorCode {
  BAD_REQUEST = 4000,
  INVALID_PASSWORD = 4003,
  INTERNAL_SERVER = 5000,
}

export type PropertyErrorParse = {
  name: string;
  type: string;
};

export class HenesisError extends Error {
  public readonly httpStatus: HttpStatus;
  public readonly errorCode: ErrorCode;

  constructor(
    message?: string,
    httpStatus?: HttpStatus,
    errorCode?: ErrorCode
  ) {
    super(message || "undefined error");
    this.httpStatus = httpStatus ?? HttpStatus.INTERNAL_SERVER_ERROR;
    this.errorCode = errorCode ?? ErrorCode.INTERNAL_SERVER;
    Object.setPrototypeOf(this, HenesisError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class PasswordInvalidError extends HenesisError {
  constructor() {
    super(
      "passphrase is different",
      HttpStatus.UNAUTHORIZED,
      ErrorCode.INVALID_PASSWORD
    );
  }
}

export class ValidationParameterError extends HenesisError {
  constructor(message: string) {
    super(
      message || "validation error",
      HttpStatus.BAD_REQUEST,
      ErrorCode.BAD_REQUEST
    );
  }
}

export class FormatInvalidError extends HenesisError {
  constructor(message: string) {
    super(
      message || "invalid format",
      HttpStatus.BAD_REQUEST,
      ErrorCode.BAD_REQUEST
    );
  }
}
