import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import BottomDrawer from './BottomDrawer'
import './style.css'
import Siema from './siema';
import ReactDOM from 'react-dom'
import {focusOnCard, unFocusCards} from 'store/modules/actions/animation-actions'

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
      duration: 200,
      onChange: (e) => {
        this.onChange()
      }
    })
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

  focusOnCard = () => {
    Object.keys(this.refs).forEach(image => {
      const el = ReactDOM.findDOMNode(this.refs[image])
      const rect = el.getBoundingClientRect()
      if(this.midPoint > rect.left && this.midPoint < rect.right ) {
        el.classList.add("focus")
        const card = this.props.products.find(product => product.image === image)
        this.props.dispatch(focusOnCard(card))
      }
      else el.classList.remove("focus")
    })
  }

  render() {
    const {products} = this.props
    return (
      <Fragment>
        <BottomDrawer>
          <div className="siema" onTouchStart={this.onTouchStart} >
            {
              products.map((product, i) =>
              <div className='each-image' key={product.image + i}>
                <div className='inside-wrap' ref={product.image}>
                  <img src={product.image} alt="product-image"/>
                  <h3>{ product.title }</h3>
                  <p> { product.price }</p>
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
  products: [].concat(state.data.products, {})
}))(ProductFeedDrawer)
