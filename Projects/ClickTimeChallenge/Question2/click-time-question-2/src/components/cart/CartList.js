import React, { Component } from 'react';
import CartEntry from './CartEntry.js';
import '../../css/Cart.css';

export default class CartList extends Component {

    

    render() {

        const data = this.props.movies;


        return (
            <div className="cart-list-container">
                {data.cart.map(movie => {
                    return <CartEntry 
                                key={movie.id}
                                item={movie}
                                data={data}/>
                })}
            </div>
        );
    }
}