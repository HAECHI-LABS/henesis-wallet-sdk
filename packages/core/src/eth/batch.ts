import { SignedMultiSigPayload } from "@eth/transactions";

export default class BatchRequest {
  private readonly batchRequest: Function;

  private readonly payloads: SignedMultiSigPayload[];

  constructor(batchRequest: Function) {
    this.batchRequest = batchRequest;
    this.payloads = [];
  }

  add(payload: SignedMultiSigPayload): void {
    this.payloads.push(payload);
  }

  addAll(payloads: SignedMultiSigPayload[]): void {
    this.payloads.push(...payloads);
  }

  async execute() {
    return await this.batchRequest(this.payloads);
  }
}
