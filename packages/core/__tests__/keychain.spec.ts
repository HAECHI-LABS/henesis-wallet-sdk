import { EthereumKeychains, Keychains } from '../src/keychains';
import { KeyWithPriv } from '../src/types';
import { BlockchainType } from '../src/blockchain';

describe('keychian', () => {
  let keychain: Keychains;
  let keyWithPriv: KeyWithPriv;

  beforeEach(() => {
    keychain = new EthereumKeychains();
    keyWithPriv = keychain.create('password');
  });

  describe('#signPayload()', () => {
    it('success sign multiSigPayload and verify', () => {
      const payload = '0x1212121212121212';
      const password = 'password';
      const signature = keychain.signPayload(
        BlockchainType.Ethereum,
        payload,
        keyWithPriv.keyFile,
        password,
      );
      const recoveredAddress = keychain.recoverAddressFromSignature(
        BlockchainType.Ethereum,
        payload,
        signature,
      );

      expect(keyWithPriv.address).toEqual(recoveredAddress);
    });

    it('fail sign multiSigPayload and verify because of wrong password', () => {
      const payload = '0x1212121212121212';
      const password = 'wrong_password';
      expect(() =>
        keychain.signPayload(
          BlockchainType.Ethereum,
          payload,
          keyWithPriv.keyFile,
          password,
        ),
      ).toThrow(TypeError);
    });
  });

  describe('#create()', () => {
    it('success create private key', () => {
      const Accounts = require('web3-eth-accounts');
      const web3Account = new Accounts('');
      const password = 'password';
      const newKeyWithPriv: KeyWithPriv = keychain.create(password);

      expect(
        web3Account.privateKeyToAccount(newKeyWithPriv.priv).address,
      ).toEqual(newKeyWithPriv.address);
    });
  });

  describe('#decryptKeyFile()', () => {
    it('success decrypt keyfile', () => {
      expect(keychain.decryptKeyFile(keyWithPriv.keyFile, 'password')).toEqual(
        keyWithPriv.priv,
      );
    });
  });

  describe('#changePassword()', () => {
    it('should not change privkey', () => {
      const keyfile = keychain.changePassword(
        keyWithPriv.keyFile,
        'password',
        'newPassword',
      ).keyFile;
      expect(keychain.decryptKeyFile(keyfile, 'newPassword')).toEqual(
        keyWithPriv.priv,
      );
    });
  });

  describe('#recoverAddressFromSignatrue()', () => {
    it('success recover address from signature', () => {
      const payload = '0x1212121212121212';
      const signature =
        '0xc22beb8b1a10797ea38cdb98aef219bb4618877a92e3c71ae2a0a713030ed23469b544416f1b16080cf4cb59d45067d8834444259276bf608f7cee1fcc5dd87c1c';
      const recoveredAddress = keychain.recoverAddressFromSignature(
        BlockchainType.Ethereum,
        payload,
        signature,
      );

      expect(recoveredAddress).toEqual(
        '0x1A0457316980374C4b9A8Ed3BbC2f4bcBd3B5306',
      );
    });
  });
});
