import { TOKEN_TYPE } from "./config/tokens.js";

export const assetToSlug = ({ type, address, tokenId }) => {
  if (type === TOKEN_TYPE.XTZ) {
    return "tez";
  }
  return type === TOKEN_TYPE.FA2 ? `${address}_${tokenId}` : `${address}`;
};

export const slugToAsset = (slug) => {
  if (slug === "tez") {
    return { type: TOKEN_TYPE.XTZ };
  }
  const parts = slug.split("_");
  return {
    type: parts.length === 1 ? TOKEN_TYPE.FA12 : TOKEN_TYPE.FA2,
    address: parts[0],
    ...(parts.length === 1 ? {} : { tokenId: +parts[1] })
  };
};