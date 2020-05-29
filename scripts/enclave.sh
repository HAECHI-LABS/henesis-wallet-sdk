# enclave build
cd ./packages/enclave

npm run build

if [ $? -ne 0 ]; then
    echo "enclave build failed" >&2
    exit 1
fi

exit 0
