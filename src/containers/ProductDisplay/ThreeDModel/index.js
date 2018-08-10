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
    console.log('init')
    init()
  }

  componentWillReceiveProps(nextProps) {
    const {card, show} = nextProps
    // console.log('componentWillReceiveProps show', show)
    // console.log('componentWillReceiveProps card', card)
    update(card.url, show)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    return <div id='scene'></div>
  }
}
