"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BchRecoveryKit = void 0;
const recoverykit_1 = require("../recoverykit");
class BchRecoveryKit extends recoverykit_1.RecoveryKit {
    constructor(name, blockchain, henesisKey, accountKey, backupKey, encryptedPassphrase, encryptionKey, env, walletId) {
        super(name, blockchain, henesisKey, accountKey, backupKey, encryptedPassphrase, encryptionKey, env);
        this.walletId = walletId;
    }
    getWalletId() {
        return this.walletId;
    }
}
exports.BchRecoveryKit = BchRecoveryKit;
//# sourceMappingURL=recoveryKit.js.map