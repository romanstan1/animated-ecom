import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import {openBottomDrawer, closeBottomDrawer} from 'store/modules/actions/animation-actions'
import { withGesture } from 'react-with-gesture'
import { Spring, animated } from 'react-spring'
import './style.css'

class BottomDrawer extends Component {
  constructor(props) {
    super(props);
    this.productFeed = React.createRef();
    this.getScreenHeight()
    this.state = {
      allow: false,
      openLegacy: false
    }
    window.addEventListener("resize", () => {
      this.getScreenHeight()
      this.forceUpdate()
    }, true);
  }

  getScreenHeight = () => {
    this.screenHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight

    this.productFeedTop = (this.screenHeight / 2)
  }
  componentDidMount() {
    this.setBoundingRect()
  }

  componentDidUpdate() {
    this.setBoundingRect()
    const { yDelta, open } = this.props
    if(this.rect < this.screenHeight - 100 && !open && yDelta < 0) this.handleOpen()
    else if (this.rect > this.productFeedTop + 100 && open && yDelta > 0) this.handleClose()
  }

  setBoundingRect = () => this.rect = ReactDOM.findDOMNode(this.productFeed.current).getBoundingClientRect().top
  handleOpen = () => this.props.dispatch(openBottomDrawer())
  handleClose = () => this.props.dispatch(closeBottomDrawer())
  handleTouchStart = () => this.setState((prevState, props) => ({allow: true, openLegacy: props.open}))
  handleTouchEnd = () => this.setState((prevState, props) => ({allow: false, openLegacy: props.open}))

  render() {
    const {down, children, y, yDelta, open, bottomDrawer } = this.props
    const { allow, openLegacy } = this.state
    const offset = openLegacy? -280 : -40
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
              className="bottom-drawer"
              style={{
                top: this.screenHeight,
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
                />
                <div className="inner-content">
                  {children}
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
}))(withGesture(BottomDrawer))
