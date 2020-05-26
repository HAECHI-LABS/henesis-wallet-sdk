import { DefaultBTCKeyChains } from "../../src/btc/keychains";
import { KeyWithPriv } from "../../src/types";

describe('DefaultBTCKeyChains', () => {
  let keychains = new DefaultBTCKeyChains();

  describe('#create()', () =>{
    it('should create key correctly', () => {
      const key: KeyWithPriv = keychains.create("password");
      console.log(key);
    });
  });
});