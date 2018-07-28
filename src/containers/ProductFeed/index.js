import React, {Component, PureComponent, Fragment} from 'react';
import {connect} from 'react-redux'
import {toggleBottomDrawer} from 'store/modules/actions/animation-actions'
import Drawer from 'components/Drawer'
import './style.css'


class ProductFeed extends Component {

  handleClick = () => this.props.dispatch(toggleBottomDrawer())

  render() {
    const {bottomDrawer} = this.props
    return (
      <Drawer open={bottomDrawer}>
        <div onClick={this.handleClick} className='product-feed'>
          ProductFeed Content
        </div>
      </Drawer>
    )
  }
}

export default connect(state => ({
  bottomDrawer: state.animation.bottomDrawer
}))(ProductFeed)
