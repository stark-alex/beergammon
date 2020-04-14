import React, { Component, Fragment } from "react";

import Dialog from "@material-ui/core/Dialog";
import Dices3d, { DICE_TYPES } from "../Dice";

class DiceDialog extends Component {
  state = {
    open: false
  };

  componentDidUpdate(prevProps) {
    const { rollingDice } = this.props;
    if (rollingDice && rollingDice !== prevProps.rollingDice) {
      this.setState({ open: true });
      setTimeout(() => {
        this.setState({ open: false });
        this.props.onFinishRoll();
      }, 3000);
    }
  }

  render() {
    const { rollingDice } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <Dialog open={open} fullWidth>
          {/* Dice component is mounted again when dialog is open 
          cause of required dice init logic in componentDidMount */}
          {open && rollingDice && (
            <Dices3d
              dices={[
                {
                  type: DICE_TYPES.D6,
                  backColor: "red",
                  fontColor: "white",
                  value: rollingDice[0]
                },
                {
                  type: DICE_TYPES.D6,
                  backColor: "blue",
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