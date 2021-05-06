# `API PROXY`

> 

## HOW TO START

```bash
npm run start #(for development)

# or build and run
npm build
node lib/main.js

# or docker run
docker run -e API_VERSION=v3 -e NODE_ENV=test haechi/henesis-api-proxy
```

## Envorinment Vairables

```bash
CACHE_TTL=10 # cahcing time to live. default: 10 second
CACHE_MAX=100 # maximum caching items. default: 100 items
PORT=3000 # port to open. default: 3000
BUILD_SWAGGER=false # build swagger file and exit(swagger/swagger-spec.yaml), default: false
API_VERSION="" # specify api version(v2, v3). default: N/A(V2,V3 activate)
NODE_ENV="" # specify environment (test, local, development, production) default: production
```
