import React from "react";
import styled from "styled-components";
import { Container, Item } from "../Grid";
import IconButton from "@material-ui/core/IconButton";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";

export const Layout = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const LobbyExit = ({ exitButtonLabel, playerName, onExit }) => (
  <Layout>
    <Container alignItems="center" spaceBetween>
      <Item>
        <h2>Hello, {playerName}</h2>
      </Item>
      <Item>
        <Tooltip title={exitButtonLabel}>
          <IconButton onClick={onExit}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Item>
    </Container>
  </Layout>
);

export default LobbyExit;