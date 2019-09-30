import React, { Component } from 'react';
import '../../css/Cart.css';
import { MovieConsumer } from '../../context.js';
import EmptyCart from './EmptyCart.js';
import CartList from './CartList.js';
import CartTotals from './CartTotals';

// This is the main component for the /cart
// page. From here we pass context data 
// down to child components.

export default class Cart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <div style={{backgroundColor: "blargb(36, 35, 35)ck"}}>
                <h1>
                    Your Cart
                </h1>
                
                <MovieConsumer>
                    {data => {
                        const {cart} = data;
                        if (cart.length>0) {
                            return (
                                <React.Fragment>
                                    <div className="cart-columns">
                                        <h3>Item</h3>
                                        <h3>Total</h3>
                                    </div>
                                    <CartList movies={data}/>
                                    <CartTotals movies={data}/>
                                </React.Fragment>
                            );
                        } else {
                            return <EmptyCart />
                        };
                    }}
                </MovieConsumer>
                </div>
            </React.Fragment>
        );
    }
}