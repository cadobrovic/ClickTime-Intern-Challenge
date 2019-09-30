import React, { Component } from 'react';

// This text is displayed when the cart is empty

export default class EmptyCart extends Component {
    render() {

        return(
            <div>
                <h2 style={{marginLeft: "75px"}}>Your Cart is Empty</h2>
            </div>
        );
    }
}