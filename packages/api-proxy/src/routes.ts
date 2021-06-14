import { Routes } from "nest-router";
import { ApiV3Module } from "./v3/api.v3.module";
import { ApiV2Module } from "./v2/api.v2.module";
import { EthModule } from "./v3/eth/eth.module";
import { EthModule as EthV2Module } from "./v2/eth/eth.module";
import { KlayModule as KlayV2Module } from "./v2/klay/klay.module";
import { BtcModule as BtcV2Module } from "./v2/btc/btc.module";
import { BscModule } from "./v3/bsc/bsc.module";

export const routes: Routes = [
  {
    path: "/v3",
    module: ApiV3Module,
    childrens: [
      { path: "/ethereum", module: EthModule },
      { path: "/binance-smart-chain", module: BscModule },
    ],
  },
  {
    path: "/v2",
    module: ApiV2Module,
    childrens: [
      { path: "/eth", module: EthV2Module },
      { path: "/klay", module: KlayV2Module },
      {
        path: "/btc",
        module: BtcV2Module,
      },
    ],
  },
] as Routes;
