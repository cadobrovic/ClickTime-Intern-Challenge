import React, { Component } from 'react';
import '../../css/Cart.css';

// This component displays the calculated
// prices and discounts for all the items.
// We get the information from the context
// passed to Cart.js

export default class CartTotals extends Component {

    render() {
        const { 
            cartSubTotal, 
            cartTotal, 
            dvdCartCount, 
            bluRayCartCount,
            dvdDiscount,
            bluRayDiscount,
            dvdDecrement,
            bluRayDecrement,
            hundredDiscount,
            hundredDecrement, 
            emptyCart, 
            placeOrder, } = this.props.movies;

        let dvdDiscountText;
        let dvdDiscountNumbers;
        console.log('DVDDECFEMNET', dvdDecrement);

        if (dvdDiscount) {
            dvdDiscountText = <p style={{color: "red"}}>10% off all DVDs:</p>
            dvdDiscountNumbers = <p style={{color: "red"}}>-${dvdDecrement}</p>
        }

        let bluRayDiscountText;
        let bluRayDiscountNumbers;

        if (bluRayDiscount) {
            bluRayDiscountText = <p style={{color: "red"}}>15% off all Blu-Rays:</p>
            bluRayDiscountNumbers = <p style={{color: "red"}}>-${bluRayDecrement}</p>
        }

        let hundredDiscountText;
        let hundredDiscountNumbers;

        if (hundredDiscount) {
            hundredDiscountText = <p style={{color: "red"}}>5% whole order</p>
            hundredDiscountNumbers = <p style={{color: "red"}}>-${hundredDecrement}</p>
        }
            

        return (
            <React.Fragment>

                <div className="totals-container" >
                    <div className="text-container">
                        <div className="words-column">
                            <p>Subtotal:</p>
                            {dvdDiscountText}
                            {bluRayDiscountText}
                            {hundredDiscountText}
                            <p style={{fontWeight: "bold", fontSize: "20px"}}>Total:</p>
                        </div>

                        <div className="numbers-column">
                            <p style={{color: "yellow"}}>${cartSubTotal}</p>
                            {dvdDiscountNumbers}
                            {bluRayDiscountNumbers}
                            {hundredDiscountNumbers}
                            <p style={{fontWeight: "bold", fontSize: "20px"}}>${cartTotal}</p>
                        </div>
                    </div>
                    <div className="checkout-buttons">
                        <button className="clear-button"
                        onClick={() => {
                            emptyCart();
                            }}>
                            Clear Cart
                        </button>

                        <button className="order-button"
                        onClick={() => {
                            placeOrder()
                        }}>
                            Place Order
                        </button>
                    </div>
                </div>

                
            </React.Fragment>
        );
    }
    
}