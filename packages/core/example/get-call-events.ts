import { SDK } from "../src";
import "dotenv/config";

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: process.env.URL,
  });

  console.log(
    await sdk.eth.events.getCallEvents({
      walletId: '3be5351bd52626108326f9ec44b7b633'
    })
  );
}

main().catch((e) => console.error(e));
