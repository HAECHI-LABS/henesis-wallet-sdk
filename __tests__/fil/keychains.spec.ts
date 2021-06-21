import {FilKeychains} from "../../src/fil/keychains";
import { FilAccountKey } from "../../src/fil/abstractWallet";
import { KeyWithPriv } from "../../src/types";
import { FilKeyWithPriv } from "../../src/fil";
import {Env} from "../../src";

describe('FilKeychains',() => {
  const keychains = new FilKeychains(Env.Local);
  const key: FilAccountKey = {
    address: 't1xsx3ezz7uwcynfzi6kvbp3uh5oqcx7mjqfl4y3q',
    pub: '0xee2ca60262e8f368a4abeaee7f341d7a3ce1e429f3f7226ee900142ebded2af132d93e8c49a74b6dc9de7af81fb6d4d7955983839188606c97dbf4527a75d540',
    keyFile: '{"iv":"8ESPnFzPDoq6LCq52JgQ8w==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"S9hxpXS+B/M=","ct":"KpUh/ADv/R3fng1eLFPXSgQZBnUSprM4bacsulo2eG0i1Ej9y5OWMrOvK5tOJzoXGidBMPlitn/U4rEz5xbU7kZJG/zKhuZD0XySBouHgKB+1ezuzx+BxuRSnTLYo4DNF4HbRE62vAI/jHBivT4a+U/brx1MRBrv7Z+jgJ2Pw68xuXL/TCtdVg=="}',
    chainCode: '0x17f182d40b8e77c9fcf723cf4d8308802613b98257bf6a83d2bf40539b79f842'
  }
  const priv = '0x126695c405d111628e5a760ab636536fba27a0d3f0b9a55ab861a3345c5e1905';
  const seed = 'cf9cdb627e66d6a2fb5a86639d7d967506d5501e3392e7d8697cdf37ef685221b2f13b8154013977c2febfdd02a3e7e566e033734b309d80e0d6750fb12a1d8a';

  describe('#create()', () => {
    it('should create key correctly', () => {
      const key: KeyWithPriv = keychains.create('password');
      console.log(key);
    })
  })

  describe('#createWithChainCode()', () => {
    it('should create key with chain code correctly', () => {
      const key: FilKeyWithPriv = keychains.createWithChainCode('password');
      console.log(key);
    })
  })

  describe('#decrypt()', () =>{
    it('should decrypt key file correctly', () => {
      const decryptedKey = keychains.decrypt(key, 'password');
      expect(decryptedKey).toEqual(seed);
    });

    it('should throw password error', () => {
      expect(() => keychains.decrypt(key, 'password2'))
        .toThrow(new Error('passphrase is different'));
    });
  });

  describe('#changePassword()', () => {
    it('should change key password', () => {
      const newkey: FilKeyWithPriv = keychains.changePassword(key, 'password', 'password2');
      expect(newkey.priv).toEqual(priv);
      expect(newkey.pub).toEqual(key.pub);
      expect(newkey.chainCode).toEqual(key.chainCode);
      expect(() => keychains.decrypt(newkey, 'password2')).not.toThrow();
    });

    it('should throw password error', () => {
      expect(() => keychains.changePassword(key, 'invalid', 'password2'))
        .toThrow(new Error('passphrase is different'));
    });
  });

  // TODO: implement me
  describe.skip('#sign()', () => {
    it('should sign correctly', () => {
      const hexPayload = '';
      const signedPayload = keychains.sign(key, 'password', hexPayload);
      expect(signedPayload).toEqual('');
    })
  })
})
