import { Controller, Get } from "@nestjs/common";
import { VersionDTO } from "./dto/version.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

const PACKAGE = require("../../package.json");

@Controller("/version")
@ApiTags("version")
export default class VersionController {
  @Get("")
  @ApiOperation({
    summary: "API Proxy 버전",
    description: "현재 API Proxy의 버전을 반환합니다",
  })
  getVersion(): VersionDTO {
    return { version: PACKAGE.version };
  }
}
