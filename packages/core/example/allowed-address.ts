/// <reference path="../src/typings/index.d.ts" />
import {SDK} from "../src";
import {EthMasterWallet} from "../src/eth/wallet";
import "dotenv/config";
import {CreateAllowedAddressRequest} from "../src/__generate__/eth";
import WhitelistTypeEnum = CreateAllowedAddressRequest.WhitelistTypeEnum;
import AllowedCoinTypeEnum = CreateAllowedAddressRequest.AllowedCoinTypeEnum;

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
    label: "hello",
    address: "address",
    coinId: 123,
    whitelistType: WhitelistTypeEnum.ALL,
    allowedCoinType: AllowedCoinTypeEnum.SINGLE,
    otpCode: "123",
  }));
  console.log(await wallet.activateAllowedAddresses("otp"));
  console.log(await wallet.inactivateAllowedAddresses("otp"));
  console.log(await wallet.deleteAllowedAddress("id", "otp"));
}

main().catch((e) => console.error(e));
