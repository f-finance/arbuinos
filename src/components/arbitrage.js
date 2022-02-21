import BigNumber from "bignumber.js";

import { getBestAmountIn, calculateProfit } from "./calculations.js";
import { DEX } from "./storage";

const quipuswapStateToPoolsInfo = async (state) => {
  return Array.from(state).flatMap(([key, value]) => {
    const address1 = "tez";
    const address2 = JSON.stringify({
      address: `${value.storage.token_address}`,
      id: `${value.storage.token_id ?? 0}`,
    });
    const liquidity1 = value.storage.tez_pool; // TODO decimals
    const liquidity2 = value.storage.token_pool; // TODO decimals
    const fee1 = new BigNumber("1"); // TODO validate fee1 and fee2
    const fee2 = new BigNumber("0.997");

    return [
      {
        dex: "QUIPUSWAP",
        contractAddress: key,
        address1,
        address2,
        liquidity1,
        liquidity2,
        fee1,
        fee2,
      },
      {
        dex: "QUIPUSWAP",
        contractAddress: key,
        address1: address2,
        address2: address1,
        liquidity1: liquidity2,
        liquidity2: liquidity1,
        fee1: fee1,
        fee2: fee2,
      },
    ];
  });
};

const plentyStateToPoolsInfo = async (state) => {
  // TODO validate
  return Array.from(state).flatMap(([key, value]) => {
    const address1 = JSON.stringify({
      address: `${value.token1Address}`,
      id: `${value.token1Id ?? 0}`,
    });
    const address2 = JSON.stringify({
      address: `${value.token2Address}`,
      id: `${value.token2Id ?? 0}`,
    });
    const liquidity1 = value.token1_pool; // TODO decimals
    const liquidity2 = value.token2_pool; // TODO decimals
    const fee1 = new BigNumber("0.9965");
    const fee2 = new BigNumber("1");

    return [
      {
        dex: "PLENTY",
        contractAddress: key,
        address1,
        address2,
        liquidity1,
        liquidity2,
        fee1,
        fee2,
      },
      {
        dex: "PLENTY",
        contractAddress: key,
        address1: address2,
        address2: address1,
        liquidity1: liquidity2,
        liquidity2: liquidity1,
        fee1: fee1,
        fee2: fee2,
      },
    ];
  });
};

const vortexStateToPoolsInfo = async (state) => {
  return Array.from(state).flatMap(([key, value]) => {
    const address1 = "tez";
    const address2 = JSON.stringify({
      address: `${value.tokenAddress}`,
      id: `${value.tokenId ?? 0}`,
    });
    const liquidity1 = value.xtzPool;
    const liquidity2 = value.tokenPool;
    const fee1 = new BigNumber("0.9972"); // TODO validate fee1 and fee2
    const fee2 = new BigNumber("1");

    return [
      {
        dex: "VORTEX",
        contractAddress: key,
        address1,
        address2,
        liquidity1,
        liquidity2,
        fee1,
        fee2,
      },
      {
        dex: "VORTEX",
        contractAddress: key,
        address1: address2,
        address2: address1,
        liquidity1: liquidity2,
        liquidity2: liquidity1,
        fee1: fee1,
        fee2: fee2,
      },
    ];
  });
};

