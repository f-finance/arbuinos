---
sidebar_position: 3
---

# Calculations

There might be price difference between some assets in different DEXes that can lead to potentially profitable transaction. In order to calculate if it's profitability a few methods can be applied, you can read a mathematical explanations [here](https://arxiv.org/pdf/2105.02784.pdf).

# How it works in SDK?
Based on configuration that we passed __arbuinos__ is fetching initial data from the storages and do the recalculations of existed opportunities each time storage value is changed. The main method of is the __findarbitrage__ that is getting the result of __extractPoolsFromState__ that is converting the storage fromat to the unified pool format.

```javascript
import { findArbitrage, extractPoolsFromState } from "arbuinos";
...
findArbitrage.then(() => extractPoolsFromStat({ contractStorage })); // pools is the unified format of the DEX methods
```
