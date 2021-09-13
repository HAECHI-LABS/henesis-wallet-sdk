import {
  isNewAddress,
  isLegacyAddress,
  convertToLegacyAddress,
  convertToNewAddress,
} from "../../../src/bch/utils";

const mainnet = {
  newAddress: "bitcoincash:qz9ew4c9l7rt0rqv6ced08k0wts6vxwuqvvuuv2szl",
  legacyAddress: "1Dj6DwxK2yufstumT1ViftoznMbQPg8fPa",
};

const testnet = {
  newAddress: "bchtest:pq3r4uehturg9ntv35xjezl773pcxwz9vgaqy2avn6",
  legacyAddress: "2MvNDajCeC9qCqezstGXU436qmH4ajr4N2v",
};

describe("bch address.spec.ts", () => {
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
});
