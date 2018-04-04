import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import Home from 'views/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={ routeCodes.HOME } component={ Home } />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);
