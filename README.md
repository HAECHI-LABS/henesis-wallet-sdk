# Henesis Wallet SDK

![Integration Test Action](https://github.com/HAECHI-LABS/henesis-wallet-sdk/workflows/Integration%20Test%20Action/badge.svg) ![Build Status](https://github.com/HAECHI-LABS/henesis-wallet-sdk/actions/workflows/test.yaml/badge.svg)

We are using the Node v14

## How to Build

```shell
npm run bootstrap
```

## Reset Packages
```shell
npm run install:reset
npm run bootstrap
```

## Components
### SDK
If you want to use Henesis Wallet programmatically, you need to use Henesis Wallet SDK that makes easier to connect with Henesis. For detailed explanation of SDK, please refer to [this link](https://github.com/HAECHI-LABS/henesis-wallet-sdk/blob/master/packages/core/README.md). Also, there are some example codes on [this link](https://github.com/HAECHI-LABS/henesis-wallet-sdk/tree/master/packages/core/example) to support you to use SDK properly.

### API Proxy
API Proxy is an application that allows you to easily interact with Henesis Wallet via HTTP protocol. For detailed explanation of API Proxy, please refer to [this link](https://github.com/HAECHI-LABS/henesis-wallet-sdk/blob/master/packages/api-proxy/README.md). Also, API Proxy supports docker image. You can find the instruction of how to use API Proxy by docker image on [this link](https://docs.henesis.io/docs/getting-started-prepare-to-use-api).

## Development Tips
You can get some tips for developing and testing SDK & API Proxy on [this document](./DEVELOPMENT.md).
