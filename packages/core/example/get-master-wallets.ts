import { SDK } from '../src';
import { EthMasterWallet } from '../src/eth/wallet';
import 'dotenv/config';

async function main() {
  const sdk = new SDK({
    accessToken:
      'eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImhhZWNoaUBoYWVjaGkuaW8iLCJpZCI6IjQ5ODAzZmJmMGEyYTJjM2FiM2EwYWJhOGI5OGRiYjJhIiwidHlwZSI6IkxPTkciLCJpc3MiOiJoZW5lc2lzLXdhbGxldC1kZXYiLCJpYXQiOjE1ODY0NDE2MjgsImV4cCI6Mzc1ODY0NDE2Mjh9.XWdT2QzZ0AODPLlI6b-QnwHk8GZ66FkCJg_HASyuJwTw_3XFT-WSLfC__bII1aKLFxIj9SynAbe2_cZHrS5OKQ',
    secret: '119Es7Czo6yM4cYfS8IxTRhLfuDwDmN4rl0RK3ivuGI=',
    url: 'http://34.84.220.21/api/v2',
  });

  const ethWallets: EthMasterWallet[] = await sdk.eth.wallets.getMasterWallets();
  const klayWallets: EthMasterWallet[] = await sdk.klay.wallets.getMasterWallets();
  console.log(ethWallets, klayWallets);
}

main().catch(e => console.error(e));
