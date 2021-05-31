import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETH_KLAY_KEY_DTO: KeyDTO = {
  address: "0x4ef3ba60c8710f45371835cddafabf33daa83e1d",
  pub: "0x31bd93d049fefed19b640c8069046c223126505754b9a57f5df43a89b104d92c8d4be4f51a6b5bb08a3ec6c2ff022e8ff018bad52ee05fa81b4eeae16a0e2db1",
  feeDelegationEnabled: false,
  keyFile: "1",
  keyId: "52e779750bb1330d2f23439c6da821ee",
};

export class KeyDTO {
  @ApiModelPropertyOptional({
    description: "",
    example: EXAMPLE_ETH_KLAY_KEY_DTO.address,
  })
  address?: string;

  @ApiModelProperty({
    description: "pub",
    example: EXAMPLE_ETH_KLAY_KEY_DTO.pub,
  })
  pub: string;

  @ApiModelPropertyOptional({
    description: "feeDelegationEnabled",
    example: EXAMPLE_ETH_KLAY_KEY_DTO.feeDelegationEnabled,
  })
  feeDelegationEnabled?: boolean;

  @ApiModelPropertyOptional({
    description: "keyFile",
    example: EXAMPLE_ETH_KLAY_KEY_DTO.keyFile,
  })
  keyFile?: string;

  @ApiModelPropertyOptional({
    description: "keyId",
    example: EXAMPLE_ETH_KLAY_KEY_DTO.keyId,
  })
  keyId?: string;
}
