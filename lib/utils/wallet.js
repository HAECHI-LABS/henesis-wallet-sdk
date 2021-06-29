"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLessThanWalletV4 = exports.WALLET_VERSION_V4 = void 0;
exports.WALLET_VERSION_V4 = "v4";
exports.isLessThanWalletV4 = (version) => {
    const verisonNumber = parseInt(version.substr(1));
    const versionV4Number = parseInt(exports.WALLET_VERSION_V4.substr(1));
    return verisonNumber < versionV4Number;
};
//# sourceMappingURL=wallet.js.map