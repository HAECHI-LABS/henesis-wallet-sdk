import { Env, SDK } from "../../src";
import faker from "faker";
import { WalletStatus } from "../../src/wallet";
import BN from "bn.js";
import { retryAsync } from "ts-retry";
import { TransferStatus } from "../../src/btc/transfers";

describe("BTC integration tests", () => {
  const maxTimeout = 30 * 60 * 1000;
  jest.setTimeout(maxTimeout);
  const config = require("../dev.config.json");
  const sdkAdmin = new SDK({
    accessToken: config.admin.accessToken,
    secret: config.admin.secret,
    env: Env.Dev
  });

  const sdkViewer = new SDK({
    accessToken: config.viewer.accessToken,
    secret: config.viewer.secret,
    env: Env.Dev
  });

  describe("#createMasterWallet()", () => {
    it("should create master wallet", async () => {
      const recoveryKit = await sdkAdmin.btc.wallets.createRecoveryKit(
        "integration-test-" + faker.name.lastName(),
        "passphrase"
      );
      const masterWallet = await sdkAdmin.btc.wallets.createMasterWalletWithKit(recoveryKit);
      expect(masterWallet.getData().status).toEqual(WalletStatus.ACTIVE);
    });
  });

  describe("#transfer()", () => {
    it("should transfer", async (done) => {
      const wallet = await sdkAdmin.btc.wallets.getWallet(config.btc.walletId);
      const transfer = await wallet.transfer(
        config.btc.externalAddress,
        new BN(1),
        config.btc.password
      );
      console.log(transfer);
      try {
        const result = await retryAsync(
          async () => {
            const confirmedTransfer = await sdkAdmin.btc.transfers.getTransfer(transfer.id);
            console.log(confirmedTransfer.status);
            if (confirmedTransfer.status == TransferStatus.PENDING || confirmedTransfer.status == TransferStatus.MINED) {
              throw new Error("error");
            }
            return confirmedTransfer;
          },
          { delay: 10000, maxTry: 180 } // 30min
        );
        expect(result.status).toEqual(TransferStatus.CONFIRMED);
      } catch (e) {
        done.fail("transfer status should be confirmed but pending");
      }
    });
  });
});
