import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import {openTopDrawer, closeTopDrawer} from 'store/modules/actions/animation-actions'
import { withGesture } from 'react-with-gesture'
import { Spring, animated } from 'react-spring'
import './style.css'

class TopDrawer extends Component {
  constructor(props) {
    super(props);
    this.productFeed = React.createRef();
    this.screenHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight
    this.productFeedBottom = this.screenHeight
    this.state = {
      allow: false,
      openLegacy: false
    }
  }
  componentDidMount() {
    this.setBoundingRect()
  }

  componentDidUpdate() {
    this.setBoundingRect()
    const { yDelta, open } = this.props
    const {allow, openLegacy } = this.state
    if(this.rect > 100 && !openLegacy && yDelta > 0) this.handleOpen()
    else if (this.rect < this.screenHeight - 100 && openLegacy && yDelta < 0) this.handleClose()
  }

  setBoundingRect = () => this.rect = ReactDOM.findDOMNode(this.productFeed.current).getBoundingClientRect().bottom

  handleOpen = () => this.props.dispatch(openTopDrawer())
  handleClose = () => this.props.dispatch(closeTopDrawer())
  handleTouchStart = () => this.setState((prevState, props) => ({allow: true, openLegacy: props.open}))
  handleTouchEnd = () => this.setState((prevState, props) => ({allow: false, openLegacy: props.open}))

  render() {
    const {down, children, y, yDelta, open, bottomDrawer } = this.props
    const { allow, openLegacy } = this.state
    const offset = openLegacy? this.productFeedBottom - 35 : 0

    // console.log('yDelta', )
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
              className="top-drawer"
              style={{
                bottom:this.screenHeight - 35,
                // top: this.screenHeight - 35,
                transform: yval.interpolate(i =>
                  `translate3d(0px,${ -i < this.productFeedBottom? i : -this.productFeedBottom }px,0)`)
              }}>
              <div
                ref={this.productFeed}
                className='basket-content'
                style={{height: this.productFeedBottom}}
              >
                {children}
                <div
                  onTouchStart={this.handleTouchStart}
                  onTouchEnd={this.handleTouchEnd}
                  className='handle'
                />
              </div>
            </animated.div>
          }
        </Spring>
      </Fragment>
    )
  }
}

export default connect(state => ({
  open: state.animation.topDrawer
}))(withGesture(TopDrawer))
