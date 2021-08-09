import { Accounts } from "./accounts";
import { Organizations } from "./organizations";
import { EthModule, KlayModule } from "./eth";
import { FilModule } from "./fil";
import { BtcModule } from "./btc";
import { WithdrawalApprovals } from "./withdrawalApprovals";
import { Billings } from "./billings";
import { Notices } from "./notices";
import { CoinListings } from "./coinListings";
import { LtcModule } from "./ltc";
export declare const enum Env {
    Local = 0,
    Dev = 1,
    Test = 2,
    Prod = 3
}
export interface SDKOptions {
    accessToken: string;
    secret: string;
    url?: string;
    env?: Env;
}
export declare class SDK {
    readonly accounts: Accounts;
    readonly notices: Notices;
    readonly billings: Billings;
    readonly organizations: Organizations;
    readonly coinListings: CoinListings;
    readonly withdrawalApproval: WithdrawalApprovals;
    readonly eth: EthModule;
    readonly klay: KlayModule;
    readonly fil: FilModule;
    readonly btc: BtcModule;
    readonly ltc: LtcModule;
    private readonly client;
    constructor(params: SDKOptions);
}
