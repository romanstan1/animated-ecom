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

const CheckoutTab = ({total, handlePayment, applePay}) =>
  <div className="checkout-tab">
    <div className='total'>
      <div>
        <span>Total:</span>
        <span>(excluding delivery)</span>
      </div>
      <div>£{total}</div>
    </div>
    {
      applePay?
      <div className='button'
        style={{width: 150, WebkitAppearance: "-apple-pay-button", opacity: total? 1 : 0.1 }}
        onClick={total? handlePayment : null }/> :
      <div className='button' onClick={handlePayment}> Checkout </div>
    }
  </div>


const Delete = () =>
<svg fill="white" width="24" height="24" viewBox="0 0 24 24">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/>
    <path fill="none" d="M0 0h24v24H0V0z"/>
</svg>


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
    {
      supportedMethods: ["https://apple.com/apple-pay" , 'basic-card'],
      data: {
        version: 3,
        merchantIdentifier: "merchant.com.example",
        merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
        supportedNetworks: ["amex", "discover", "masterCard", "visa"],
        countryCode: "US",
      }
    }
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

    let request
    if (window.PaymentRequest) {
      request = new window.PaymentRequest(paymentMethods, details, options)
      request.show()
        .then(uiResult => {console.log('ui result:', uiResult)})
        .catch(error => {console.log('error with payment request api', error)})

      request.addEventListener('shippingoptionchange', (event) => {
        const req = event.target;
        if(req.shippingOption === 'economy') {}
      })
    } else {
      console.log('doesnt support payment request api')
    }

  }

  render() {
    const {basket} = this.props
    const {total} = this.state
    const applePay = !!window.ApplePaySession
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
                      text: <Delete/>,
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
          <CheckoutTab applePay={applePay} total={total} handlePayment={this.handlePayment}/>
        </TopDrawer>
      </Fragment>
    )
  }
}

export default connect(state => ({
  basket: state.data.basket
}))(Basket)
