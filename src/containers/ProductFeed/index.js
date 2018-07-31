import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import BottomDrawer from './BottomDrawer'
import './style.css'
import Siema from 'siema';

class ProductFeedDrawer extends Component {

  state = {
    assets: (ctx => ctx.keys().map(ctx))(require.context('assets', true, /.*/))
  }

  prev = () => {
    this.siema.prev()
  };

  next = () => {
    this.siema.next()
  }
  componentDidMount() {
    this.siema = new Siema({
      selector: '.siema',
      perPage: 2,
      startIndex: 0,
      draggable: true,
      multipleDrag: true,
      duration: 200,
      onInit: (i) => {console.log('init',i)},
      onChange: (e) => {console.log('change',e)}
    });
  }

  render() {
    const {assets} = this.state
    console.log(this.siema)
    return (
      <Fragment>
        <BottomDrawer>
          <div className="siema">
            {
              assets.map(url =>
              <div className='each-image' key={url}>
                <div className='inside-wrap'>
                  <img src={url} alt="product-image"/>
                  <h3>Title</h3>
                  <p>More text</p>
                </div>
              </div>)
            }
          </div>
         </BottomDrawer>
      </Fragment>
    )
  }
}

export default connect()(ProductFeedDrawer)
