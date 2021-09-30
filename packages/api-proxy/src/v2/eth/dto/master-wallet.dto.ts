import { EXAMPLE_ETH_KLAY_WALLET_DTO, WalletDTO } from "./wallet.dto";
import { EXAMPLE_ETH_KLAY_KEY_DTO, KeyDTO } from "./key.dto";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETH_KLAY_MASTER_WALLET_DTO: MasterWalletDTO =
  Object.assign(EXAMPLE_ETH_KLAY_WALLET_DTO, {
    accountKey: EXAMPLE_ETH_KLAY_KEY_DTO,
    encryptionKey:
      "f0880e48251dd2f8574a8c8a4d65311030185d5e451e8a474b89c2b473b5d953",
    whitelistActivated: false,
  });

export class MasterWalletDTO extends WalletDTO {
  @ApiModelProperty({
    description: "KEY",
    example: EXAMPLE_ETH_KLAY_MASTER_WALLET_DTO.accountKey,
  })
  accountKey: KeyDTO;

  @ApiModelProperty({
    description: "마스터 지갑 비밀번호를 복구하기 위해 암호화하는 데 쓰인 키",
    example: EXAMPLE_ETH_KLAY_MASTER_WALLET_DTO.encryptionKey,
  })
  encryptionKey: string;

  @ApiModelProperty({
    description: "출금 주소 화이트리스팅의 활성화 유무",
    example: EXAMPLE_ETH_KLAY_MASTER_WALLET_DTO.whitelistActivated,
  })
  whitelistActivated: boolean;
}
