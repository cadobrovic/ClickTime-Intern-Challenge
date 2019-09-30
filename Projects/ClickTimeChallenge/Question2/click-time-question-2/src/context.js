// Context API for global state
// Context API is very useful for managing
// state without the pain of using Redux
// For a simple Web App like this Context
// is definitely the way to go.

import React, { Component } from 'react';
import { movieData } from './data.js';

const MovieContext = React.createContext();

class MovieProvider extends Component {

    // The fields in our global state
    // These are manipulated by the functions
    // we expose globally.

    state = {
        movies: [],
        cart: [], 
        cartSubTotal: 0,
        cartTotal: 0,
        cartCount: 0,
        dvdTotal: 0,
        bluRayTotal: 0,
        dvdCartCount: 0,
        bluRayCartCount: 0,
        dvdDiscount: false,
        dvdDecrement: 0,
        bluRayDiscount: false,
        bluRayDecrement: 0,
        hundredDiscount: false
        

    }

    componentDidMount() {
        this.resetMovies();
    }

    // Functions that affect global state

    // Copy movies from data.js by value, not by reference
    resetMovies = () => {
        let incomingMovies = [];
        movieData.forEach(i => {
            const movie = {...i};
            incomingMovies = [...incomingMovies, movie];
        });
        this.setState({
            movies: incomingMovies
        });
    }

    getItem = (id) => {
        return this.state.movies.find(movie => movie.id === id);
    }

    addToCart = (id) => {
        console.log('\n\naddToCart() called...');
        let tempMovies = [...this.state.movies];
        const index = tempMovies.indexOf(this.getItem(id));
        const movie = tempMovies[index];
        movie.inCart = true;
        movie.count = 1;
        const price = movie.price;
        movie.total = price;
        let dvdTotal = this.state.dvdTotal;
        if (movie.id === 1 || movie.id === 2 || movie.id === 3)
            dvdTotal = this.state.dvdTotal + movie.price;
        let bluRayTotal = this.state.bluRayTotal;
        if (movie.id === 4 || movie.id === 5 || movie.id === 6)
            bluRayTotal = this.state.bluRayTotal + movie.price;

        this.setState(() => {
            return {
                movies: tempMovies, 
                cart: [...this.state.cart,movie], 
                dvdTotal: dvdTotal,
                bluRayTotal: bluRayTotal,
                cartCount: this.state.cartCount + 1,
            }
        }, () => {
            console.log(this.state);
            this.updateDiscounts();
            // this.computeTotals();
        });
    }

    updateDiscounts = () => {
        console.log('updateDiscounts() called...');
        console.log('CART FROM UPDATE DISCOUNTS', this.state);
        let getsDvdDiscount = false;
        let getsBluRayDiscount = false;
        if (this.state.cart.some(e => e.id === 1)
        && this.state.cart.some(e => e.id === 2)
        && this.state.cart.some(e => e.id === 3))
            getsDvdDiscount = true;

        console.log('getDvdDiscount:', getsDvdDiscount);

        if (this.state.cart.some(e => e.id === 4)
        && this.state.cart.some(e => e.id === 5)
        && this.state.cart.some(e => e.id === 6))
            getsBluRayDiscount = true;

            console.log('getsBluRayDiscount:', getsBluRayDiscount);

        this.setState(() => {
            return {
                dvdDiscount: getsDvdDiscount,
                bluRayDiscount: getsBluRayDiscount,
                hundredDiscount: this.state.cartCount > 99 ? true : false,
            }
        }, () => {this.computeTotals();});
        

    }

