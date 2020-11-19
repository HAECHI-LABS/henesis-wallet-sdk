import { SignedMultiSigPayload } from "./transactions";

export default class BatchRequest {
  private readonly batchRequest: Function;

  private readonly payloads: SignedMultiSigPayload[];

  constructor(batchRequest: Function) {
    this.batchRequest = batchRequest;
    this.payloads = [];
  }

  public add(payload: SignedMultiSigPayload): void {
    this.payloads.push(payload);
  }

  public addAll(payloads: SignedMultiSigPayload[]): void {
    this.payloads.push(...payloads);
  }

  public async execute() {
    return await this.batchRequest(this.payloads);
  }
}
