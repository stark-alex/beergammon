import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import PlayersNamesContext from "./playersNamesContext";

export const DetachedCard = styled(Card)`
  && {
    margin-right: 8px;
    margin-left: 8px;
  }
`;

export const StyledAvatar = styled(Avatar)`
  && {
    background-color: ${props =>
      props.player === "0"
        ? props.theme.colors.player1
        : props.theme.colors.player2};
  }
`;

const Player = ({
  player
}) => (
  <PlayersNamesContext.Consumer>
    {playersNames => {
      const playerName = player && playersNames[player];
      return (
        <DetachedCard>
          <CardHeader
            avatar={
              <StyledAvatar player={player}>
                {playerName && playerName.charAt(0)}
              </StyledAvatar>
            }
            title={playerName}
          />
        </DetachedCard>
      );
    }}
  </PlayersNamesContext.Consumer>
);

export default Player;