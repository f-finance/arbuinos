export const DEX = {
  QUIPUSWAP: "quipuswap",
  PLENTY: "plenty",
  VORTEX: "vortex",
};

export const ENV = {
  TEZOS_RPC_HOST: "https://mainnet.api.tez.ie",
  QUIPUSWAP_CONTRACT_ADDRESSES: [
    "KT1UMAE2PBskeQayP5f2ZbGiVYF7h8bZ2gyp", // wBUSD
    "KT1X1LgNkQShpF9nRLYw3Dgdy4qp38MX617z", // PLENTY
    "KT1K4EwTpbvYN9agJdjpyJm4ZZdhpUNKB3F6", // kUSD
    "KT1U2hs5eNdeCpHouAvQXGMzGFGJowbhjqmo", // wUSDC
    "KT1X3zxdTzPB9DgVzA3ad6dgZe9JEamoaeRy", // QUIPU
    "KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di", // uUSD
    "KT1T4pfr6NL8dUiz8ibesjEvH2Ne3k6AuXgn", // wUSDT
    "KT1PQ8TMzGMfViRq4tCMFKD2QF5zwJnY67Xn", // wDAI
    "KT1PL1YciLdwMbydt21Ax85iZXXyGSrKT2BE", // YOU
    "KT1FbYwEWU8BTfrvNoL5xDEC5owsDxv9nqKT", // ctez
  ],
  PLENTY_CONTRACT_ADDRESSES: [
    // https://plenty-defi.notion.site/Contracts-ad630febf4b4478691f94c46a4894a89
    "KT1HaDP8fRW7kavK2beST7o4RvzuvZbn5VwV", // PLENTY-tzBTC
    "KT1UNBvCJXiwJY6tmHM7CJUVwNPew53XkSfh", // PLENTY-kUSD
    "KT1XXAavg3tTj12W1ADvd3EEnm1pu6XTmiEF", // PLENTY-wBUSD
    "KT1PuPNtDFLR6U7e7vDuxunDoKasVT6kMSkz", // PLENTY-wUSDC
    "KT1D36ZG99YuhoCRZXLL86tQYAbv36bCq9XM", // PLENTY-USDtz
    "KT1XutoFJ9dXvWxT7ttG86N2tSTUEpatFVTm", // PLENTY-hDAO
    "KT1UNBvCJXiwJY6tmHM7CJUVwNPew53XkSfh", // PLENTY-kUSD
    "KT1NtsnKQ1c3rYB12ZToP77XaJs8WDBvF221", // PLENTY-QUIPU
    "KT1HaDP8fRW7kavK2beST7o4RvzuvZbn5VwV", // PLENTY-tzBTC
    "KT1Cba383ZJpEearqnUyUKUMsgu5Z3TXBgeH", // PLENTY-uUSD
    "KT1Bi4yoALg6tuP4PKaFNDtSsDdpGLrDiGAS", // PLENTY-wUSDT
    "KT1KDmpYSDogNtEtEnEaHQLaySuqLr8aEfJW", // PLENTY-wDAI
    "KT1EM6NjJdJXmz3Pj13pfu3MWVDwXEQnoH3N", // PLENTY-YOU
    "KT1C9gJRfkpPbNdBn3XyYbrUHT6XgfPzZqXP", // PLENTY-ctez

    "KT1TnsQ6JqzyTz5PHMsGj28WwJyBtgc146aJ", // kUSD-USDtz
    "KT1EJMMismkf6TQdMzgx8hb1HpiiRVV8ZSm4", // wUSDC-USDtz

    "KT1X1nkqJDR1UHwbfpcnME5Z7agJLjUQNguB", // ctez -  kUSD
    "KT1PWAXfPatPWBNJUxTHin4ECin1kYJHHnsr", // ctez - USDtz
    "KT1PZpbmKtGE6ZyYeF8entfjuGGT7CRUCF5g", // ctez - wUSDC
    "KT1AfTwam4bNPawLv4bWqSj9GsVDPsf5F5bQ", // ctez - wUSDT
    "KT1GN7PHpFsH43ypFyE2hxNMdxqTuiCGm4Pm", // ctez - wBUSD
    "KT1L5qd9xPWjiEX6ZNovhaty228ASg6jCE5p", // ctez - wDAI
    "KT1Ss8rb1UFVqG2LYEU5g4NEbK5SqW5Xadwp", // ctez - QUIPU
    "KT1Rx3pQzsn4FBuuYhcWsqUS7vWFx3ktqSWD", // ctez - uUSD
    "KT1Wryxte8NnVCm569yb8dcSPmvFBVs4ufD6", // ctez - tzBTC
  ],
  VORTEX_CONTRACT_ADDRESSES: [
    "KT1LErZ1878Kyq3xtSc5pwxzTrD7XSZoE2RY", // QUIPU
    "KT1VsejAEdNgz1s98MjyuLC3mcnbjUZAaNu9", // wBUSD
    "KT1W2VfA2ofdiNR2vRE4phSEeTgfvGyY8p64", // YOU
    "KT1Wjadao8AXkwNQmjstbPGtLd1ZrUyQEDX7", // kUSD
    "KT1ND1bkLahTzVUt93zbDtGugpWcL23gyqgQ", // uUSD
    "KT1XCq6nwpwZDYjqQfLg9dwsopjjDtSsRswh", // wUSDC
    "KT1SQgdPJoyTgGrUDACBtXgFH6xtPk9wUv2T", // wWBTC
    "KT1VSjJxNq98AkPfVktpCv82hacrvgkb6hEu", // PLENTY
    "KT19HdcBJw8XJkDYKLr6ez9KkhhuS8MYUdcs", // USDtz
    "KT1MRMsyWYCwf2ex2wN4yuihJbNykCDHdRTT", // ctez
  ],
  USED_DEX: [DEX.QUIPUSWAP, DEX.PLENTY],
};

const initStorageBuilder = (contract_list) => {
  const initStorage = async ({ tezos }) => {
    return new Map(
      await Promise.all(
        contract_list.map(async (contract_address) => {
          try {
            await new Promise((r) => setTimeout(r, 10000 * Math.random()));
            const dex = await tezos.contract.at(contract_address);
            const dexStorage = await dex.storage();
            return [contract_address, dexStorage];
          } catch (err) {
            console.error("initStorage", err);
          }
        })
      )
    );
  };
  return initStorage;
};

export const initDexFunctions = {
  [DEX.QUIPUSWAP]: initStorageBuilder(ENV.QUIPUSWAP_CONTRACT_ADDRESSES),
  [DEX.PLENTY]: initStorageBuilder(ENV.PLENTY_CONTRACT_ADDRESSES),
  [DEX.VORTEX]: initStorageBuilder(ENV.VORTEX_CONTRACT_ADDRESSES),
};
