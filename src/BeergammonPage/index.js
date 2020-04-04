import React from 'react';
 
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer'
import { Beergammon } from 'beergammon-game';
import { BeergammonBoard } from '../BeergammonBoard';

const BeergammonClient = Client({ 
   game: Beergammon,
   board: BeergammonBoard,
   multiplayer: SocketIO({ server: "http://localhost:8000" }), //`{process.env.REACT_APP_API_URL}` }),
});

const BeergammonPage = () => {
    return (<div/>);
}
 
export default BeergammonPage;