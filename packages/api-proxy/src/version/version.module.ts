import { DynamicModule, Module } from "@nestjs/common";
import { ApiV2Module } from "../v2/api.v2.module";
import { ApiV3Module } from "../v3/api.v3.module";
import VersionController from "./version.controller";

@Module({})
export class VersionModule {
  static register(): DynamicModule {
    const imports = [];
    if (process.env.API_VERSION == "v2") {
      imports.push(ApiV2Module.register());
    } else if (process.env.API_VERSION == "v3") {
      imports.push(ApiV3Module);
    } else {
      imports.push(ApiV2Module.register(), ApiV3Module);
    }
    return {
      module: VersionModule,
      imports,
      controllers: [VersionController],
    };
  }
}
