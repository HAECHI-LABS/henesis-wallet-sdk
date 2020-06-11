import { SignedMultiSigPayload } from "./transactions";

export default class BatchRequest {
  private readonly batchRequest: Function;

  private readonly payloads: SignedMultiSigPayload[];

  constructor(batchRequest: Function) {
    this.batchRequest = batchRequest;
    this.payloads = [];
  }

  public add(payload: SignedMultiSigPayload) {
    this.payloads.push(payload);
  }

  public async execute() {
    return await this.batchRequest(this.payloads);
  }
}
