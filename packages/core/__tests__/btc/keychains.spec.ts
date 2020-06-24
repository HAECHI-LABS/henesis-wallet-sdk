import { BtcKeyChains } from '../../src/btc/keychains';
import { Key, KeyWithPriv } from "../../src/types";
import { Env } from "../../src";

describe('BtcKeyChains', () => {
  const keychains = new BtcKeyChains(Env.Local);
  const key: Key = {
    keyFile: '{"iv":"0CmsXSiJzx/KDikI4Jrp7A==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"jm9dbVxaODQ=","ct":"KRjAWJDiX/e5P7+9f8l7UPa8y3f5GmMQVbHfqd9Jz2A92Fvsc8Du38nDV1aOuhOVM9a5tizrR7fCZQ01SR0oUFCMkWeSU4SN"}',
    pub: '0x022de003b21e0c420243f75385767923711a361bebf59415eb2429d226853fbe8a'
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
      expect(decryptedKeys).toEqual('0xc5f70f5a4b922bc70800a06654edb294198dd37264953abf69d5e10f3ca62561');
    });

    it('should throw password error', () => {
      expect(() => keychains.decrypt(key, 'password2'))
        .toThrow(new Error('password error'));
    });
  });

  describe('#changePassword()', () =>{
    it('should change key password', () => {
      const newkey: KeyWithPriv = keychains.changePassword(key, 'password', 'password2');
      expect(newkey.priv).toEqual('0xc5f70f5a4b922bc70800a06654edb294198dd37264953abf69d5e10f3ca62561');
      expect(newkey.pub).toEqual(key.pub);
      expect(() => keychains.decrypt(newkey, 'password2')).not.toThrow();
    });

    it('should throw password error', () => {
      expect(() => keychains.changePassword(key, 'invalid', 'password2'))
        .toThrow(new Error('password error'));
    });
  });
});
