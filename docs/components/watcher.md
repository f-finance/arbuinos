---
sidebar_position: 2
---

# Watcher

## Component

The watcher part of the SDK is responsible for updating the storages of the contracts that you have specified. 

Watcher performs updates based on new created transactions in blockchain.

Current implementation in **arbuinos** SDK uses the public API from [api.tzkt](https://api.tzkt.io/#tag/Subscriptions) under the hood and connects to the WebSockets using SignalR. It reads contracts operations and updates storages. 

## How to use it from SDK?
Use watcher like this:

```javascript
import { watch } from "arbuinos";

await watch(state.contractStorage, (stateUpdate) => {
  // this is callback called on each state update
  extractPoolsFromState({ ...state, ...stateUpdate })
    .then(findArbitrage)
    .then(arbitrages => {
      // execute arbitrages
    });
});
```

You need to pass the store to it and it will repond with shallow copy of it each time any contract from the store is updated

