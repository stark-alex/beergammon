import React, { Component, Fragment } from "react";
import styled from "styled-components";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import IconAdd from "@material-ui/icons/AddCircleOutline";
import IconRefresh from "@material-ui/icons/Refresh";

import BGRoom from "../BGRoom";

export const Layout = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

class BGRooms extends Component {
  handleCreateRoomClick = () => {
    this.props.onCreate();
  };

  handleRefreshRooms = () => {
    this.props.onRefresh();
  };

  handleJoinRoomClick = (gameId, playerId) => {
    this.props.onJoin(gameId, playerId);
  };

  handleLeaveRoomClick = gameId => {
    this.props.onLeave(gameId);
  };

  handlePlayClick = (gameId, playerId, numPlayers) => {
    this.props.onPlay(gameId, playerId, numPlayers);
  };

  handleSpectateClick = (gameId, numPlayers) => {
    this.props.onPlay(gameId, numPlayers);
  };

  render() {
    const { rooms, playerName, alreadyJoined } = this.props;

    return (
      <Layout>
        <Card>
          <CardHeader
            title="All Rooms"
            subheader="Maximum 5 rooms. Rooms sync interval is 15 seconds. You can join only 1 room. Rooms are automatically deleted only after leave."
            action={
              <Fragment>
                <Tooltip title="New Room">
                  <IconButton
                    color="primary"
                    disabled={rooms.length > 4}
                    onClick={this.handleCreateRoomClick}
                  >
                    <IconAdd />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Refresh">
                  <IconButton color="primary" onClick={this.handleRefreshRooms}>
                    <IconRefresh />
                  </IconButton>
                </Tooltip>
              </Fragment>
            }
          />
          <CardContent>
            {rooms.map(room => (
              <BGRoom
                key={`game-${room.gameID}`}
                name={`Beergammon ${room.gameID.substring(0, 3)}`}
                roomId={room.gameID}
                players={room.players}
                playerName={playerName}
                alreadyJoined={alreadyJoined}
                onJoin={this.handleJoinRoomClick}
                onLeave={this.handleLeaveRoomClick}
                onPlay={this.handlePlayClick}
                onSpectate={this.handleSpectateClick}
              />
            ))}
          </CardContent>
        </Card>
      </Layout>
    );
  }
}

export default BGRooms;