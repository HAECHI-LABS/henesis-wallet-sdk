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
      const payload = 'multiSigPayload';
      const signature = '0xdb9355c277cc96c5fbce1735d126c74938b9176217cb102cfcb8b2d0b249c5b85d66af37983511d5c6e5acf5379f425f988a813bf4871252170ee18d917b7ea21c';
      const recoveredAddress = keychain.recoverAddressFromSignature(payload, signature);

      expect(recoveredAddress).toEqual('0xB90a54033AC0362B7F716468467Ae5442E68CfFa');
    });
  });
});
