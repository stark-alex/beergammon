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

   getButtonAction() {
      if (this.props.isActive && this.props.ctx.phase === 'rollForNumbers') {
         return this.props.moves.rollForNumbers;
      } else if (this.props.isActive && this.props.ctx.phase === 'startGame') {
         return  this.props.moves.rollForStart;
      } else if (this.props.ctx.phase === 'play') {
         return this.props.moves.startDiceRoll;
      }
   }
   
   getButtonText() {
      if (this.props.isActive && this.props.ctx.phase === 'rollForNumbers') {
         return "Roll for Numbers";
      } else if (this.props.isActive && this.props.ctx.phase === 'startGame') {
         return "Roll for Start";
      } else if (this.props.ctx.phase === 'play') {
         return "Roll Dice";
      }
   }

   render() {
      return (
<Container>
   <Item>
      <Player
      player="0"
      isCurrent={"0" === this.props.ctx.currentPlayer}
      />
   </Item>
   <Item center>
      <div>
         <FullHeightContainer column center alignItems="center">
            <Button
            disabled={!this.props.isActive}
            color={ "0" === this.props.ctx.currentPlayer ? "primary" : "secondary" }
            size="large"
            variant="contained"
            onClick={this.getButtonAction()}
            >
               {this.getButtonText()}
            </Button>
         </FullHeightContainer>
         <DiceDialog {...this.props} />
      </div>
   </Item>
   <Item>
      <Player
      player="1"
      isCurrent={"1" === this.props.ctx.currentPlayer}
      />
   </Item>
</Container>
      )
   }
}

export default PlayersControls;