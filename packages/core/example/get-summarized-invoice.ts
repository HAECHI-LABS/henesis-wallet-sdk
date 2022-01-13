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
    invoiceId: "9bccb74c8be306689c1131e24d53daa7",
  });
  console.log(response);
}

main();
