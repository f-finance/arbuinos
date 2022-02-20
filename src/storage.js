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
      delay: 100
    });
    if (error.length > 0) {
      console.log("There are problems in initStorage");
    }
    return new Map(data);
  };
};

export const initDexFunctionsNew = {
  [DEX.QUIPUSWAP]: initStorageBuilder(ENV.QUIPUSWAP_CONTRACT_ADDRESSES),
  [DEX.PLENTY]: initStorageBuilder(ENV.PLENTY_CONTRACT_ADDRESSES),
  [DEX.VORTEX]: initStorageBuilder(ENV.VORTEX_CONTRACT_ADDRESSES),
  [DEX.FLAME]: initStorageBuilder(ENV.FLAME_CONTRACT_ADDRESSES),
  [DEX.TZBTCORIGINAL]: initStorageBuilder(
    ENV.TZBTCORIGINAL_CONTRACT_ADDRESSES
  ),
  [DEX.SPICYSWAP]: initStorageBuilder(ENV.SPICYSWAP_CONTRACT_ADDRESSES)
};
