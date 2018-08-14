import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import './style.css'

class Nav extends Component {
  componentWillReceiveProps(nextProps) {
    const el = ReactDOM.findDOMNode(this.refs.icon)
    el.classList.add("pulse")
    setTimeout(() => {
      el.classList.remove("pulse")
    }, 1000)
  }

  render() {
    const {basket} = this.props
    return (
      <nav>
        <div className='burger'>
          <div className='top'/>
          <div className='bottom'/>
        </div>
        <div>Animation Demo</div>
        <div>
          <div className='icon' ref='icon'>
            <svg x="0px" y="0px"
              width="18px" height="48px" viewBox="0 0 18 48">
              <g>
                <g>
                  <path d="M1.5,16C0.67,16,0,16.67,0,17.5v14C0,32.33,0.67,33,1.5,33h14c0.83,0,1.5-0.67,1.5-1.5v-14
                    c0-0.83-0.67-1.5-1.5-1.5H1.5z M16,31.5c0,0.28-0.22,0.5-0.5,0.5h-14C1.22,32,1,31.78,1,31.5v-14C1,17.22,1.22,17,1.5,17h14
                    c0.28,0,0.5,0.22,0.5,0.5V31.5z"
                  />
                </g>
                <g>
                  <path d="M12.79,17H4.21v-0.5c0-2.47,2.23-4,4.29-4s4.29,1.53,4.29,4V17z M5.25,16h6.5
                    c-0.28-1.56-1.81-2.5-3.25-2.5S5.53,14.44,5.25,16z"
                  />
                </g>
              </g>
            </svg>
            <span className='values'>
              { basket.length? basket.length : '' }
            </span>
          </div>
        </div>
      </nav>
    )
  }
}

export default connect(state => ({
  basket: state.data.basket
}))(Nav)
