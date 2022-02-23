---
sidebar_position: 3
---

# Arbitrage find

From time to time there might be some inefficiency in crypto market. That gives us opportunity to find this inefficiency and make on it some money.

Mostly by inefficiency we mean possibility to execute cyclic arbitrage (more about it [here](https://arxiv.org/pdf/2105.02784.pdf)). To put it simply if on some dex BTC price is 5$ and on another is 5.01$ then we can buy BTC on the first one and sell on the second one.

But arbitrages can consist not only from 2 swaps, but from 3 or even more. So we need some fast way to look through all possible swap cycles and take only profitable. 

# How it works in SDK?
**Watcher** provides us with up-to-date storages of DEX contracts. All storages is saved in **arbuinos** state.

So here is how to extract profitable arbitrage cycles from state:

```javascript
import { findArbitrage, extractPoolsFromState } from "arbuinos";
...
const arbitrages = extractPoolsFromState(state) // pools is the unified format of the DEX methods
  .then(findArbitrage);

// arbitrages = [
//   {
//     path: [pool1, pool2, ...], - arbitrage cycle
//     bestAmountIn: Bignumber - best amount to get maximum profit from arbitrage execution
//     profit: Bignumber - profit you get if execute arbitrage with bestAmountIn coins
//   },
//   ...
// ]
```

The main method is __findArbitrage__ that takes the result of __extractPoolsFromState__ which converts the storage format to array of pools.

You can implement your own pool extractors and call __findArbitrage__ with your custom pools.
