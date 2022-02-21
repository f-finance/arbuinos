import BigNumber from "bignumber.js";

export const estimateAmountOut = (
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

  return r1
    .multipliedBy(r2).multipliedBy(b)
    .multipliedBy(delta_a)
    .div(a.plus(r1.multipliedBy(delta_a))).integerValue(BigNumber.ROUND_DOWN);
};

export const estimatePoolAmountOut = (
  amount,
  pool
) => {
  const delta_a = new BigNumber(amount);

  return pool.fee1.multipliedBy(pool.fee2).multipliedBy(pool.liquidity2).multipliedBy(delta_a)
    .idiv(pool.liquidity1.plus(pool.fee1.multipliedBy(delta_a)));
};

export const estimateProfit = (path, initial = new BigNumber("1")) => {
  let amount = initial;
  let overflow = false;
  for (let i = 0; i < path.length; i += 1) {
    const pool = path[i];
    if (amount.gt(pool.liquidity1)) {
      overflow = true;
      break;
    }
    amount = estimatePoolAmountOut(
      amount,
      pool
    );
    if (amount.gt(pool.liquidity2)) {
      overflow = true;
      break;
    }
  }
  if (overflow) {
    return new BigNumber("-10000000000000000000"); // some very small number
  }
  return amount.minus(initial);
};

export const estimateBestAmountIn = (path) => {
  let l = new BigNumber("1"), r = path[0].liquidity1;
  while (r.minus(l).gt(new BigNumber("1000"))) {
    const diff = r.minus(l).idiv(9);
    const mid1 = l.plus(diff.multipliedBy(4));
    const mid2 = mid1.plus(diff);
    const profit1 = estimateProfit(path, mid1);
    const profit2 = estimateProfit(path, mid2);
    if (profit1.gt(profit2) || profit2.lt(new BigNumber("0"))) {
      r = mid2;
    } else {
      l = mid1;
    }
  }
  return r.plus(l).div(2);
};