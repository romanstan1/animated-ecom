import React, {Component, Fragment} from 'react';
import {init, uninit} from './three-animation'

class Scene extends Component {
  shouldComponentUpdate(nextProps) {
    return false;
  }
  render() {
    return <div id='scene'></div>
  }
}

export default class ThreeDModel extends Component {

  componentDidMount() {
    // init()
  }

  componentWillReceiveProps() {

    console.log('componentWillReceiveProps here', this.props.show)
    if(this.props.show) {

      console.log('componentWillReceiveProps')
      // console.log('show:', this.props.show)
      init()
    }
  }

  componentWillUnmount() {
    uninit()
  }

  render() {
    // console.log('show', this.props)
    return <Scene/>
  }
}
