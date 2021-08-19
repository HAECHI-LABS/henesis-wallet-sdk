import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { BalanceDTO } from "../../eth/dto/balance.dto";

@Injectable()
export class HenesisKeysService {
  public constructor() {}

  public async getHenesisKeyBalance(sdk: SDK): Promise<BalanceDTO> {
    return BalanceDTO.fromBalance(
      await sdk.klay.henesisKeys.getHenesisKeyBalance()
    );
  }
}
