import { DEX } from "./config/dex.js";
import { ENV } from "../example/env.js";
import batchRequest from "batch-request-js";

const request = (tezos) => (contract) =>
  tezos.contract
    .at(contract)
    .then((dexStorage) => dexStorage.storage())
    .then((storage) => [contract, storage]);

export const initStorageBuilderNew = (contract_list) => {
  const initStorage = async (tezos) => {
    const { data, error } = await batchRequest(contract_list, request(tezos), {
      batchSize: 10,
      delay: 100,
    });
    if (error.length > 0) {
      console.log("There are problems in initStorage");
    }
    return new Map(data);
  };
  return initStorage;
};

export const initDexFunctionsNew = {
  [DEX.QUIPUSWAP]: initStorageBuilderNew(ENV.QUIPUSWAP_CONTRACT_ADDRESSES),
  [DEX.PLENTY]: initStorageBuilderNew(ENV.PLENTY_CONTRACT_ADDRESSES),
  [DEX.VORTEX]: initStorageBuilderNew(ENV.VORTEX_CONTRACT_ADDRESSES),
  [DEX.FLAME]: initStorageBuilderNew(ENV.FLAME_CONTRACT_ADDRESSES),
  [DEX.TZBTCORIGINAL]: initStorageBuilderNew(
    ENV.TZBTCORIGINAL_CONTRACT_ADDRESSES
  ),
  [DEX.SPICYSWAP]: initStorageBuilderNew(ENV.SPICYSWAP_CONTRACT_ADDRESSES),
};
