import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { BalanceDTO } from "../../eth/dto/balance.dto";

@Injectable()
export class FeeWalletService {
  public async getBalance(sdk: SDK): Promise<BalanceDTO> {
    return BalanceDTO.fromBalance(
      await sdk.bsc.henesisKeys.getHenesisKeyBalance()
    );
  }
}
