"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtcRecoveryKit = void 0;
const recoverykit_1 = require("../recoverykit");
class BtcRecoveryKit extends recoverykit_1.RecoveryKit {
    constructor(name, blockchain, henesisKey, accountKey, backupKey, encryptedPassphrase, encryptionKey, env, walletId) {
        super(name, blockchain, henesisKey, accountKey, backupKey, encryptedPassphrase, encryptionKey, env);
        this.walletId = walletId;
    }
    getWalletId() {
        return this.walletId;
    }
}
exports.BtcRecoveryKit = BtcRecoveryKit;
//# sourceMappingURL=recoveryKit.js.map