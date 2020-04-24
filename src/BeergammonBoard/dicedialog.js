import React, { Component, Fragment } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dices3d, { DICE_TYPES } from "../Dice";

class DiceDialog extends Component {
   state = {
      open: false
   };

   componentDidUpdate(prevProps) {
      // This if check should indicate that we are going from rolling dice being null to rolled.
      if (!this.state.open && this.props.dice && this.props.dice !== prevProps.dice) {
         this.setState({ open: true });
         setTimeout(() => {
            this.setState({ open: false });
            this.props.onFinishRoll();
         }, 3000);
      }
  }

   getDice() {
      let diceToRoll = []
      this.props.dice.forEach(die => {
         diceToRoll.push(
            {
               type: DICE_TYPES.D6,
               backColor: die.color,
               fontColor: "white",
               value: die.value,
            }
         )
     });
     return diceToRoll;
  }
 
  render() {
    return (
      <Fragment>
        <Dialog open={this.state.open} fullWidth>
         <DialogTitle>{this.props.title}</DialogTitle>
          {/* Dice component is mounted again when dialog is open 
          cause of required dice init logic in componentDidMount */}
          {this.state.open && this.props.dice && (
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