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
    // console.log('props:', this.props.show)
    // uninit()
    // if(this.props.show) {
    //   init('Duck/glTF/Duck.gltf')
    //   // 'DamagedHelmet/glTF/DamagedHelmet.gltf'
    // }


    // fadeIn(url)


  }

  componentWillUnmount() {
  //   uninit()
  }

  render() {
    // console.log('show', this.props)
    return <Scene/>
  }
}