const flameStateToPoolsInfo = async (state) => {
  return (
    await Promise.all(
      Array.from(state).flatMap(async ([contractAddress, storage]) => {
        const result = [];
        for (let i = 1; i <= storage.buckets_count.toNumber(); i += 1) {
          const bucket = await storage.buckets.get(i);

          const tokenInfoToAddress = (tokenInfo) => {
            if ("tz" in tokenInfo) {
              return "tez";
            }
            if ("fa12" in tokenInfo) {
              return JSON.stringify({
                address: `${tokenInfo.fa12}`,
                id: "0",
              });
            }
            if ("fa2" in tokenInfo) {
              return JSON.stringify({
                address: `${tokenInfo.fa2[5] ?? tokenInfo.fa2[7]}`,
                id: `${tokenInfo.fa2[6] ?? tokenInfo.fa2[8]}`,
              });
            }
          };
          const address1 = tokenInfoToAddress(bucket.token_a);
          const address2 = tokenInfoToAddress(bucket.token_b);
          const liquidity1 = bucket.token_a_res;
          const liquidity2 = bucket.token_b_res;
          const fee1 = new BigNumber("0.997"); // TODO validate fee1 and fee2
          const fee2 = new BigNumber("1");

          result.push(
            ...[
              {
                dex: "FLAME",
                contractAddress: contractAddress,
                address1,
                address2,
                liquidity1,
                liquidity2,
                fee1,
                fee2,
              },
              {
                dex: "FLAME",
                contractAddress: contractAddress,
                address1: address2,
                address2: address1,
                liquidity1: liquidity2,
                liquidity2: liquidity1,
                fee1: fee1,
                fee2: fee2,
              },
            ]
          );
        }
        return result;
      })
    )
  ).flat();
};

const tzbtcoriginalStateToPoolsInfo = async (state) => {
  return Array.from(state).flatMap(([key, value]) => {
    const address1 = "tez";
    const address2 = JSON.stringify({
      address: `${value.tokenAddress}`,
      id: "0",
    });
    const liquidity1 = value.xtzPool;
    const liquidity2 = value.tokenPool;
    const fee1 = new BigNumber("1"); // TODO validate fee1 and fee2
    const fee2 = new BigNumber("0.998");

    return [
      {
        dex: "TZBTCORIGINAL",
        contractAddress: key,
        address1,
        address2,
        liquidity1,
        liquidity2,
        fee1,
        fee2,
      },
      {
        dex: "TZBTCORIGINAL",
        contractAddress: key,
        address1: address2,
        address2: address1,
        liquidity1: liquidity2,
        liquidity2: liquidity1,
        fee1: fee1,
        fee2: fee2,
      },
    ];
  });
};

const spicyswapStateToPoolsInfo = async (state) => {
  return Array.from(state).flatMap(([key, value]) => {
    const address1 = JSON.stringify({
      address: `${value.token1.fa2_address}`,
      id: `${value.token1.token_id || 0}`,
    });
    const address2 = JSON.stringify({
      address: `${value.token0.fa2_address}`,
      id: `${value.token0.token_id || 0}`,
    });
    const liquidity1 = value.reserve0;
    const liquidity2 = value.reserve1;
    const fee1 = new BigNumber("0.997"); // TODO validate fee1 and fee2
    const fee2 = new BigNumber("1");

    return [
      {
        dex: "SPICYSWAP",
        contractAddress: key,
        address1,
        address2,
        liquidity1,
        liquidity2,
        fee1,
        fee2,
      },
      {
        dex: "SPICYSWAP",
        contractAddress: key,
        address1: address2,
        address2: address1,
        liquidity1: liquidity2,
        liquidity2: liquidity1,
        fee1: fee1,
        fee2: fee2,
      },
    ];
  });
};

const dexStateToPoolsInfoFunctions = {
  [DEX.QUIPUSWAP]: quipuswapStateToPoolsInfo,
  [DEX.PLENTY]: plentyStateToPoolsInfo,
};

export const findArbitrage = async ({ dexState }) => {
  console.log("Start findArbitrage");

  const pools = [];

  /* console.log("dex from keys", Object.keys(dexState)); */
  for (const dex of Object.keys(dexState)) {
    /* console.log("dex from for .. of", dex); */
    const dex_pools = await dexStateToPoolsInfoFunctions[dex](dexState[dex]);
    pools.push(...dex_pools);
  }

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
      const bestAmountIn = getBestAmountIn(path);
      const profit = calculateProfit(path, bestAmountIn);
      if (profit.gt(new BigNumber("0"))) {
        const add = {
          path: path,
          bestAmountIn: bestAmountIn,
          profit: profit,
        };
        // console.log(JSON.stringify(add, null, " "));
        profitableArbitrageCycles.push(add);
      }
    }
    if (depth < 3) {
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
    .filter((item) => item.profit.gt(new BigNumber("10000")));
};
