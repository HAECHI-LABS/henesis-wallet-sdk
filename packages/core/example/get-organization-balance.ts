import {SDK} from '../src';
import 'dotenv/config'
import { BlockchainType } from "../src/blockchain";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://localhost:8080/api/v1"
  });

  console.log(await sdk.organizations.getOrganizationBalance(BlockchainType.Klaytn));
}

main().catch((e) => console.error(e));