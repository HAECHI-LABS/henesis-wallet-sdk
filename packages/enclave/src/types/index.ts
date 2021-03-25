import { SDK } from "@haechi-labs/henesis-wallet-core";

declare module "express" {
  export interface Request {
    sdk: SDK;
  }
}
// declare global {
//   namespace Express {
//     export interface Request {
//       sdk: SDK;
//     }
//   }
// }
