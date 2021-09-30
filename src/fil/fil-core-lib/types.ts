export const MethodInit = {
  Constructor: 1,
  Exec: 2,
};

export const MethodMultisig = {
  Constructor: 1,
  Propose: 2,
  Approve: 3,
  Cancel: 4,
  AddSigner: 5,
  RemoveSigner: 6,
  SwapSigner: 7,
  ChangeNumApprovalsThreshold: 8,
};

export enum SigType {
  SigTypeSecp256k1 = 1,
  SigTypeBLS = 2,
}

export enum NewAddressType {
  BLS = "bls",
  SECP256K1 = "secp256k1",
  SECP256K1_LEDGER = "secp256k1-ledger",
}

export const MethodTransfer = 0;
