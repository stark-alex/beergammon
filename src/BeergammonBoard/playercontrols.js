import React from "react";

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Container, Item } from "../Grid";

import DiceDialog from "./dicedialog";
import Player from "./player";


export const FixedSizePaper = styled(Paper)`
  && {
    height: ${props => props.height};
    width: ${props => props.width};
  }
`;

export const FullHeightContainer = styled(Container)`
  height: 100%;
`;

class PlayersControls extends React.Component {
   state = {
      rollForNumbersStarted: false,
      rollForStartStarted: false,
   };

   handleStartDiceRoll = () => {
      this.props.moves.startDiceRoll();
    };

   render() {
      if (!this.rollForNumbersStarted && this.props.ctx.phase === 'rollForNumbers' && this.props.G.rollingDice === null) {
         this.props.moves.startRollForNumbers();
         this.rollForNumbersStarted = true;
      } else if (!this.rollForStartStarted && this.props.isActive && this.props.ctx.phase === 'startGame' && this.props.G.rollingDice === null) {
         this.props.moves.startRollForStart();
         this.rollForStartStarted = true;
      }

      return (
<Container>
   <Item>
      <Player
      player="0"
      dice={this.props.ctx.currentPlayer === "0" ? this.props.G.dice.filter(Boolean).join(", ") : ""}
      number={this.props.G.numbers[0]}
      />
   </Item>
   <Item center>
      <div>
         <FullHeightContainer column center alignItems="center">
            <Button
            disabled={!this.props.isActive || this.props.G.dice.length !== 0}
            color={ "0" === this.props.ctx.currentPlayer ? "primary" : "secondary" }
            size="large"
            variant="contained"
            onClick={this.handleStartDiceRoll}
            >
               Roll Dice
            </Button>
         </FullHeightContainer>
         <DiceDialog {...this.props} />
      </div>
   </Item>
   <Item>
      <Player
      player="1"
      dice={this.props.ctx.currentPlayer === "1" ? this.props.G.dice.filter(Boolean).join(", ") : ""}
      number={this.props.G.numbers[1]}
      />
   </Item>
</Container>
      )
   }
}

export default PlayersControls;