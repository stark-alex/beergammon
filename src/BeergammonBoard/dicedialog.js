import React, { Component, Fragment } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dices3d, { DICE_TYPES } from "../Dice";

import colors from "../colors";
import { SrcAlphaSaturateFactor } from "three";

class DiceDialog extends Component {
   state = {
      open: false
   };

   finishMove() {
      if (this.props.isActive && this.props.ctx.phase === 'rollForNumbers') {
         return this.props.moves.finishRollForNumbers();
      } else if (this.props.isActive && this.props.ctx.phase === 'startGame') {
         return  this.props.moves.finishRollForStart();
      } else if (this.props.ctx.phase === 'play') {
         return this.props.moves.finishDiceRoll();
      }
   }

   componentDidUpdate(prevProps) {
      if (this.props.G.rollingDice && this.props.G.rollingDice !== prevProps.G.rollingDice) {
         this.setState({ open: true });
         setTimeout(() => {
            this.setState({ open: false });
            this.finishMove();
         }, 3000);
      }
  }

   getPhaseTitle() {
      if (this.props.ctx.phase === "rollForNumbers") {
         return "Rolling for Numbers";
      } else if (this.props.ctx.phase === "startGame") {
         return "Rolling for Start";
      } else {
         return "Player Rolling"; // TODO: put name in here.
      }
   }

   getDice() {
      let dice = [];

      if (this.props.ctx.phase === "rollForNumbers") {
         if (this.props.G.rollingDice.length === 4) {
            dice.push(
               {
                  type: DICE_TYPES.D6,
                  backColor: colors["0"],
                  fontColor: "white",
                  value: this.props.G.rollingDice[0]
               });
            dice.push(
               {
                  type: DICE_TYPES.D6,
                  backColor: colors["0"],
                  fontColor: "white",
                  value: this.props.G.rollingDice[1]
               });
            dice.push(
               {
                  type: DICE_TYPES.D6,
                  backColor: colors["1"],
                  fontColor: "white",
                  value: this.props.G.rollingDice[2]
               });
            dice.push(
               {
                  type: DICE_TYPES.D6,
                  backColor: colors["1"],
                  fontColor: "white",
                  value: this.props.G.rollingDice[3]
               });
         } else {
            // If only 2 dice figure out who's still looking for a number.
            let rollingPlayer = this.props.G.numbers[0] === null ? "0" : "1";
            dice.push(
               {
                  type: DICE_TYPES.D6,
                  backColor: colors[rollingPlayer],
                  fontColor: "white",
                  value: this.props.G.rollingDice[0]
               });
            dice.push(
               {
                  type: DICE_TYPES.D6,
                  backColor: colors[rollingPlayer],
                  fontColor: "white",
                  value: this.props.G.rollingDice[1]
               });
         }

      } else if (this.props.ctx.phase === "startGame") {
         dice.push(
            {
               type: DICE_TYPES.D6,
               backColor: colors["0"],
               fontColor: "white",
               value: this.props.G.rollingDice[0]
            });
         dice.push(
            {
               type: DICE_TYPES.D6,
               backColor: colors["1"],
               fontColor: "white",
               value: this.props.G.rollingDice[1]
            });
      } else if (this.props.ctx.phase === "play") {
         dice.push(
            {
               type: DICE_TYPES.D6,
               backColor: colors[this.props.ctx.currentPlayer],
               fontColor: "white",
               value: this.props.G.rollingDice[0]
            });
         dice.push(
            {
               type: DICE_TYPES.D6,
               backColor: colors[this.props.ctx.currentPlayer],
               fontColor: "white",
               value: this.props.G.rollingDice[1]
            });
      }
      return dice;
  }

  render() {
    return (
      <Fragment>
        <Dialog open={this.state.open} fullWidth>
         <DialogTitle >{this.getPhaseTitle()}</DialogTitle>
          {/* Dice component is mounted again when dialog is open 
          cause of required dice init logic in componentDidMount */}
          {this.state.open && this.props.G.rollingDice && (
            <Dices3d
              dices={this.getDice()}
            />
          )}
        </Dialog>
      </Fragment>
    );
  }
}
export default DiceDialog;