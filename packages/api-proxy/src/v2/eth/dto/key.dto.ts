export class KeyDTO {
  /**
   * address
   * @example 0x4ef3ba60c8710f45371835cddafabf33daa83e1d
   */

  address?: string;

  /**
   * pub
   * @example 0x31bd93d049fefed19b640c8069046c223126505754b9a57f5df43a89b104d92c8d4be4f51a6b5bb08a3ec6c2ff022e8ff018bad52ee05fa81b4eeae16a0e2db1
   */

  pub: string;

  /**
   * feeDelegationEnabled
   * @example false
   */

  feeDelegationEnabled?: boolean;

  /**
   * keyFile
   * @example 1
   */

  keyFile?: string;

  /**
   * keyId
   * @example 52e779750bb1330d2f23439c6da821ee
   */

  keyId?: string;
}
