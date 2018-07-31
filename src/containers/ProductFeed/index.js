import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import BottomDrawer from './BottomDrawer'
import './style.css'

class ProductFeedDrawer extends Component {

  render() {
    return (
      <Fragment>
        <BottomDrawer> ProductFeedDrawer content </BottomDrawer>
      </Fragment>
    )
  }
}

export default connect()(ProductFeedDrawer)
