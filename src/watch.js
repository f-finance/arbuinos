import signalR from "@microsoft/signalr";

import logger from "./logger.js";

// TODO handle connection issues
const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://api.tzkt.io/v1/events")
  .withAutomaticReconnect()
  .build();

export const watch = async (contractStorage, onStoreChange) => {
  await connection.start();
  for (let address of contractStorage.keys()) {
    await connection.invoke("SubscribeToOperations", {
      address,
    });
  }
  logger.info("Subscribed for all contracts sucessfully");

  connection.on("operations", (msg) => {
    const appliedTrasactions = msg.data.filter(
      ({ status }) => status === "applied"
    );
    logger.debug("all applied transaction", appliedTrasactions);

    appliedTrasactions.forEach((transaction) => {
      if (contractStorage.has(transaction.target.address)) {
        contractStorage.set(transaction.target.address, transaction.storage);
        logger.info(
          `Storage of ${transaction.target.address} contract with pair ${
            transaction.target.alias
          } is updated:\nat block: ${
            "https://tzkt.io/" + transaction.block
          }\nby operation: ${"https://tzkt.io/" + transaction.hash}`
        );
      }
    });
    // TODO proper filtering only swap transaction
    // TODO normalie storage on this level?

    onStoreChange({ newContractStorage: new Map(contractStorage) });
  });
};
