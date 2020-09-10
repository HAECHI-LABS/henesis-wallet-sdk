/// <reference path="../src/typings/index.d.ts" />
import { SDK } from "../src";
import { BtcMasterWallet } from "../src/btc/wallet";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken:
      "eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImJvYkBoYWVjaGkuaW8iLCJpZCI6IjYxNDRlNjZlNjkxYjc5ZTRjZTkxYTM4MzZlZGI3ZWEyIiwidHlwZSI6IkxPTkciLCJpc3MiOiJ3YWxsZXQtZGV2IiwiaWF0IjoxNTk0NzI2MDEyLCJleHAiOjEwMDAwMDE1OTQ3MjYwMTJ9.gHB_dowy6OCakwCGtR7JxKcT2ne4bu-mLA7yM4bo_XVhhw-Czxmeggr-Q01tCNxIkv9QKVNjaC2JERi0pA0vvw",
    secret: "3EDaWA6dy0SfkFqYBYAQgquzyF4cV2d5lTkjzFvFq28=",
    url: "https://dev.wallet.henesis.io/api/v2",
  });

  const wallet: BtcMasterWallet = await sdk.btc.wallets.getWallet(
    "a827891a90d51512dfed242235394c0f"
  );
  const depositAddress = await wallet.createDepositAddress("abcddddeee");
  console.log(depositAddress);
}

main().catch((e) => console.error(e));