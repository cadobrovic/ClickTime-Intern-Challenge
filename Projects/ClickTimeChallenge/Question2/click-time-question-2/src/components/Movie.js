import React, { Component } from 'react';
import '../css/Movie.css';
import { MovieConsumer } from '../context.js';

// This is the main class for displaying movies
// on the homepage

export default class Movie extends Component {
    render() {
        // Movie data
        const {id, title, img, price, format, inCart } = this.props.movies;
        // Contextual Strings for button
        const addToCartString = "Add to Cart";
        const alreadyInCartString = "Already in Cart";
        return(
            <div>
                <MovieConsumer>
                    {data => (
                        <div className="movie-container">
                            <img src={img} />
                            <div className="movie-info">
                                <h2>{title}</h2>
                                <p>{format}</p>
                                <button className="cart-button" 
                                        disabled = {inCart ? true : false}
                                        onClick = {() => {
                                            console.log('add to cart button clicked...');
                                            data.addToCart(id);

                                        }}>
                                    ${price} | {inCart ? alreadyInCartString : addToCartString}
                                </button>
                            </div>
                        </div>
                    )}
                </MovieConsumer>
            </div>
        );
    }
}