/// <reference path="../src/typings/index.d.ts" />
import { SDK } from "../src";
import "dotenv/config";
import { MethodName } from "../src/eth/gasUsages";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  console.log(
    await sdk.eth.gasUsages.getMethodGasUsages(MethodName.CREATE_MASTER_WALLET)
  );

  console.log(await sdk.eth.gasUsages.getMethodGasUsages(MethodName.TRANSFER));

  console.log(
    await sdk.eth.gasUsages.getMethodGasUsages(MethodName.TRANSFER_ERC20)
  );
}

main().catch((e) => console.error(e));
