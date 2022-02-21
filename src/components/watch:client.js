export const watch = async (dexesToSubscribe, onStoreChange, connection) => {
  const dexes = Object.values(dexesToSubscribe);

  dexes.forEach((dex) => {
    for (let address of dex.keys()) {
      connection.invoke("SubscribeToOperations", {
        address,
      });
    }
  });

  connection.on("operations", (msg) => {
    const appliedTrasactions = msg.data.filter(
      ({ status }) => status === "applied"
    );
    Object.keys(dexesToSubscribe).forEach((key) => {
      appliedTrasactions.forEach((transaction) => {
        try {
          if (dexesToSubscribe[key].has(transaction.target.address)) {
            const currentState = transaction.storage;
            dexesToSubscribe[key].set(transaction.target.address, currentState);
          }
        } catch (err) {
          console.error("Transaction error", err);
        }
      });
    });
    onStoreChange({ newDexState: dexesToSubscribe });
  });
};
