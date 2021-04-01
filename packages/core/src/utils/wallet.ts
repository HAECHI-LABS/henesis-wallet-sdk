export const WALLET_VERSION_V3 = "v3";

export const isLessThanWalletV3 = (version: string) => {
  const verisonNumber = parseInt(version.substr(1));
  const v3VersionNumber = parseInt(WALLET_VERSION_V3.substr(1));
  return verisonNumber < v3VersionNumber;
};