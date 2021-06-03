import {FilKeychains} from "../../src/fil/keychains";
import {KeyWithPriv} from "../../lib/types";
import {FilAccountKey} from "../../lib/fil/abstractWallet";
import {FilKeyWithPriv} from "../../lib/fil/keychains";

describe('FilKeychains',() => {
  const keychains = new FilKeychains();
  const key: FilAccountKey = {
    address: 'f13nbkcq22t5u43re4ssn7pro7inrh4ti4lohg4fq',
    keyFile: '{"iv":"NVPLg29qiIJbYeyVMo0KqQ==","v":1,"iter":10000,"ks":256,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"fR/c/25HGJc=","ct":"4AQAXU11SGKXvTu+SzNn+OlmB4vSzgkZXGSKjINZCeW9TH1pFefq9v8uWGa8sPiVTN8x5+qnIaE67LoDavxJ8RWfaPvU7oJKphD7iQKGoULi4fKDcaX+Tey8KjoXWUc3988wZXga3QH6NFz5ciSTQj9WM7kf2FIR6/n6H9NQPV2XIZXTM1eI3A=="}',
    pub: '0xdeafd14f4b7ecfbd4d3e43746bbc797500480105bd9081552bc180bf797e9f73e6a186126a37cc7806d3d01988e31ca253b2ae9d7ae560511bba20291a5ab560',
    chainCode: '0x4e98ab6920f18b738691e88f542bd6019157b63e1d9c1917533f59c75490d8a4'
  }
  const priv = '0xdb0cc7de9a612cca7c28008c98dae7a62c8604c58268c1de515db746b2971c78';
  const seed = 'ea7eda62182e5d23c0cdc78dc1354026dd80774a7438f4c1faf1b6b2a42176f324c046fd4dd37fd7686fb9acd2d97a01bfcd8b17b8345fe898d1fa9fa4613363';

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
