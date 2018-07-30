import React, {Component, PureComponent, Fragment} from 'react';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import {toggleBottomDrawer, openBottomDrawer, closeBottomDrawer} from 'store/modules/actions/animation-actions'
import Drawer from 'components/Drawer'
import { withGesture } from 'react-with-gesture'
import { Spring, animated } from 'react-spring'
import './style.css'

class ProductFeedDrawer extends Component {
  constructor(props) {
    super(props);
    this.productFeed = React.createRef();
    this.screenHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight
    this.productFeedTop = (this.screenHeight / 2)
    this.state = {
      allow: false,
      openLegacy: false
    }
  }
  componentDidMount() {
    this.setBoundingRect()
  }

  setBoundingRect = () => this.rect = ReactDOM.findDOMNode(this.productFeed.current).getBoundingClientRect().top

  componentDidUpdate() {
    this.setBoundingRect()
    const { yDelta } = this.props
    if(this.rect < this.screenHeight - 150 && !this.props.open) this.handleOpen()
    else if (this.rect > this.screenHeight - 150 && this.props.open) this.handleClose()
  }

  handleOpen = () => this.props.dispatch(openBottomDrawer())
  handleClose = () => this.props.dispatch(closeBottomDrawer())
  // handleToggle = () => this.props.dispatch(toggleBottomDrawer())
  handleTouchStart = () => this.setState((prevState, props) => ({allow: true, openLegacy: props.open}))
  handleTouchEnd = () => this.setState((prevState, props) => ({allow: false, openLegacy: props.open}))

  render() {
    const { xDelta, down, children, x, y, yDelta, xInitial, yInitial, open, bottomDrawer } = this.props
    const { allow, openLegacy } = this.state
    const offset = openLegacy? -this.productFeedTop + 35 : 0
    return (
      <Fragment>
        <Spring
          native
          to={{ yval: down && allow? yDelta + offset : offset }}
          immediate={name => down && allow && name === 'yval'}
          >
          {
            ({ yval }) =>
            <animated.div
              className="drawer"
              style={{
                top: this.screenHeight - 35,
                transform: yval.interpolate(i =>
                  `translate3d(0px,${ -i < this.productFeedTop? i : -this.productFeedTop }px,0)`)
              }}>
              <div
                ref={this.productFeed}
                className='product-feed'
                style={{height: this.productFeedTop}}
              >
                <div
                  onTouchStart={this.handleTouchStart}
                  onTouchEnd={this.handleTouchEnd}
                  className='handle'
                  // onClick={this.handleToggle}
                >
                </div>
              </div>
            </animated.div>
          }
        </Spring>
      </Fragment>
    )
  }
}

export default connect(state => ({
  open: state.animation.bottomDrawer
}))(withGesture(ProductFeedDrawer))
