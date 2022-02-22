import { DEX } from "./config/dex.js";
import { TOKEN_TYPE } from "./config/tokens.js";
import { assetToSlug } from "./helpers.js";

import BigNumber from "bignumber.js";

const quipuswapStateToPoolsInfo = async (storage) => {
  return [
    {
      address1: assetToSlug({ type: TOKEN_TYPE.XTZ }),
      address2: assetToSlug({
        type: storage.storage.token_id ? TOKEN_TYPE.FA2 : TOKEN_TYPE.FA12,
        address: storage.storage.token_address,
        tokenId: storage.storage.token_id,
      }),
      liquidity1: new BigNumber(storage.storage.tez_pool),
      liquidity2: new BigNumber(storage.storage.token_pool),
      fee1: new BigNumber("1"),
      fee2: new BigNumber("0.997"),
    },
  ];
};

const plentyStateToPoolsInfo = async (storage) => {
  return [
    {
      address1: assetToSlug({
        type: storage.token1Check ? TOKEN_TYPE.FA2 : TOKEN_TYPE.FA12,
        address: storage.token1Address,
        tokenId: storage.token1Id,
      }),
      address2: assetToSlug({
        type: storage.token2Check ? TOKEN_TYPE.FA2 : TOKEN_TYPE.FA12,
        address: storage.token2Address,
        tokenId: storage.token2Id,
      }),
      liquidity1: new BigNumber(storage.token1_pool),
      liquidity2: new BigNumber(storage.token2_pool),
      fee1: new BigNumber("0.9965"),
      fee2: new BigNumber("1"),
    },
  ];
};

const vortexStateToPoolsInfo = async (storage) => {
  return [
    {
      address1: assetToSlug({ type: TOKEN_TYPE.XTZ }),
      address2: assetToSlug({
        type: storage.tokenId ? TOKEN_TYPE.FA2 : TOKEN_TYPE.FA12,
        address: storage.tokenAddress,
        tokenId: storage.tokenId,
      }),
      liquidity1: new BigNumber(storage.xtzPool),
      liquidity2: new BigNumber(storage.tokenPool),
      fee1: new BigNumber("0.9972"),
      fee2: new BigNumber("1"),
    },
  ];
};

// const flameStateToPoolsInfo = async (state) => {
//   return (
//     await Promise.all(
//       Array.from(state).flatMap(async ([contractAddress, storage]) => {
//         const result = [];
//         for (let i = 1; i <= storage.buckets_count.toNumber(); i += 1) {
//           const bucket = await storage.buckets.get(i);
//
//           const tokenInfoToAddress = (tokenInfo) => {
//             if ("tz" in tokenInfo) {
//               return "tez";
//             }
//             if ("fa12" in tokenInfo) {
//               return JSON.stringify({
//                 address: `${tokenInfo.fa12}`,
//                 id: "0",
//               });
//             }
//             if ("fa2" in tokenInfo) {
//               return JSON.stringify({
//                 address: `${tokenInfo.fa2[5] ?? tokenInfo.fa2[7]}`,
//                 id: `${tokenInfo.fa2[6] ?? tokenInfo.fa2[8]}`,
//               });
//             }
//           };
//           const address1 = tokenInfoToAddress(bucket.token_a);
//           const address2 = tokenInfoToAddress(bucket.token_b);
//           const liquidity1 = bucket.token_a_res;
//           const liquidity2 = bucket.token_b_res;
//           const fee1 = new BigNumber("0.997"); // TODO validate fee1 and fee2
//           const fee2 = new BigNumber("1");
//
//           result.push(
//             ...[
//               {
//                 dex: "FLAME",
//                 contractAddress: contractAddress,
//                 address1,
//                 address2,
//                 liquidity1,
//                 liquidity2,
//                 fee1,
//                 fee2,
//               },
//               {
//                 dex: "FLAME",
//                 contractAddress: contractAddress,
//                 address1: address2,
//                 address2: address1,
//                 liquidity1: liquidity2,
//                 liquidity2: liquidity1,
//                 fee1: fee1,
//                 fee2: fee2,
//               },
//             ]
//           );
//         }
//         return result;
//       })
//     )
//   ).flat();
// };

const tzbtcoriginalStateToPoolsInfo = async (storage) => {
  return [
    {
      address1: assetToSlug({ type: TOKEN_TYPE.XTZ }),
      address2: assetToSlug({
        type: TOKEN_TYPE.FA12,
        address: storage.tokenAddress,
      }),
      liquidity1: new BigNumber(storage.xtzPool),
      liquidity2: new BigNumber(storage.tokenPool),
      fee1: new BigNumber("1"),
      fee2: new BigNumber("0.998"),
    },
  ];
};

const spicyswapStateToPoolsInfo = async (storage) => {
  return [
    {
      address1: assetToSlug({
        type: storage.token0.token_id ? TOKEN_TYPE.FA2 : TOKEN_TYPE.FA12,
        address: storage.token0.fa2_address,
        tokenId: storage.token0.token_id,
      }),
      address2: assetToSlug({
        type: storage.token1.token_id ? TOKEN_TYPE.FA2 : TOKEN_TYPE.FA12,
        address: storage.token1.fa2_address,
        tokenId: storage.token1.token_id,
      }),
      liquidity1: new BigNumber(storage.reserve0),
      liquidity2: new BigNumber(storage.reserve1),
      fee1: new BigNumber("0.997"),
      fee2: new BigNumber("1"),
    },
  ];
};

export const contractStorageToPoolsExtractors = {
  [DEX.QUIPUSWAP]: quipuswapStateToPoolsInfo,
  [DEX.PLENTY]: plentyStateToPoolsInfo,
  [DEX.VORTEX]: vortexStateToPoolsInfo,
  // [DEX.FLAME]: flameStateToPoolsInfo,
  [DEX.TZBTCORIGINAL]: tzbtcoriginalStateToPoolsInfo,
  [DEX.SPICYSWAP]: spicyswapStateToPoolsInfo,
};

export const extractPoolsFromState = async ({
  contractStorage,
  contractAddressToDex,
}) => {
  const regularPools = [];
  for (const [address, storage] of contractStorage.entries()) {
    const dex = contractAddressToDex.get(address);
    const poolsExtractor = contractStorageToPoolsExtractors[dex];
    const new_pools = await poolsExtractor(storage);

    regularPools.push(
      ...new_pools.map((pool) => ({ dex, contractAddress: address, ...pool }))
    );
  }
  const invertedPools = regularPools.map((pool) => ({
    ...pool,
    address1: pool.address2,
    address2: pool.address1,
    liquidity1: pool.liquidity2,
    liquidity2: pool.liquidity1,
  }));
  return [...regularPools, ...invertedPools];
};
