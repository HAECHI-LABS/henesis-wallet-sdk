#!/bin/bash

rm ./package-lock.json
rm ./packages/**/package-lock.json
rm -rf ./node_modules
rm -rf ./packages/**/node_modules

npm install
