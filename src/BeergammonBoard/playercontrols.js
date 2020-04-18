import React from "react";

import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import { Container, Item } from "../Grid";

import DiceDialog from "./dicedialog";
import AceyDeuceyDialog from "./aceydeuceydialog";
import Player from "./player";

const Button = styled(Fab)`
  && {
    margin: 24px;
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

   getDiceString() {
      return this.props.G.dice.includes(12) ? "Acey Deucey!" : this.props.G.dice.filter(Boolean).join(", ")
   }

   handleStartDiceRoll = () => {
      this.props.moves.startDiceRoll();
   };

   handleOverrideStartDiceRoll = () => {
      this.props.moves.startOverrideDiceRoll();
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
      dice={this.props.ctx.currentPlayer === "0" ? this.getDiceString() : ""}
      number={this.props.G.numbers[0]}
      />
   </Item>
   <Item center>
      <div>
         <FullHeightContainer column center alignItems="center">
            <Item>
               <Button
               disabled={!this.props.isActive || this.props.G.dice.length !== 0}
               color={ "0" === this.props.ctx.currentPlayer ? "primary" : "secondary" }
               size="large"
               variant="extended"
               onClick={this.handleStartDiceRoll}
               >
                  Roll Dice
               </Button>
            </Item>
            {/* button for debugging
            <Item>
               <Button
               disabled={!this.props.isActive || this.props.G.dice.length !== 0}
               color={ "0" === this.props.ctx.currentPlayer ? "primary" : "secondary" }
               size="large"
               variant="extended"
               onClick={this.handleOverrideStartDiceRoll}
               >
                  Roll Override
               </Button>
            </Item>
            */}
         </FullHeightContainer>
         <DiceDialog {...this.props} />
         <AceyDeuceyDialog {...this.props} />
      </div>
   </Item>
   <Item>
      <Player
      player="1"
      dice={this.props.ctx.currentPlayer === "1" ? this.getDiceString() : ""}
      number={this.props.G.numbers[1]}
      />
   </Item>
   <Item>
      <Card>
         <CardHeader title="Socials" />
         <Grid container justify="center">
            <CardContent>{this.props.G.socials.filter(Boolean).join(", ")}</CardContent>
         </Grid>
      </Card>
   </Item>
</Container>
      )
   }
}

export default PlayersControls;