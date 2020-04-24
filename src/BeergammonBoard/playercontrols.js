import React from "react";

import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import { Container, Item } from "../Grid";

import colors from "../colors";
import DiceDialog from "./dicedialog";
import AceyDeuceyDialog from "./aceydeuceydialog";
import Player from "./player";
import Drink from "./drink";

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

   handleStartDiceRoll = () => {
      this.props.moves.startDiceRoll();
   };

   handleOverrideStartDiceRoll = () => {
      this.props.moves.startOverrideDiceRoll();
   };

   getDiceString() {
      return this.props.G.dice.includes(12) ? "Acey Deucey!" : this.props.G.dice.filter(Boolean).join(", ")
   }

   getDice() {
      let dice = [];

      if (this.props.G.rollingDice) {
         if (this.props.ctx.phase === "rollForNumbers") {
            if (this.props.G.rollingDice.length === 4) {
               dice.push(
                  {
                     color: colors["0"],
                     value: this.props.G.rollingDice[0]
                  });
               dice.push(
                  {
                     color: colors["0"],
                     value: this.props.G.rollingDice[1]
                  });
               dice.push(
                  {
                     color: colors["1"],
                     value: this.props.G.rollingDice[2]
                  });
               dice.push(
                  {
                     color: colors["1"],
                     value: this.props.G.rollingDice[3]
                  });
            } else {
               // If only 2 dice figure out who's still looking for a number.
               let rollingPlayer = this.props.G.numbers[0] === null ? "0" : "1";
               dice.push(
                  {
                     color: colors[rollingPlayer],
                     value: this.props.G.rollingDice[0]
                  });
               dice.push(
                  {
                     color: colors[rollingPlayer],
                     value: this.props.G.rollingDice[1]
                  });
            }

         } else if (this.props.ctx.phase === "startGame") {
            dice.push(
               {
                  color: colors["0"],
                  value: this.props.G.rollingDice[0]
               });
            dice.push(
               {
                  color: colors["1"],
                  value: this.props.G.rollingDice[1]
               });
         } else if (this.props.ctx.phase === "play") {
            dice.push(
               {
                  color: colors[this.props.ctx.currentPlayer],
                  value: this.props.G.rollingDice[0]
               });
            dice.push(
               {
                  color: colors[this.props.ctx.currentPlayer],
                  value: this.props.G.rollingDice[1]
               });
         }
         return dice;
      } else {
         return null;
      }
   }

   getPhaseString() {
      if (this.props.ctx.phase === "rollForNumbers") {
         return "Rolling for Numbers";
      } else if (this.props.ctx.phase === "startGame") {
         return "Rolling for Start";
      } else {
         return "Rolling";
      }
   }

   handleFinishRoll = () => {
      // Need to check is active, because this is initiated off a timer, not by the user.
      if (this.props.isActive && this.props.ctx.phase === 'rollForNumbers') {
         return this.props.moves.finishRollForNumbers();
      } else if (this.props.isActive && this.props.ctx.phase === 'startGame') {
         return  this.props.moves.finishRollForStart();
      } else if (this.props.isActive && this.props.ctx.phase === 'play') {
         return this.props.moves.finishDiceRoll();
      }
   }

   handleAceyDeucy = (number) => {
      this.props.moves.resolveAceyDeucey(number);
   }

   // Player state (TODO: remove?)
   getPlayerStateString(player) {
      if (this.props.G.playerState[player] === 1) {
         return "Playing";
      } else if (this.props.G.playerState[player] === 2) {
         return "On Pokey";
      } else if (this.props.G.playerState[player] === 3) {
         return "Moving In";
      }

      return "Huh?";
   }

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
      state={this.getPlayerStateString(0)}
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
         <DiceDialog
         dice={this.getDice()}
         title={this.getPhaseString()}
         onFinishRoll={this.handleFinishRoll}
          />
         <AceyDeuceyDialog
         aceyDeuceyRolled={this.props.isActive && this.props.ctx.phase === 'play' && this.props.G.dice.includes(12)}
         onResolveAceyDeucey={this.handleAceyDeucy}
         />
         <Drink {...this.props} />
      </div>
   </Item>
   <Item>
      <Player
      player="1"
      dice={this.props.ctx.currentPlayer === "1" ? this.getDiceString() : ""}
      number={this.props.G.numbers[1]}
      state={this.getPlayerStateString(1)}
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