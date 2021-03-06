import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import BottomDrawer from './BottomDrawer'
import './style.css'
import Siema from './siema';
import ReactDOM from 'react-dom'
import {focusOnCard, unFocusCards} from 'store/modules/actions/animation-actions'

const focused = {
  transform: 'translate3d(calc(50% + 8px), 0,0) scale(1.2)'
}
class ProductFeedDrawer extends Component {

  componentDidMount() {
    this.getScreenMidPoint()
    window.addEventListener("resize", () => {
      this.getScreenMidPoint()
      this.forceUpdate()
    }, true);

    this.siema = new Siema({
      selector: '.siema',
      perPage: 2,
      startIndex: 0,
      draggable: true,
      multipleDrag: true,
      duration: 200
    })

    setTimeout(()=> {
      this.focusOnCard()
    }, 1000)
  }

  getScreenMidPoint = () => {
    this.midPoint = (window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth) / 2
    this.midPoint = this.midPoint < 510 / 2? this.midPoint : 510 / 2
  }

  onChange = () => {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.focusOnCard()
    }, 600)
  }

  onTouchStart = () => {
    Object.keys(this.refs).forEach(id => {
      const el = ReactDOM.findDOMNode(this.refs[id])
      el.classList.remove("focus")
      this.props.dispatch(unFocusCards())
    })
  }

  onTouchEnd = () => {
    this.onChange()
  }

  focusOnCard = () => {
    Object.keys(this.refs).forEach(image => {
      const el = ReactDOM.findDOMNode(this.refs[image])
      const rect = el.getBoundingClientRect()
      if(this.midPoint > rect.left && this.midPoint < rect.right ) {
        const card = this.props.products.find(product => product.image === image)
        this.props.dispatch(focusOnCard(card))
      }
    })
  }

  render() {
    const {products, focusedCard} = this.props
    return (
      <Fragment>
        <BottomDrawer>
          <div className="siema" onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
            {
              products.map((product, i) =>
              <div className='each-image' key={product.image + i}>
                <div
                  style={focusedCard? focusedCard.image === product.image? focused: {} : {}}
                  className='inside-wrap'
                  ref={product.image}
                  >
                  <img src={product.image} alt="product-image"/>
                  <h3 className='brand'> { product.brand } </h3>
                  <h3 className='title'>
                    { product.title }
                    <span> £{ product.price } </span>
                  </h3>
                </div>
              </div>)
            }
          </div>
         </BottomDrawer>
      </Fragment>
    )
  }
}

export default connect(state => ({
  products: [].concat(state.data.products, {image:'fake'}),
  focusedCard: state.animation.focusedCard
}))(ProductFeedDrawer)
