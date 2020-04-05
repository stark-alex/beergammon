import React from "react";
import { Lobby } from "boardgame.io/react";

import BGLobby from "../BGLobby";
import { Beergammon } from 'beergammon-game';
import { BeergammonBoard } from '../BeergammonBoard';

const LobbyPage = () => (
  <Lobby
    gameServer="https://beergammon-server.herokuapp.com" //{process.env.REACT_APP_API_URL}
    lobbyServer="https://beergammon-server.herokuapp.com" //{process.env.REACT_APP_API_URL}
    gameComponents={[
      {
        game: Beergammon,
        board: BeergammonBoard,
        loading: () => <div>Connecting...</div>
      }
    ]}
    renderer={({
      errorMsg,
      gameComponents,
      rooms,
      phase,
      playerName,
      runningGame,
      handleEnterLobby,
      handleExitLobby,
      handleCreateRoom,
      handleJoinRoom,
      handleLeaveRoom,
      handleExitRoom,
      handleRefreshRooms,
      handleStartGame
    }) => (
      <BGLobby
        errorMsg={errorMsg}
        gameComponents={gameComponents}
        rooms={rooms}
        phase={phase}
        playerName={playerName}
        runningGame={runningGame}
        onEnterLobby={handleEnterLobby}
        onExitLobby={handleExitLobby}
        onCreateRoom={handleCreateRoom}
        onJoinRoom={handleJoinRoom}
        onLeaveRoom={handleLeaveRoom}
        onExitRoom={handleExitRoom}
        onRefreshRooms={handleRefreshRooms}
        onStartGame={handleStartGame}
      />
    )}
  />
);

export default LobbyPage;