import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Player from "./player";

class Congratulations extends Component {
  state = {
    open: false
  };

  componentDidMount() {
    if (this.props.gameover) {
      this.handleOpen();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.gameover && prevProps.gameover !== this.props.gameover) {
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
    const { gameover } = this.props;

    return (
      <Dialog open={open} fullWidth onClose={this.handleClose}>
         {gameover && (
            <DialogTitle>Winner</DialogTitle>
         )}
         {gameover && (
            <DialogContent>
               <Player player={gameover.winner} />
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