import { Erc20 } from '../coin';

export class EthEvt extends Erc20 {
  getName(): string {
    return 'evt';
  }

  isErc20(): boolean {
    return true;
  }

  getAddress(): string {
    return '0xfd7c864629b95091d971840751b51316b08a21c3';
  }
}

export class KlayEvt extends Erc20 {
  getName(): string {
    return 'evt';
  }

  isErc20(): boolean {
    return true;
  }

  getAddress(): string {
    return '0x16122dcb9ba5d2874ba5305e50797f7ec5258e64';
  }
}
