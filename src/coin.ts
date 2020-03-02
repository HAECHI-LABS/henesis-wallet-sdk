import { HalfSignedTransaction } from './wallet';

export abstract class Coin {
  private address: string;

  abstract getName(): string;

  abstract signTransaction(): HalfSignedTransaction;

  abstract getAddress(): string;
}
