import { Controller } from "@nestjs/common";
import * as PACKAGE from "../../package.json";

@Controller("/version")
export default class VersionController {
  getVersion() {
    return PACKAGE.version;
  }
}
