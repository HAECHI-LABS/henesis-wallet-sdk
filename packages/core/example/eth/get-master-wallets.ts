/// <reference path="../../src/typings/index.d.ts" />
import { SDK, Env } from "../../src";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Local,
  });

  // const wallet = await sdk.eth.wallets.getMasterWallet(
  //   "a514003c27b28734432deff4e04ff0cf"
  // );
  const result = await sdk.eth.events.getNftTransferEvents({walletId: "a514003c27b28734432deff4e04ff0cf"});
  console.log(result);
  // const transfer = await wallet.transferNft(7777, "1", "0x4B3C6D4bdc93872E5063c549A0d817986E502005", "password");
  // console.log(transfer);

  // const wallet = await sdk.eth.wallets.getMasterWallet(
  //   "92dbc966bc2f55c6e92001283d50f37b"
  // );
  // const transfer = await wallet.transferNft(7777, "1", "0x819be1fd5f6c5ae2bbab8d60c54235e8f92e1e96", "password");
  // console.log(transfer);
}

main();
