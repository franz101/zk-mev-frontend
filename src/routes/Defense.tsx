import React, { useEffect, useState } from "react";
import { Button } from "../components/ui";
import {
  useAccount,
  useDisconnect,
  useConnect,
  WagmiConfig,
  configureChains,
  createClient,
  useContractWrite,
  useWaitForTransaction,
  useProvider,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { Buffer } from "buffer";

import { chain } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Connect } from "../components/Connect";
import { Account } from "../components/Account";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { Input } from "@chakra-ui/react";
import useFetch from "use-http";
import { TokenResponse } from "../types/tokens";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
//0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63
const defaultChains = [chain.polygonMumbai, chain.rinkeby];

const Explorer = () => {
  const { data } = useAccount();
  const provider = useProvider();

  const [collectionId, setCollectionId] = useState("");
  const [floorPrice, setFloorPrice] = useState("0");
  const { get, post, response, loading, error } = useFetch<TokenResponse>(
    `https://api.reservoir.tools/tokens/v3?collection=${collectionId}`
  );

  const {
    isLoading: isLoadingWrite,
    isError: isErrorWrite,
    data: writeData,
    status: statusWrite,
  } = useContractWrite(
    {
      addressOrName: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
      contractInterface: "wagmigotchiABI",
      signerOrProvider: provider,
    },
    "feed",
    {
      args: [],
      overrides: {
        gasLimit: BigNumber.from("7000000"),
        value: parseEther(floorPrice),
      },
    }
  );

  useEffect(() => {
    get();
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

  return (
    <div style={{ color: "white" }}>
      <p>Sniper bot</p>
      <Input
        onChange={(evt) => setCollectionId(evt.target.value)}
        placeholder="NFT"
      />

      {collectionId && (
        <Input
          onChange={(evt) => setFloorPrice(evt.target.value)}
          placeholder={`Bid`}
        />
      )}

      {response?.data ? (
        <p>Current Floor price {response.data?.tokens?.[0].floorAskPrice}</p>
      ) : (
        ""
      )}

      <Button onClick={() => {}}>Snipe</Button>
      <Connect />

      {data?.address && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </div>
  );
};

// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer;
}

const alchemyId = process.env.REACT_APP_ALCHEMY_ID;

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
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
