#!/bin/bash
echo $1

if [[ $1 = "prod" ]]; then
  TAG="$GITHUB_TAG"
fi

docker build -t haechi/sdk-enclave:latest .
docker push haechi/sdk-enclave:latest

docker tag haechi/sdk-enclave:latest haechi/sdk-enclave:${TAG}
docker push haechi/sdk-enclave:${TAG}