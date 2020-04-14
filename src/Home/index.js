import React from 'react';

import { Container, Item } from "../Grid";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Fab from "@material-ui/core/Fab";

import PlayIcon from "@material-ui/icons/CasinoOutlined";

const Button = styled(Fab)`
  && {
    margin: 24px;
  }
`;

export const ButtonText = styled.span`
  margin: 0 4px;
`;

const HomePage = () => (
   <Container column center alignItems="center">
      <Item>
         <Button variant="extended" color="primary" component={Link} to="/lobby">
            <PlayIcon />
            <ButtonText>Start Game</ButtonText>
         </Button>
         <Button variant="extended" color="primary" component={Link} to="/game">
            <PlayIcon />
            <ButtonText>Start Local Game</ButtonText>
         </Button>
      </Item>
   </Container>
)
 
export default HomePage;