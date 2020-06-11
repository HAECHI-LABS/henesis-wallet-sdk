import { SDK } from "../src";
import { AccountWithOTP } from "../src/accounts";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  const accountWithOTP: AccountWithOTP = await sdk.accounts.me();
  console.log(accountWithOTP);
}

main().catch((e) => console.error(e));
