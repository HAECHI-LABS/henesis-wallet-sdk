/// <reference path="../src/typings/index.d.ts" />
import { SDK, Env } from "../src";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
    env: Env.Local,
  });
  console.log(await sdk.organizations.activateAllowedIps("otp"));
  console.log(await sdk.organizations.inactivateAllowedIps("otp"));
  console.log(await sdk.organizations.getAllowedIP("id"));
  console.log(await sdk.organizations.getAllowedIPs());
  console.log(
    await sdk.organizations.addAllowedIP({
      ipAddress: "ipAddress",
      label: "label",
      otpCode: "otp",
    })
  );
  console.log(
    await sdk.organizations.patchAllowedIpLabel({
      id: "id",
      label: "label",
      otpCode: "otp",
    })
  );
  console.log(await sdk.organizations.deleteAllowedIp("id", "otp"));
}

main();
