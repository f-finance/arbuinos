import { MichelCodecPacker, TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import BigNumber from "bignumber.js";

import { ENV, CONTRACTS } from "./env.js";
import {
  initStorageBuilder,
  extractPoolsFromState,
  findArbitrageV2,
  arbitrageToOperationBatch,
  watch,
} from "arbuinos";

const tryExecuteArbitrages = async (state, arbitrages) => {
  for (let i = 0; i < arbitrages.length; i += 1) {
    try {
      const batch = await arbitrageToOperationBatch(state, arbitrages[i]);
      await batch.send();
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
  tezos.setPackerProvider(new MichelCodecPacker());

  try {
    const signer = await InMemorySigner.fromSecretKey(ENV.PRIVATE_KEY);
    tezos.setProvider({ signer });
    console.log("Key has succesfully signed");
  } catch (err) {
    console.error("Signing issues. Please check your key!", err);
  }

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

  try {
    console.log("Start storage calculation");
    state.contractStorage = await initStorageBuilder(
      Array.from(state.contractAddressToDex.keys())
    )(state.tezos);
  } catch (err) {
    console.error("Error in store calculation", err);
  }

  await watch(state.contractStorage, ({ newContractStorage }) => {
    extractPoolsFromState({ ...state, contractStorage: newContractStorage })
      .then(async (pools) => {
        console.log("Find pools");
        return [
          ...(await findArbitrageV2(pools)),
          ...(await findArbitrageV2(pools, new BigNumber("10").pow(6))),
        ];
      })
      .then((arbitrages) =>
        arbitrages.filter((item) => item.profit.gt(new BigNumber("50000")))
      )
      .then((arbitrages) => {
        // tryExecuteArbitrages(state, arbitrages);

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
        /* logger.info("Existed arbitrages calculation is done"); */
      });
  });
})();
