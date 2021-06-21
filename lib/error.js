"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatInvalidError = exports.ValidationParameterError = exports.PasswordInvalidError = exports.HenesisError = exports.ErrorCode = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["SUCCESS"] = 200] = "SUCCESS";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatus = exports.HttpStatus || (exports.HttpStatus = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["BAD_REQUEST"] = 4000] = "BAD_REQUEST";
    ErrorCode[ErrorCode["INVALID_PASSWORD"] = 4003] = "INVALID_PASSWORD";
    ErrorCode[ErrorCode["INTERNAL_SERVER"] = 5000] = "INTERNAL_SERVER";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
class HenesisError extends Error {
    constructor(message, httpStatus, errorCode) {
        super(message || "undefined error");
        this.httpStatus = httpStatus !== null && httpStatus !== void 0 ? httpStatus : HttpStatus.INTERNAL_SERVER_ERROR;
        this.errorCode = errorCode !== null && errorCode !== void 0 ? errorCode : ErrorCode.INTERNAL_SERVER;
        Object.setPrototypeOf(this, HenesisError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HenesisError = HenesisError;
class PasswordInvalidError extends HenesisError {
    constructor() {
        super("passphrase is different", HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_PASSWORD);
    }
}
exports.PasswordInvalidError = PasswordInvalidError;
class ValidationParameterError extends HenesisError {
    constructor(message) {
        super(message || "validation error", HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST);
    }
}
exports.ValidationParameterError = ValidationParameterError;
class FormatInvalidError extends HenesisError {
    constructor(message) {
        super(message || "invalid format", HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST);
    }
}
exports.FormatInvalidError = FormatInvalidError;
//# sourceMappingURL=error.js.map