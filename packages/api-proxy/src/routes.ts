import { Routes } from "nest-router";
import { ApiV3Module } from "./v3/api.v3.module";
import { ApiV2Module } from "./v2/api.v2.module";
import { EthModule as EthV3Module } from "./v3/eth/eth.module";
import { EthModule as EthV2Module } from "./v2/eth/eth.module";
import { KlayModule as KlayV2Module } from "./v2/klay/klay.module";
import { BtcModule as BtcV2Module } from "./v2/btc/btc.module";
import { LtcModule as LtcV3Module } from "./v3/ltc/ltc.module";
import { BchModule as BchV3Module } from "./v3/bch/bch.module";
import { FilModule as FilV3Module } from "./v3/fil/fil.module";
import { KlayModule as KlayV3Module } from "./v3/klay/klay.module";

export const routes: Routes = [
  {
    path: "/v3",
    module: ApiV3Module,
    childrens: [
      { path: "/ethereum", module: EthV3Module },
      { path: "/klaytn", module: KlayV3Module },
      { path: "/filecoin", module: FilV3Module },
      { path: "/litecoin", module: LtcV3Module },
      { path: "/bitcoin-cash", module: BchV3Module },
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
