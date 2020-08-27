import { SDK } from "../src";
import { AbiItem } from "web3-utils";
import BN from "bn.js";

const secret = "Kjvr7elyKVi5M5RKqPihkc3i3joZYB/QMhr1WYiAYL4=";
const token = "eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6InRhZWtsZWVAaGFlY2hpLmlvIiwiaWQiOiJhMTdkODdkNzczZTAxYTEwMzkxMmFhNTE3Yzk0ZThiMyIsInR5cGUiOiJMT05HIiwiaXNzIjoiaGVuZXNpcy13YWxsZXQtaWRlbnRpdHktcHJvZC10ZXN0bmV0IiwiaWF0IjoxNTk3ODk1MDA2LCJleHAiOjE2Mjk0MzEwMDZ9.JZeO_AeENuwjK093fnUzdcKqVOteGWC5V5be1xDnstlb30si73o9mg-d28JMcfEKW9w2tNCPWH0O9Mq5dkKSwQ";
const sdk = new SDK({ accessToken: token, secret: secret, env: 2 });
const Web3 = require("web3");
const web3 = new Web3("https://tn.henesis.io/ethereum/ropsten?clientId=a481485a958f1b82ac310ec4eea27943");
const Token = require("../src/contracts/ERC20_NON_STANDARD_RETURN_TYPE.json");

const sampleToken = new web3.eth.Contract(Token as AbiItem[]);
const amount = "1000000000000000000";

async function callTransfer() {
  const master = await sdk.eth.wallets.getMasterWallet("3664993f24bee982c3e782b97da5973a");
  const user = await master.getUserWallet("140210fa83e9843de297109e7acc273b");
  const data = sampleToken.methods.transfer("0x4c49f0ead605aca868364769c9a4ef24930810b5", amount).encodeABI();
  console.log(data);
  const response = await user.contractCall("0xF05154C01B51AEdfbd49A040c7a85186E5c15a70", new BN(0), data, "taek");
  console.log(response);
}

callTransfer();