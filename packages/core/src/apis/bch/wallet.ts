import _ from "lodash";
import { AxiosInstance } from "axios";
import {
  WalletControllerApiFactory,
  CreateDepositAddressRequest,
} from "../../__generate__/bch";
import { Client } from "../../httpClient";

const walletControllerApi = (client: Client) => {
  const apiClient: AxiosInstance = _.get(client, ["apiClient"]);
  // eslint-disable-next-line new-cap
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
  const response = await walletControllerApi(client).createDepositAddress2(
    walletId,
    request
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
  const response = await walletControllerApi(client).getDepositAddress2(
    walletId,
    depositAddressId
  );
  return response.data;
};
