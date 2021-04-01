export const WALLET_VERSION_V3 = "v3";

export const isLessThanWalletV3 = (version: string) => {
  const verisonNumber = parseInt(version);
  const versionV3Number = parseInt(WALLET_VERSION_V3);
  return verisonNumber < versionV3Number;
};
