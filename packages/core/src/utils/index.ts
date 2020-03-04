const Bytes = require('../vendor/eth-lib/bytes');
const { keccak256s } = require('../vendor/eth-lib/hash');

export const encodeSignature = ([v, r, s]) => Bytes.flatten([r, s, v]);
export const decodeSignature = (hex) => [
  Bytes.slice(64, Bytes.length(hex), hex),
  Bytes.slice(0, 32, hex),
  Bytes.slice(32, 64, hex)];

export const toChecksum = (address) => {
  const addressHash = keccak256s(address.slice(2));
  let checksumAddress = '0x';
  for (let i = 0; i < 40; i++) {
    checksumAddress += parseInt(addressHash[i + 2], 16) > 7
      ? address[i + 2].toUpperCase()
      : address[i + 2];
  }
  return checksumAddress;
};

export const bytesToWord = (bytes?: Uint8Array): number => bytes.reduce((num, byte) => num * 0x100 + byte, 0);
