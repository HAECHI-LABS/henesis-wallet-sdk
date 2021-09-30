import BN from "bn.js";
export declare class ObjectConverter {
    static toSnakeCase(obj: any): any;
    static toCamelCase(obj: any): any;
    static changeObjectProperty(o: any, converter: (obj: any) => any): any;
}
export declare class BNConverter {
    static add0x(hexString: string): string;
    static remove0x(hexString: string): string;
    static bnToHexString(bn: BN): string;
    static hexStringToBN(hexString: string): BN;
    static bnToHexStringOrElseNull(bn: BN): string | null;
    static hexStringToBnOrElseNull(hexString: string): BN | null;
    static decimalStringToBn(decimalString: string): BN;
    static bnToDecimalString(bn: BN): string;
}
export declare function checkNullAndUndefinedParameter(requiredParams: object): void;
export declare class HexConverter {
    static add0x(hexString: string): string;
    static remove0x(hexString: string): string;
}
