const blake = require("blakejs");
const base32Decode = require("base32-decode");
const base32Encode = require("base32-encode");
const leb = require("leb128");
const assert = require("assert");
const { UnknownProtocolIndicator, InvalidPayloadLength, ProtocolNotSupported, InvalidChecksumAddress, } = require("./errors");
const { ProtocolIndicator } = require("./constants");
const CID_PREFIX = Buffer.from([0x01, 0x71, 0xa0, 0xe4, 0x02, 0x20]);
function getCID(message) {
    const blakeCtx = blake.blake2bInit(32);
    blake.blake2bUpdate(blakeCtx, message);
    const hash = Buffer.from(blake.blake2bFinal(blakeCtx));
    return Buffer.concat([CID_PREFIX, hash]);
}
function getDigest(message) {
    const blakeCtx = blake.blake2bInit(32);
    blake.blake2bUpdate(blakeCtx, getCID(message));
    return Buffer.from(blake.blake2bFinal(blakeCtx));
}
function getPayloadSecp256K1(uncompressedPublicKey) {
    const blakeCtx = blake.blake2bInit(20);
    blake.blake2bUpdate(blakeCtx, uncompressedPublicKey);
    return Buffer.from(blake.blake2bFinal(blakeCtx));
}
function getChecksum(payload) {
    const blakeCtx = blake.blake2bInit(4);
    blake.blake2bUpdate(blakeCtx, payload);
    return Buffer.from(blake.blake2bFinal(blakeCtx));
}
function addressAsBytes(address) {
    let address_decoded, payload, checksum;
    const protocolIndicator = address[1];
    const protocolIndicatorByte = `0${protocolIndicator}`;
    switch (Number(protocolIndicator)) {
        case ProtocolIndicator.ID:
            if (address.length > 18) {
                throw new InvalidPayloadLength();
            }
            return Buffer.concat([
                Buffer.from(protocolIndicatorByte, "hex"),
                Buffer.from(leb.unsigned.encode(address.substr(2))),
            ]);
        case ProtocolIndicator.SECP256K1:
            address_decoded = base32Decode(address.slice(2).toUpperCase(), "RFC4648");
            payload = address_decoded.slice(0, -4);
            checksum = Buffer.from(address_decoded.slice(-4));
            if (payload.byteLength !== 20) {
                throw new InvalidPayloadLength();
            }
            break;
        case ProtocolIndicator.ACTOR:
            address_decoded = base32Decode(address.slice(2).toUpperCase(), "RFC4648");
            payload = address_decoded.slice(0, -4);
            checksum = Buffer.from(address_decoded.slice(-4));
            if (payload.byteLength !== 20) {
                throw new InvalidPayloadLength();
            }
            break;
        case ProtocolIndicator.BLS:
            throw new ProtocolNotSupported("BLS");
        default:
            throw new UnknownProtocolIndicator();
    }
    const bytes_address = Buffer.concat([
        Buffer.from(protocolIndicatorByte, "hex"),
        Buffer.from(payload),
    ]);
    if (getChecksum(bytes_address).toString("hex") !== checksum.toString("hex")) {
        throw new InvalidChecksumAddress();
    }
    return bytes_address;
}
function tryToPrivateKeyBuffer(privateKey) {
    if (typeof privateKey === "string") {
        if (privateKey.slice(-1) === "=") {
            privateKey = Buffer.from(privateKey, "base64");
        }
        else {
            if (privateKey.slice(0, 2) === "0x") {
                privateKey = privateKey.slice(2);
            }
            privateKey = privateKey.padStart(64, "0");
            privateKey = Buffer.from(privateKey, "hex");
        }
    }
    assert(privateKey.length === 32);
    return privateKey;
}
const textDecoder = new TextDecoder();
const decodeText = (bytes) => textDecoder.decode(bytes);
const textEncoder = new TextEncoder();
const encodeText = (text) => textEncoder.encode(text);
function concat(arrs, length) {
    const output = new Uint8Array(length);
    let offset = 0;
    for (const arr of arrs) {
        output.set(arr, offset);
        offset += arr.length;
    }
    return output;
}
function encode(buffer) {
    const data = encodeText(base32Encode(buffer, "RFC4648", { padding: false }));
    return concat([encodeText("b"), data], encodeText("b").length + data.length);
}
module.exports = {
    getCID,
    getDigest,
    getPayloadSecp256K1,
    getChecksum,
    addressAsBytes,
    tryToPrivateKeyBuffer,
    encode,
};
//# sourceMappingURL=utils.js.map