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
    init()
  }

  componentWillUnmount() {
    uninit()
  }

  render() {
    return <Scene/>
  }
}