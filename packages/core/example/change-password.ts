import { SDK } from "../src";
import 'dotenv/config'

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://localhost:8080/api/v1"
  });

  await sdk.accounts.changePassword(
    "password",
    "password2",
  );
}

main().catch((e) => console.error(e));