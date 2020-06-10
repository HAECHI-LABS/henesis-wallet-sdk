import { SDK } from '../src';
import 'dotenv/config';
import { Token } from '../src/types';

async function main() {
  const sdk = new SDK({
    accessToken: process.env.ACCESS_TOKEN,
    secret: process.env.SECRET,
    url: 'http://localhost:8080/api/v1',
  });

  const token: Token = await sdk.accounts.getAccessToken();
  console.log(token);
}

main().catch(e => console.error(e));
