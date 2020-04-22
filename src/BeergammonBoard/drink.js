import React, { Component } from "react";
import axios from "axios";
import { withSnackbar } from 'notistack';

import { DrinkReason } from "beergammon-game/constants";

class Drink extends Component {

   state = {
      isLoadingNames: false,
      playersNames: {
        0: "Fred",
        1: "George"
      }
   };

   handleDrink = () => {
      this.props.moves.startDiceRoll();
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

   componentDidUpdate(prevProps) {
      if (this.props.G.drinks !== prevProps.G.drinks) {
         this.props.G.drinks.forEach(function(drink) {
            if (!drink.notified) {
               let msg =  ' ';

               switch (drink.reason) {
                  case DrinkReason.SOCIAL:
                     msg = "Social!";
                    break;
                  case DrinkReason.NUMBER:
                     msg = this.state.playersNames[drink.player] + " drink for your number.";
                     break;
                  case DrinkReason.DOUBLES:
                     msg = this.state.playersNames[drink.player] + " drink for doubles."
                     break;
                  case DrinkReason.CANT_MOVE:
                     msg = this.state.playersNames[drink.player] + " drink " + drink.count + " because you can't move."
                     break;
                  }

               this.props.enqueueSnackbar(msg);
               this.props.moves.markDrinkNotified(drink.id);
            }
         }.bind(this));
      }
   }

  render() {
    return ( <div /> );
   }
}

export default withSnackbar(Drink);