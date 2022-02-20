import { estimateAmountOut } from "./estimates.js";
import { DEX } from "./config/dex.js";
import { slugToAsset } from "./helpers.js";
import { TOKEN_TYPE } from "./config/tokens.js";

import { OpKind } from "@taquito/taquito";
import BigNumber from "bignumber.js";

export const approveTokenCall = (token, tokenContract, from, to, amount) => {
  if (token.type === TOKEN_TYPE.FA2) {
    return tokenContract.methods.update_operators([
      {
        add_operator: {
          owner: from,
          operator: to,
          token_id: token.tokenId
        }
      }
    ]);
  } else {
    return tokenContract.methods.approve(to, amount);
  }
};

/**
 * By default, pool contract is directly used for swap execution
 * But, some DEXes recommend swapping tokens in their pools using special router contract
 */
const poolContractAddressToExecutorContractAddress = {
  [DEX.QUIPUSWAP]: (address) => address,
  [DEX.VORTEX]: (address) => address,
  [DEX.PLENTY]: (address) => address,
  [DEX.SPICYSWAP]: (_) => "KT1PwoZxyv4XkPEGnTqWYvjA1UYiPTgAGyqL" // SpicySwap v1 router
};

/**
 * All DEXes have different interfaces (method names, params and order of them)
 * This is a simple way to perform some methods on dex contracts
 *
 * Methods:
 *  - tezToToken: (amountIn, minAmountOut, receiver)
 *    swap xtz to token
 *  - tokenToTez: (amountIn, minAmountOut, receiver)
 *    swap token to xtz
 *  - tokenToToken: (amountIn, minAmountOut, tokenInInfo, tokenOutInfo, receiver)
 *    swap token to token
 */
export const operationGeneratorFactory = (contract) => {
  return {
    [DEX.QUIPUSWAP]: {
      tezToToken: (amountIn, minAmountOut, receiver) => ({
        kind: OpKind.TRANSACTION,
        ...contract.methods
          .tezToTokenPayment(minAmountOut, receiver)
          .toTransferParams({
            amount: amountIn.toFixed()
          })
      }),
      tokenToTez: (amountIn, minAmountOut, receiver) => ({
        kind: OpKind.TRANSACTION,
        ...contract.methods
          .tokenToTezPayment(amountIn, minAmountOut, receiver)
          .toTransferParams()
      })
    },
    [DEX.VORTEX]: {
      tezToToken: (amountIn, minAmountOut, receiver) => {
        const deadline = new Date(new Date().getTime() + 5 * 60 * 1000); // in 5 minutes
        return {
          kind: OpKind.TRANSACTION,
          ...contract.methodsObject
            .xtzToToken({
              to: receiver,
              minTokensBought: minAmountOut,
              deadline: deadline.toISOString()
            })
            .toTransferParams({
              amount: amountIn.toFixed()
            })
        };
      },
      tokenToTez: (amountIn, minAmountOut, receiver) => {
        const deadline = new Date(new Date().getTime() + 5 * 60 * 1000); // in 5 minutes
        return {
          kind: OpKind.TRANSACTION,
          ...contract.methodsObject
            .tokenToXtz({
              to: receiver,
              tokensSold: amountIn,
              minXtzBought: minAmountOut.toString(),
              deadline: deadline.toISOString()
            })
            .toTransferParams()
        };
      }
    },
    [DEX.PLENTY]: {
      tokenToToken: (
        amountIn,
        minAmountOut,
        tokenInInfo,
        tokenOutInfo,
        receiver
      ) => ({
        kind: OpKind.TRANSACTION,
        ...contract.methodsObject
          .Swap({
            MinimumTokenOut: minAmountOut,
            recipient: receiver,
            requiredTokenAddress: tokenOutInfo.address,
            requiredTokenId: new BigNumber(
              tokenOutInfo.type === TOKEN_TYPE.FA2 ? `${tokenOutInfo.tokenId}` : "0"
            ),
            tokenAmountIn: amountIn
          })
          .toTransferParams()
      })
    },
    [DEX.SPICYSWAP]: {
      tokenToToken: (
        amountIn,
        minAmountOut,
        tokenInInfo,
        tokenOutInfo,
        receiver
      ) => {
        const deadline = new Date(new Date().getTime() + 5 * 60 * 1000); // in 5 minutes

        const tokenIn = {
          fa2_address: tokenInInfo.address,
          ...(tokenInInfo.type === TOKEN_TYPE.FA2
            ? { token_id: new BigNumber(tokenInInfo.tokenId) }
            : {})
        };
        const tokenOut = {
          fa2_address: tokenOutInfo.address,
          ...(tokenOutInfo.type === TOKEN_TYPE.FA2
            ? { token_id: new BigNumber(tokenOutInfo.tokenId) }
            : {})
        };
        return {
          kind: OpKind.TRANSACTION,
          ...contract.methodsObject
            .swap_exact_for_tokens({
              _to: receiver,
              amountIn: amountIn,
              amountOutMin: minAmountOut,
              deadline: deadline.toISOString(),
              tokenIn: tokenIn,
              tokenOut: tokenOut
            })
            .toTransferParams()
        };
      }
    }
  };
};

