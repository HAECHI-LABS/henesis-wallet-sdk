import { DynamicModule, Module } from "@nestjs/common";
import { ApiV2Module } from "../v2/api.v2.module";
import { ApiV3Module } from "../v3/api.v3.module";
import VersionController from "./version.controller";

const buildSwaggerVersionController: boolean =
  (process.env.BUILD_SWAGGER_SPEC?.toLowerCase() == "true" &&
    process.env.ENDPOINT == "version") ||
  process.env.BUILD_SWAGGER_SPEC != "true";

const buildSwaggerVersionEndpoint: boolean =
  (process.env.BUILD_SWAGGER_SPEC?.toLowerCase() == "true" &&
    process.env.ENDPOINT != "version") ||
  process.env.BUILD_SWAGGER_SPEC != "true";

@Module({})
export class VersionModule {
  static register(): DynamicModule {
    const imports = [];
    const controllers = [];
    if (buildSwaggerVersionEndpoint) {
      if (process.env.API_VERSION == "v2") {
        imports.push(ApiV2Module.register());
      } else if (process.env.API_VERSION == "v3") {
        imports.push(ApiV3Module.register());
      } else {
        imports.push(ApiV2Module.register(), ApiV3Module.register());
      }
    }
    if (buildSwaggerVersionController) {
      controllers.push(VersionController);
    }
    return {
      module: VersionModule,
      imports,
      controllers,
    };
  }
}
