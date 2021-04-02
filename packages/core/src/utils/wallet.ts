export const WALLET_VERSION_V4 = "v4";

export const isLessThanWalletV3 = (version: string) => {
  const verisonNumber = parseInt(version.substr(1));
  const versionV4Number = parseInt(WALLET_VERSION_V4.substr(1));
  return verisonNumber < versionV4Number;
};
