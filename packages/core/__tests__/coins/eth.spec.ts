import {Eth} from '../../src/coins';

describe('Eth', () => {
  let eth: Eth;
  beforeEach(() => {
    eth = new Eth();
  });

  describe('#getName()', () => {
    it('should return eth', function () {
      expect(eth.getName()).toEqual("eth");
    });
  });

  describe('#buildData()', () => {
    it('should return encoded hex data', function () {
      const data = eth.buildData({
        amount: 5,
        to: "0x280460de5d4488DDA8e29dFb947a8D4574203E3F"
      });
      expect(data).toEqual('0xe9bb84c2000000000000000000000000280460de5d4488dda8e29dfb947a8d4574203e3f0000000000000000000000000000000000000000000000000000000000000005');
    });
  });
});