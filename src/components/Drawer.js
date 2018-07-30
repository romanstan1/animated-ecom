import React, {Component} from 'react'
import { withGesture } from 'react-with-gesture'
import { Spring, animated } from 'react-spring'
import './style.css'
import ReactDOM from 'react-dom'

class Drawer extends Component {
  componentDidUpdate() {
    const rect = ReactDOM.findDOMNode(this.props.animationRef.current).getBoundingClientRect()
    console.log('did update', rect)
    const { yDelta, toggle } = this.props
    if(yDelta < -80) {
      // toggle()
    }
  }
  render() {
    const { xDelta, down, children, x, y, yDelta, xInitial, yInitial, open } = this.props
    const offset = open? -300: 0
    console.log(yDelta, yInitial, y)
    return (
      <Spring
        native to={{ y: down ? yDelta + offset : offset }}
        immediate={name => down && name === 'y'}
        >
        {({ y }) =>
          <animated.div
            className="drawer"
            style={{
              transform: y.interpolate(y => `translate3d(0px,${y}px,0)`)
            }}>
            {children}
          </animated.div>
        }
      </Spring>
    )
  }
}

export default withGesture(Drawer)



// {/* <animated.div
//   className="bubble"
//   style={{
//     transform: x
//     .interpolate({ map: Math.abs, range: [50, 300], output: [0.5, 1], extrapolate: 'clamp' })
//     .interpolate(x => `scale(${x})`),
//     justifySelf: xDelta < 0 ? 'end' : 'start'
//   }}
// />  */}
