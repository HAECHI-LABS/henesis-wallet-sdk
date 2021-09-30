export = Address;
declare class Address {
    toLegacyAddress(address: any): string;
    toCashAddress(address: any, prefix?: boolean, regtest?: boolean): any;
    toHash160(address: any): string;
    hash160ToLegacy(hash160: any, network?: number): string;
    hash160ToCash(hash160: any, network?: number, regtest?: boolean): any;
    _decode(address: any): any;
    _decodeLegacyAddress(address: any): {
        prefix: string;
        type: string;
        hash: Buffer;
        format: string;
    };
    _decodeCashAddress(address: any): any;
    _encodeAddressFromHash160(address: any): any;
    isLegacyAddress(address: any): boolean;
    isCashAddress(address: any): boolean;
    isHash160(address: any): boolean;
    isMainnetAddress(address: any): boolean;
    isTestnetAddress(address: any): boolean;
    isRegTestAddress(address: any): boolean;
    isP2PKHAddress(address: any): boolean;
    isP2SHAddress(address: any): boolean;
    detectAddressFormat(address: any): any;
    detectAddressNetwork(address: any): "mainnet" | "testnet" | "regtest";
    detectAddressType(address: any): any;
    fromXPub(xpub: any, path?: string): any;
    fromOutputScript(scriptPubKey: any, network?: string): any;
}
