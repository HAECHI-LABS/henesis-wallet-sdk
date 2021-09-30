import BN from "bn.js";
import {BNConverter, checkNullAndUndefinedParameter} from "../../src/utils/common";

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

  describe("#decimalStringToBn()", () => {
    it("should return BN same with decimal string", () => {
      expect(BNConverter.decimalStringToBn("1234567890").toString(10)).toEqual("1234567890");
    });
  });

  describe("#bnToDecimalString()", () => {
    it("should return decimal string same with BN", () => {
      expect(BNConverter.bnToDecimalString(new BN("1234567890", 10))).toEqual("1234567890");
    });
  });

  describe("#checkNullAndUndefinedParameter", () => {
    it("checkNullAndUndefinedParameter - in BN", () => {
      checkNullAndUndefinedParameter({
        to: "to",
        amount: new BN(0),
        passphrase: "passphrase"
      });
    });
    it("checkNullAndUndefinedParameter - in undefined", () => {
      try {
        checkNullAndUndefinedParameter({
          undefinedT: undefined
        });
      } catch (e) {
        expect(e.message).toEqual("undefinedT is undefined");
      }
    });
    it("checkNullAndUndefinedParameter - in null", () => {
      try {
        checkNullAndUndefinedParameter({
          nullT: null
        });
      } catch (e) {
        expect(e.message).toEqual("nullT is null");
      }
    });
    it("checkNullAndUndefinedParameter - in NaN", () => {
      try {
        checkNullAndUndefinedParameter({
          stringT: "to",
          nanT: NaN,
          numberT: 1
        });
      } catch (e) {
        expect(e.message).toEqual("nanT is NaN");
      }
    });
  });
});
