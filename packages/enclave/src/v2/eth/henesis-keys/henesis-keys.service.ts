import { Injectable } from "@nestjs/common";
import { KeyDTO } from "../dto/key.dto";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { BalanceDTO } from "../dto/balance.dto";

@Injectable()
export class HenesisKeysService {
  public constructor() {}

  public async getHenesisKeyBalance(sdk: SDK): Promise<BalanceDTO> {
    return BalanceDTO.fromBalance(
      await sdk.eth.henesisKeys.getHenesisKeyBalance()
    );
  }
}
