import express from "express";
import packageJson from "../../package.json"
import AbstractController from "./controller";
import { Controller } from "../types";
import { EnclaveVersionDTO } from "@haechi-labs/henesis-wallet-core/lib/__generate__/accounts"

export default class VersionsController
  extends AbstractController
  implements Controller {
  private path = "/api/v2";

  constructor() {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}/enclave-version`, this.promiseWrapper(this.getEnclaveVersion));
  }

  private async getEnclaveVersion(req: express.Request): Promise<EnclaveVersionDTO> {
    let result : EnclaveVersionDTO = {
        version: packageJson.version
    }
    return (
        await result
    )
  }
}
