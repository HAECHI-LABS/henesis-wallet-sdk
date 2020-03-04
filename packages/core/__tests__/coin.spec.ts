import {Erc20} from '../src/coin';

describe('Erc20', () => {
  class ERC20Impl extends Erc20 {
    getAddress(): string {
      return "0x280460de5d4488DDA8e29dFb947a8D4574203E3F";
    }

    getName(): string {
      return "etc20Impl";
    }
  }

  let erc20: Erc20;
  beforeEach(() => {
    erc20 = new ERC20Impl();
  });

  describe('#getAddress()', () => {
    it('should return the address of erc20 contract', function () {
      expect(erc20.getAddress()).toEqual("0x280460de5d4488DDA8e29dFb947a8D4574203E3F");
    });
  });

  describe('#getName()', () => {
    it('should return the name of erc20 contract', function () {
      expect(erc20.getName()).toEqual("etc20Impl");
    });
  });

  describe('#buildData()', () => {
    it('should return encoded hex data', function () {
      const data = erc20.buildData({
        amount: 5,
        to: "0x280460de5d4488DDA8e29dFb947a8D4574203E3F"
      });
      expect(data).toEqual('0xf5537ede000000000000000000000000280460de5d4488dda8e29dfb947a8d4574203e3f000000000000000000000000280460de5d4488dda8e29dfb947a8d4574203e3f0000000000000000000000000000000000000000000000000000000000000005');
    });
  });
});