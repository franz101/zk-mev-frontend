import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Paragraph, Button } from "../components/ui";

const Home = () => {
  const navigate = useNavigate();
  const handleOnClickAttack = useCallback(
    () => navigate("/attack", { replace: true }),
    [navigate]
  );
  const handleOnClickDefense = useCallback(
    () => navigate("/defense", { replace: true }),
    [navigate]
  );

  return (
    <VStack spacing={8}>
      <Paragraph>
        MEV bots gas are surpassing NFT Marketplaces. Solana halts due to gas
        wars. Therefore we present the following: A seaport snipper bot build on
        top of the nft search protocol A module to use soulbound tokens or
        trustscores to make the auction only avaiable for specifc people Commit
        Reveal auctions for specific NFTs (to prevent our sniper) We will use
        zeroknowledge proofs for our trustscore. therefore its not public. In
        the subgraph we will start looking into washtrading and use this as our
        score.
      </Paragraph>
      <Flex>
        <Box p="4">
          <img
            src="./assets/vader.gif"
            width="50px"
            height="50px"
            style={{ margin: "-25px" }}
          />
          <Button onClick={handleOnClickAttack}>
            <input className="winCl-btn" type="button" value="Attack" />
          </Button>
        </Box>
        <Spacer />
        <Box p="4">
          <img
            src="./assets/baby-yoda.gif"
            width="100px"
            height="100px"
            style={{ margin: "-50px" }}
          />
          <Button onClick={handleOnClickDefense}>
            <input className="winCl-btn" type="button" value="Defend" />
          </Button>
        </Box>
      </Flex>
    </VStack>
  );
};

export default Home;
