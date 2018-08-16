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
    <h3 className='brand'>{item.brand}</h3>
    <h3 className='title'>
      {item.title}
      <span className='price'>£{item.price}</span>
    </h3>
    </div>
  </div>

const CheckoutTab = ({total, handlePayment}) =>
  <div className="checkout-tab">
    <div className='total'>
      <div>
        <span>Total:</span>
        <span>(excluding delivery)</span>
      </div>
      <div>£{total}</div>
    </div>
    <div className='button' onClick={handlePayment}>
      Checkout
    </div>
  </div>

class Basket extends Component {

  state = {
    total: 0
  }

  componentWillReceiveProps(nextProps) {
    const total = nextProps.basket.reduce((acc, item) => acc + item.price, 0)
    this.setState((prevState, props) => ({total}))
  }

  handlePayment = () => {
    const paymentMethods = [
      {supportedMethods: ['basic-card']}
    ]

    const details = {
      total: {
        label: 'TOTAL',
        amount: {currency: 'GBP', value: this.state.total}
      },
      displayItems: this.props.basket.map(item => ({
        label: item.brand + ' - ' + item.title,
        amount: {
          currency: 'GBP',
          value: item.price,
        },
      })),
      shippingOptions: [
        {
          id: 'economy',
          label: 'Free Delivery (3-5 Days)',
          selected: true,
          amount: {
            currency: 'GBP',
            value: 0,
          },
        },
        {
          id: 'next',
          label: 'Next Day Delivery',
            // selected: true,
          amount: {
            currency: 'GBP',
            value: 7.95,
          },
        }
      ],
    }

    const options = {
      requestShipping: true
    }

    const paymentRequest = new window.PaymentRequest(paymentMethods, details, options)

    paymentRequest.show().then(uiResult => {}).catch(error => {});

    paymentRequest.addEventListener('shippingoptionchange', (event) => {
      const req = event.target;
      console.log('Shipping option', req);
      if(req.shippingOption === 'economy') {
        // this.setState((prevState, props) => ({total: prevState.total + 3.95}))
      } else {
        // this.setState((prevState, props) => ({total: prevState.total + 7.95}))
      }
    });
  }

  render() {
    const {basket} = this.props
    const {total} = this.state
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
          <CheckoutTab total={total} handlePayment={this.handlePayment}/>
        </TopDrawer>
      </Fragment>
    )
  }
}

export default connect(state => ({
  basket: state.data.basket
}))(Basket)
