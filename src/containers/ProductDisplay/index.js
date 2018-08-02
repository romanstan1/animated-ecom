import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {addToBasket} from 'store/modules/actions/data-actions'
import './style.css'

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
    }, 1000)
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
      <div className={!!card? 'product-display fadein' : 'product-display fadeout'}>
        <img src={legacyCard? legacyCard.id : null} alt=""/>
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
