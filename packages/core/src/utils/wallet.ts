import { BlockchainType } from "../blockchain";

/**
 * version example: v3
 */
function parseVersion(version: string): number {
  return parseInt(version.substr(1));
}

export const WALLET_VERSION_V4 = "v4";

export const isLessThanWalletV4 = (version: string) => {
  const verisonNumber = parseVersion(version);
  const versionV4Number = parseVersion(WALLET_VERSION_V4);
  return verisonNumber < versionV4Number;
};

type FlushFlag = "withoutTarget" | "withTarget";
type UserWalletFlag = "userWallet" | "depositAddress";
type FeatureFlag = {
  flush: FlushFlag;
  userWallet: UserWalletFlag;
};
type Version = number;

const featureFlags: { [P in BlockchainType]: Map<Version, FeatureFlag> } = {
  [BlockchainType.ETHEREUM]: new Map<number, FeatureFlag>(),
  [BlockchainType.KLAYTN]: new Map<number, FeatureFlag>(),
  [BlockchainType.BINANCE_SMART_CHAIN]: new Map<number, FeatureFlag>(),
  [BlockchainType.BITCOIN]: new Map<number, FeatureFlag>(),
  [BlockchainType.BITCOIN_CASH]: new Map<number, FeatureFlag>(),
  [BlockchainType.LITECOIN]: new Map<number, FeatureFlag>(),
  [BlockchainType.FILECOIN]: new Map<number, FeatureFlag>(),
};

featureFlags[BlockchainType.ETHEREUM].set(1, {
  flush: "withoutTarget",
  userWallet: "userWallet",
});
featureFlags[BlockchainType.ETHEREUM].set(2, {
  flush: "withoutTarget",
  userWallet: "userWallet",
});
featureFlags[BlockchainType.ETHEREUM].set(3, {
  flush: "withoutTarget",
  userWallet: "userWallet",
});
featureFlags[BlockchainType.ETHEREUM].set(4, {
  flush: "withTarget",
  userWallet: "depositAddress",
});

featureFlags[BlockchainType.KLAYTN].set(1, {
  flush: "withoutTarget",
  userWallet: "userWallet",
});
featureFlags[BlockchainType.KLAYTN].set(2, {
  flush: "withoutTarget",
  userWallet: "userWallet",
});
featureFlags[BlockchainType.KLAYTN].set(3, {
  flush: "withoutTarget",
  userWallet: "userWallet",
});
featureFlags[BlockchainType.KLAYTN].set(4, {
  flush: "withTarget",
  userWallet: "userWallet",
});

featureFlags[BlockchainType.BINANCE_SMART_CHAIN].set(1, {
  flush: "withTarget",
  userWallet: "userWallet",
});

/**
 * This flush method uses less fee. It is the newer version of flush.
 */
export function canUseFlushWithTargets(
  blockchain: BlockchainType,
  version: number | string
): boolean {
  let verisonNumber;
  if (typeof version === "string") {
    verisonNumber = parseVersion(version);
  } else {
    verisonNumber = version;
  }
  return featureFlags[blockchain].get(verisonNumber).flush === "withTarget";
}

/**
 * Thi flush method is older version of Flush.
 */
export function canUseFlush(
  blockchain: BlockchainType,
  version: number | string
): boolean {
  let verisonNumber;
  if (typeof version === "string") {
    verisonNumber = parseVersion(version);
  } else {
    verisonNumber = version;
  }
  return featureFlags[blockchain].get(verisonNumber).flush === "withoutTarget";
}

/**
 * Deposit address model has les feature and use less gas.
 * It is used in the blockchains whose fee is expensive.
 */
export function canUseDepositAddress(
  blockchain: BlockchainType,
  version: number | string
): boolean {
  let verisonNumber;
  if (typeof version === "string") {
    verisonNumber = parseVersion(version);
  } else {
    verisonNumber = version;
  }
  return (
    featureFlags[blockchain].get(verisonNumber).userWallet === "depositAddress"
  );
}

/**
 * User wallet model has more feature and use more gas.
 * It is used in the blockchains whose fee is cheap.
 */
export function canUseUserWallet(
  blockchain: BlockchainType,
  version: number | string
): boolean {
  let verisonNumber;
  if (typeof version === "string") {
    verisonNumber = parseVersion(version);
  } else {
    verisonNumber = version;
  }
  return (
    featureFlags[blockchain].get(verisonNumber).userWallet === "userWallet"
  );
}
