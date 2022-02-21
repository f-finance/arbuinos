import BigNumber from "bignumber.js";

export const getAmountOut = (
  amount,
  pool_liquidity_1,
  pool_liquidity_2,
  pool_fee_1,
  pool_fee_2
) => {
  const a = new BigNumber(pool_liquidity_1);
  const b = new BigNumber(pool_liquidity_2);
  const r1 = new BigNumber(pool_fee_1);
  const r2 = new BigNumber(pool_fee_2);
  const delta_a = new BigNumber(amount);

  const res = r1
    .multipliedBy(r2)
    .multipliedBy(b)
    .multipliedBy(delta_a)
    .div(a.plus(r1.multipliedBy(delta_a)))
    .integerValue(BigNumber.ROUND_DOWN);
  // res = res.integerValue(BigNumber.ROUND_DOWN);
  return res;
};

export const getMinAmountOut = (amount, slippage) => {
  const a = new BigNumber(amount);
  const s = new BigNumber(slippage);

  return a.minus(a.multipliedBy(s));
};

// const getBestAmountIn = (pool_path) => {
//     let a_1_n = new BigNumber(pool_path[0].liquidity1);
//     let a_n_1 = new BigNumber(pool_path[0].liquidity2);
//     for (let i = 1; i < pool_path.length; i += 1) {
//         const pool = pool_path[i];
//         a_1_n = a_1_n.multipliedBy(pool.liquidity1)
//             .div(pool.liquidity1.plus(pool.fee1.multipliedBy(pool.fee2).multipliedBy(a_n_1)));
//         a_n_1 = a_n_1.multipliedBy(pool.liquidity2).multipliedBy(pool.fee1).multipliedBy(pool.fee2)
//             .div(pool.liquidity1.plus(pool.fee1.multipliedBy(pool.fee2).multipliedBy(a_n_1)));
//     }
//     const last_pool = pool_path[pool_path.length - 1];
//     const a = a_1_n.multipliedBy(last_pool.liquidity1)
//         .div(last_pool.liquidity1.plus(last_pool.fee1.multipliedBy(last_pool.fee2).multipliedBy(a_n_1)));
//     const a_ = a_n_1.multipliedBy(last_pool.liquidity2).multipliedBy(last_pool.fee1).multipliedBy(last_pool.fee2)
//         .div(last_pool.liquidity1.plus(last_pool.fee1.multipliedBy(last_pool.fee2).multipliedBy(a_n_1)));
//     return a_.multipliedBy(a).multipliedBy(last_pool.fee1).multipliedBy(last_pool.fee2).sqrt().minus(a).div(last_pool.fee1);
// };

export const calculateProfit = (path, initial = new BigNumber("1")) => {
  let amount = initial;
  let overflow = false;
  path.forEach((pool) => {
    if (amount.gt(pool.liquidity1)) {
      overflow = true;
    }
    if (overflow) {
      return;
    }
    amount = getAmountOut(
      amount,
      pool.liquidity1,
      pool.liquidity2,
      pool.fee1,
      pool.fee2
    );
    if (amount.gt(pool.liquidity2)) {
      overflow = true;
    }
  });
  if (overflow) {
    return new BigNumber("-1");
  }
  return amount.minus(initial);
};

export const getBestAmountIn = (path) => {
  let l = new BigNumber("100000"),
    r = new BigNumber("100000000");
  while (r.div(l).gt(new BigNumber("1.001"))) {
    const mid1 = l
      .plus(r.minus(l).div(9).multipliedBy(4))
      .integerValue(BigNumber.ROUND_DOWN);
    const mid2 = l
      .plus(r.minus(l).div(9).multipliedBy(5))
      .integerValue(BigNumber.ROUND_DOWN);
    const profit1 = calculateProfit(path, mid1);
    const profit2 = calculateProfit(path, mid2);
    if (profit1.gt(profit2) || profit2.lt(new BigNumber("0"))) {
      r = mid2;
    } else {
      l = mid1;
    }
  }
  return r.plus(l).div(2);
};
