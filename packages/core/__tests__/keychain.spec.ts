import { EthereumKeychains, Keychains, KeyWithPriv } from '../src/keychains';

describe('keychian', () => {
  let keychain:Keychains;
  let keyWithPriv:KeyWithPriv;

  beforeEach(() => {
    keychain = new EthereumKeychains();
    keyWithPriv = keychain.create('password');
  });

  describe('#signPayload()', () => {
    it('success sign multiSigPayload and verify', () => {
      const payload = 'multiSigPayload';
      const password = 'password';
      const signature = keychain.signPayload(payload, keyWithPriv.keyFile, password);
      const recoveredAddress = keychain.recoverAddressFromSignature(payload, signature);

      expect(keyWithPriv.address).toEqual(recoveredAddress);
    });

    it('fail sign multiSigPayload and verify because of wrong password', () => {
      const payload = 'multiSigPayload';
      const password = 'wrong_password';
      expect(() => keychain.signPayload(payload, keyWithPriv.keyFile, password))
        .toThrow(TypeError);
    });
  });

  describe('#create()', () => {
    it('success create private key', () => {
      const Accounts = require('web3-eth-accounts');
      const web3Account = new Accounts('');
      const password = 'password';
      const newKeyWithPriv:KeyWithPriv = keychain.create(password);

      expect(web3Account.privateKeyToAccount(newKeyWithPriv.priv).address).toEqual(newKeyWithPriv.address);
    });

    it('asd', () =>{
      const key = keychain.create("password");
      const key2 = keychain.create("password");

      console.log(key);
      console.log(key2);
    });
  });

  describe('#decryptKeyFile()', () => {
    it('success decrypt keyfile', () => {
      expect(keychain.decryptKeyFile(keyWithPriv.keyFile, 'password')).toEqual(keyWithPriv.priv);
    });
  });

  describe('#recoverAddressFromSignatrue()', () => {
    it('success recover address from signature', () => {
      const payload = 'payload';
      const signature = '0x8c69d0cfb8452b34de4cec8654ada16dd75004ca3903f337719c5f0f087a656d460e929e509b5d6603a9aef250d111f9f4cf85d774a8b047b5c3166c70e4e0e31b';
      const recoveredAddress = keychain.recoverAddressFromSignature(payload, signature);

      expect(recoveredAddress).toEqual('0x4a90503f58E9F4B4cC7C170889D872eBa8b2942E');
    });
  });
});
