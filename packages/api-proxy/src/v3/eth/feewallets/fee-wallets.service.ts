import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { BalanceDTO } from "../dto/balance.dto";

@Injectable()
export class FeeWalletsService {
  public async getBalance(sdk: SDK): Promise<BalanceDTO> {
    return BalanceDTO.fromBalance(
      await sdk.eth.henesisKeys.getHenesisKeyBalance()
    );
  }
}
