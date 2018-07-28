import React, {Component} from 'react'
import { withGesture } from 'react-with-gesture'
import { Spring, animated } from 'react-spring'
import './style.css'

class Drawer extends Component {
  render() {
    const { xDelta, down, children, x, y, yDelta, xInitial, yInitial, open } = this.props
    const offset = open? -300: 0
    return (
      <Spring
        native to={{ y: down ? yDelta + offset : offset }}
        immediate={name => down && name === 'y'}
        >
        {({ y }) =>
          <animated.div
            className="drawer"
            style={{
              top: '90vh',
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
