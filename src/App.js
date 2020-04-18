//import React from 'react';
import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import Routes from './Routes';
import colors from './colors';

import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

const theme = {
   colors: {
      player1: colors["0"],
      player2: colors["1"],
      white: "#FFFFFF",
      background: colors["background"],
   }
};

const muiTheme = createMuiTheme({
   palette: {
      primary: {
         main: theme.colors.player1,
         contrastText: theme.colors.white,
      },
      secondary: {
         main: theme.colors.player2,
         contrastText: theme.colors.white,
      }
   }
});

export const Logo = styled.span`
  flex-grow: 1;
  text-transform: uppercase;
  :hover {
    cursor: pointer;
  }
`;

export const Title = styled.span`
  flex-grow: 1;
  text-transform: uppercase;
  :hover {
    cursor: pointer;
  }
`;

export const FixedAppBarMargin = styled.div`
  /* Top margin from fixed app bar */
  margin-top: 80px;
`;

class App extends Component {
   render() {
      return (
         <div>
            <MuiThemeProvider theme={muiTheme}>
               <ThemeProvider theme={theme}>
                  <div>
                     <AppBar>
                        <Toolbar>
                           <Logo>Beergammon (beta)</Logo>
                        </Toolbar>
                     </AppBar>
                  </div>
                  <FixedAppBarMargin>{this.props.children}</FixedAppBarMargin>
                  <Routes />
               </ThemeProvider>
            </MuiThemeProvider>
       </div> 
    );
  }
}
 
export default App;
