# base
FROM node:12.13.1-alpine AS base

RUN apk add --update python make g++ git

# bootstrap
FROM base AS bootstrap

COPY  /packages /packages
COPY  package.json /
COPY  lerna.json /
COPY  tsconfig.json /

RUN yarn bootstrap

# todo: change to api-proxy
WORKDIR /packages/enclave

RUN yarn build

ENTRYPOINT ["node", "lib/main.js"]

EXPOSE 3000
