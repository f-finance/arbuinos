---
sidebar_position: 4
---

# Execution

We already learnt how to find profitable arbitrages. Now we need to execute then to get profit.

**Arbuinos** provides simple method to make one [batch](https://tezostaquito.io/docs/batch_API) operation that can be sent to blockchain as one transaction.


# How it works in SDK?

To create a batch transaction from arbitrage call __arbuinos__ method __arbitrageToOperationBatch__ that takes **arbuinos** state and arbitrage object and creates batch operation (same as you can create using taquito batch API).

```javascript
import { arbitrageToOperationBatch } from "arbuinos";

const batch = await arbitrageToOperationBatch(state, arbitrage);
await batch.send(); // send batch operation to blockchain
```
