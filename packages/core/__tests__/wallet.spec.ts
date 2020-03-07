import { MultiSigPayload } from '../src/coin';
import { EthLikeWallet } from '../src/wallet';
import { MockEthLikeWallet } from '../__mocks__/wallet.mock';
import { EthereumKeychains } from '../src/keychains';

describe('Wallet', () => {
  describe('EthLikeWallet', () => {
    let wallet: EthLikeWallet;
    let keychain: EthereumKeychains;
    beforeEach(() => {
      keychain = new EthereumKeychains();
      wallet = new MockEthLikeWallet(
        null,
        {
          blockchain: 'ETHEREUM',
        } as any,
        keychain,
      );
    });

    describe('#signPayload()', () => {
      it('should return valid signature', () => {
        const keyWithPriv = {
          address: '0x954811D579c16D79b8797066f41DFb846a169a0F',
          pub: '0x48ad86c7fda903b00bb10c046aa9fdaa64f4aebd2b768ff269946d87230d735b1c2020478776bf176d7d46f87a404b3f6e3301d4cf6ca79b59247704f90c9e60',
          priv: '0x68de31542f68c785056a977c838517c9db1902ea6d10794c322e32440d1f5497',
          keyFile:
            '{"iv":"1lsvVj19dYI3Rkf7g9MLMw==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"79Hft/yrA7Y=","ct":"vSYilJIDPPeZzRq15Q7MoE9AvqZ2wtQc6S2vDPfbFOzdYQTfy8cdZbPSmIcdNnrCK6hZndUCtD3QJewPgqixz1cyOjUcGQjWjqo="}',
        };
        (wallet as any).keychains = keychain;
        (wallet as any).walletData = {
          accountKey: keyWithPriv,
        };
        const multiSigPayload: MultiSigPayload = {
          walletAddress: '0x4F79BB2A91F88054710e24328c77f557d14e14AF',
          toAddress: '0x6732c278C58FC90542cce498981844A073D693d7',
          value: 0,
          walletNonce: 0,
          hexData: '0xc801bf9b000000000000000000000000000000000000000000000000000000000000006400000000000000000000000026064a2e2b568d9a6d01b93d039d1da9cf2a58cd',
        };
        const expectedSignature = '0x'
          + '2042cf1aca32120e43f5dc193492e2d343f49d61460f0a9213cdc377a94a70d0' // r
          + '067e7c583b03c0a8aabac4b5254b590d1476eaf8a465fdf55927d202a261ab60' // s
          + '1c'; // v
        expect((wallet as any).signPayload(multiSigPayload, 'password')).toEqual(expectedSignature);
      });
    });
  });
});
