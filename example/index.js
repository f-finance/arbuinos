import { MichelCodecPacker, TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";

import { ENV } from "./env.js";
import { initStorageBuilder } from "../src/storage.js";
import { findArbitrage } from "../src/arbitrage.js";
import { watch } from "../src/watch.js";
import logger from "../src/logger.js";
import { arbitrageToOperationBatch } from "../src/operations.js";
import { DEX } from "../src/config/dex.js";
import { extractPoolsFromState } from "../src/extractors.js";
import BigNumber from "bignumber.js";

const tryExecuteArbitrages = async (state, arbitrages) => {
  for (let i = 0; i < arbitrages.length; i += 1) {
    try {
      const batch = await arbitrageToOperationBatch(state, arbitrages[i]);
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
  tezos.setPackerProvider(new MichelCodecPacker());
  await InMemorySigner.fromSecretKey(ENV.PRIVATE_KEY)
    .then((signer) => {
      tezos.setProvider({ signer });
      logger.info("Key has succesfully signed");
    })
    .catch((err) => {
      logger.error("Signing issues. Please check your key!", err);
    });

  const state = {
    tezos,
    contractStorage: {}
  };
  state.dexToContractAddresses = new Map([
    [DEX.QUIPUSWAP, ENV.QUIPUSWAP_CONTRACT_ADDRESSES],
    [DEX.PLENTY, ENV.PLENTY_CONTRACT_ADDRESSES],
    [DEX.VORTEX, ENV.VORTEX_CONTRACT_ADDRESSES],
    [DEX.FLAME, ENV.FLAME_CONTRACT_ADDRESSES],
    [DEX.TZBTCORIGINAL, ENV.TZBTCORIGINAL_CONTRACT_ADDRESSES],
    [DEX.SPICYSWAP, ENV.SPICYSWAP_CONTRACT_ADDRESSES]
  ]);
  state.contractAddressToDex = new Map(
    Array.from(state.dexToContractAddresses)
      .flatMap(([dex, addresses]) => {
        return addresses.map(address => ([address, dex]));
      })
  );

  logger.profile("findArbitrage newest", { level: "debug" }); // 4988 ms
  state.contractStorage = await initStorageBuilder(Array.from(state.contractAddressToDex.keys()))(state.tezos);
  logger.profile("findArbitrage newest");

  await watch(state.contractStorage, ({ newContractStorage }) => {
    logger.profile("findArbitrage", { level: "debug" });
    extractPoolsFromState({ ...state, contractStorage: newContractStorage })
      .then(findArbitrage)
      .then(arbitrages => arbitrages.filter((item) => item.profit.gt(new BigNumber("20000"))))
      .then((arbitrages) => {

        tryExecuteArbitrages(state, arbitrages);

        logger.profile("findArbitrage", { level: "debug" });
        logger.debug("Existed arbitrages are:", {
          arbitrages: arbitrages.map((item) => ({
            path: item.path.map(({ dex, contractAddress, address1, address2 }) => ({
              dex, contractAddress, address1, address2
            })), bestAmountIn: item.bestAmountIn.toString(), profit: item.profit.toString()
          }))
        });
        logger.info("Existed arbitrages calculation is done");
      });
  });
})();
