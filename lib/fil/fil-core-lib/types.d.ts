export declare const MethodInit: {
    Constructor: number;
    Exec: number;
};
export declare const MethodMultisig: {
    Constructor: number;
    Propose: number;
    Approve: number;
    Cancel: number;
    AddSigner: number;
    RemoveSigner: number;
    SwapSigner: number;
    ChangeNumApprovalsThreshold: number;
};
export declare enum SigType {
    SigTypeSecp256k1 = 1,
    SigTypeBLS = 2
}
export declare enum NewAddressType {
    BLS = "bls",
    SECP256K1 = "secp256k1",
    SECP256K1_LEDGER = "secp256k1-ledger"
}
