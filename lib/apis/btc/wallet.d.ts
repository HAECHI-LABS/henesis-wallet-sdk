import { CreateDepositAddressRequest } from "../../__generate__/btc/api";
import { Client } from "../../httpClient";
export declare const createDepositAddressApi: ({ client, walletId, request, }: {
    client: Client;
    walletId: string;
    request: CreateDepositAddressRequest;
}) => Promise<import("../../__generate__/btc/api").DepositAddressDTO>;
export declare const getDepositAddressApi: ({ client, walletId, depositAddressId, }: {
    client: Client;
    walletId: string;
    depositAddressId: string;
}) => Promise<import("../../__generate__/btc/api").DepositAddressDTO>;
