import { retryAsync } from "ts-retry";
import { Env, SDK } from "../../src";
import { WalletStatus } from "../../src/wallet";
import faker from "faker";
import BN from "bn.js";
import { TransferStatus } from "../../src/btc/transfers";
import { EventStatus } from "../../src/__generate__/eth";

describe("ETH integration tests", () => {
  const maxTimeout = 10 * 60 * 1000; // min 10
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
      const recoveryKit = await sdkAdmin.eth.wallets.createRecoveryKit(
        "integration-test-" + faker.name.lastName(),
        "passphrase"
      );
      const masterWallet = await sdkAdmin.eth.wallets.createMasterWalletWithKit(recoveryKit);
      try {
        const result = await retryAsync(
          async () => {
            const activeMasterWallet = await sdkAdmin.eth.wallets.getMasterWallet(masterWallet.getId());
            if (activeMasterWallet.getData().status != WalletStatus.ACTIVE) {
              throw new Error("error");
            }
            return activeMasterWallet;
          },
          { delay: 10000, maxTry: 60 } // 10 min
        );
        expect(result.getData().status).toEqual(WalletStatus.ACTIVE);
      } catch (e) {
        done.fail("status of master wallet should be active");
      }
      done();
    });
  });

  describe("#transfer()", () => {
    it("should eth transfer from master wallet", async (done) => {
      const wallet = await sdkAdmin.eth.wallets.getMasterWallet(config.eth.masterWalletId);
      const transfer = await wallet.transfer(
        "ETH",
        config.eth.externalAddress,
        new BN(1),
        config.eth.password
      );

      try {
        const result = await retryAsync(
          async () => {
            const confirmedTransferEvents = await sdkAdmin.eth.events.getValueTransferEvents({
              transactionId: transfer.id
            });

            if (confirmedTransferEvents.results.length > 0) {
              if (confirmedTransferEvents.results[0].status == EventStatus.PENDING
                || confirmedTransferEvents.results[0].status == EventStatus.REQUESTED
                || confirmedTransferEvents.results[0].status == EventStatus.MINED
              ) {
                throw new Error("retry");
              }
            } else {
              throw new Error("retry");
            }
            return confirmedTransferEvents;
          },
          { delay: 10000, maxTry: 60 } // 10 min
        );
        expect(result.results[0].status).toEqual(TransferStatus.CONFIRMED);
      } catch (e) {
        done.fail("status of value transfer event should be confirmed");
      }
      done();
    });

    it("should erc20 transfer from master wallet", async (done) => {
      const wallet = await sdkAdmin.eth.wallets.getMasterWallet(config.eth.masterWalletId);
      const transfer = await wallet.transfer(
        "EVT",
        config.eth.externalAddress,
        new BN(1),
        config.eth.password
      );

      try {
        const result = await retryAsync(
          async () => {
            const confirmedTransferEvents = await sdkAdmin.eth.events.getValueTransferEvents({
              transactionId: transfer.id
            });

            if (confirmedTransferEvents.results.length > 0) {
              if (confirmedTransferEvents.results[0].status == EventStatus.PENDING
                || confirmedTransferEvents.results[0].status == EventStatus.REQUESTED
                || confirmedTransferEvents.results[0].status == EventStatus.MINED
              ) {
                throw new Error("retry");
              }
            } else {
              throw new Error("retry");
            }
            return confirmedTransferEvents;
          },
          { delay: 10000, maxTry: 60 } // 10 min
        );
        expect(result.results[0].status).toEqual(TransferStatus.CONFIRMED);
      } catch (e) {
        done.fail("status of value transfer event should be confirmed");
      }
      done();
    });
  });

  describe("#createUserWallet()", () =>{
    it("should create user wallet", async (done) => {
      const wallet = await sdkAdmin.eth.wallets.getMasterWallet(config.eth.masterWalletId);
      const userWallet = await wallet.createUserWallet(
        "integration-test-user" + faker.name.lastName(),
        config.eth.password
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
          { delay: 10000, maxTry: 60 } // 10 min
        );
        expect(result.getData().status).toEqual(WalletStatus.ACTIVE);
      } catch (e) {
        done.fail("status of user wallet should be active");
      }
      done();
    });
  });

  describe("#transfer()", () => {
    it("should eth transfer from user wallet", async (done) => {
      const wallet = await sdkAdmin.eth.wallets.getMasterWallet(config.eth.masterWalletId);
      const userWallet = await wallet.getUserWallet(config.eth.userWalletId);
      const transfer = await userWallet.transfer(
        "ETH",
        config.eth.externalAddress,
        new BN(1),
        config.eth.password
      );

      try {
        const result = await retryAsync(
          async () => {
            const confirmedTransferEvents = await sdkAdmin.eth.events.getValueTransferEvents({
              transactionId: transfer.id
            });

            if (confirmedTransferEvents.results.length > 0) {
              if (confirmedTransferEvents.results[0].status == EventStatus.PENDING
                || confirmedTransferEvents.results[0].status == EventStatus.REQUESTED
                || confirmedTransferEvents.results[0].status == EventStatus.MINED
              ) {
                throw new Error("retry");
              }
            } else {
              throw new Error("retry");
            }
            return confirmedTransferEvents;
          },
          { delay: 10000, maxTry: 60 } // 10 min
        );
        expect(result.results[0].status).toEqual(TransferStatus.CONFIRMED);
      } catch (e) {
        console.log(transfer.id);
        done.fail("status of value transfer event should be confirmed");
      }
      done();
    });

    it("should erc20 transfer from user wallet", async (done) => {
      const wallet = await sdkAdmin.eth.wallets.getMasterWallet(config.eth.masterWalletId);
      const userWallet = await wallet.getUserWallet(config.eth.userWalletId);
      const transfer = await userWallet.transfer(
        "EVT",
        config.eth.externalAddress,
        new BN(1),
        config.eth.password
      );

      try {
        const result = await retryAsync(
          async () => {
            const confirmedTransferEvents = await sdkAdmin.eth.events.getValueTransferEvents({
              transactionId: transfer.id
            });

            if (confirmedTransferEvents.results.length > 0) {
              if (confirmedTransferEvents.results[0].status == EventStatus.PENDING
                || confirmedTransferEvents.results[0].status == EventStatus.REQUESTED
                || confirmedTransferEvents.results[0].status == EventStatus.MINED
              ) {
                throw new Error("retry");
              }
            } else {
              throw new Error("retry");
            }
            return confirmedTransferEvents;
          },
          { delay: 10000, maxTry: 60 } // 10 min
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
