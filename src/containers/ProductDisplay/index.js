import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import './style.css'

class ProductDisplay extends Component {
  state = {
    legacyImg: null
  }
  componentWillReceiveProps(nextProps) {
    if(!!nextProps.img) this.setState(() => ({legacyImg: nextProps.img}))
  }
  render() {
    const {img, title, description, price} = this.props
    const {legacyImg} = this.state
    return (
      <div className={!!img? 'product-display fadein' : 'product-display fadeout'}>
        <img src={legacyImg} alt=""/>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{price}</p>
      </div>
    )
  }
}
export default connect(state => ({
  img: state.animation.focusedCard
}))(ProductDisplay)