export const arbitrageToOperationBatchWithAmountIn = async (
  amountIn,
  tezos,
  arbitrage
) => {
  console.log("Start arbitrageToOperationBatchWithAmountIn");
  // console.log("Arbitrage = ", JSON.stringify(arbitrage, null, " "));

  const { path, profit } = arbitrage;
  const me = await tezos.wallet.pkh();

  let batch = tezos.wallet.batch([]);
  const initialAmountIn = amountIn;

  for (let i = 0; i < path.length; i += 1) {
    const pool = path[i];
    const calculatedAmountOut = estimateAmountOut(
      amountIn,
      pool.liquidity1,
      pool.liquidity2,
      pool.fee1,
      pool.fee2
    );

    const minAmountOut =
      i === path.length - 1 ? initialAmountIn : new BigNumber("1");
    const poolContract = await tezos.wallet.at(
      poolContractAddressToExecutorContractAddress[pool.dex](pool.contractAddress)
    );
    const transactionGenerator =
      operationGeneratorFactory(poolContract)[pool.dex];

    if (pool.address1 === "tez") {
      batch = batch.with([
        transactionGenerator.tezToToken(amountIn, minAmountOut, me)
      ]);
    } else {
      const asset1 = slugToAsset(pool.address1);
      const asset1Contract = await tezos.wallet.at(asset1.address);

      batch = batch.with([
        {
          kind: OpKind.TRANSACTION,
          ...approveTokenCall(
            asset1,
            asset1Contract,
            me,
            poolContract.address,
            amountIn
          ).toTransferParams()
        }
      ]);

      if (pool.address2 === "tez") {
        batch = batch.with([
          transactionGenerator.tokenToTez(amountIn, minAmountOut, me)
        ]);
      } else {
        const asset2 = slugToAsset(pool.address2);

        batch = batch.with([
          transactionGenerator.tokenToToken(
            amountIn,
            minAmountOut,
            asset1,
            asset2,
            me
          )
        ]);
      }
    }

    amountIn = calculatedAmountOut;
  }

  batch.operations = batch.operations.map((op) => ({
    ...op,
    amount: +op.amount,
    mutez: true
  }));

  // console.log("BATCH = ", JSON.stringify(batch.operations, null, " "));
  return batch;
};

export const arbitrageToOperationBatch = async ({ tezos }, arbitrage) => {
  console.log("Start executeArbitrage");

  const { bestAmountIn } = arbitrage;
  const myBalance = await tezos.tz.getBalance(await tezos.wallet.pkh());
  const amountIn = BigNumber.min(bestAmountIn, myBalance.multipliedBy(new BigNumber("0.9")).integerValue()).integerValue(
    BigNumber.ROUND_DOWN
  );
  return await arbitrageToOperationBatchWithAmountIn(amountIn, tezos, arbitrage);
};
