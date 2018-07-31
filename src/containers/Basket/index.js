import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import TopDrawer from './TopDrawer'
import './style.css'

class Basket extends Component {

  render() {
    return (
      <Fragment>
        <TopDrawer> Top Drawer Basket Content</TopDrawer>
      </Fragment>
    )
  }
}

export default connect()(Basket)
