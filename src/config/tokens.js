import { assetToSlug } from "../helpers.js";

export const TOKEN_TYPE = {
  XTZ: "XTZ",
  FA12: "FA12",
  FA2: "FA2"
};

export const TOKENS = [
  {
    "type": "xtz",
    "tokenType": TOKEN_TYPE.XTZ,
    "id": "XTZ",
    "decimals": 6,
    "symbol": "XTZ",
    "name": "Tezos",
    "imgUrl": "",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV",
    "decimals": 18,
    "symbol": "KUSD",
    "name": "Kolibri",
    "imgUrl": "https://kolibri-data.s3.amazonaws.com/logo.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "QUIPU",
    "name": "Quipuswap Governance Token",
    "imgUrl": "https://quipuswap.com/tokens/quipu.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT1VYsVfmobT7rsMVivvZ4J8i3bPiqz12NaH",
    "decimals": 6,
    "symbol": "wXTZ",
    "name": "Wrapped Tezos",
    "imgUrl": "https://raw.githubusercontent.com/StakerDAO/wrapped-xtz/dev/assets/wXTZ-token-FullColor.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1REEb5VxWRjcHm5GzDMwErMmNFftsE5Gpf",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "USDS",
    "name": "Stably USD",
    "imgUrl": "https://quipuswap.com/tokens/stably.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn",
    "decimals": 8,
    "symbol": "tzBTC",
    "name": "tzBTC",
    "imgUrl": "https://tzbtc.io/wp-content/uploads/2020/03/tzbtc_logo_single.svg",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT1AEfeckNbdEYwaMKkytBwPJPycz7jdSGea",
    "decimals": 18,
    "symbol": "STKR",
    "name": "Staker Governance Token",
    "imgUrl": "https://github.com/StakerDAO/resources/raw/main/stkr.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9",
    "decimals": 6,
    "symbol": "USDtz",
    "name": "USDtez",
    "imgUrl": "https://quipuswap.com/tokens/usdtz.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT19at7rQUvyjxnZ2fBv7D9zc8rkyG7gAoU8",
    "decimals": 18,
    "symbol": "ETHtz",
    "name": "ETHtez",
    "imgUrl": "https://quipuswap.com/tokens/ethtz.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1AFA2mwNUMNd4SsujE1YYp29vd8BZejyKW",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "hDAO",
    "name": "hic et nunc DAO",
    "imgUrl": "https://ipfs.io/ipfs/QmPfBrZiRsC39S2VvNbhuxH9HnNcSx8aef9uBCG51J5c4e/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1LRboPna9yQY9BrjtQYDS1DVxhKESK4VVd",
    "fa2TokenId": 0,
    "decimals": 8,
    "symbol": "WRAP",
    "name": "Wrap Governance Token",
    "imgUrl": "https://ipfs.io/ipfs/Qma2o69VRZe8aPsuCUN1VRUE5k67vw2mFDXb35uDkqn17o/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1BHCumksALJQJ8q8to2EPigPW6qpyTr7Ng",
    "fa2TokenId": 0,
    "decimals": 8,
    "symbol": "CRUNCH",
    "name": "CRUNCH",
    "imgUrl": "https://ipfs.io/ipfs/bafybeienhhbxz53n3gtg7stjou2zs3lmhupahwovv2kxwh5uass3bc5xzq/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 0,
    "decimals": 18,
    "symbol": "wAAVE",
    "name": "Wrapped AAVE",
    "imgUrl": "https://ipfs.io/ipfs/QmVUVanUUjHmgkjnUC6TVzG7pPz6iy7C8tnAoXNNpofYPg/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 1,
    "decimals": 18,
    "symbol": "wBUSD",
    "name": "Wrapped BUSD",
    "imgUrl": "https://ipfs.io/ipfs/QmRB63vb8ThpmxHKF4An3XD8unHyCUuLYm5bZNhXwU4gAZ/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 2,
    "decimals": 4,
    "symbol": "wCEL",
    "name": "Wrapped CEL",
    "imgUrl": "https://ipfs.io/ipfs/QmfNuyU3V6XeS9PgVXMDq4h5ux1VciUXtApP2ZGC4VSGLd/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 3,
    "decimals": 18,
    "symbol": "wCOMP",
    "name": "Wrapped COMP",
    "imgUrl": "https://ipfs.io/ipfs/QmYy2jUUE69W5eE9uwh4x5LqUxHt3GVy8sjXHhpViqCspG/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 4,
    "decimals": 8,
    "symbol": "wCRO",
    "name": "Wrapped CRO",
    "imgUrl": "https://ipfs.io/ipfs/QmUuhxgCm2EXwddpU8ofBBh9z1qzxf2BJRbxxR1ebYr8Hd/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 5,
    "decimals": 18,
    "symbol": "wDAI",
    "name": "Wrapped DAI",
    "imgUrl": "https://ipfs.io/ipfs/QmVov6RtfRNzuQGvGKmhnABUsfCiDKvn31amg8DUxzowtM/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 6,
    "decimals": 18,
    "symbol": "wFTT",
    "name": "Wrapped FTT",
    "imgUrl": "https://ipfs.io/ipfs/QmVBjgrJiUynv72MR6rRyUu1WLKX52bWGiKk7H2CaFDRNW/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 7,
    "decimals": 18,
    "symbol": "wHT",
    "name": "Wrapped HT",
    "imgUrl": "https://ipfs.io/ipfs/Qmayt4JbYTkQinNUeVGLhp51LTRMD1273HRgo9p96SoQaM/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 8,
    "decimals": 8,
    "symbol": "wHUSD",
    "name": "Wrapped HUSD",
    "imgUrl": "https://ipfs.io/ipfs/QmT9bozupnmWjmjnXp8KcZqDY9HYLLr5KgojfxqgoWRgCt/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 9,
    "decimals": 18,
    "symbol": "wLEO",
    "name": "Wrapped LEO",
    "imgUrl": "https://ipfs.io/ipfs/QmPrmELnhSoheHCHx6XcjSera7f89NYmXabBnSRSCdDjBh/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 10,
    "decimals": 18,
    "symbol": "wLINK",
    "name": "Wrapped LINK",
    "imgUrl": "https://ipfs.io/ipfs/QmeaRuB578Xgy8jxbTxqmQ9s5wyioAEP85V7qbJFnn2uT8/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 11,
    "decimals": 18,
    "symbol": "wMATIC",
    "name": "Wrapped MATIC",
    "imgUrl": "https://ipfs.io/ipfs/QmchBnjRjpweznHes7bVKHwgzd8D6Q7Yzwf6KmA4KS6Dgi/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 12,
    "decimals": 18,
    "symbol": "wMKR",
    "name": "Wrapped MKR",
    "imgUrl": "https://ipfs.io/ipfs/QmPTob6YP9waErN4gMXqHg6ZyazSFB9CEojot4BB2XPpZJ/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 13,
    "decimals": 18,
    "symbol": "wOKB",
    "name": "Wrapped OKB",
    "imgUrl": "https://ipfs.io/ipfs/QmPpmuLw4i9qJLMmGjXrGxrcPBwTiNZgLGuh7kYXeyTdyA/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 14,
    "decimals": 18,
    "symbol": "wPAX",
    "name": "Wrapped PAX",
    "imgUrl": "https://ipfs.io/ipfs/QmZD5QDAeAUyyLYKiMmxD4vfWpVeYHctcbTkPmo4NudDHt/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 15,
    "decimals": 18,
    "symbol": "wSUSHI",
    "name": "Wrapped SUSHI",
    "imgUrl": "https://ipfs.io/ipfs/QmTpss9a4uL3op7x5Lte7CcTKUSUhZsM1Gr34BWNvZCfy4/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 16,
    "decimals": 18,
    "symbol": "wUNI",
    "name": "Wrapped UNI",
    "imgUrl": "https://ipfs.io/ipfs/QmQBezdVvotCGnFHgQNKduLdxEJhfgruSEqtwnWY7mESb2/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 17,
    "decimals": 6,
    "symbol": "wUSDC",
    "name": "Wrapped USDC",
    "imgUrl": "https://ipfs.io/ipfs/QmQfHU9mYLRDU4yh2ihm3zrvVFxDrLPiXNYtMovUQE2S2t/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 18,
    "decimals": 6,
    "symbol": "wUSDT",
    "name": "Wrapped USDT",
    "imgUrl": "https://ipfs.io/ipfs/QmVbiHa37pe2U9FfXBYfvrLNpb38rbXwaN19HwZD2speFA/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 19,
    "decimals": 8,
    "symbol": "wWBTC",
    "name": "Wrapped WBTC",
    "imgUrl": "https://ipfs.io/ipfs/Qmdj6n9T48LDWex8NkBMKUQJfZgardxZVdtRRibYQVzLCJ/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ",
    "fa2TokenId": 20,
    "decimals": 18,
    "symbol": "wWETH",
    "name": "Wrapped WETH",
    "imgUrl": "https://ipfs.io/ipfs/Qmezz1ztvo5JFshHupBEdUzVppyMfJH6K4kPjQRSZp8cLq/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b",
    "decimals": 18,
    "symbol": "PLENTY",
    "name": "Plenty DAO",
    "imgUrl": "https://raw.githubusercontent.com/Plenty-DeFi/Plenty-Logo/main/PlentyTokenIcon.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1A5P4ejnLix13jtadsfV9GCnXLMNnab8UT",
    "fa2TokenId": 0,
    "decimals": 10,
    "symbol": "KALAM",
    "name": "Kalamint",
    "imgUrl": "https://ipfs.io/ipfs/Qme9FX9M7o2PZt9h6rvkUbfXoLpQr1HsuMQi6sL5Y75g3A/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1XPFjZqCULSnqfKaaYy8hJjeY63UNSGwXg",
    "fa2TokenId": 0,
    "decimals": 8,
    "symbol": "crDAO",
    "name": "Crunchy DAO",
    "imgUrl": "https://ipfs.io/ipfs/bafybeigulbzm5x72qtmckxqvd3ksk6q3vlklxjgpnvvnbcofgdp6qwu43u/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT1TwzD6zV3WeJ39ukuqxcfK2fJCnhvrdN1X",
    "decimals": 3,
    "symbol": "SMAK",
    "name": "SmartLink",
    "imgUrl": "https://quipuswap.com/tokens/smak.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT1JkoE42rrMBP9b2oDhbx6EUr26GcySZMUH",
    "decimals": 18,
    "symbol": "kDAO",
    "name": "Kolibri DAO",
    "imgUrl": "https://kolibri-data.s3.amazonaws.com/kdao-logo.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW",
    "fa2TokenId": 0,
    "decimals": 12,
    "symbol": "uUSD",
    "name": "youves uUSD",
    "imgUrl": "https://ipfs.io/ipfs/QmbvhanNCxydZEbGu1RdqkG3LcpNGv7XYsCHgzWBXnmxRd/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW",
    "fa2TokenId": 1,
    "decimals": 12,
    "symbol": "uDEFI",
    "name": "youves uDEFI",
    "imgUrl": "https://ipfs.io/ipfs/QmNfosyixuXVG2TGmE7FmLGZGJhK2Q9qHZicsMixsbgqH1/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW",
    "fa2TokenId": 2,
    "decimals": 12,
    "symbol": "uBTC",
    "name": "youves uBTC",
    "imgUrl": "https://ipfs.io/ipfs/Qmbev41h4axBqVzxsXP2NSaAF996bJjJBPb8FFZVqTvJTY/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1GUNKmkrgtMQjJp3XxcmCj6HZBhkUmMbge",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "bDAO",
    "name": "Bazaar DAO",
    "imgUrl": "https://ipfs.io/ipfs/QmVMyqkFKAeyfGBeR81h72ugqj4UM8hjqA7KaKcnc35Vtt/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1Xobej4mc6XgEjDoJoHtTKgbD1ELMvcQuL",
    "fa2TokenId": 0,
    "decimals": 12,
    "symbol": "YOU",
    "name": "youves YOU Governance",
    "imgUrl": "https://ipfs.io/ipfs/QmYAJaJvEJuwvMEgRbBoAUKrTxRTT22nCC9RuY7Jy4L4Gc/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT19JYndHaesXpvUfiwgg8BtE41HKkjjGMRC",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "RCKT",
    "name": "Rocket",
    "imgUrl": "https://gblobscdn.gitbook.com/assets%2F-MayY_wA8g4oLd9eVN9A%2F-MbbCn2yMCnBWfDTMUTb%2F-MbbDTyyuxM6uBAYA6ms%2FToken.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1MuyJ7gVw74FNJpfb2mHR15aCREdyEbe2e",
    "fa2TokenId": 0,
    "decimals": 8,
    "symbol": "rkDAO",
    "name": "Rocket DAO",
    "imgUrl": "https://i.ibb.co/3m7xx5C/Rocket-9.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1ErKVqEhG9jxXgUG2KGLW3bNM7zXHX8SDF",
    "fa2TokenId": 0,
    "decimals": 9,
    "symbol": "UNO",
    "name": "Unobtanium",
    "imgUrl": "https://ipfs.io/ipfs/QmXdQ3DaMsnqH7MEhX77foWfjxRnj8Qe88mwekkn4PSt3q/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1XTxpQvo7oRCqp85LikEZgAZ22uDxhbWJv",
    "fa2TokenId": 0,
    "decimals": 9,
    "symbol": "GIF",
    "name": "GIF DAO",
    "imgUrl": "https://ipfs.io/ipfs/QmQxoTVVuFS677TQJFdVh1PNRoBmVbvkwJSxe1xvf9cSqU/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1WapdVeFqhCfqwdHWwTzSTX7yXoHgiPRPU",
    "fa2TokenId": 0,
    "decimals": 8,
    "symbol": "IDZ",
    "name": "TezID",
    "imgUrl": "https://tezid.net/idz.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1QgAtLPu3SNq9c6DPLanwL5bvfX3rgh2CS",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "EASY",
    "name": "CryptoEasy",
    "imgUrl": "https://cryptoeasy.io/img/cryptoeasy-logo.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ",
    "fa2TokenId": 0,
    "decimals": 9,
    "symbol": "INSTA",
    "name": "Instaraise",
    "imgUrl": "https://ipfs.io/ipfs/QmYMMztcxtohk1t3p4X8DDX45REzeThL1TaJroH5RT5Chj/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT1Rpviewjg82JgjGfAKFneSupjAR1kUhbza",
    "decimals": 18,
    "symbol": "xPLENTY",
    "name": "xPLENTY",
    "imgUrl": "https://raw.githubusercontent.com/Plenty-DeFi/Plenty-Logo/main/xPlenty.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT1SjXiUX63QvdNMcM2m492f7kuf8JxXRLp4",
    "decimals": 6,
    "symbol": "ctez",
    "name": "Ctez",
    "imgUrl": "https://ipfs.io/ipfs/Qme4ybadbY4H84h5WLPjdo47YQUxxVoJHWZrwYq2JZriM4/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA12,
    "id": "KT19DUSZw7mfeEATrbWVPHRrWNVbNnmfFAE6",
    "decimals": 8,
    "symbol": "PAUL",
    "name": "PAUL Token",
    "imgUrl": "https://ipfs.io/ipfs/QmeoZ5ZnGnCMq8iGPeBjoS628c526DR37jnDstqEnTfkwC/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1CS2xKGHNPTauSh5Re4qE3N9PCfG5u4dPx",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "SPI",
    "name": "Spice Token",
    "imgUrl": "https://ipfs.io/ipfs/QmYQdCWFh26rPoaYNLFBa3mQg3EyXyfgJ5ktG4YrkbD4AZ/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1PnUZCp3u2KzWr93pn4DD7HAJnm3rWVrgn",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "WTZ",
    "name": "WTZ",
    "imgUrl": "https://ipfs.io/ipfs/bafybeidwsid6fvv4vxbqja7er3b4exsht5r7umv6hpz7rc3ujg7xilhwv4/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1Wa8yqRBpFCusJWgcQyjhRz7hUQAmFxW7j",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "FLAME",
    "name": "FLAME",
    "imgUrl": "https://spacefarm.xyz/images/flamelogo.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1KPoyzkj82Sbnafm6pfesZKEhyCpXwQfMc",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "fDAO",
    "name": "fDAO",
    "imgUrl": "https://spacefarm.xyz/images/fdaologo.png",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1F1mn2jbqQCJcsNgYKVAQjvenecNMY2oPK",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "PXL",
    "name": "Pixel",
    "imgUrl": "https://cloudflare-ipfs.com/ipfs/Qma4wzNogtUkuhMgzyKBqzaYBqabLVZrHcLbLmJE38B5XH",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT19ovJhcsUn4YU8Q5L3BGovKSixfbWcecEA",
    "fa2TokenId": 1,
    "decimals": 0,
    "symbol": "sDAO",
    "name": "Salsa DAO",
    "imgUrl": "https://ipfs.io/ipfs/QmPJ7dMS3T6McqPjjBioKhHqtEUEBhAXpcRf3aicaLNPtV/",
    "exchange": ""
  },
  {
    "type": "token",
    "tokenType": TOKEN_TYPE.FA2,
    "id": "KT1KRvNVubq64ttPbQarxec5XdS6ZQU4DVD2",
    "fa2TokenId": 0,
    "decimals": 6,
    "symbol": "MTRIA",
    "name": "Materia",
    "imgUrl": "https://ipfs.io/ipfs/QmRrvFBwRKK8cQ6yKXEX38Q34wrWK6FBbCvQPzun5e4kjP/",
    "exchange": ""
  }
];

// export const SLUG_TO_TOKEN = Object.fromEntries(TOKENS.map(token => [
//   assetToSlug({
//     type: token.type,
//     address: token.id,
//     ...(token.type === TOKEN_TYPE.FA2 ? { tokenId: token.fa2TokenId } : {})
//   }),
//   token
// ]));