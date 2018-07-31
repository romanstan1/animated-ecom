import React, {Fragment} from 'react';
import ProductFeed from 'containers/ProductFeed'
import Basket from 'containers/Basket'
const Home = () =>
  <Fragment>
    <Basket/>
    <ProductFeed/>
  </Fragment>

export default Home
