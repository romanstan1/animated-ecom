import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import './style.css'

// export const ShoppingBasketIcon = () =>
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//     <path d="M0 0h24v24H0z" fill="none"/>
//     <path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
//   </svg>


export const BasketIcon = () =>
<svg x="0px" y="0px"
	 width="17px" height="48px" viewBox="0 0 17 48">
  <g>
  	<g>
  		<path d="M1.5,16C0.67,16,0,16.67,0,17.5v14C0,32.33,0.67,33,1.5,33h14c0.83,0,1.5-0.67,1.5-1.5v-14
  			c0-0.83-0.67-1.5-1.5-1.5H1.5z M16,31.5c0,0.28-0.22,0.5-0.5,0.5h-14C1.22,32,1,31.78,1,31.5v-14C1,17.22,1.22,17,1.5,17h14
  			c0.28,0,0.5,0.22,0.5,0.5V31.5z"/>
  	</g>
  	<g>
  		<path d="M12.79,17H4.21v-0.5c0-2.47,2.23-4,4.29-4s4.29,1.53,4.29,4V17z M5.25,16h6.5
  			c-0.28-1.56-1.81-2.5-3.25-2.5S5.53,14.44,5.25,16z"/>
  	</g>
  </g>
</svg>


const Nav = () =>
<nav>
  <div className='burger'>
    <div className='top'/>
    <div className='bottom'/>
  </div>
  <div>Animation Demo</div>
  <div><BasketIcon></BasketIcon></div>
</nav>

export default connect()(Nav)
