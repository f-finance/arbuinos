import { DEX } from "./config/dex.js";
import { ENV } from "../example/env.js";
import batchRequest from "batch-request-js";

const contractStorageRequest = (tezos) => (contract) =>
  tezos.contract
    .at(contract)
    .then((dexStorage) => dexStorage.storage())
    .then((storage) => [contract, storage]);

export const initStorageBuilder = (contract_list) => {
  return async (tezos) => {
    const { data, error } = await batchRequest(contract_list, contractStorageRequest(tezos), {
      batchSize: 10,
      delay: 1000
    });
    if (error.length > 0) {
      console.log("There are problems in initStorage");
    }
    return new Map(data);
  };
};