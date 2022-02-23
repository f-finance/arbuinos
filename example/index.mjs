import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";

import { ENV, CONTRACTS } from "./env.mjs";
import {
  initStorageBuilder,
  extractArbitrageFromState,
  arbitrageToOperationBatch,
  watch,
} from "arbuinos";

const tryExecuteArbitrages = async (state, arbitrages) => {
  for (let i = 0; i < arbitrages.length; i += 1) {
    try {
      console.log("Executring eisted arbitrages");
      const batch = await arbitrageToOperationBatch(state, arbitrages[i]);
      await batch.send();
      console.log("Arbitrage transactinon has sent to blockchain");
    } catch (e) {
      console.log(`Failed ${i}`, e);
      break;
    }
    break;
  }
};

(async () => {
  console.log("Bot is started...");

  const tezos = new TezosToolkit(ENV.TEZOS_RPC_HOST);

  const signer = await InMemorySigner.fromSecretKey(ENV.PRIVATE_KEY);

  tezos.setProvider({ signer });

  const state = {
    tezos,
    contractStorage: new Map(),
    contractAddressToDex: new Map(),
  };

  state.contractAddressToDex = new Map(
    Object.entries(CONTRACTS).flatMap(([dex, addresses]) =>
      addresses.map((address) => [address, dex])
    )
  );

  state.contractStorage = await initStorageBuilder(
    Object.values(CONTRACTS).flat()
  )(state.tezos);

  await watch(state.contractStorage, ({ newContractStorage }) => {
    const arbitrages = extractArbitrageFromState({
      ...state,
      contractStorage: newContractStorage,
    });

    tryExecuteArbitrages(state, arbitrages);

    console.log("Existed arbitrages are:", {
      arbitrages: arbitrages.map((item) => ({
        path: item.path.map(({ dex, contractAddress, address1, address2 }) => ({
          dex,
          contractAddress,
          address1,
          address2,
        })),
        bestAmountIn: item.bestAmountIn.toString(),
        profit: item.profit.toString(),
      })),
    });
  });
})();
