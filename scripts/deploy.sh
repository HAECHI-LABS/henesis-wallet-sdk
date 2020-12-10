#!/bin/bash
echo $1

if [[ $1 = "prod" ]]; then
  TAG="$GIT_TAG_NAME"
fi

docker build -t haechi/sdk-enclave:latest .
docker push haechi/sdk-enclave:latest

docker tag haechi/sdk-enclave:latest haechi/sdk-enclave:TAG
docker push haechi/sdk-enclave:TAG
