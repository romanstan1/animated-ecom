import React, { Fragment, Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Home from 'pages/Home'

export default class App extends Component {
  commponentDidMount() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
          console.log('ServiceWorker registration successful with scope');
        }, err => {
          console.log('ServiceWorker registration failed');
        }).catch(err => {
          console.log(err)
        })
      })
    } else {
      console.log('service worker is not supported');
    }
  }

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
