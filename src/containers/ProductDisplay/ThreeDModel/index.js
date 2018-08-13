import React, {Component, Fragment} from 'react';
import {init, update} from './three-animation'

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

  componentWillReceiveProps(nextProps) {
    const {card, show} = nextProps
    if(!this.props.show === show) update(card.url, show)
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount')
  }

  render() {
    return <div id='scene'></div>
  }
}
