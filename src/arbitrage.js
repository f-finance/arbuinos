import {
  estimateBestAmountIn,
  estimatePoolAmountOut,
  estimateProfit,
} from "./estimates.js";

import BigNumber from "bignumber.js";

export const findArbitrage = async (pools) => {
  console.log("Start findArbitrage");

  console.log(`Pools number: ${pools.length}`);

  const profitableArbitrageCycles = [];
  let checkedPath = 0;

  const address1ToPools = {};
  pools.forEach((pool) => {
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
          profit: profit,
        };
        profitableArbitrageCycles.push(add);
      }
    }
    if (depth < 4) {
      // max depth 3
      const from = path.length > 0 ? path[path.length - 1].address2 : "tez";
      address1ToPools[from]
        .filter((pool) => used.get(pool.address1) !== 1)
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

  return profitableArbitrageCycles.sort((a, b) =>
    b.profit.minus(a.profit).toNumber()
  );
};

export const findArbitrageV2 = async (
  pools,
  initialAmount = new BigNumber("10").pow(5)
) => {
  console.log("Start findArbitrageV2");

  console.log(`Pools number: ${pools.length}`);

  const start = new Date().getTime();

  let profitableArbitrageCycles = [];
  let checkedPath = 0;

  const address1ToPools = {};
  // const address2ToBestAmountOut = {};
  pools.forEach((pool) => {
    if (!(pool.address1 in address1ToPools)) {
      address1ToPools[pool.address1] = [];
    }
    // if (!(pool.address2 in address2ToBestAmountOut)) {
    //   address2ToBestAmountOut[pool.address2] = new BigNumber("0");
    // }
    address1ToPools[pool.address1].push(pool);
  });

  const path = [];
  const amountPath = [initialAmount];
  const used = new Map();

  const brute = (depth) => {
    if (
      path.length > 1 &&
      path[path.length - 1].address2 === path[0].address1
    ) {
      checkedPath += 1;
      // const bestAmountIn = estimateBestAmountIn(path);
      // const profit = estimateProfit(path, bestAmountIn);
      const bestAmountIn = initialAmount;
      const profit = amountPath[amountPath.length - 1].minus(bestAmountIn);
      if (profit.gt(new BigNumber("0"))) {
        const add = {
          path: [...path],
          bestAmountIn: bestAmountIn,
          profit: profit,
        };
        profitableArbitrageCycles.push(add);
      }
    }
    // if (path.length > 1) {
    //   if (address2ToBestAmountOut[path[path.length - 1].address2].gt(amountPath[amountPath.length - 1].div(2))) {
    //     return;
    //   }
    //   address2ToBestAmountOut[path[path.length - 1].address2] = new BigNumber(amountPath[amountPath.length - 1]);
    // }
    if (depth < 4) {
      // max depth 3
      const from = path.length > 0 ? path[path.length - 1].address2 : "tez";
      address1ToPools[from]
        .filter((pool) => used.get(pool.address1) !== 1)
        .forEach((pool) => {
          if (amountPath[amountPath.length - 1].gt(pool.liquidity1)) {
            return;
          }
          const amountOut = estimatePoolAmountOut(
            amountPath[amountPath.length - 1],
            pool
          );
          if (amountOut.gt(pool.liquidity2)) {
            return;
          }
          // console.log(amountOut.toString());
          amountPath.push(amountOut);
          path.push(pool);
          used.set(pool.address1, 1);
          brute(depth + 1);
          used.set(pool.address1, 0);
          amountPath.pop();
          path.pop();
        });
    }
  };

  brute(0);

  profitableArbitrageCycles.sort((a, b) => b.profit.minus(a.profit).toNumber());
  if (profitableArbitrageCycles.length > 100) {
    profitableArbitrageCycles = profitableArbitrageCycles.slice(0, 100);
  }

  profitableArbitrageCycles = profitableArbitrageCycles.map((pool) => {
    const bestAmountIn = estimateBestAmountIn(pool.path);
    const profit = estimateProfit(pool.path, bestAmountIn);
    return {
      ...pool,
      bestAmountIn: bestAmountIn,
      profit: profit,
    };
  });

  const end = new Date().getTime();
  const time = end - start;
  console.log(
    `Checked ${checkedPath} arbitrage paths in ${time / 1000} seconds`
  );

  return profitableArbitrageCycles.sort((a, b) =>
    b.profit.minus(a.profit).toNumber()
  );
};
