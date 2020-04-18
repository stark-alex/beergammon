import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

class AceyDeuceyDialog extends Component {
   state = {
      open: false
   };

   numbers = [1, 2, 3, 4, 5, 6];

   componentDidUpdate(prevProps) {
      if (!this.state.open && this.props.isActive && this.props.ctx.phase === 'play' && this.props.G.dice.includes(12)) {
         this.setState({ open: true });
      }
   }

   PaperComponent(props) {
      return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
          <Paper {...props} />
        </Draggable>
      );
    }

   handleListItemClick = (number) => {
      this.setState({ open: false });
      this.props.moves.resolveAceyDeucey(number);
   }

   render() {
      return (
         <Dialog aria-labelledby="title" open={this.state.open} PaperComponent={this.PaperComponent}>
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Acey Deucey!</DialogTitle>
            <List>
               {this.numbers.map((number) => (
                  <ListItem button onClick={() => this.handleListItemClick(number)} key={number}>
                     <ListItemText primary={number} />
                  </ListItem>
               ))}
            </List>
         </Dialog>
      );
   }
}

export default AceyDeuceyDialog;
