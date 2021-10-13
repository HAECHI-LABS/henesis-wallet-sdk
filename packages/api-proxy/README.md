# `API PROXY`

We recommend using npm >= 7.20.6

## HOW TO START

```bash
npm run start # (with production environment)

# or start with local environment
npm run start:local

# or start with development environment
npm run start:dev

# or start with test environment
npm run start:test

# or build and run
npm build
node lib/main.js

# or docker run
docker run -e API_VERSION=v3 -e NODE_ENV=test haechi/henesis-api-proxy
```

## Environment Vairables

```bash
CACHE_TTL=10 # cahcing time to live. default: 10 second
CACHE_MAX=100 # maximum caching items. default: 100 items
PORT=3000 # port to open. default: 3000
BUILD_SWAGGER=false # build swagger file and exit(swagger/swagger-spec.yaml), default: false
API_VERSION="" # specify api version(v2, v3). default: N/A(V2,V3 activate)
NODE_ENV="" # specify environment (test, local, development, production) default: production
MAINNET="" # specify v2 mainnet (ethereum,klaytn, bitcoin) 
```

## Swagger

You can see swagger files in `packages/api-proxy/swagger`. If you want to make a new swagger file based on your code, run `npm run build:spec`.

## How to format/lint

```bash
npm run eslint
npm run prettier
```