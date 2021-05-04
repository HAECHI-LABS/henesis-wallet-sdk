import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { AxiosError } from "axios";

const ERROR_CODE_STATUS = {
  4000: HttpStatus.BAD_REQUEST,
  4001: HttpStatus.UNAUTHORIZED,
  4002: HttpStatus.BAD_REQUEST, // EMAIL_DOES_NOT_EXIST
  4003: HttpStatus.UNAUTHORIZED, // INVALID_PASSWORD
  4004: HttpStatus.UNAUTHORIZED, // OTP_AUTHENTICATION_FAILED
  4005: HttpStatus.BAD_REQUEST, // INVALID_GAS_PRICE
  4006: HttpStatus.BAD_REQUEST, // DUPLICATED_WALLET_NAME
  4007: HttpStatus.BAD_REQUEST, // INSUFFICIENT_BALANCE
  4008: HttpStatus.UNAUTHORIZED, // NOT_VERIFIED_IP
  4009: HttpStatus.UNAUTHORIZED, // TIMEOUT_IP
  4010: HttpStatus.BAD_REQUEST, // ALREADY_VERIFIED_IP
  4011: HttpStatus.BAD_REQUEST, // INVALID_IP_VERIFY_REQUEST
  4012: HttpStatus.BAD_REQUEST, // DUPLICATED_WITHDRAWAL_POLICY
  4013: HttpStatus.BAD_REQUEST, // ALREADY_WHITELISTED_ADDRESS,
  4014: HttpStatus.BAD_REQUEST, // DUPLICATED_LABEL
  4015: HttpStatus.BAD_REQUEST, // ALREADY_WHITELISTED_IP_ADDRESS
  4016: HttpStatus.SERVICE_UNAVAILABLE, // FAIL_TO_REPLACE_TRANSACTION
  4017: HttpStatus.BAD_REQUEST, // ALREADY_PROCESSED_TRANSACTION
  4019: HttpStatus.BAD_REQUEST, // SAME_GAS_PRICE
  4020: HttpStatus.BAD_REQUEST, // UTXO_LOCKED
  5000: HttpStatus.INTERNAL_SERVER_ERROR, // INTERNAL_SERVER
  5001: HttpStatus.BAD_REQUEST, // INVALID_MINIMUM_BALANCE
  5002: HttpStatus.BAD_REQUEST, // INACTIVE_WALLET
  5003: HttpStatus.SERVICE_UNAVAILABLE, // FAIL_TO_SEND_EMAIL
};

interface HenesisErrorPayload {
  message: string;
  code: number;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    try {
      response
        .status(ERROR_CODE_STATUS[exception.response.data.error.code])
        .json(exception.response.data.error as AxiosError<HenesisErrorPayload>);
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
        code: 5000,
      });
    }
  }
}
