export const BLOCKCHAINS = ['ethereum', 'klaytn'];

export const SERVER_ERRORS = {
  INSUFFICIENT_GAS_FEE: class GasError extends Error {},
  NAME_DUPLICATED: class NameError extends Error {},
  AUTH_ERROR: class AuthError extends Error {},
};
