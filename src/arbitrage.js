import {
  estimateBestAmountIn,
  estimateProfit
} from "./estimates.js";

import BigNumber from "bignumber.js";

export const findArbitrage = async (pools) => {
  console.log("Start findArbitrage");

  console.log(`Pools number: ${pools.length}`);

  const profitableArbitrageCycles = [];
  let checkedPath = 0;

  const address1ToPools = {};
  pools.forEach(pool => {
    if (!(pool.address1 in address1ToPools)) {
      address1ToPools[pool.address1] = [];
    }
    address1ToPools[pool.address1].push(pool);
  });

  const path = [];
  const used = new Map();

  let cnt = 0;
  const brute = (depth) => {
    cnt += 1;
    if (
      path.length > 1 &&
      path[path.length - 1].address2 === path[0].address1
    ) {
      checkedPath += 1;
      const bestAmountIn = estimateBestAmountIn(path);
      const profit = estimateProfit(path, bestAmountIn);
      if (profit.gt(new BigNumber("0"))) {
        const add = {
          path: [...path],
          bestAmountIn: bestAmountIn,
          profit: profit
        };
        profitableArbitrageCycles.push(add);
      }
    }
    if (depth < 3) {
      // max depth 3
      const from = path.length > 0 ? path[path.length - 1].address2 : "tez";
      address1ToPools[from]
        .filter((pool) => (used.get(pool.address1) !== 1))
        .forEach((pool) => {
          path.push(pool);
          used.set(pool.address1, 1);
          brute(depth + 1);
          used.set(pool.address1, 0);
          path.pop();
        });
    }
  };
  console.log(cnt);

  brute(0);

  console.log(`Checked ${checkedPath} arbitrage paths`);

  return profitableArbitrageCycles
    .sort((a, b) => b.profit.minus(a.profit).toNumber());
};

