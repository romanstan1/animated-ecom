import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import './style.css'

class ProductDisplay extends Component {
  state = {
    justUpdated: false
  }
  componentWillReceiveProps() {
    this.setState(()=> ({justUpdated: true}))
    // this.timeout = setTimeout(()=> {
    //   this.setState(()=> ({justUpdated: false}))
    // },1000)
  }
  componentWillUnmount() {
    // clearTimeout(this.timeout)
  }
  render() {
    const {img, title, description, price} = this.props
    const {justUpdated} = this.state
    console.log('justUpdated', justUpdated)
    return (
      <div className={justUpdated? 'product-display fadein' : 'product-display'}>
        <img src={img} alt=""/>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{price}</p>
      </div>
    )
  }
}
export default connect(state => ({
  img: state.animation.focusedCard
}))(ProductDisplay)



// const ProductDisplay = ({img, title, description, price}) =>
// {/* <div className='product-display'>
//   <img src={img} alt=""/>
//   <h3>{title}</h3>
//   <p>{description}</p>
//   <p>{price}</p>
// </div> */}
