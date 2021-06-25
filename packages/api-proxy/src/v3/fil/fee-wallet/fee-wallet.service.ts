import { Injectable } from "@nestjs/common";
import { FeeWalletBalanceDTO } from "../dto/fee-wallet-balance.dto";
import { FeeWalletDTO } from "../dto/fee-wallet.dto";
import { SDK } from "@haechi-labs/henesis-wallet-core";

@Injectable()
export class FeeWalletService {
  public async getFeeWallets(sdk: SDK): Promise<FeeWalletDTO> {
    return FeeWalletDTO.fromFeeWallet(await sdk.fil.feeWallets.getFeeWallet());
  }

  public async getBalance(sdk: SDK): Promise<FeeWalletBalanceDTO> {
    return FeeWalletBalanceDTO.fromFeeWalletBalance(
      await sdk.fil.feeWallets.getFeeWalletBalance()
    );
  }
}
