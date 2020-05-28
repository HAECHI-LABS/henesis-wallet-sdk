#!/bin/bash
docker login -u "$DOCKER_HUB_USER" -p "$DOCKER_HUB_PASSWORD"

echo $1

if [[ $1 = "prod" ]]; then
  TAG="$TRAVIS_TAG"
fi

docker build -t haechi/sdk-enclave:latest .
docker push haechi/sdk-enclave:latest

docker tag haechi/sdk-enclave:latest haechi/sdk-enclave:${TAG}
docker push haechi/sdk-enclave:${TAG}
