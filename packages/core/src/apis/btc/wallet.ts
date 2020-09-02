import _ from "lodash";
import { AxiosInstance } from "axios";
import {
  WalletControllerApiFactory,
  CreateDepositAddressRequest,
} from "../../__generate__/btc/api";
import { Client } from "../../httpClient";

const walletControllerApi = (client: Client) => {
  console.log(client);
  const apiClient: AxiosInstance = _.get(client, ["apiClient"]);
  return WalletControllerApiFactory(undefined, "", apiClient);
};

export const createDepositAddressApi = async ({
  client,
  walletId,
  request,
}: {
  client: Client;
  walletId: string;
  request: CreateDepositAddressRequest;
}) => {
  const response = await walletControllerApi(client).createDepositAddress(
    walletId,
    {
      createDepositAddressRequest: request,
    }
  );
  return response.data;
};

export const getDepositAddressApi = async ({
  client,
  walletId,
  depositAddressId,
}: {
  client: Client;
  walletId: string;
  depositAddressId: string;
}) => {
  const response = await walletControllerApi(client).getDepositAddress(
    {},
    walletId,
    depositAddressId
  );
  return response.data;
};
