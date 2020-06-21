import { BtcKeyChains } from '../../src/btc/keychains';
import { Key, KeyWithPriv } from "../../src/types";

describe('BtcKeyChains', () => {
  const keychains = new BtcKeyChains();
  const key: Key = {
    keyFile: '6PYManjQ4AGyk2gBw4f6xumZmc1MdHkEgpek1KnEinoitQ4wktFngipwuK',
    pub: '0x03a1fa637d5fa7f26c29441bd191520bc87f513823e5e4f43afad29132374616b8'
  };

  describe('#create()', () => {
    it('should create key correctly', () => {
      const key: KeyWithPriv = keychains.create('password');
      console.log(key);
    });
  });

  describe('#decrypt()', () =>{
    it('should decrypt key file correctly', () => {
      const decryptedKeys = keychains.decrypt(key, 'password');
      expect(decryptedKeys).toEqual('0x481baa2f62581a4fadc29d8749ced3ecff4ed6ceac8b307fbe9ce3377dea6e3b');
    });

    it('should throw password error', () => {
      expect(() => keychains.decrypt(key, 'password2'))
        .toThrow(new Error('password error'));
    });
  });

  describe('#changePassword()', () =>{
    it('should change key password', () => {
      const newkey: KeyWithPriv = keychains.changePassword(key, 'password', 'password2');
      expect(newkey.priv).toEqual('0x481baa2f62581a4fadc29d8749ced3ecff4ed6ceac8b307fbe9ce3377dea6e3b');
      expect(newkey.pub).toEqual(key.pub);
      expect(() => keychains.decrypt(newkey, 'password2')).not.toThrow();
    });

    it('should throw password error', () => {
      expect(() => keychains.changePassword(key, 'invalid', 'password2'))
        .toThrow(new Error('password error'));
    });
  });
});
