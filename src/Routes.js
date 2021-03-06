import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home';
import LobbyPage from './LobbyPage';
import BeergammonPage from './BeergammonPage'
import Error from './Error';

const Routes = () => (
   <Router>
      <Switch>
         <Route exact path="/" component={Home}/>
         <Route path="/lobby" component={LobbyPage}/>
         <Route path="/game" component={BeergammonPage}/>
         <Route path = "*" component={Error}/>
      </Switch>
   </Router>
);

export default Routes;