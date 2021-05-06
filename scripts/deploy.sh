#!/bin/bash
echo $1

if [[ $1 = "prod" ]]; then
  TAG="$GITHUB_TAG"
fi

docker build -t haechi/henesis-api-proxy:latest .
docker push haechi/henesis-api-proxy:latest

docker tag haechi/henesis-api-proxy:latest haechi/henesis-api-proxy:${TAG}
docker push haechi/henesis-api-proxy:${TAG}