import batchRequest from "batch-request-js";

const contractStorageRequest = (tezos) => (contract) =>
  tezos.contract
    .at(contract)
    .then((dexStorage) => dexStorage.storage())
    .then((storage) => [contract, storage]);

/**
 * Contract address
 * @typedef ContractAddress
 * @type {string}
 */

/**
 * Storage of the contract
 * @typedef {Object} Storage
 */

/**
 * Contract storage Map
 * @typedef {Map<ContractAddress,Storage>} ContractStorageMap
 */

/**
 * @function
 * @param {ContractAddress[]} contracts List of the contract addresses
 */
export const initStorageBuilder = (contracts) => async (tezos) => {
  const { data, error } = await batchRequest(
    contracts,
    contractStorageRequest(tezos),
    {
      batchSize: 20, // TODO move to config
      delay: 10, // TODO move to config
    }
  );
  if (error.length > 0) {
    console.error("There are problems in initStorage", error);
  }
  return new Map(data);
};
