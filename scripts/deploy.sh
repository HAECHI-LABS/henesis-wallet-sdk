#!/bin/bash
echo $1

if [[ $1 = "prod" ]]; then
  TAG="$GITHUB_TAG"
fi

docker build -t haechi/api-proxy:latest .
docker push haechi/api-proxy:latest

docker tag haechi/api-proxy:latest haechi/api-proxy:${TAG}
docker push haechi/api-proxy:${TAG}