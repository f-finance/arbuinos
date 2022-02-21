import { Schema } from "@taquito/michelson-encoder";

import logger from "../logger.js";
// TODO fix passing the contracts based on new changes
export const watch = async ({ contractStorage, tezos }, onStoreChange) => {
  tezos.setProvider({
    config: {
      streamerPollingIntervalMilliseconds: 500, // TODO move to config
    },
  });
  const subscribe = Object.values(contracts) // TODO not able to find contracts
    .flat()
    .map((contract) => ({ destination: contract, kind: OpKind.TRANSACTION }));

  const operations = tezos.stream.subscribeOperation({
    or: subscribe,
  });
  logger.info("Subscribed for all contracts sucessfully");

  const flatContracts = Object.values(contracts).flat();
  const contractSchemas = new Map(
    (
      await Promise.all(
        flatContracts.map((contract) => tezos.rpc.getNormalizedScript(contract))
      )
    ).map((storageType, idx) => [flatContracts[idx], storageType])
  );

  operations.on("data", (data) => {
    if (data.metadata.operation_result.status === "applied") {
      Object.keys(dexState).forEach((key) => {
        if (dexState[key].has(data.destination)) {
          const schema = contractSchemas.get(data.destination);
          const currentState = Schema.fromRPCResponse({
            script: schema,
          }).Execute(data.metadata.operation_result.storage);
          dexState[key].set(data.destination, currentState);

          logger.info(
            `Storage of ${Object.keys(DEX).find(
              (k) => DEX[k] == key
            )} DEX is updated:\nby operation: ${"https://tzkt.io/" + data.hash}`
          );
        }
      });
    }

    onStoreChange({ newContractStorage: contractStorage });
  });
};
