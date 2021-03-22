/// <reference path="../src/typings/index.d.ts" />
import { SDK, Env } from "../src";
import { AccountWithOTP } from "../src/accounts";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Local,
  });

  const accountWithOTP: AccountWithOTP = await sdk.accounts.me();
  console.log(accountWithOTP);
}

main();
