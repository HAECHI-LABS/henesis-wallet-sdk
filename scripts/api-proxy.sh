# api-proxy build
cd ./packages/api-proxy

npm run build

if [ $? -ne 0 ]; then
    echo "api-proxy build failed" >&2
    exit 1
fi

exit 0
