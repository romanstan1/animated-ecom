import React, {Fragment} from 'react';
import ProductDisplay from 'containers/ProductDisplay'
import ProductFeed from 'containers/ProductFeed'
import Basket from 'containers/Basket'
import Nav from 'containers/Nav'

const Home = () =>
  <Fragment>
    <Nav/>
    <Basket/>
    <ProductDisplay/>
    <ProductFeed/>
  </Fragment>

export default Home
