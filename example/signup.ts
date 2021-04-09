/// <reference path="../src/typings/index.d.ts" />
import { SDK, Env } from "../src";
import { Account, Role } from "../src/accounts";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Local,
  });

  const account = await sdk.accounts.signup({
    email: "test@test.com",
    password: "password",
    roles: [Role.VIEWER],
    firstName: "dev",
    lastName: "haechi",
    organizationId: "575a431dc73615a9e65648180bbd4fbb",
    language: "KO",
  });
  console.log(account);
}

main();
