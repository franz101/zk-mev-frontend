const baseUrl = "https://api.thegraph.com/subgraphs/name";
export const polygon = `${baseUrl}/franz101/weth-arbitrage-matic`;
export const ethereum = `${baseUrl}/franz101/arb-explorer-mainnet`;
export const binance = `${baseUrl}/franz101/weth-arbitrage-bnb`;

export const getApiForChain = (chain: string) => {
  switch (chain) {
    case "polygon":
      return polygon;
    case "ethereum":
      return ethereum;
    case "binance":
      return binance;
    default:
      return polygon;
  }
};
