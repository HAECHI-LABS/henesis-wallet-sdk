import { Controller, Get } from "@nestjs/common";

const PACKAGE = require("../../package.json");

@Controller("/version")
export default class VersionController {
  @Get("")
  getVersion() {
    return PACKAGE.version;
  }
}
