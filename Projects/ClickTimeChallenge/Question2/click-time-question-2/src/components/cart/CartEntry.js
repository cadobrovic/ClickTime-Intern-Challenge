import React, { Component } from 'react';
import '../../css/CartEntry.css';

// This is the component for displaying items
// the user has in their cart. 

export default class CartEntry extends Component {

    render() {

        const { id, title, img, price, format, count, total } = this.props.item;
        const { incrementQuantity, decrementQuantity, removeFromCart} = this.props.data;

        return (

            <div className="cart-entry-container">

                <div className="movie-item">

                    <div className="pic-and-title">
                        <img 
                            src={img}
                            style={{width: "7em", height: "10m"}} 
                            className="entry-image"
                            alt="product"
                        />
                        <div className="title-and-format">
                            <h3 className="movie-title">{title}</h3>
                            <p className="movie-format">{format}</p> 
                        </div>
                    </div>

                    <div className="quantity-box">
                        <p className="quantity-label">Quantity</p>
                        
                        <button className="quantity-button" 
                        onClick={() => {
                            decrementQuantity(id);
                        }}
                        disabled = {(count < 2)}
                        >
                            -
                        </button>

                        <p className="quantity-count">{count}</p>

                        <button className="quantity-button" 
                        onClick={() => {
                            incrementQuantity(id);
                        }}>+</button>

                    </div>

                    <div className="remove-box">
                        <button className="remove-button" 
                        onClick={() => {
                            removeFromCart(id);
                        }}>
                            Remove
                        </button>
                    </div>


                </div>

                <div className="totals">
                    <h3>${total}</h3>
                </div>
                
            </div>
        );
    }
}