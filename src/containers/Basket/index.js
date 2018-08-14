import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import TopDrawer from './TopDrawer'
import {deleteBasketItem} from 'store/modules/actions/data-actions'
import 'rc-swipeout/assets/index.css';
import Swipeout from 'rc-swipeout';
import { Transition, animated } from 'react-spring'
import './style.css'

const BasketItem = ({item, styles}) =>
  <div className='basket-item'>
    <img src={item.image} alt=""/>
    <div className='details'>
      <h3>{item.title}</h3>
      <p className='description'>{item.description}</p>
      <p className='price'>£{item.price}</p>
    </div>
  </div>

const CheckoutTab = ({total}) =>
  <div className="checkout-tab">

    <div className='total'>
      <div>
        <span>Total:</span>
        <span>(excluding delivery)</span>
      </div>
      <div>£{total}</div>
    </div>

    <div className='button'>
      Checkout
    </div>
  </div>

class Basket extends Component {

  render() {
    const {basket} = this.props
    const total = basket.reduce((acc, item) => acc + item.price, 0)
    return (
      <Fragment>
        <TopDrawer>
          <div className="basket">
            <Transition
              native
              keys={basket.map(item => item.uuid)}
              from={{ height: 130 }}
              leave={{ height: 0  }}
              >
              {
                basket.map((item, i) => styles =>
                <animated.div style={styles}>
                  <Swipeout
                    right={[{
                      text: ' Delete ',
                      style: { width: '100vw'},
                      onPress:() => {},
                      className: 'swipe-to-delete'
                    }]}
                    onOpen={() =>
                      setTimeout(() => {
                        this.props.dispatch(deleteBasketItem(item))
                      }, 500)
                    }
                    >
                      <BasketItem item={item}/>
                    </Swipeout>
                </animated.div>
                )
              }
            </Transition>
          </div>
          <CheckoutTab total={total}/>
        </TopDrawer>
      </Fragment>
    )
  }
}

export default connect(state => ({
  basket: state.data.basket
}))(Basket)
