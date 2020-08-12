/// <reference path="../src/typings/index.d.ts" />
import { SDK } from "../src";
import { EthMasterWallet } from "../src/eth/wallet";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  const wallet: EthMasterWallet = await sdk.eth.wallets.getMasterWallet("f8c1033729a6a4f15b4c5d357de0b444");
  console.log(await wallet.getAllowedAddress("123"));
  console.log(await wallet.getAllowedAddresses());
  console.log(await wallet.createAllowedAddress({
    otpCode: "123",
    label: "hello",
    address: "address",
    coinId: "coinId"
  }));
  console.log(await wallet.activateAllowedAddress("otp"));
  console.log(await wallet.inactivateAllowedAddress("otp"));
  console.log(await wallet.patchAllowedAddressLabel("id", "label"));
  console.log(await wallet.deleteAllowedAddress("id"));
}

main().catch((e) => console.error(e));
