const { bitcoinCashMainnet, bitcoinCashRegTestnet, bitcoinCashTestnet, } = require("./network");
const Bitcoin = require("bitcoinjs-lib");
const cashaddr = require("cashaddrjs");
const coininfo = {
    bitcoincash: {
        main: Object.assign({}, bitcoinCashMainnet),
        test: Object.assign({}, bitcoinCashTestnet),
        regtest: Object.assign({}, bitcoinCashRegTestnet),
    },
};
class Address {
    toLegacyAddress(address) {
        const { prefix, type, hash } = this._decode(address);
        let bitcoincash;
        switch (prefix) {
            case "bitcoincash":
                bitcoincash = coininfo.bitcoincash.main;
                break;
            case "bchtest":
                bitcoincash = coininfo.bitcoincash.test;
                break;
            case "bchreg":
                bitcoincash = coininfo.bitcoincash.regtest;
                break;
            default:
                throw `unsupported prefix : ${prefix}`;
        }
        let version;
        switch (type) {
            case "P2PKH":
                version = bitcoincash.pubKeyHash;
                break;
            case "P2SH":
                version = bitcoincash.scriptHash;
                break;
            default:
                throw `unsupported address type : ${type}`;
        }
        const hashBuf = Buffer.from(hash);
        return Bitcoin.address.toBase58Check(hashBuf, version);
    }
    toCashAddress(address, prefix = true, regtest = false) {
        const decoded = this._decode(address);
        let prefixString;
        if (regtest)
            prefixString = "bchreg";
        else
            prefixString = decoded.prefix;
        const cashAddress = cashaddr.encode(prefixString, decoded.type, new Uint8Array(decoded.hash));
        if (prefix)
            return cashAddress;
        return cashAddress.split(":")[1];
    }
    toHash160(address) {
        const legacyAddress = this.toLegacyAddress(address);
        const bytes = Bitcoin.address.fromBase58Check(legacyAddress);
        return bytes.hash.toString("hex");
    }
    hash160ToLegacy(hash160, network = Bitcoin.networks.bitcoin.pubKeyHash) {
        const buffer = Buffer.from(hash160, "hex");
        const legacyAddress = Bitcoin.address.toBase58Check(buffer, network);
        return legacyAddress;
    }
    hash160ToCash(hash160, network = Bitcoin.networks.bitcoin.pubKeyHash, regtest = false) {
        const legacyAddress = this.hash160ToLegacy(hash160, network);
        return this.toCashAddress(legacyAddress, true, regtest);
    }
    _decode(address) {
        try {
            return this._decodeLegacyAddress(address);
        }
        catch (error) { }
        try {
            return this._decodeCashAddress(address);
        }
        catch (error) { }
        try {
            return this._encodeAddressFromHash160(address);
        }
        catch (error) { }
        throw new Error(`Unsupported address format : ${address}`);
    }
    _decodeLegacyAddress(address) {
        const { version, hash } = Bitcoin.address.fromBase58Check(address);
        const info = coininfo.bitcoincash;
        switch (version) {
            case info.main.pubKeyHash:
                return {
                    prefix: "bitcoincash",
                    type: "P2PKH",
                    hash: hash,
                    format: "legacy",
                };
            case info.main.scriptHash:
                return {
                    prefix: "bitcoincash",
                    type: "P2SH",
                    hash: hash,
                    format: "legacy",
                };
            case info.test.pubKeyHash:
                return {
                    prefix: "bchtest",
                    type: "P2PKH",
                    hash: hash,
                    format: "legacy",
                };
            case info.test.scriptHash:
                return {
                    prefix: "bchtest",
                    type: "P2SH",
                    hash: hash,
                    format: "legacy",
                };
            default:
                throw new Error(`Invalid format : ${address}`);
        }
    }
    _decodeCashAddress(address) {
        if (address.indexOf(":") !== -1) {
            const decoded = cashaddr.decode(address);
            decoded.format = "cashaddr";
            return decoded;
        }
        const prefixes = ["bitcoincash", "bchtest", "bchreg"];
        for (let i = 0; i < prefixes.length; ++i) {
            try {
                const decoded = cashaddr.decode(`${prefixes[i]}:${address}`);
                decoded.format = "cashaddr";
                return decoded;
            }
            catch (error) { }
        }
        throw new Error(`Invalid format : ${address}`);
    }
    _encodeAddressFromHash160(address) {
        try {
            return {
                legacyAddress: this.hash160ToLegacy(address),
                cashAddress: this.hash160ToCash(address),
                format: "hash160",
            };
        }
        catch (error) { }
        throw new Error(`Invalid format : ${address}`);
    }
    isLegacyAddress(address) {
        return this.detectAddressFormat(address) === "legacy";
    }
    isCashAddress(address) {
        return this.detectAddressFormat(address) === "cashaddr";
    }
    isHash160(address) {
        return this.detectAddressFormat(address) === "hash160";
    }
    isMainnetAddress(address) {
        if (address[0] === "x")
            return true;
        else if (address[0] === "t")
            return false;
        return this.detectAddressNetwork(address) === "mainnet";
    }
    isTestnetAddress(address) {
        if (address[0] === "x")
            return false;
        else if (address[0] === "t")
            return true;
        return this.detectAddressNetwork(address) === "testnet";
    }
    isRegTestAddress(address) {
        return this.detectAddressNetwork(address) === "regtest";
    }
    isP2PKHAddress(address) {
        return this.detectAddressType(address) === "p2pkh";
    }
    isP2SHAddress(address) {
        return this.detectAddressType(address) === "p2sh";
    }
    detectAddressFormat(address) {
        const decoded = this._decode(address);
        return decoded.format;
    }
    detectAddressNetwork(address) {
        if (address[0] === "x")
            return "mainnet";
        else if (address[0] === "t")
            return "testnet";
        const decoded = this._decode(address);
        switch (decoded.prefix) {
            case "bitcoincash":
                return "mainnet";
            case "bchtest":
                return "testnet";
            case "bchreg":
                return "regtest";
            default:
                throw new Error(`Invalid prefix : ${decoded.prefix}`);
        }
    }
    detectAddressType(address) {
        const decoded = this._decode(address);
        return decoded.type.toLowerCase();
    }
    fromXPub(xpub, path = "0/0") {
        const HDNode = Bitcoin.HDNode.fromBase58(xpub, Bitcoin.networks[this.detectAddressNetwork(xpub)]);
        const address = HDNode.derivePath(path);
        return this.toCashAddress(address.getAddress());
    }
    fromOutputScript(scriptPubKey, network = "mainnet") {
        let netParam;
        if (network !== "bitcoincash" && network !== "mainnet")
            netParam = Bitcoin.networks.testnet;
        const regtest = network === "bchreg";
        return this.toCashAddress(Bitcoin.address.fromOutputScript(scriptPubKey, netParam), true, regtest);
    }
}
module.exports = Address;
//# sourceMappingURL=cashAddress.js.map