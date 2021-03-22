/// <reference path="../src/typings/index.d.ts" />
import { SDK, Env } from "../src";
import { Account } from "../src/accounts";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Dev,
  });

  const account: Account = await sdk.accounts.login(
    "haechi@haechi.io",
    "password"
  );
  console.log(account);
}

main();
