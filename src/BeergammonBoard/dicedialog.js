import React, { Component, Fragment } from "react";

import Dialog from "@material-ui/core/Dialog";
import Dices3d, { DICE_TYPES } from "../Dice";

class DiceDialog extends Component {
  state = {
    open: false
  };

  componentDidUpdate(prevProps) {
    const { rollingDice } = this.props.G;
    if (rollingDice && rollingDice !== prevProps.G.rollingDice) {
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false });
        this.props.moves.finishDiceRoll();
      }, 3000);
    }
  }

  getDiceColor() {
     if (this.props.ctx.currentPlayer === "0") {
        return "#375E97";
     } else {
        return "#FB6542";
     }
  }

  render() {
    const { rollingDice } = this.props.G;
    const { open } = this.state;

    return (
      <Fragment>
        <Dialog open={open} fullWidth>
          {/* Dice component is mounted again when dialog is open 
          cause of required dice init logic in componentDidMount */}
          {open && this.props.G.rollingDice && (
            <Dices3d
              dices={[
                {
                  type: DICE_TYPES.D6,
                  backColor: this.getDiceColor(),
                  fontColor: "white",
                  value: rollingDice[0]
                },
                {
                  type: DICE_TYPES.D6,
                  backColor: this.getDiceColor(),
                  fontColor: "white",
                  value: rollingDice[1]
                }
              ]}
            />
          )}
        </Dialog>
      </Fragment>
    );
  }
}
export default DiceDialog;