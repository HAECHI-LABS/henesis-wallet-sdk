/// <reference path="../../src/typings/index.d.ts" />
import { SDK, Env } from "../../src";
import "dotenv/config";
import { Pagination } from "../../src/types";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Local,
  });

  const wallet = await sdk.eth.wallets.getWallet(
    "138008b437538393d7e283a2f623b5a5"
  );
  const response = await wallet.flush([
    {
      coinId: 2,
      depositAddressId: "3d3816e69d2a6e5e40359c739ee618c6",
    },
  ]);
  console.log(response);
}

main();
