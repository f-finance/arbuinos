---
sidebar_position: 2
---

# Indexer

## Component

The indexer part of the SDK is responsible to update the stores of the contracts that you have specified based on the new changes in each formed block.
There are few ways of implement this logic. In current implementetion of arbuinos SDK we are using the the public API from [api.tzkt](https://api.tzkt.io/#tag/Subscriptions) under the hood and connecting to the WebSockets throught the SignalR

## How to use it from SDK?
You can import indexer bu using:

```javascript
import { watch } from "arbuinos";
```

You need to pass the store to it and it will repond with shallow copy of it each time any contract from the store will be updated

