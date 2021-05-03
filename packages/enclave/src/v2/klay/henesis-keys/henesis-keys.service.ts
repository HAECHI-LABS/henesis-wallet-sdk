import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { KeyDTO } from "../../eth/dto/key.dto";
import { BalanceDTO } from "../../eth/dto/balance.dto";

@Injectable()
export class HenesisKeysService {
  public constructor() {}

  public async getHenesisKey(sdk: SDK): Promise<KeyDTO> {
    return sdk.klay.henesisKeys.getHenesisKey();
  }

  public async getHenesisKeyBalance(sdk: SDK): Promise<BalanceDTO> {
    return BalanceDTO.fromBalance(
      await sdk.klay.henesisKeys.getHenesisKeyBalance()
    );
  }
}
