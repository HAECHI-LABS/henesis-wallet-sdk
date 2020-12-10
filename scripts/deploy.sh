#!/bin/bash
echo $1

if [[ $1 = "prod" ]]; then
  TAG=$2
fi

docker build -t haechi/sdk-enclave:latest .
docker push haechi/sdk-enclave:latest

docker tag haechi/sdk-enclave:latest haechi/sdk-enclave:${TAG}
docker push haechi/sdk-enclave:${TAG}