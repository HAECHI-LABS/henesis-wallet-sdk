/// <reference path="../src/typings/index.d.ts" />
import { SDK, Env } from "../src";
import { EthWallet } from "../src/eth/wallet";
import "dotenv/config";
import { WhitelistType, AllowedCoinType } from "../src/__generate__/eth";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Local,
  });

  const wallet: EthWallet = await sdk.eth.wallets.getWallet(
    "f8c1033729a6a4f15b4c5d357de0b444"
  );
  console.log(await wallet.getAllowedAddress("123"));
  console.log(await wallet.getAllowedAddresses());
  console.log(
    await wallet.createAllowedAddress({
      label: "hello",
      address: "address",
      coinId: 123,
      whitelistType: WhitelistType.ALL,
      allowedCoinType: AllowedCoinType.SINGLE,
      otpCode: "123",
    })
  );
  console.log(await wallet.activateAllowedAddresses("otp"));
  console.log(await wallet.inactivateAllowedAddresses("otp"));
  console.log(await wallet.deleteAllowedAddress("id", "otp"));
  console.log(await wallet.validateAllowedAddress("address"));
}

main();
