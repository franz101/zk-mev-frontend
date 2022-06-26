import React, { useEffect, useState } from "react";
import { Button } from "../components/ui";
import {
  useAccount,
  WagmiConfig,
  configureChains,
  createClient,
  useContractWrite,
  useWaitForTransaction,
  useProvider,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { Buffer } from "buffer";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { chain } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Connect } from "../components/Connect";
import { Account } from "../components/Account";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { Flex, Input, VStack } from "@chakra-ui/react";
import useFetch from "use-http";
import { TokenResponse } from "../types/tokens";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";

// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer;
}

const Explorer = () => {
  const { data } = useAccount();
  const provider = useProvider();

  const [collectionId, setCollectionId] = useState("");
  const [transferError, setTransferError] = useState("");
  const [sniping, setSniping] = useState(false);
  const [floorPrice, setFloorPrice] = useState("0");
  const { get, post, response, loading, error } = useFetch<TokenResponse>(
    `https://api.reservoir.tools/tokens/v3?collection=${collectionId}`
  );

  const {
    isLoading: isLoadingWrite,
    isError: isErrorWrite,
    data: writeData,
    status: statusWrite,
    writeAsync: writeContract,
  } = useContractWrite(
    {
      addressOrName: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      contractInterface:
        '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]',
    },
    "deposit",
    {
      args: [],
      onError: (err) => {
        setTransferError(err.message);
      },
      onSuccess: (succ) => {
        console.log(succ);
      },
      overrides: {
        gasLimit: BigNumber.from("7000000"),
        value: parseEther(floorPrice),
      },
    }
  );

  useEffect(() => {
    try {
      get();
    } catch (err) {
      console.log(err);
    }
  }, [collectionId]);

  const {
    isLoading: isLoadingTx,
    isError: isErrorTx,
    data: txData,
    status: statusTx,
  } = useWaitForTransaction({
    hash: writeData?.hash, // is undefined until write has been successfully called and writeData contains a hash
    onError(error) {
      // this is not called
      console.log("Error", error);
    },
  });

  useEffect(() => {
    console.log("txData");
    console.log(txData);
    setSniping(false);
  }, [txData]);

  return (
    <div style={{ color: "white" }}>
      <h3>
        <img src="./assets/coolsabre.gif" height="30px" /> Sniper bot{" "}
        <img src="./assets/coolsabre.gif" height="30px" />
      </h3>
      Paste a collection address:{" "}
      <Input
        onChange={(evt) => setCollectionId(evt.target.value)}
        placeholder="NFT"
        value={collectionId}
      />
      <p
        onClick={() =>
          setCollectionId("0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63")
        }
      >
        Click here for example
      </p>
      {collectionId && (
        <Input
          onChange={(evt) => setFloorPrice(evt.target.value)}
          placeholder={`Bid`}
        />
      )}
      {response?.data ? (
        <p>
          Current Floor price {response.data?.tokens?.[0].floorAskPrice}
          <br />
          Wash trading score: {Math.random().toFixed(2)}
          <br />
          Seller trust score: {Math.random().toFixed(2)}
        </p>
      ) : (
        ""
      )}
      <VStack spacing={8} style={{ paddingBottom: "50px" }}>
        {!sniping ? (
          <Button
            onClick={() => {
              console.log("HELLO", parseEther(floorPrice), data?.address);
              writeContract();
            }}
          >
            Snipe
          </Button>
        ) : (
          <img src="./assets/lazer-laser.gif" />
        )}
      </VStack>
      <Connect />
      {data?.address && (
        <>
          {/* <Account /> */}
          <NetworkSwitcher />
        </>
      )}
    </div>
  );
};

const defaultChains = [chain.polygonMumbai, chain.rinkeby, chain.optimism];

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  jsonRpcProvider({
    rpc: (chain) => {
      switch (chain.network) {
        case "optimism-mainnet":
          return {
            http: "https://optimism-mainnet.gateway.pokt.network/v1/lb/62b6db72123e6f003983ad87",
          };
        case "gnosischain-mainnet":
          return {
            http: "https://gnosischain-mainnet.gateway.pokt.network/v1/lb/62b6db72123e6f003983ad87",
          };
        case "boba":
          return {
            http: "https://poly-mumbai.gateway.pokt.network/v1/lb/62b6db72123e6f003983ad87",
          };
        case "maticmum":
          return {
            http: "https://poly-mumbai.gateway.pokt.network/v1/lb/62b6db72123e6f003983ad87",
          };

        default:
          return {
            http: "https://eth-rinkeby.gateway.pokt.network/v1/lb/62b6db72123e6f003983ad87",
          };
      }
    },
  }),
]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),

    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const ExplorerWrapper = () => {
  return (
    <WagmiConfig client={client}>
      <Explorer />
    </WagmiConfig>
  );
};
export default ExplorerWrapper;
