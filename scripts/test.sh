#!/bin/bash
echo $1

if [[ $1 = "prod" ]]; then
  TAG=$2
fi

echo ${TAG}