import { ApiHeaderOptions } from '@nestjs/swagger/dist/decorators/api-header.decorator';

export const X_HENESIS_SECRET: ApiHeaderOptions = {
  name: "X-Henesis-Secret",
  description: "대시보드를 통해 발급 받은 API Secret을 입력합니다.",

};
export const AUTHORIZATION: ApiHeaderOptions = {
  name: "Authorization",
  description:
    "대시보드를 통해 발급 받은 Access Token을 입력합니다. e.g. Bearer <TOKEN\\>",
  schema: {
    example: "Bearer <TOKEN>",
    default: "Bearer "
  }
};
