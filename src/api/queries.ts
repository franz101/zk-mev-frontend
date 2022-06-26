import { GraphQLClient } from "graphql-hooks";
import * as endpoints from "./endpoints";
import { getApiForChain } from "./endpoints";
const itemsPerPage = 256;
let identitiesPageIdx = 0;
let attestationsPageIdx = 0;

export const getLatestBlock = () =>
  `
  {
    latestBlock(first: 1,id: "latest") {
      id
      blockNumber
      blockTimestamp
    }
   
  }
`;
export const getArbitrageHistory = () =>
  `
  {
    latestBlock(first: 1,id: "latest") {
      id
      blockNumber
      blockTimestamp
    }
    
    bots(first:8 ,orderBy: txCount, orderDirection: desc) {
      id
      txCount
      lastBlockNumber
      lastBlockTimestamp
    }
  
    lastArb(first: 1,id: "latest") {
      #id
      #metadata
      txHash
      blockNumber
      blockTimestamp
      #smartContract
      #caller
      #gasUsed
    }
  
    arbitrages (first:8 ,orderBy: blockNumber, orderDirection: desc){
      id
      smartContract {id }
      callerAddress
      totalEventLogs
      blockNumber
    }

    interactedSmartContracts(first:30 ,orderBy: counter, orderDirection: desc
      ) {
        id
        counter
        name
        symbol
        lastBlockTimestamp
        lastBlockNumber
      }
  
   
  }
  
`;
export const getArbitrageHistoryForSmartContract = (address: string) =>
  `
  {
    latestBlock(first: 1,id: "latest") {
      id
      blockNumber
      blockTimestamp
    }
    
    
    interactedSmartContract(id: "${address}", first:30 ,orderBy: counter, orderDirection: desc
      ) {
        id
        counter
        name
        symbol
        lastBlockTimestamp
        lastBlockNumber
      }
  
   
  }
  
`;

export const getClientForChain = (chain: string) => {
  const endpoint = getApiForChain(chain);
  return new GraphQLClient({ url: endpoint });
};

// export const runQueryForChain = async (
//   chain: string,
//   query: string,
//   variables: Record<string, any> = {}
// ) => {
//   const endpoint = getApiForChain(chain);
//   const client = new GraphQLClient(endpoint);
//   const data = await client.request(getLatestBlock());
//   return data;
// };
