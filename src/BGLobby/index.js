import React, { Component, Fragment } from "react";

import Error from "../Error";
import LobbyLogin from "../LobbyLogin";
import BGRooms from "../BGRooms";
import LobbyExit from "../LobbyExit";

const selectGameName = props => props.gameComponents[0].game.name;
const selectAllPlayersNames = props => {
  const playersNames = [];

  if (!Array.isArray(props.rooms)) {
    return playersNames;
  }

  props.rooms.forEach(room => {
    room.players.forEach(player => {
      if (player.name) {
        playersNames.push(player.name);
      }
    });
  });

  return playersNames;
};

class BGLobby extends Component {
  componentDidMount() {
    // Refresh all rooms every 15 seconds
    setInterval(this.handleRefreshRoomsClick, 15000);
  }

  handleLoginClick = name => {
    this.props.onEnterLobby(name);
  };

  handleLogoutClick = () => {
    const { rooms, playerName } = this.props;
    const currentPlayerGames = rooms.filter(room =>
      room.players.some(player => player.name === playerName)
    );
    currentPlayerGames.forEach(game => this.handleLeaveRoomClick(game.gameID));
    this.props.onExitLobby();
  };

  handleCreateRoomClick = () => {
    this.props.onCreateRoom(selectGameName(this.props), 2);
  };

  handleRefreshRoomsClick = () => {
    this.props.onRefreshRooms();
  };

  handleJoinRoomClick = (gameId, playerId) => {
    this.props.onJoinRoom(selectGameName(this.props), gameId, playerId);
  };

  handleLeaveRoomClick = gameId => {
    this.props.onLeaveRoom(selectGameName(this.props), gameId);
  };

  handlePlayClick = (gameId, playerId, numPlayers) => {
    this.props.onStartGame(selectGameName(this.props), {
      gameID: gameId,
      playerID: playerId,
      numPlayers
    });
  };

  handleSpectateClick = (gameId, numPlayers) => {
    this.props.onStartGame(selectGameName(this.props), {
      gameID: gameId,
      numPlayers
    });
  };

  handleExitRoomClick = () => {
    this.props.onExitRoom();
  };

  render() {
    const {
      errorMsg,
      phase,
      playerName,
      rooms,
      runningGame
    } = this.props;

    if (errorMsg) {
      return (
        <Error>
          Error: {errorMsg}
        </Error>
      );
    }

    if (phase === "enter") {
      return (
        <LobbyLogin
          playerName={playerName}
          playersNames={selectAllPlayersNames(this.props)}
          onLogin={this.handleLoginClick}
        />
      );
    }

    if (phase === "list") {
      return (
        <Fragment>
          <LobbyExit
            exitButtonLabel="Logout"
            playerName={playerName}
            onExit={this.handleLogoutClick}
          />
          <BGRooms
            rooms={rooms}
            playerName={playerName}
            alreadyJoined={selectAllPlayersNames(this.props).includes(
              playerName
            )}
            onCreate={this.handleCreateRoomClick}
            onRefresh={this.handleRefreshRoomsClick}
            onJoin={this.handleJoinRoomClick}
            onLeave={this.handleLeaveRoomClick}
            onPlay={this.handlePlayClick}
            onSpectate={this.handleSpectateClick}
            onLogout={this.handleLogoutClick}
          />
        </Fragment>
      );
    }

    if (phase === "play") {
      return (
        <Fragment>
          <LobbyExit
            exitButtonLabel="Exit"
            playerName={playerName}
            onExit={this.handleExitRoomClick}
          />
          {runningGame && (
            <runningGame.app
              gameID={runningGame.gameID}
              playerID={runningGame.playerID}
              credentials={runningGame.credentials}
            />
          )}
        </Fragment>
      );
    }

    return "Phase is unknown...";
  }
}

export default BGLobby;