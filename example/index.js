import { MichelCodecPacker, TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";

import { ENV } from "./env.js";
import { initDexFunctionsNew } from "../src/storage.js";
import { findArbitrage } from "../src/arbitrage.js";
import { watch } from "./watch.js";
import logger from "../src/logger.js";
import { arbitrageToOperationBatch } from "../src/operations.js";

const tryExecuteArbitrages = async (state, arbitrages) => {
  for (let i = 0; i < arbitrages.length; i += 1) {
    try {
      const batch = await arbitrageToOperationBatch(state, arbitrages[i])
      await batch.send();
    } catch (e) {
      console.log(`Failed ${i}`, e);
      continue;
    }
    break;
  }
};

(async () => {
  logger.info("Bot is started...");
  const tezos = new TezosToolkit(ENV.TEZOS_RPC_HOST);
  const state = {
    tezos,
    dexState: {},
  };

  tezos.setPackerProvider(new MichelCodecPacker());

  await InMemorySigner.fromSecretKey(ENV.PRIVATE_KEY)
    .then((signer) => {
      state.tezos.setProvider({ signer });
      logger.info("Key has succesfully signed");
    })
    .catch((err) => {
      logger.error("Signing issues. Please check your key!", err);
    });

  logger.profile("findArbitrage newest", { level: "debug" }); // 4988 ms
  state.dexState = (
    await Promise.all(
      ENV.USED_DEX.map((dex) => initDexFunctionsNew[dex](tezos))
    )
  ).reduce(
    (acc, value, keyIdx) => ({ [ENV.USED_DEX[keyIdx]]: value, ...acc }),
    {}
  );
  logger.profile("findArbitrage newest");

  await watch(state.dexState, ({ newDexState }) => {
    logger.profile("findArbitrage", { level: "debug" });
    findArbitrage({ ...state, dexState: newDexState }).then((arbitrages) => {

      tryExecuteArbitrages(state, arbitrages);

      logger.profile("findArbitrage", { level: "debug" });
      logger.debug("Existed arbitrages are:", {
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
      logger.info("Existed arbitrages calculation is done");
    });
  });
})();
