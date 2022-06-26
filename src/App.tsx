import React from "react";
import * as config from "./content/config";
import { Outlet, Link } from "react-router-dom";
import {
  Background,
  Wrapper,
  Title,
  Marquee,
  MarqueeContent,
} from "./components/ui";
import { Grid, VStack, Code, Text, Box } from "@chakra-ui/react";

export default function App() {
  return (
    <React.Fragment>
      <Background>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
              <Wrapper>
                <Title>zkMEV: Return of the Mempool</Title>
                <Marquee>
                  <MarqueeContent>
                    Once upon a time in a blockchain
                  </MarqueeContent>
                </Marquee>
              </Wrapper>
              <img src="./assets/divider.png" width="500px" />
              <Outlet />
              <img src="./assets/guestbook.gif" width="50px" />

              <a
                href="https://twitter.com/filmfranz"
                target="_blank"
                rel="noopener noreferrer"
              >
                Write in guestbook
              </a>
            </VStack>
          </Grid>
        </Box>
      </Background>
    </React.Fragment>
  );
}
