import { FilHenesisKey } from "@haechi-labs/henesis-wallet-core/lib/fil";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_DEFAULT_FEE_WALLET_DTO: DefaultFeeWalletDTO = {
  address: "t1c4mfn5uk3kjhztosotp6eu5yh5ks5z6gja46ipy",
};

export class DefaultFeeWalletDTO {
  @ApiModelProperty({
    description: "기본 수수료 지갑의 주소",
    example: EXAMPLE_FILECOIN_DEFAULT_FEE_WALLET_DTO.address,
  })
  address: string;

  static fromDefaultFeeWallet(
    defaultFeeWallet: FilHenesisKey
  ): DefaultFeeWalletDTO {
    return {
      address: defaultFeeWallet.address,
    };
  }
}
