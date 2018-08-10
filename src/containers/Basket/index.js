import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import TopDrawer from './TopDrawer'
import './style.css'

const BasketItem = ({item}) =>
  <div className='basket-item'>
    <img src={item.image} alt=""/>
    <div className='details'>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>{item.price}</p>
    </div>
  </div>

class Basket extends Component {

  render() {
    const {basket} = this.props
    return (
      <Fragment>
        <TopDrawer>
          <div className="basket">
            {
              basket.map((item, i)=> <BasketItem key={item.image + i} item={item}/>)
            }
          </div>
        </TopDrawer>
      </Fragment>
    )
  }
}

export default connect(state => ({
  basket: state.data.basket
}))(Basket)
