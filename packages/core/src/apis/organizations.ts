import _ from "lodash";
import { AxiosInstance } from "axios";
import {
  AccountControllerApiFactory,
  SignUpRequest,
  VerifyEmailRequest,
} from "../__generate__/accounts/api";

import { Client } from "../httpClient";

const accountControllerApi = (client: Client) => {
  const apiClient: AxiosInstance = _.get(client, ["apiClient"]);
  return AccountControllerApiFactory(undefined, "", apiClient);
};

export interface InvoiceResponse {
  id: string;
  billingYear: number;
  billingMonth: number;
  organization: {
    id: string;
    name: string;
  };
  prevMonthWithdrawalFee: string;
  prevMonthTokenListingCharge: string;
  prevMonthNewTokenListingCharge: string;
  thisMonthTokenListingCharge: string;
  startDate: string;
  endDate: string;
  chargedAt: string;
}

export const getInvoice = async ({
  client,
  request,
}: {
  client: Client;
  request: {
    orgId: string;
    year: string;
    month: string;
  };
}): Promise<InvoiceResponse> => {
  return {
    id: "1",
    billingYear: 2021,
    billingMonth: 1,
    organization: {
      id: "1",
      name: "test",
    },
    prevMonthWithdrawalFee: "0",
    prevMonthTokenListingCharge: "0",
    prevMonthNewTokenListingCharge: "0",
    thisMonthTokenListingCharge: "0",
    startDate: String(new Date().valueOf()),
    endDate: String(new Date().valueOf()),
    chargedAt: String(new Date().valueOf()),
  };
};

export interface TokenListingChargeHistory {
  id: string;
  startDate: string;
  endDate: string;
  coin: {
    id: string;
    name: string;
    symbol: string;
    source: string;
  };
  charge: string;
  isExempted: boolean; // (해치 오딧으로 인한) 면제 여부
}

export interface PreviousWithdrawalFeeInvoiceResponse {
  id: string;
  billingYear: number;
  billingMonth: number;
  organization: {
    id: string;
    name: string;
  };
  prevMonthWithdrawalFee: string;
  tokenListingChargeHistories: Array<TokenListingChargeHistory>;
  startDate: string;
  endDate: string;
  chargedAt: string;
}

export const getPreviousWithdrawalFeeInvoice = async ({
  client,
  request,
}: {
  client: Client;
  request: {
    orgId: string;
    year: string;
    month: string;
  };
}): Promise<PreviousWithdrawalFeeInvoiceResponse> => {
  return {
    id: "1",
    billingYear: 2021,
    billingMonth: 1,
    organization: {
      id: "1",
      name: "test",
    },
    prevMonthWithdrawalFee: "0",
    tokenListingChargeHistories: [],
    startDate: String(new Date().valueOf()),
    endDate: String(new Date().valueOf()),
    chargedAt: String(new Date().valueOf()),
  };
};

export interface TokenListingChargeResponse {
  id: string;
  billingYear: number;
  billingMonth: number;
  organization: {
    id: string;
    name: string;
  };
  prevMonthTokenListingCharge: string;
  tokenListingChargeHistories: Array<TokenListingChargeHistory>;
  startDate: string;
  endDate: string;
  chargedAt: string;
}

export const getPreviousMonthNewTokenListingCharge = async ({
  client,
  request,
}: {
  client: Client;
  request: {
    orgId: string;
    year: string;
    month: string;
  };
}): Promise<TokenListingChargeResponse> => {
  return {
    id: "1",
    billingYear: 2021,
    billingMonth: 1,
    organization: {
      id: "1",
      name: "test",
    },
    prevMonthTokenListingCharge: "0",
    tokenListingChargeHistories: [],
    startDate: String(new Date().valueOf()),
    endDate: String(new Date().valueOf()),
    chargedAt: String(new Date().valueOf()),
  };
};

export const getThisMonthTokenListingCharge = async ({
  client,
  request,
}: {
  client: Client;
  request: {
    orgId: string;
    year: string;
    month: string;
  };
}): Promise<TokenListingChargeResponse> => {
  return {
    id: "1",
    billingYear: 2021,
    billingMonth: 1,
    organization: {
      id: "1",
      name: "test",
    },
    prevMonthTokenListingCharge: "0",
    tokenListingChargeHistories: [],
    startDate: String(new Date().valueOf()),
    endDate: String(new Date().valueOf()),
    chargedAt: String(new Date().valueOf()),
  };
};
