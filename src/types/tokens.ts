export interface TokenResponse {
  tokens: Token[];
  continuation: string;
}

interface Token {
  contract: string;
  tokenId: string;
  name: string;
  image: string;
  collection: Collection;
  floorAskPrice: number;
  topBidValue?: any;
}

interface Collection {
  id: string;
  name: string;
  image: string;
  slug: string;
}
