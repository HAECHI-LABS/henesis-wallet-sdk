import {
  isNewAddress,
  isLegacyAddress,
  convertToLegacyAddress,
  convertToNewAddress,
} from "../../../src/ltc/utils";

const mainnet = {
  newAddress: "MTf4tP1TCNBn8dNkyxeBVoPrFCcVzxJvvh",
  legacyAddress: "3MSvaVbVFFLML86rt5eqgA9SvW23upaXdY",
  p2pkhAddress: "LM2WMpR1Rp6j3Sa59cMXMs1SPzj9eXpGc1",
};

const testnet = {
  newAddress: "QVk4MvUu7Wb7tZ1wvAeiUvdF7wxhvpyLLK",
  legacyAddress: "2N2PJEucf6QY2kNFuJ4chQEBoyZWszRQE16",
  p2pkhAddress: "mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn",
};

describe("ltc address.spec.ts", () => {
  describe("#isNewAddress", () => {
    it("should return true for new addresses", () => {
      expect(isNewAddress(mainnet.newAddress)).toBe(true);
      expect(isNewAddress(testnet.newAddress)).toBe(true);
    });
    it("should return false for legacy addresses", () => {
      expect(isNewAddress(mainnet.legacyAddress)).toBe(false);
      expect(isNewAddress(testnet.legacyAddress)).toBe(false);
    });
    it("should return false for wrong addresses", () => {
      expect(isNewAddress("wrong address")).toBe(false);
    });
  });

  describe("#isLegacyAddress", () => {
    it("should return true for legacy addresses", () => {
      expect(isLegacyAddress(mainnet.legacyAddress)).toBe(true);
      expect(isLegacyAddress(testnet.legacyAddress)).toBe(true);
    });
    it("should return false for new addresses", () => {
      expect(isLegacyAddress(mainnet.newAddress)).toBe(false);
      expect(isLegacyAddress(testnet.newAddress)).toBe(false);
    });
    it("should return false for wrong addresses", () => {
      expect(isLegacyAddress("wrong address")).toBe(false);
    });
  });

  describe("#convertToLegacyAddress", () => {
    it("should return legacy address", () => {
      expect(convertToLegacyAddress(mainnet.newAddress)).toStrictEqual(
        mainnet.legacyAddress
      );
      expect(convertToLegacyAddress(testnet.newAddress)).toStrictEqual(
        testnet.legacyAddress
      );
    });
    it("should return null for legacy addresses", () => {
      expect(convertToLegacyAddress(mainnet.legacyAddress)).toBeNull();
      expect(convertToLegacyAddress(testnet.legacyAddress)).toBeNull();
    });
    it("should return null for wrong addresses", () => {
      expect(convertToLegacyAddress("wrong address")).toBeNull();
    });
  });

  describe("#convertToNewAddress", () => {
    it("should return new address", () => {
      expect(convertToNewAddress(mainnet.legacyAddress)).toStrictEqual(
        mainnet.newAddress
      );
      expect(convertToNewAddress(testnet.legacyAddress)).toStrictEqual(
        testnet.newAddress
      );
    });
    it("should return null for new addresses", () => {
      expect(convertToNewAddress(mainnet.newAddress)).toBeNull();
      expect(convertToNewAddress(testnet.newAddress)).toBeNull();
    });
    it("should return null for wrong addresses", () => {
      expect(convertToNewAddress("wrong address")).toBeNull();
    });
  });
});
