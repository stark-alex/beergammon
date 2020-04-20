import React from 'react';
import styled from "styled-components";
import axios from "axios";

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
        0: "Fred",
        1: "George"
      }
   };

   componentDidMount() {
      // No names to load from the server if not in muti-player mode.
      if (!this.props.isMultiplayer || !this.props.gameID) {
        return;
      }

      this.setState({ isLoadingNames: true });
      axios
        .get(`${process.env.REACT_APP_API_URL}/games/beergammon`)
        .then(response => {
          const room =
            response.data &&
            response.data.rooms.find(
              room => room.gameID === this.props.gameID
            );
          if (!room) {
            return;
          }
          this.setState({
            playersNames: room.players.reduce((object, player) => {
              object[`${player.id}`] = player.name;
              return object;
            }, {})
          });
        })
        .finally(() => this.setState({ isLoadingNames: false }));
    }

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
            </Container>
         </PlayersNamesContext.Provider>
      )
   }
}