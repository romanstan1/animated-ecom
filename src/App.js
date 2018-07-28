import React, { Fragment, Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Home from 'pages/Home'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route component={Home}/>
        </Switch>
      </Fragment>
    )
  }
}
