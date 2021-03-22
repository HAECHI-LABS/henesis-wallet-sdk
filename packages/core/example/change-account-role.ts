/// <reference path="../src/typings/index.d.ts" />
import { SDK, Env } from "../src";
import "dotenv/config";
import { Role, Account } from "../src/accounts";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Local,
  });

  const account: Account = await sdk.organizations.changeAccountRole(
    "9efbb37b3cc2e78c389ad389ce9d05ef",
    Role.ADMIN
  );
  console.log(account);
}

main().catch((e) => console.error(e));
