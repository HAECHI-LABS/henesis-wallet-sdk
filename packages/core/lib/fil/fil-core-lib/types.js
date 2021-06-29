"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAddressType = exports.SigType = exports.MethodMultisig = exports.MethodInit = void 0;
exports.MethodInit = {
    Constructor: 1,
    Exec: 2,
};
exports.MethodMultisig = {
    Constructor: 1,
    Propose: 2,
    Approve: 3,
    Cancel: 4,
    AddSigner: 5,
    RemoveSigner: 6,
    SwapSigner: 7,
    ChangeNumApprovalsThreshold: 8,
};
var SigType;
(function (SigType) {
    SigType[SigType["SigTypeSecp256k1"] = 1] = "SigTypeSecp256k1";
    SigType[SigType["SigTypeBLS"] = 2] = "SigTypeBLS";
})(SigType = exports.SigType || (exports.SigType = {}));
var NewAddressType;
(function (NewAddressType) {
    NewAddressType["BLS"] = "bls";
    NewAddressType["SECP256K1"] = "secp256k1";
    NewAddressType["SECP256K1_LEDGER"] = "secp256k1-ledger";
})(NewAddressType = exports.NewAddressType || (exports.NewAddressType = {}));
//# sourceMappingURL=types.js.map