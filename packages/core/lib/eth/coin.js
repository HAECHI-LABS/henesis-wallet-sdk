"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Klay = exports.Eth = exports.NonStandardReturnTypeErc20 = exports.StandardErc20 = exports.Coin = exports.AttributesEnum = void 0;
const web3_1 = __importDefault(require("web3"));
const Wallet_json_1 = __importDefault(require("../contracts/Wallet.json"));
const ERC20_json_1 = __importDefault(require("../contracts/ERC20.json"));
const eth_1 = require("../__generate__/eth");
const common_1 = require("../utils/common");
exports.AttributesEnum = eth_1.CoinDTOAttributesEnum;
class Coin {
    constructor(coinData) {
        this.coinData = coinData;
        this.walletContract = new new web3_1.default().eth.Contract(Wallet_json_1.default);
    }
    getCoinData() {
        return this.coinData;
    }
    async buildTransferMultiSigPayloadTemplate(wallet) {
        return {
            walletNonce: wallet.getNonce(),
            value: common_1.BNConverter.hexStringToBN("0x0"),
            walletAddress: wallet.getAddress(),
        };
    }
    getAttributes() {
        return this.coinData.attributes;
    }
}
exports.Coin = Coin;
class StandardErc20 extends Coin {
    constructor(coinData) {
        super(coinData);
    }
    getAddress() {
        return this.coinData.address;
    }
    getName() {
        return this.coinData.name;
    }
    async buildTransferMultiSigPayload(wallet, to, amount) {
        return Object.assign(Object.assign({}, (await this.buildTransferMultiSigPayloadTemplate(wallet))), { hexData: this.walletContract.methods
                .transferToken(this.getAddress(), to, amount)
                .encodeABI(), toAddress: wallet.getAddress() });
    }
    buildFlushData(wallet, targetAddresses) {
        return this.walletContract.methods
            .flushToken(this.coinData.address, targetAddresses)
            .encodeABI();
    }
}
exports.StandardErc20 = StandardErc20;
class NonStandardReturnTypeErc20 extends Coin {
    constructor(coinData) {
        super(coinData);
        this.erc20Contract = new new web3_1.default().eth.Contract(ERC20_json_1.default);
    }
    getAddress() {
        return this.coinData.address;
    }
    getName() {
        return this.coinData.name;
    }
    async buildTransferMultiSigPayload(wallet, to, amount) {
        if (wallet.getVersion() === "v1" || wallet.getVersion() === "v2") {
            return Object.assign(Object.assign({}, (await this.buildTransferMultiSigPayloadTemplate(wallet))), { hexData: this.erc20Contract.methods.transfer(to, amount).encodeABI(), toAddress: this.coinData.address });
        }
        return Object.assign(Object.assign({}, (await this.buildTransferMultiSigPayloadTemplate(wallet))), { hexData: this.walletContract.methods
                .transferToken(this.getAddress(), to, amount)
                .encodeABI(), toAddress: wallet.getAddress() });
    }
    buildFlushData(wallet, targetAddresses) {
        if (wallet.getVersion() === "v1" || wallet.getVersion() === "v2") {
            throw new Error(`can't flush non standard erc20 token in ${wallet.getVersion()} version`);
        }
        return this.walletContract.methods
            .flushToken(this.coinData.address, targetAddresses)
            .encodeABI();
    }
}
exports.NonStandardReturnTypeErc20 = NonStandardReturnTypeErc20;
class Eth extends Coin {
    constructor(coinData) {
        super(coinData);
    }
    getName() {
        return "eth";
    }
    async buildTransferMultiSigPayload(wallet, to, amount) {
        return Object.assign(Object.assign({}, (await this.buildTransferMultiSigPayloadTemplate(wallet))), { hexData: this.walletContract.methods.transferEth(to, amount).encodeABI(), toAddress: wallet.getAddress() });
    }
    buildFlushData(wallet, targetAddresses) {
        return this.walletContract.methods.flushEth(targetAddresses).encodeABI();
    }
}
exports.Eth = Eth;
class Klay extends Coin {
    constructor(coinData) {
        super(coinData);
    }
    getName() {
        return "klay";
    }
    async buildTransferMultiSigPayload(wallet, to, amount) {
        return Object.assign(Object.assign({}, (await this.buildTransferMultiSigPayloadTemplate(wallet))), { hexData: this.walletContract.methods.transferKlay(to, amount).encodeABI(), toAddress: wallet.getAddress() });
    }
    buildFlushData(wallet, targetAddresses) {
        return this.walletContract.methods.flushKlay(targetAddresses).encodeABI();
    }
}
exports.Klay = Klay;
//# sourceMappingURL=coin.js.map