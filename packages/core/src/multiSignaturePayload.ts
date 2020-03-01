export interface MultiSignaturePayload {
  walletAddress: string;
  toAddress: string;
  value: number;
  walletNonce: number;
  hexData: string;
}