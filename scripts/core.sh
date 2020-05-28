# core unit test
cd ./packages/core

npm run test

if [ $? -ne 0 ]; then
    echo "core test failed" >&2
    exit 1
fi

exit 0
