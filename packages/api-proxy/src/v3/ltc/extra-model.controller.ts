import { Controller } from "@nestjs/common";
import { ApiExtraModels } from "@nestjs/swagger";
import {
  AccessTokenNotProvidedException,
  InvalidAccessIpException,
  InvalidAccessTokenException,
} from "../../extra-model.dto";

@Controller("/extra-module")
@ApiExtraModels(
  InvalidAccessIpException,
  InvalidAccessTokenException,
  AccessTokenNotProvidedException
)
export default class ExtraModelController {}
