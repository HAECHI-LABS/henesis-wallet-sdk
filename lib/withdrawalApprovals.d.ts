import { Client } from "./httpClient";
import { Pagination, PaginationOptions } from "./types";
import { WithdrawalApprovalDTO, WithdrawalApprovalStatus } from "./__generate__/accounts";
import BN from "bn.js";
import { BlockchainType } from "./blockchain";
export import WithdrawalApprovalStatus = WithdrawalApprovalStatus;
export declare type WithdrawalApproval = Omit<WithdrawalApprovalDTO, "approvedBy" | "amount" | "status" | "blockchain"> & {
    amount: BN;
    status: WithdrawalApprovalStatus;
    blockchain: BlockchainType;
};
export interface ApproveWithdrawal extends WithdrawalApproval {
    passphrase: string;
    otpCode: string;
}
export declare class WithdrawalApprovals {
    private readonly client;
    private readonly baseUrl;
    constructor(client: Client);
    getWithdrawalApprovalById(withdrawalApprovalId: string): Promise<WithdrawalApproval>;
    getWithdrawalApprovals(options: PaginationOptions): Promise<Pagination<WithdrawalApproval>>;
}
