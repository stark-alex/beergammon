import React, { Component } from "react";

import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import IconVersus from "@material-ui/icons/SyncAlt";
import {
  AlignCenterItem,
  AlignLeftItem,
  AlignRightItem,
  DetachedButton,
  DetachedContainer
} from "./elements";

const findPlayerSeat = (players, playerName) =>
  players.find(player => player.name === playerName);
const findFreeSeat = players => players.find(player => !player.name);

class StyledRoom extends Component {
  handleJoinClick = () => {
    const { roomId, players } = this.props;
    this.props.onJoin(roomId, findFreeSeat(players).id);
  };

  handleLeaveClick = () => {
    this.props.onLeave(this.props.roomId);
  };

  handlePlayClick = () => {
    const { roomId, players, playerName } = this.props;
    this.props.onPlay(
      roomId,
      `${findPlayerSeat(players, playerName).id}`,
      players.length
    );
  };

  handleSpectateClick = () => {
    const { roomId, players } = this.props;
    this.props.onSpectate(roomId, players.length);
  };

  render() {
    const { name, playerName, players, alreadyJoined } = this.props;
    const playerSeat = findPlayerSeat(players, playerName);
    const freeSeat = findFreeSeat(players);

    return (
      <DetachedContainer alignItems="center">
        <AlignLeftItem flex={3}>
          <Chip label={name} />
        </AlignLeftItem>
        <AlignRightItem flex={2}>{players[0].name || "..."}</AlignRightItem>
        <AlignCenterItem flex={2}>
          <IconButton disabled>
            <IconVersus />
          </IconButton>
        </AlignCenterItem>
        <AlignLeftItem flex={2}>{players[1].name || "..."}</AlignLeftItem>
        <AlignRightItem flex={3}>
          {playerSeat && (
            <DetachedButton variant="outlined" onClick={this.handleLeaveClick}>
              Leave
            </DetachedButton>
          )}
          {freeSeat && !playerSeat && !alreadyJoined && (
            <DetachedButton variant="outlined" onClick={this.handleJoinClick}>
              Join
            </DetachedButton>
          )}
          {!freeSeat && playerSeat && (
            <DetachedButton variant="outlined" onClick={this.handlePlayClick}>
              Play
            </DetachedButton>
          )}
          {!freeSeat && !playerSeat && (
            <DetachedButton
              variant="outlined"
              onClick={this.handleSpectateClick}
            >
             Spectate
            </DetachedButton>
          )}
        </AlignRightItem>
      </DetachedContainer>
    );
  }
}

export default StyledRoom;