import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import TopDrawer from './TopDrawer'
// import SwipeToDelete from 'react-swipe-to-delete-component';
import {deleteBasketItem} from 'store/modules/actions/data-actions'
import 'rc-swipeout/assets/index.css';
import Swipeout from 'rc-swipeout';

import './style.css'
import { Transition } from 'react-spring'


const BasketItem = ({item, styles}) =>
  <div className='basket-item'>
    <img src={item.image} alt=""/>
    <div className='details'>
      <h3>{item.title}</h3>
      <p className='description'>{item.description}</p>
      <p className='price'>£{item.price}</p>
    </div>
  </div>

class Basket extends Component {

  render() {
    const {basket} = this.props
    return (
      <Fragment>
        <TopDrawer>
          <div className="basket">
            <Transition
              keys={basket.map((item, i) => item.image + i)}
              from={{ height: 130 }}
              leave={{ height: 0  }}
              >
              {
                basket.map((item, i) => styles =>
                <div style={styles}>
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
                </div>
                )
              }


            </Transition>
          </div>
        </TopDrawer>
      </Fragment>
    )
  }
}

export default connect(state => ({
  basket: state.data.basket
}))(Basket)
