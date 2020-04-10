import { Client } from 'boardgame.io/react';
import { Beergammon } from 'beergammon-game';
import { BeergammonBoard } from '../BeergammonBoard';

const BeergammonPage = Client({ 
   game: Beergammon,
   board: BeergammonBoard
});

export default BeergammonPage; 