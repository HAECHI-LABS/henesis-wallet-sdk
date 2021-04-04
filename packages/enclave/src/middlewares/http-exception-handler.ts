import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
@Catch(HttpException)
export class HttpExceptionHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(exception.getStatus()).json({
      message: parseMessage(exception.getResponse()),
      code: 4000,
    });
  }
}
function parseMessage(response: any) {
  if (typeof response === "string" || response instanceof String) {
    return response;
  }
  return response?.message;
}
