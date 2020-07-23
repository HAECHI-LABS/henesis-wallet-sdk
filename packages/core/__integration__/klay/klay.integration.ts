import {Env, SDK} from "../../src";
import {retryAsync} from "ts-retry";
import {WalletStatus} from "../../src/wallet";
import faker from "faker";
import BN from "bn.js";
import {ValueTransferEventDTO as EthValueTransferEventDTO} from "../../src/__generate__/eth";
import {TransferStatus} from "../../src/btc/transfers";

describe("Klay integration tests", () => {
  const maxTimeout = 5 * 60 * 1000; // min 5
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
    it("should create master wallet", async (done) => {
      const recoveryKit = await sdkAdmin.klay.wallets.createRecoveryKit(
        "integration-test-" + faker.name.lastName(),
        "passphrase"
      );
      const masterWallet = await sdkAdmin.klay.wallets.createMasterWalletWithKit(recoveryKit);
      try {
        const result = await retryAsync(
          async () => {
            const activeMasterWallet = await sdkAdmin.klay.wallets.getMasterWallet(masterWallet.getId());
            if (activeMasterWallet.getData().status != WalletStatus.ACTIVE) {
              throw new Error("error");
            }
            return activeMasterWallet;
          },
          { delay: 10000, maxTry: 30 } // 5 min
        );
        expect(result.getData().status).toEqual(WalletStatus.ACTIVE);
      } catch (e) {
        done.fail("status of master wallet should be active");
      }
      done();
    });
  });

  describe("#transfer()", () => {
    it("should transfer from master wallet", async (done) => {
      const wallet = await sdkAdmin.klay.wallets.getMasterWallet(config.klay.masterWalletId);
      const transfer = await wallet.transfer(
        "KLAY",
        config.klay.externalAddress,
        new BN(1),
        config.klay.password
      );

      try {
        const result = await retryAsync(
          async () => {
            const confirmedTransferEvents = await sdkAdmin.klay.events.getValueTransferEvents({
              transactionId: transfer.id,
            });

            if (confirmedTransferEvents.results.length > 0) {
              if (confirmedTransferEvents.results[0].status == EthValueTransferEventDTO.StatusEnum.PENDING
                || confirmedTransferEvents.results[0].status == EthValueTransferEventDTO.StatusEnum.REQUESTED
                || confirmedTransferEvents.results[0].status == EthValueTransferEventDTO.StatusEnum.MINED
              ) {
                throw new Error("retry");
              }
            } else {
              throw new Error("retry");
            }
            return confirmedTransferEvents;
          },
          { delay: 10000, maxTry: 120 } // 20min
        );
        expect(result.results[0].status).toEqual(TransferStatus.CONFIRMED);
      } catch (e) {
        done.fail("status of value transfer event should be confirmed");
      }
      done();
    });
  });

  describe("#createUserWallet()", () => {
    it("should create user wallet", async (done) => {
      const wallet = await sdkAdmin.klay.wallets.getMasterWallet(config.klay.masterWalletId);
      const userWallet = await wallet.createUserWallet(
        "integration-test-user" + faker.name.lastName(),
        config.klay.password
      );

      try {
        const result = await retryAsync(
          async () => {
            const activeUserWallet = await wallet.getUserWallet(userWallet.getId());
            if (activeUserWallet.getData().status != WalletStatus.ACTIVE) {
              throw new Error("retry");
            }
            return activeUserWallet;
          },
          { delay: 5000, maxTry: 10 } // 5 min
        );
        expect(result.getData().status).toEqual(WalletStatus.ACTIVE);
      } catch (e) {
        done.fail("status of user wallet should be active");
      }
      done();
    });
  });

  describe("#transfer()", () => {
    it("should transfer from user wallet", async (done) => {
      const wallet = await sdkAdmin.klay.wallets.getMasterWallet(config.klay.masterWalletId);
      const userWallet = await wallet.getUserWallet(config.klay.userWalletId);
      const transfer = await userWallet.transfer(
        "KLAY",
        config.klay.externalAddress,
        new BN(1),
        config.klay.password
      );

      try {
        const result = await retryAsync(
          async () => {
            const confirmedTransferEvents = await sdkAdmin.klay.events.getValueTransferEvents({
              transactionId: transfer.id
            });

            if (confirmedTransferEvents.results.length > 0) {
              if (confirmedTransferEvents.results[0].status == EthValueTransferEventDTO.StatusEnum.PENDING
                || confirmedTransferEvents.results[0].status == EthValueTransferEventDTO.StatusEnum.REQUESTED
                || confirmedTransferEvents.results[0].status == EthValueTransferEventDTO.StatusEnum.MINED
              ) {
                throw new Error("retry");
              }
            } else {
              throw new Error("retry");
            }
            return confirmedTransferEvents;
          },
          { delay: 5000, maxTry: 10 } // 5 min
        );
        expect(result.results[0].status).toEqual(TransferStatus.CONFIRMED);
      } catch (e) {
        console.log(transfer.id);
        done.fail("status of value transfer event should be confirmed");
      }
      done();
    });
  });
});
