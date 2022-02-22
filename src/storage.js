import batchRequest from "batch-request-js";

const contractStorageRequest = (tezos) => (contract) =>
  tezos.contract
    .at(contract)
    .then((dexStorage) => dexStorage.storage())
    .then((storage) => [contract, storage]);

export const initStorageBuilder = (contract_list) => {
  return async (tezos) => {
    const { data, error } = await batchRequest(
      contract_list,
      contractStorageRequest(tezos),
      {
        batchSize: 20, // TODO move to config
        delay: 10, // TODO move to config
      }
    );
    if (error.length > 0) {
      console.log("There are problems in initStorage");
    }
    return new Map(data);
  };
};
