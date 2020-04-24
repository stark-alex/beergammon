import React, { Component } from "react";
import { withSnackbar } from 'notistack';

import { DrinkReason } from "beergammon-game/constants";

class Drink extends Component {

   state = {
      isLoadingNames: false,
   };

   notifiedDrinks = [];

   componentDidUpdate(prevProps) {
      if (this.props.drinks !== prevProps.drinks) {
         this.props.drinks.forEach(function(drink) {
            if (!this.notifiedDrinks.includes(drink.id)) {
               let msg =  ' ';

               switch (drink.reason) {
                  case DrinkReason.SOCIAL:
                     msg = "Social!";
                    break;
                  case DrinkReason.NUMBER:
                     msg = this.props.playersNames[drink.player] + ", drink for your number.";
                     break;
                  case DrinkReason.DOUBLES:
                     msg = this.props.playersNames[drink.player] + ", drink for doubles.";
                     break;
                  case DrinkReason.CANT_MOVE:
                     msg = this.props.playersNames[drink.player] + ", drink " + drink.count + " because you can't move.";
                     break;
                  default:
                     msg = "You shouldn't see this, everyone drink!";
                     break;
                  }
               this.props.enqueueSnackbar(msg);
               this.notifiedDrinks.push(drink.id);
            }
         }.bind(this));
      }
   }

  render() {
    return ( <div/> );
   }
}

export default withSnackbar(Drink);