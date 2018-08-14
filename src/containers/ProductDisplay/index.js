import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {addToBasket} from 'store/modules/actions/data-actions'
import ThreeDModel from './ThreeDModel'
import './style.css'

const fadeIn = {
  transform: 'translate3d(0,0,0)',
  opacity: 1
}

const fadeOut = {
  transform: 'translate3d(0, 20px, 0)',
  opacity: 0
}

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
  }
  render() {
    const {card} = this.props
    const {legacyCard, updated} = this.state
    return (
      <div
        className='product-display'
        style={!!card? fadeIn : fadeOut}>
        {/* <img src={legacyCard? legacyCard.id : null} alt=""/> */}
        <ThreeDModel card={legacyCard} show={!!card}/>
        <div className='details'>
          <h3>{legacyCard? legacyCard.title: null}</h3>
          <p>{legacyCard? legacyCard.description: null}</p>
          <p>{legacyCard? "£" + legacyCard.price : null}</p>

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
