import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import LineChart from 'react-linechart';

import colors from '../colors';
import PlayersNamesContext from "./playersNamesContext";

class Congratulations extends Component {
  state = {
    open: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.gameover && !prevProps.gameover) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleGoHome = () => {
    window.open(`${process.env.PUBLIC_URL}/`, "_self");
  };

  generateGraphData = (playerNames) => {
   // Add up all the drinks per turn per player.
   let drinksPerTurn = [ [], [] ];
   this.props.drinks.forEach(drink => {
      if (!drinksPerTurn[drink.player][drink.turn]) {
         drinksPerTurn[drink.player][drink.turn] = 0;
      }
      drinksPerTurn[drink.player][drink.turn] += drink.count;
   });

   // Build up the graph points based on drinks per turn.
   let accumulatedDrinks = [ [ {x: 0, y: 0} ], [ {x: 0, y: 0} ] ]
   for (let turn = 1; turn < this.props.turn_cnt; turn++) {
      for (let player = 0; player <= 1; player++) {
         let drinksThisTurn = drinksPerTurn[player][turn] ? drinksPerTurn[player][turn] : 0;
         accumulatedDrinks[player][turn] = {
            x: turn, 
            y: accumulatedDrinks[player][turn-1].y + drinksThisTurn,
         }
      }
   }

   // combine data with chart info
   return [
      {
         name: playerNames[0],
         color: colors["0"],
         points: accumulatedDrinks[0],
      },
      {
         name: playerNames[1],
         color: colors["1"],
         points: accumulatedDrinks[1],
      },
   ];
}

  render() {
      return (
         <PlayersNamesContext.Consumer>
            {playersNames => {
               const playerName = this.props.gameover && playersNames[this.props.gameover.winner];

               const data = this.generateGraphData(playersNames);

               return (
                  <Dialog open={this.state.open} fullWidth onClose={this.handleClose}>
                     {this.props.gameover && (
                        <DialogTitle>Winner</DialogTitle>
                     )}
                     {this.props.gameover && (
                        <DialogContent>
                           <Grid container justify="center">
                              <CardContent>{playerName} Wins!</CardContent>
                              <LineChart 
                                 width={600}
                                 height={400}
                                 xLabel="Turns"
                                 yLabel="Drinks"
                                 showLegends
                                 hidePoints
                                 data={data}
                              />
                           </Grid>
                        </DialogContent>
                     )}
                     <DialogActions>
                        <Button
                           variant="contained"
                           color="primary"
                           onClick={this.handleClose}>ok</Button>
                     </DialogActions>
                  </Dialog>
               );
            }}
         </PlayersNamesContext.Consumer>
     );
  }
}

export default Congratulations;