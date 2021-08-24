import * as bitcoin from "bitcoinjs-lib";

/**
 * Return true when the address is legacy p2sh address.
 * Other address types like p2pkh will return
 */
export function isLegacyAddress(address: string): boolean {
  try {
    const decoded = bitcoin.address.fromBase58Check(address);
    const version = decoded["version"];

    switch (version) {
      case 5:
      case 196:
        return true;
      default:
        return false;
    }
  } catch (err) {
    return false;
  }
}

/**
 * Return true when the address is new p2sh address.
 * Other address types like p2pkh will return false;
 */
export function isNewAddress(address: string): boolean {
  try {
    const decoded = bitcoin.address.fromBase58Check(address);
    const version = decoded["version"];

    switch (version) {
      case 50:
      case 58:
        return true;
      default:
        return false;
    }
  } catch (err) {
    return false;
  }
}

/**
 * Return new address if the address is legacy address.
 * Return null if the address is not a legacy address.
 */
export function convertToNewAddress(address: string): string | null {
  try {
    const decoded = bitcoin.address.fromBase58Check(address);
    const version = decoded["version"];

    let newVersion;
    switch (version) {
      case 5:
        newVersion = 50;
        break;
      case 196:
        newVersion = 58;
        break;
      default:
        return null;
    }
    return bitcoin.address.toBase58Check(decoded["hash"], newVersion);
  } catch (err) {
    return null;
  }
}

/**
 * Return legacy address if the address is new address.
 * Return null if the address is not a new address.
 */
export function convertToLegacyAddress(address: string): string | null {
  try {
    const decoded = bitcoin.address.fromBase58Check(address);
    const version = decoded["version"];

    let newVersion;
    switch (version) {
      case 50:
        newVersion = 5;
        break;
      case 58:
        newVersion = 196;
        break;
      default:
        return null;
    }
    return bitcoin.address.toBase58Check(decoded["hash"], newVersion);
  } catch (err) {
    return null;
  }
}
