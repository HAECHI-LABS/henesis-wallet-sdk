import { Client } from "./httpClient";
import {
  getInvoice as getOrganizationInvoice,
  getPreviousWithdrawalFeeInvoice as getOrganizationPreviousWithdrawalFeeInvoice,
  getPreviousMonthNewTokenListingCharge as getOrganizationPreviousMonthNewTokenListingCharge,
  getThisMonthTokenListingCharge as getOrganizatioThisMonthTokenListingCharge,
} from "./apis/organizations";

export class Billings {
  private readonly client: Client;

  private readonly baseUrl = "/organizations";

  constructor(client: Client) {
    this.client = client;
  }

  // todo: implement
  getInvoice(request: { orgId: string; year: string; month: string }) {
    return getOrganizationInvoice({
      client: this.client,
      request,
    });
  }

  // todo: implement
  getPreviousWithdrawalFeeInvoice(request: {
    orgId: string;
    year: string;
    month: string;
  }) {
    return getOrganizationPreviousWithdrawalFeeInvoice({
      client: this.client,
      request,
    });
  }

  // todo: implement
  getPreviousMonthNewTokenListingCharge(request: {
    orgId: string;
    year: string;
    month: string;
  }) {
    return getOrganizationPreviousMonthNewTokenListingCharge({
      client: this.client,
      request,
    });
  }

  // todo: implement
  getThisMonthTokenListingCharge(request: {
    orgId: string;
    year: string;
    month: string;
  }) {
    return getOrganizatioThisMonthTokenListingCharge({
      client: this.client,
      request,
    });
  }
}
