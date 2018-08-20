import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {addToBasket} from 'store/modules/actions/data-actions'
import ThreeDModel from './ThreeDModel'
import './style.css'

// const fadeIn = {
//   transform: 'translate3d(0,0,0)',
//   opacity: 1
// }
//
// const fadeOut = {
//   transform: 'translate3d(0, 20px, 0)',
//   opacity: 0
// }

class ProductDisplay extends Component {
  state = {
    legacyCard: null,
    updated: false
  }
  componentWillReceiveProps(nextProps) {
    if(!!nextProps.card) this.setState(() => ({legacyCard: nextProps.card}))
    if(this.props.basket.length < nextProps.basket.length) this.updated()
  }
  updated = () => {
    this.setState(() => ({updated: true}))
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setState(() => ({updated: false}))
    }, 1200)
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  handleClick = () => {
    this.props.dispatch(addToBasket(this.state.legacyCard))
    window.navigator.vibrate([200]);
  }
  render() {
    const {card} = this.props
    const {legacyCard, updated} = this.state
    return (
      <div
        className='product-display'
        >
        <ThreeDModel card={legacyCard} show={!!card}/>
        <div className='details'>
          <h3 className='brand'>{legacyCard? legacyCard.brand: null}</h3>
          <h3 className='title'>{legacyCard? legacyCard.title: null}</h3>
          <p className='description'>
            {legacyCard? legacyCard.description: null}
          </p>
          <span className='fade-overlay'/>
          <p className='price'>{legacyCard? "£" + legacyCard.price : null}</p>
          <div className={updated? "button updated" : "button"} onClick={this.handleClick}>
            {updated? "Successfully added!" : "Add to basket"}
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  card: state.animation.focusedCard,
  basket: state.data.basket
}))(ProductDisplay)
