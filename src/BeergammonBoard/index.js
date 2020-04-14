import React from 'react';
import styled from "styled-components";

import PlayersControls from './playercontrols';
import PlayersNamesContext from './playersNamesContext'
import Congratulations from './congratulations'
import { Board } from './board';

import { Container, Item } from '../Grid';

export const DetachedItem = styled(Item)`
  /* Bottom margin from board */
  margin-bottom: 24px;
`;

React.createContext("players-names");

export class BeergammonBoard extends React.Component {

   state = {
      isLoadingNames: false,
      playersNames: {
        0: "Player 1",
        1: "Player 2"
      }
    };

   render() {
      return (
         <PlayersNamesContext.Provider value={this.state.playersNames}>
            <Container column>
               <DetachedItem center>
                  <PlayersControls {...this.props} />
               </DetachedItem>
               <Item center>
                  <Board {...this.props} />
               </Item>
               <Congratulations
                  winner={this.props.ctx.winner}
               />
            </Container>
         </PlayersNamesContext.Provider>
      )
   }
}