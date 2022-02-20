import {
  estimateBestAmountIn,
  estimateProfit
} from "./estimates.js";
import { stateToPoolsExtractors } from "./extractors.js";

import BigNumber from "bignumber.js";

export const findArbitrage = async ({ dexState }) => {
  console.log("Start findArbitrage");

  const regularPools = (
    await Promise.all(
      Object.keys(dexState).map((key) => {
        return stateToPoolsExtractors[key](dexState[key]);
      })
    )
  ).flat();
  const invertedPools = regularPools.map((pool) => ({
    ...pool,
    address1: pool.address2,
    address2: pool.address1,
    liquidity1: pool.liquidity2,
    liquidity2: pool.liquidity1
  }));
  const pools = [...regularPools, ...invertedPools];

  console.log(`Pools number: ${pools.length}`);
  // console.log(JSON.stringify(pools, null, " "));

  const profitableArbitrageCycles = [];
  let checkedPath = 0;

  const brute = (path, depth) => {
    if (
      path.length > 1 &&
      JSON.stringify(path[path.length - 1].address2) ===
      JSON.stringify(path[0].address1)
    ) {
      checkedPath += 1;
      const bestAmountIn = estimateBestAmountIn(path);
      const profit = estimateProfit(path, bestAmountIn);
      if (profit.gt(new BigNumber("0"))) {
        const add = {
          path: path,
          bestAmountIn: bestAmountIn,
          profit: profit
        };
        profitableArbitrageCycles.push(add);
      }
    }
    if (depth < 4) {
      // max depth 3
      pools
        .filter((pool) => {
          if (path.length === 0) return pool.address1 === "tez";
          if (pool.address1 !== path[path.length - 1].address2) return false;
          for (const item of path) {
            if (item.address1 === pool.address1) {
              return false;
            }
          }
          return true;
        })
        .forEach((pool) => {
          brute([...path, pool], depth + 1);
        });
    }
  };

  brute([], 0);

  console.log(`Checked ${checkedPath} arbitrage paths`);

  return profitableArbitrageCycles
    .sort((a, b) => b.profit.minus(a.profit).toNumber())
    .filter((item) => item.profit.gt(new BigNumber("20000")));
};