    incrementQuantity = (id) => {
        console.log('incrementQuantity() called...');
        let tempCart = [...this.state.cart];
        const selectedMovie = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedMovie);
        const movie = tempCart[index];
        movie.count = movie.count + 1;
        movie.total = movie.price * movie.count;
        let dvdTotal = this.state.dvdTotal;
        let bluRayTotal = this.state.bluRayTotal;
        if (movie.id === 1 || movie.id === 2 || movie.id === 3)
            dvdTotal = this.state.dvdTotal + movie.price;
        if (movie.id === 4 || movie.id === 5 || movie.id === 6)
            bluRayTotal = this.state.bluRayTotal + movie.price;
        this.setState(() => {
            return {
                cart: [...tempCart],
                dvdTotal: dvdTotal,
                bluRayTotal: bluRayTotal,
                cartCount: this.state.cartCount + 1,
            }
        }, () => {
            this.updateDiscounts();
        });
        
    }

    decrementQuantity = (id) => {
        console.log('decrementQuantity() called...');
        let tempCart = [...this.state.cart];
        const selectedMovie = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedMovie);
        const movie = tempCart[index];
        if (movie.count > 1)
            movie.count = movie.count - 1;
        movie.total = movie.price * movie.count;
        let dvdTotal = this.state.dvdTotal;
        let bluRayTotal = this.state.bluRayTotal;

        //allow dvdTotal decrement only if all dvd counts > 1
        
        if (( movie.id === 1 || movie.id === 2 || movie.id === 3))
            dvdTotal = this.state.dvdTotal - movie.price;

        if (bluRayTotal > 25 && (movie.id === 4 || movie.id === 5 || movie.id === 6))
            bluRayTotal = this.state.bluRayTotal - movie.price;

        this.setState(() => {
            return {
                cart: [...tempCart],
                dvdTotal: dvdTotal,
                bluRayTotal: bluRayTotal,
                cartCount: this.state.cartCount - 1,
            }
        }, () => {
            this.updateDiscounts();
        });
    }

    removeFromCart = (id) => {
        console.log('removeFromCart() called...');
        let tempMovies = [...this.state.movies];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempMovies.indexOf(this.getItem(id));
        let removedMovie = tempMovies[index];
        const cartCountDecrement = removedMovie.count;
        let dvdTotalDecrement = 0;
        let bluRayTotalDecrement = 0;
        let dvdDiscount = this.state.dvdDiscount;
        let bluRayDiscount = this.state.bluRayDiscount;
        if (removedMovie.id == 1 || removedMovie.id == 2 || removedMovie.id == 3) {
            dvdTotalDecrement = removedMovie.count * removedMovie.price;
            dvdDiscount = false;
        } else {
            bluRayTotalDecrement = removedMovie.count * removedMovie.price;
            bluRayDiscount = false;
        }
        removedMovie.inCart = false;
        removedMovie.count = 0;
        removedMovie.total = 0;
        this.setState(() => {
            return {
                cart: [...tempCart],
                movies: [...tempMovies],
                cartCount: this.state.cartCount - cartCountDecrement,
                dvdTotal: this.state.dvdTotal - dvdTotalDecrement,
                bluRayTotal: this.state.bluRayTotal - bluRayTotalDecrement,
                dvdDiscount: dvdDiscount,
                bluRayDiscount: bluRayDiscount,
            }
        }, () => {
            this.computeTotals();
        })
    }

    emptyCart = () => {
        console.log('emptyCart() called...');
        this.setState({
            cart: [],
            cartCount: 0,
        }, () => {
            this.resetMovies();
            this.computeTotals();
        });
    }

    placeOrder = () => {
        console.log('placeOrder() called....');
        alert('ORDER PLACED');
    }

    computeTotals() {
        console.log('computeTotals()... called');
        console.log('STATE FROM COMPUTE TOTALS', this.state);
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        console.log('SUBTOTAL...', subTotal);
        let dvdDecrement = 0;
        if (this.state.dvdDiscount)
            dvdDecrement = (0.10 * this.state.dvdTotal);
        console.log('dvdDecrement:', dvdDecrement);
        let bluRayDecrement = 0;
        if (this.state.bluRayDiscount)
            bluRayDecrement = (0.15 * this.state.bluRayTotal);
        console.log('bluRayDecrement:', bluRayDecrement);
        let newSubTotal = subTotal - dvdDecrement - bluRayDecrement;

        let hundredDecrement = 0;
        if (this.state.hundredDiscount)
            hundredDecrement = (0.05 * newSubTotal);
        
        let total = newSubTotal - hundredDecrement;
        hundredDecrement = hundredDecrement.toFixed(2);
        total = total.toFixed(2);

        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                dvdDecrement: dvdDecrement,
                bluRayDecrement: bluRayDecrement,
                hundredDecrement: hundredDecrement,
                cartTotal: total
            }
        }, () => {
            console.log('STATE AFTER COMPUTE TOTALS', this.state);
        })
    }

    // We're only exposing some of these methods to the
    // consumers. Internal price calculation stays
    // within context.js

    render() {
        return(
            <MovieContext.Provider value={{
                ...this.state,
                addToCart: this.addToCart,
                incrementQuantity: this.incrementQuantity,
                decrementQuantity: this.decrementQuantity,
                removeFromCart: this.removeFromCart,
                emptyCart: this.emptyCart,
                placeOrder: this.placeOrder,

            }}>
                {this.props.children}
            </MovieContext.Provider>
        );
    }
}

// Consumer is implemented in the components

const MovieConsumer = MovieContext.Consumer;

export { MovieProvider, MovieConsumer };