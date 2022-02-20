import signalR from "@microsoft/signalr";

import logger from "./logger.js";
import { DEX } from "./config/dex.js";

// TODO handle connection issues
const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://api.tzkt.io/v1/events")
  .build();

(async () => {
  await connection.start();
})();

export const watch = async (contractStorage, onStoreChange) => {
  for (let address of contractStorage.keys()) {
    await connection.invoke("SubscribeToOperations", {
      address
    });
  }
  logger.info("Subscribed for all contracts sucessfully");

  /* pairsToSubscribe.forEach(({ address }) => */
  /*   connection.invoke("SubscribeToOperations", { */
  /*     address, */
  /*   }) */
  /* ); */
  connection.on("operations", (msg) => {
    const appliedTrasactions = msg.data.filter(
      ({ status }) => status === "applied"
    );
    logger.debug("all applied transaction", appliedTrasactions);

    appliedTrasactions.forEach((transaction) => {
      try {
        if (contractStorage.has(transaction.target.address)) {
          // const previousState = contractStorage[transaction.target.address];
          const currentState = transaction.storage;
          contractStorage.set(transaction.target.address, currentState);
          logger.info(
            `Storage of ${transaction.target.address} contract with pair ${
              transaction.target.alias
            } is updated:\nat block: ${
              "https://tzkt.io/" + transaction.block
            }\nby operation: ${"https://tzkt.io/" + transaction.hash}`
          );
          // logger.debug(`Updated storage for: ${transaction.target.address}`, {
          //   previousState,
          //   currentState,
          // });
        }
      } catch (err) {
        logger.error("Transaction error", err);
      }
    });
    // TODO proper filtering only swap transaction
    // TODO normalie storage on this level?

    onStoreChange({ newContractStorage: contractStorage });
  });
};
