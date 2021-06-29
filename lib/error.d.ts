export declare enum HttpStatus {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}
export declare enum ErrorCode {
    BAD_REQUEST = 4000,
    INVALID_PASSWORD = 4003,
    INTERNAL_SERVER = 5000
}
export interface PropertyErrorParse {
    name: string;
    type: string;
}
export declare class HenesisError extends Error {
    readonly httpStatus: HttpStatus;
    readonly errorCode: ErrorCode;
    constructor(message?: string, httpStatus?: HttpStatus, errorCode?: ErrorCode);
}
export declare class PasswordInvalidError extends HenesisError {
    constructor();
}
export declare class ValidationParameterError extends HenesisError {
    constructor(message: string);
}
export declare class FormatInvalidError extends HenesisError {
    constructor(message: string);
}
