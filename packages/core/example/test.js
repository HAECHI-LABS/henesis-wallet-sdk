const BN = require('bn.js');

function gasOverUsed(gasUsed, gasLimit) {
  const gasOveruseNum = 11;
  const gasOveruseDenom = 10;
  let over = gasLimit - (gasOveruseNum*gasUsed)/gasOveruseDenom;
  if(over > gasUsed) {
    over = gasUsed;
  }
  console.log(over);
  let gasToBurn = new BN(gasLimit - gasUsed);
  console.log(gasToBurn.toString());
  gasToBurn = gasToBurn.mul(new BN(over));
  console.log(gasToBurn.toString());
  gasToBurn = gasToBurn.div(new BN(gasUsed))
  console.log(gasToBurn.toString());
  return gasToBurn;
}

function getBurnFee(gasLimit, gasUsed, feeCap, premium, baseFee, feeAmount) {
  const gasToBurn = gasOverUsed(gasUsed, gasLimit);
  const one = new BN(gasUsed).add(gasToBurn);
  return new BN(baseFee).mul(one).toString();
}

console.log(getBurnFee(
  4399186,
  3519349,
  602768,
  100308,
  165323,
  0
))

// console.log(getBurnFee(
//   5270827,
//   2219262,
//   11000000000,
//   101171,
//   195206360,
//   0
// ))
//
// console.log(getBurnFee(
//   6360288,
//   5088231,
//   100392,
//   99338,
//   100,
//   0
// ))