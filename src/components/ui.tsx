import styled from "styled-components";

export const COLORS = {
  yellow: {
    "100": "#FFF9C4",
    "300": "#FFF176",
    "500": "#FFEB3B",
    "700": "#FBC02D",
    "900": "#F57F17",
  },
  orange: {
    "100": "#FFECB3",
    "300": "#FFD54F",
    "500": "#FFC107",
    "700": "#FFA000",
    "900": "#FF6F00",
  },
  green: {
    "300": "#B2FF59",
    "500": "#76FF03",
    "700": "#64DD17",
    "900": "#33691E",
  },
  blue: {
    "100": "#B3E5FC",
    "300": "#4FC3F7",
    "500": "#03A9F4",
    "700": "#0288D1",
    "900": "#01579B",
  },
  indigo: {
    "100": "#b3defc",
    "300": "#4f9ef7",
    "500": "#0380f4",
    "700": "#0268d1",
    "900": "#01499b",
  },
  purple: {
    "100": "#E1BEE7",
    "300": "#BA68C8",
    "500": "#9C27B0",
    "700": "#7B1FA2",
    "900": "#4A148C",
  },
  pink: {
    "100": "#F8BBD0",
    "300": "#F06292",
    "500": "#E91E63",
    "700": "#C2185B",
    "900": "#880E4F",
  },
  gray: {
    "50": "#FAFAFA",
    "100": "#F5F5F5",
    "300": "#E0E0E0",
    "400": "#CCCCCC",
    "500": "#9E9E9E",
    "700": "#616161",
    "800": "#414141",
    "900": "#212121",
  },
  white: "#FFFFFF",
};

export const Title = styled.h1`
  font-weight: bold;
  font-size: 56px;
  color: ${COLORS.green["500"]};
`;

export const Background = styled.div`
  margin: -10px;
  background: black url("./assets/bg-stars-2.jpg") repeat fixed center;
`;
export const Wrapper = styled.header`
  padding-top: 4rem;
  padding-bottom: 2rem;
  text-align: center;
`;

export const Marquee = styled.div`
  margin-top: -1.5rem;
  padding-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  transform: rotate(4deg);
`;

export const MarqueeContent = styled.span`
  display: inline-block;
  color: black;
  background-color: ${COLORS.yellow[500]};
  padding: 6px;
`;

export const Paragraph = styled.p`
  font-size: 22px;
  max-width: 450px;
  color: white;
  margin: auto;
  text-shadow: 1px 1px 1px black;
`;

export const Button = styled.div`
  text-align: center;
  width: 50px;
  outline: 0;
  background: #eaf6fd;
  background: -moz-linear-gradient(
    top,
    #eaf6fd 0%,
    #d9f0fc 42%,
    #bee6fd 47%,
    #bce5fc 58%,
    #a7d9f5 100%
  );
  background: -webkit-linear-gradient(
    top,
    #eaf6fd 0%,
    #d9f0fc 42%,
    #bee6fd 47%,
    #bce5fc 58%,
    #a7d9f5 100%
  );
  background: linear-gradient(
    to bottom,
    #eaf6fd 0%,
    #d9f0fc 42%,
    #bee6fd 47%,
    #bce5fc 58%,
    #a7d9f5 100%
  );
  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#eaf6fd', endColorstr='#a7d9f5', GradientType=0);
  border: 1px solid #3c7fb1;
  box-shadow: 0 0 3px #a7d9f5;
  -o-box-shadow: 0 0 3px #a7d9f5;
  -webkit-box-shadow: 0 0 3px #a7d9f5;
  -moz-box-shadow: 0 0 3px #a7d9f5;
`;
