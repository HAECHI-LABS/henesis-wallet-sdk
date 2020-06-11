import { SDK } from "../src";
import "dotenv/config";
import { BlockchainType } from "../src/blockchain";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  console.log(await sdk.organizations.getOrganizationBalance());
}

main().catch((e) => console.error(e));
