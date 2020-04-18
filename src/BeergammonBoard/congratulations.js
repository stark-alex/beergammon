import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

class Congratulations extends Component {
  state = {
    open: false
  };

  componentDidMount() {
    if (this.props.winner) {
      this.handleOpen();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.winner && prevProps.winner !== this.props.winner) {
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
    const { open } = this.state;
    const { winner } = this.props;

    return (
      <Dialog open={open} fullWidth onClose={this.handleClose}>
         {winner && (
            <DialogTitle>Winner</DialogTitle>
         )}
         {winner && (
            <DialogContent>
               <Grid container justify="center">
                  <CardContent>Player {winner} Wins!</CardContent>
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
   }
}

export default Congratulations;