import { estimateAmountOut, estimateBestAmountIn } from "../src/estimates.js";
import BigNumber from "bignumber.js";
// const BigNumber = require("bignumber.js");

test.concurrent.each([
  [
    [1000, 6698.98669, 0.64745821, 1, 0.997],
    BigNumber(0),
    // new BigNumber("0.08387694279783116413"),
  ],
  [
    [3000, 6698.98669, 0.64745821, 1, 0.997],
    BigNumber(0),
    // new BigNumber("0.19969572")
  ],
])("getAmountOut", async (args, expected) => {
  expect(estimateAmountOut(...args).toNumber()).toBeCloseTo(
    expected.toNumber()
  );
});

test.concurrent.each([
  [
    [
      [
        {
          dex: "QUIPUSWAP",
          contractAddress: "1",
          address1: "tez",
          address2: "KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b",
          liquidity1: new BigNumber("44396138511"),
          liquidity2: new BigNumber("1052347178567886963745122"),
          fee1: new BigNumber("1"),
          fee2: new BigNumber("0.997"),
        },
        {
          dex: "PLENTY",
          contractAddress: "2",
          address1: "KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b",
          address2: "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW",
          liquidity1: new BigNumber("511841572952963408907775"),
          liquidity2: new BigNumber("81416608481160382"),
          fee1: new BigNumber("0.9965"),
          fee2: new BigNumber("1"),
        },
        {
          dex: "QUIPUSWAP",
          contractAddress: "3",
          address1: "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW",
          address2: "tez",
          liquidity1: new BigNumber("16352435343854609"),
          liquidity2: new BigNumber("4441035232"),
          fee1: new BigNumber("1"),
          fee2: new BigNumber("0.997"),
        },
      ],
    ],
    /* new BigNumber("23921510.35647007312464864331"), */
    BigNumber("24041020.5"),
  ],
])("getBestAmountInWithTS", async (args, expected) => {
  expect(estimateBestAmountIn(...args).toNumber()).toBeCloseTo(
    expected.toNumber()
  );
});
