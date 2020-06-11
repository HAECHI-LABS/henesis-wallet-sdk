import { SDK } from "../src";
import { Account } from "../src/accounts";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  const account: Account = await sdk.accounts.login(
    "haechi@haechi.io",
    "password"
  );
  console.log(account);
}

main().catch((e) => console.error(e));
