# Development Tips

## Code Generation
For matching interface between SDK and Henesis API server, SDK uses `codegen`. So, if you add/update Henesis API server, run the command below to generate an interface code automatically. 
```bash
# in pakcages/core
npm run codegen
```
You can find the generated code in `packages/core/src/__generate__`.

## HTTP Headers
When you want to call API through API Proxy, do not forget to set headers properly. You need to set API Secret onto `X-Henesis-Secret`, and Access Token using `Bearer ` onto `Authorization`. API Secret and Access Token can be found in Henesis Wallet dashboard.

## Test Environment
You can test the API Proxy with various test environments. Also, you can choose the server environment by editing some envionment variables.

Assume that you want to test API Proxy in staging testnet environment.
```json
// packages/api-proxy/package.json
{
    ...
    "scripts": {
        ...     
        "start:test": "URL=https://staging.testnet.wallet.henesis.io/api/v2 cross-env NODE_ENV=test nest start --watch",
        ...
    }
    ...
}
```
Following this, you could test with url that you want.

Also, you can test editing `url.ts` like this.
```typescript
// pakcages/core/src/utils/url.ts
...
baseUrls.set(Env.Test, "https://stagint.test.wallet.henesis.io/api/v2");
...
```

## Use local modified core SDK in the API Proxy

Running `npm run lerna:bootstrap` makes copy of core SDK to the API Proxy's node_modules directory.

For more information, read [this](https://lerna.js.org/#command-bootstrap).
