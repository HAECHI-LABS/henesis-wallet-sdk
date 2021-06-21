import { SignedMultiSigPayload } from "./transactions";
export default class BatchRequest {
    private readonly batchRequest;
    private readonly payloads;
    constructor(batchRequest: Function);
    add(payload: SignedMultiSigPayload): void;
    addAll(payloads: SignedMultiSigPayload[]): void;
    execute(): Promise<any>;
}
