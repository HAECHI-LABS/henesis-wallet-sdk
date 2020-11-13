import AbstractController from "./controller";
import { Controller } from "../types";

export interface EnclaveVersionDTO {
  version: string;
}

export default class VersionController
  extends AbstractController
  implements Controller {
  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`/version`, this.promiseWrapper(this.getEnclaveVersion));
  }

  private async getEnclaveVersion(): Promise<EnclaveVersionDTO> {
    const packageJson = require("root-require")("./package.json");
    return {
      version: packageJson.version,
    };
  }
}