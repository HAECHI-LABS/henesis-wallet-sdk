import BN from "bn.js";
import { BNConverter, checkNullAndUndefinedParameter } from "../../src/utils/common";

describe("BNConverter", () => {
  describe("#add0x()", () => {
    it("should add 0x", () => {
      expect(BNConverter.add0x("123")).toEqual("0x123");
    });
    it("should return same string when the hex string already starts with 0x", () => {
      expect(BNConverter.add0x("0x123")).toEqual("0x123");
    });
  });

  describe("#remove0x()", () => {
    it("should remove 0x", () => {
      expect(BNConverter.remove0x("0x123")).toEqual("123");
    });
    it("should return the same string when the hex string does not starts with 0x", () => {
      expect(BNConverter.remove0x("123")).toEqual("123");
    });
  });

  describe("#bnToHexString()", () => {
    it("should return the hex string", () => {
      expect(BNConverter.bnToHexString(new BN(291, 16))).toEqual("0x123");
    });
  });

  describe("#hexStringToBN()", () => {
    it("should return bn", () => {
      expect(BNConverter.hexStringToBN("0x123").toNumber()).toEqual(291);
    });
  });

  describe("#hexStringToBN to bnToHexString same test", () => {
    it("should BN", () => {
      expect(
        BNConverter.bnToHexString(BNConverter.hexStringToBN("0x3e8"))
      ).toEqual("0x3e8");
    });
  });

  describe("#hcheckNullAndUndefinedParameter", () => {
    it("checkNullAndUndefinedParameter", () => {
      checkNullAndUndefinedParameter({
        to: "test",
        amount: new BN(0),
        passphrase: "123"
      })
    });
  });
});
