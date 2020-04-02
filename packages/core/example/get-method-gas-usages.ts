import { SDK } from "../src";
import "dotenv/config";
import { Blockchain } from "../src/blockchain";
import { MethodName } from "../src/gasusages";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: "http://localhost:8080/api/v1"
  });

  console.log(await sdk.gasusages
    .getMethodGasUsages(Blockchain.Klaytn, MethodName.CREATE_MASTER_WALLET));

  console.log(await sdk.gasusages
    .getMethodGasUsages(Blockchain.Klaytn, MethodName.TRANSFER));

  console.log(await sdk.gasusages
    .getMethodGasUsages(Blockchain.Klaytn, MethodName.TRANSFER_ERC20));
}

main().catch((e) => console.error(e));