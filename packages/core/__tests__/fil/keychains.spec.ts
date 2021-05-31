import {FilKeychains} from "../../src/fil/keychains";
import {Key, KeyWithPriv} from "../../lib/types";

describe('FilKeychains',() => {
  const keychains = new FilKeychains();
  const key: Key = {
    keyFile: '{"iv":"WKUHNUrX/yi+afz9v55JaQ==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"n02ZV47GSAs=","ct":"gyChVlovRINgow1DCPj11pcUQAxtD4RwAV42OBIBXZbE2lOTfuvkpuMMXc9HJFZxXkjJ6VmKxPU+dkc1xhxVKZClI0iiQ10x+Nw="}',
    pub: '0x9e83058b24749e66f44bde4b3d642eded30e42964ebd3f52ccf4e73f7762a2ddc2951d30f76e851bd63357cf572eb74dcefe8fd2438a75d139021aa6e918e8b1',
  }
  const priv = '0x5779a58348468bcbf2a6f1dbe44d5ca2a84b3b703c474b9b61b9aa3a98a943bd';

  describe('#create()', () => {
    it('should create key correctly', () => {
      const key: KeyWithPriv = keychains.create('password');
      console.log(key);
    })
  })

  describe('#decrypt()', () =>{
    it('should decrypt key file correctly', () => {
      const decryptedKeys = keychains.decrypt(key, 'password');
      expect(decryptedKeys).toEqual(priv);
    });

    it('should throw password error', () => {
      expect(() => keychains.decrypt(key, 'password2'))
        .toThrow(new Error('passphrase is different'));
    });
  });

  describe('#changePassword()', () =>{
    it('should change key password', () => {
      const newkey: KeyWithPriv = keychains.changePassword(key, 'password', 'password2');
      expect(newkey.priv).toEqual(priv);
      expect(newkey.pub).toEqual(key.pub);
      expect(() => keychains.decrypt(newkey, 'password2')).not.toThrow();
    });

    it('should throw password error', () => {
      expect(() => keychains.changePassword(key, 'invalid', 'password2'))
        .toThrow(new Error('passphrase is different'));
    });
  });
})
