export class UnknownProtocolIndicator extends Error {
    constructor(...args: any[]);
}
export class InvalidPayloadLength extends Error {
    constructor(...args: any[]);
}
export class ProtocolNotSupported extends Error {
    constructor(protocolName: any, ...args: any[]);
}
export class InvalidChecksumAddress extends Error {
    constructor(...args: any[]);
}
