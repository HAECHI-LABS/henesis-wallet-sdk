import AbstractController from "./../controller";
import { Controller } from "../../types";

export interface EnvlaveVersionDTO {
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

  private async getEnclaveVersion(): Promise<EnvlaveVersionDTO> {
    const packageJson = require("../../../package.json");
    const result: EnvlaveVersionDTO = {
      version: packageJson.version,
    };
    return result;
  }
}
