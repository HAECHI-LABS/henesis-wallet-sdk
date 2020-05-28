#!/bin/bash
# core unit test
cd ./packages/core
npm install
npm run test

if [ $? -ne 0 ]; then
    echo "core unit test failed" >&2
    exit 1
fi

# enclave build
cd ../../packages/enclave
npm install
npm run build

if [ $? -ne 0 ]; then
    echo "enclave build failed" >&2
    exit 1
fi

exit 0