import { enhancedBlockchainClient, HttpClient } from "../../src/httpClient";
import { Env } from "../../src";
import { EthWallets, EthKeychains, KlayModule } from "../../src/eth";
import { HenesisKeys } from "../../src/eth/henesisKeys";
import { BlockchainType } from "../../src/blockchain";

describe("KlaytnWallet", () => {
  describe("#klaytn wallet", () => {
    it("should verifyPassphrase true", async () => {
      const client = new HttpClient({
        accessToken: "accessToken",
        secret: "secret",
        url: "https://dev.wallet.henesis.io/api/v2",
        env: Env.Local,
      }) as any;
      const klayModule = new KlayModule({
        env: Env.Local,
        client: enhancedBlockchainClient(client, BlockchainType.KLAYTN),
        blockchain: BlockchainType.KLAYTN,
      });
      const wallet = await klayModule.wallets.getMasterWallet(
        "1602dffe41909cd2504b90a26ebcbefa"
      );
      const isVerifyPassPhrase = await wallet.verifyPassphrase("password");
      expect(isVerifyPassPhrase).toBe(true);
    });
  });
});
