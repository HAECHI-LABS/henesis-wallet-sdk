import { Erc20 } from '../coin';

export class Drm extends Erc20 {
  getName(): string {
    return 'drm';
  }

  isErc20(): boolean {
    return true;
  }

  getAddress(): string {
    return '0x20f3933c0d62609B5538b457E6006C25E2d5670E';
  }
}
