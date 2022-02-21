---
sidebar_position: 1
---

# Quick start

> :warning: **This project is experiment in scope of [Tezos Hackathon 2022](https://hackathon2022.tezos.org.ua/en)**: It doesn't guaranty any profits or might even enquire losses. If you familiar with JavaScript you are strictly encourage to read the code to understand what it's doing. You use it in your own risk!


## Fasters start
In order to build your bot you can use an example from the [arbuinos](https://github.com/f-finance/arbuinos/tree/master/example) that contains the minimal working example of running bot that is created by the __arbuinos-sdk__ 

```bash
git clone https://github.com/f-finance/arbuinos
cd arbuinos
npm i
cd example
cp env.js.example env.js
```

put your private key into the config.
> :warning: **You need to paste you private key into the conif file**: In this example we are going to use the InMemorySigner from __taquito__ library. It's importand to read about InMemorySigner [here](https://tezostaquito.io/docs/inmemory_signer/) and follow suggested security practices.

```javascript
PRIVATE_KEY: "paste your private key here"
```

start bot by executing the index.js:

```bash
node index.js
```

## Step-by-step start
Let's re create the example step-by-step for better buderstanding of how components works and tight toegather. We will use only 3 pairs for 2 DEXes for sake of simplicity of the example.

QuipuSwap: XTZ - kUSD pair which can be used in both ways and
QuipuSwap: XTZ - PLENTY pair which can be used in both ways and
PLENTY: PLENTY - kUSD which can be used in both ways either.

Based on price difference in this two tokens (kUSD and PLENTY) on both DEXes we can have two path:
```
XTZ -> PLENTY - from QuipuSwap
PLENTY -> kUSD - from PLENTY
kUSD -> XTZ - from QuipuSwap
```
and 
```
XTZ -> kUSD - from QuipuSwap
kUSD -> PLENTY - from PLENTY
PLENTY -> XTZ - from QuipuSwap
```
So we are going to configure bot to watch for changes in the upcoming steps and find an exexute existed opportunities if they are profitable enought. 

### Install SDK

Create a folder and initialize there an npm package:

```bash
npm init
```

after that install the lates versino of the SDK from the npm

```bash
npm i --save arbuinos
```

### Create a bot

First of all we need to create a basic config file that will be used by the bot and contains configuratins for arbitrage pairs. To keep it simple we 

> :warning: **You need to paste you private key into the conif file**: In this example we are going to use the InMemorySigner for @taquito library. You can read more about it it [here](https://tezostaquito.io/docs/inmemory_signer/) 

```javascript
import { DEX } from "arbuinos"; // import DEX constants
export const ENV = {
    QUIPUSWAP_CONTRACT_ADDRESSES: [
        "KT1X1LgNkQShpF9nRLYw3Dgdy4qp38MX617z", // PLENTY
        "KT1K4EwTpbvYN9agJdjpyJm4ZZdhpUNKB3F6", // kUSD
    },
    PLENTY_CONTRACT_ADDRESSES: [
        "KT1UNBvCJXiwJY6tmHM7CJUVwNPew53XkSfh", // PLENTY-kUSD
    },
    TEZOS_RPC_HOST: "https://mainnet.smartpy.io", 
    // here you can find a list of recommended nodes and use
    // which one is more suitable in terms of stability and latency
    // List of nodes: https://tezostaquito.io/docs/next/rpc_nodes/
    USED_DEX: [
        DEX.QUIPUSWAP,
        DEX.PLENTY,
    ],
    ARBITRAGE_PROFIT_TRESHOLD: new BigNumber("20000") // profit treshold in mutez
}

```
call this file an _env.js_ and put it into the root of your folder.

Create a file index.js and import the main dependencies from bot:

```javascript
import { MichelCodecPacker, TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";

import { 
    watch, 
    findArbitrage, 
    initStorageBuilder, 
    extractPoolsFromState 
    arbitrageToOperationBatch
} from "arbuinos";

const tezos = new TezosToolkit(ENV.TEZOS_RPC_HOST);

const state = {
  tezos,
  contractStorage: {},
};

(saync () => {
  state.contractStorage = await initStorageBuilder(
    Array.from(state.contractAddressToDex.keys())
  )(state.tezos);
  
  // watch function will subscribe to all contract changes and execute
  // callback for each change in store
  await watch(state, ({ newContractStorage }) => {
    // extractPoolsFromState converts state to pools for furter processing
    extractPoolsFromState({ ...state, contractStorage: newContractStorage })
      .then(findArbitrage) // looking for existed arbitrages
      .then((arbitrages) => // here you can filter arbitrages by item.profit value
        arbitrages.filter((item) => item.profit.gt(ENV.ARBITRAGE_PROFIT_TRESHOLD))
      )
      .then((arbitrages) => {
        for (let i = 0; i < arbitrages.length; i++) {
          try {
            // creating a batch operation for existed arbitrage
            const batch = await arbitrageToOperationBatch(state, arbitrages[i]);
            // sends the batch operation
            await batch.send();
          } catch (e) {
            console.log(`Failed ${i}`, e);
            continue;
          }
          break;
        }

        console.log("Existed arbitrages are:", {
          arbitrages: arbitrages.map((item) => ({
            path: item.path.map(
              ({ dex, contractAddress, address1, address2 }) => ({
                dex,
                contractAddress,
                address1,
                address2,
              })
            ),
            bestAmountIn: item.bestAmountIn.toString(),
            profit: item.profit.toString(),
          })),
        });
      });
  });
})();
```

in order to execute your bot script you need to have NODE v16 and above:

```
node index.js
```

That's it you can watch on how bot works from you favourite Tezos explorer! Good luck!
