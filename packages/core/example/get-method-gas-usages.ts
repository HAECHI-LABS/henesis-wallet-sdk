import { SDK } from "../src";
import "dotenv/config";
import { MethodName } from "../src/eth/gasusages";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  console.log(
    await sdk.eth.gasusages.getMethodGasUsages(MethodName.CREATE_MASTER_WALLET)
  );

  console.log(await sdk.eth.gasusages.getMethodGasUsages(MethodName.TRANSFER));

  console.log(
    await sdk.eth.gasusages.getMethodGasUsages(MethodName.TRANSFER_ERC20)
  );
}

main().catch((e) => console.error(e));
