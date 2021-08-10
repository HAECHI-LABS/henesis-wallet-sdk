import { BNConverter, MultiSigPayload } from "@haechi-labs/henesis-wallet-core";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class MultiSigPayloadDTO {
  @ApiModelProperty({
    description: "지갑의 주소",
    example: "0x2c27695429903b1e36299ce1eb89a3c1c34d115d",
  })
  walletAddress: string;

  @ApiModelProperty({
    description: "전송받을 주소",
    example: "0x2c27695429903b1e36299ce1eb89a3c1c34d115d",
  })
  toAddress: string;

  @ApiModelPropertyOptional({
    description: "전송할 금액",
    example: "0x1",
  })
  value?: string;

  @ApiModelPropertyOptional({
    description: "multi-sig 서명에 추가로 사용되는 지갑의 난수값",
    example: "0x0",
  })
  walletNonce?: string;

  @ApiModelProperty({
    description: "multi-sig를 통해 실행할 data",
    example: "hexData",
  })
  hexData: string;

  static fromMultiSigPayload(payload: MultiSigPayload): MultiSigPayloadDTO {
    return {
      walletAddress: payload.walletAddress,
      toAddress: payload.toAddress,
      value: payload.value ? BNConverter.bnToHexString(payload.value) : null,
      walletNonce: payload.walletNonce
        ? BNConverter.bnToHexString(payload.walletNonce)
        : null,
      hexData: payload.hexData,
    };
  }
}
