---
sidebar_position: 4
---

# Execution

As arbitrage contains from different operations on the contract. In very basic scenario at last two - buy some asset on one DEX and sell it on the other. There is an options to create combine this operations into one  [batch](https://tezostaquito.io/docs/batch_API) operation that can be executed as one transaction.


# How it works in SDK?

For creating the batch transaction from arbitrages __arbuinos__ provides an __arbitrageToOperationBatch__ methods that takes existed arbitrages and forms the batch object that returns the taquito batch API.

```javascript
import { arbitrageToOperationBatch } from "arbuinos";

const batch = await arbitrageToOperationBatch(state, arbitrages);
batch.send();

```
