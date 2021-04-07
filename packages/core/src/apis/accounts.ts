import _ from "lodash";
import { AxiosInstance } from "axios";
import {
  AccountControllerApiFactory,
  SignUpRequest,
} from "../__generate__/accounts/api";

import { Client } from "../httpClient";

const accountControllerApi = (client: Client) => {
  const apiClient: AxiosInstance = _.get(client, ["apiClient"]);
  return AccountControllerApiFactory(undefined, "", apiClient);
};

export const accountSignup = async ({
  client,
  request,
}: {
  client: Client;
  request: SignUpRequest;
}) => {
  const response = await accountControllerApi(client).signup(request);
  return response.data;
};
