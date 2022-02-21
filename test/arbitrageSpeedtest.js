import { poolsLog } from "./pools.log.js";
import { findArbitrage, findArbitrageV2 } from "../src/arbitrage.js";

import BigNumber from "bignumber.js";

(async () => {
  const pools = poolsLog.map(pool => ({
    ...pool,
    liquidity1: new BigNumber(pool.liquidity1),
    liquidity2: new BigNumber(pool.liquidity2),
    fee1: new BigNumber(pool.fee1),
    fee2: new BigNumber(pool.fee2)
  }));

  const start = new Date().getTime();

  const arb = (await findArbitrageV2(pools));
  console.log("found arbitrages", arb.length);
  console.log("arbitrage", JSON.stringify(arb[0], null, ' '));

  const end = new Date().getTime();
  const time = end - start;
  console.log('Execution time: ' + time);
})();