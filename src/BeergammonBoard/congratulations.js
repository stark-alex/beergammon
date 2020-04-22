import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import PlayersNamesContext from "./playersNamesContext";

class Congratulations extends Component {
  state = {
    open: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.ctx.gameover && !prevProps.ctx.gameover) {
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

  render() {
      return (
         <PlayersNamesContext.Consumer>
            {playersNames => {
               const playerName = this.props.ctx.gameover && playersNames[this.props.ctx.gameover.winner];
               return (
                  <Dialog open={this.state.open} fullWidth onClose={this.handleClose}>
                     {this.props.ctx.gameover && (
                        <DialogTitle>Winner</DialogTitle>
                     )}
                     {this.props.ctx.gameover && (
                        <DialogContent>
                           <Grid container justify="center">
                              <CardContent>{playerName} Wins!</CardContent>
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