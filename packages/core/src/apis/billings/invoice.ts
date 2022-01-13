import _ from "lodash";
import { AxiosInstance } from "axios";
import { InvoiceControllerApiFactory } from "../../__generate__/billings";
import { Client } from "../../httpClient";

const invoiceControllerApi = (client: Client) => {
  const apiClient: AxiosInstance = _.get(client, ["billingApiClient"]);
  // eslint-disable-next-line new-cap
  return InvoiceControllerApiFactory(undefined, "", apiClient);
};

export const getSummarizedInvoice = async ({
  client,
  invoiceId,
}: {
  client: Client;
  invoiceId: string;
}) => {
  const response = await invoiceControllerApi(client).getSummarizedInvoice(
    invoiceId
  );
  return response.data;
};

export const getDetailedInvoice = async ({
  client,
  invoiceId,
}: {
  client: Client;
  invoiceId: string;
}) => {
  const response = await invoiceControllerApi(client).getDetailedInvoice(
    invoiceId
  );
  return response.data;
};
