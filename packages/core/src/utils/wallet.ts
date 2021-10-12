/**
 * version example: v3
 */
export function parseVersion(version: string): number {
  return parseInt(version.substr(1));
}
