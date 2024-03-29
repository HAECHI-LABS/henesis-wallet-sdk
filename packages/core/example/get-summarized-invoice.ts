/// <reference path="../src/typings/index.d.ts" />
import { SDK, Env } from "../src";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Local,
  });

  const response = await sdk.billings.getSummarizedInvoice({
    invoiceId: "e6434245cfc39eb69e622ea85cbfab8c",
  });
  console.log(response);
}

main();
