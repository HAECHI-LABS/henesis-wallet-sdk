import PDFDocument from "pdfkit";
import { BlockchainType } from "./blockchain";
import { Key, KeyWithPriv } from "./types";
import { Env } from "./sdk";
export declare class RecoveryKit {
    private readonly name;
    private readonly blockchain;
    private readonly henesisKey;
    protected readonly accountKey: KeyWithPriv;
    private readonly backupKey;
    private readonly encryptedPassphrase;
    private readonly encryptionKey;
    private readonly env;
    constructor(name: string, blockchain: BlockchainType, henesisKey: Key, accountKey: KeyWithPriv, backupKey: KeyWithPriv, encryptedPassphrase: string, encryptionKey: string, env: Env);
    generatePdf(): Promise<PDFDocument>;
    setQRCode(docs: PDFDocument, name: string, desc: string, data: string, x: number, y: number): Promise<void>;
    getFormattedDate(date: Date): string;
    camelize(data: string): string;
    getName(): string;
    getBlockchain(): BlockchainType;
    getHenesisKey(): Key;
    getAccountKey(): KeyWithPriv;
    getBackupKey(): KeyWithPriv;
    getEncryptedPassphrase(): string;
    getEncryptionKey(): string;
}
