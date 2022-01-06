# `core`

> TODO: description

## Usage

```
const core = require('core');

// TODO: DEMONSTRATE API
```

## 📂 Directory structure

    packages
    ├── core
    ├──── example          # 
    ├──── scripts          # 각종 유틸 스크립트 (ex) locale ts -> json 으로 변환하는 스트립트)
    ├──── src
    ├─────── apis          # 각 블록체인별 wallet 서버 API
    ├─────── bch            
    ├─────── btc           
    ├─────── contracts      
    ├─────── eth            
    ├─────── fil            
    ├─────── ltc            
    ├─────── resources     
    ├─────── typings       # global 타입 정의
    └─────── utils         # 공통 유틸성 기반 외부 라이브러리 커스터마이징한 패키지 (ex) uri, string ... )
    

## Deployment

### alpha일 경우

- npm run build
- npm run publish:prerelease


## How to format/lint

```bash
npm run eslint
npm run prettier
```
