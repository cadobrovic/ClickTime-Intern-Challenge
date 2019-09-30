import React, { Component } from 'react';
import Movie from './Movie';
import '../css/MovieList.css';
import { MovieConsumer } from '../context.js';

export default class MovieList extends Component {
    render() {
        return(
            <React.Fragment>
                <div className="background">
                <h1>
                    Our Merch Bruh
                </h1>
                <MovieConsumer>
                    {(data) => {
                        return data.movies.map( movieItem => {
                            return <Movie key={movieItem.id} movies={movieItem}/>
                        })
                    }}
                </MovieConsumer>
                </div>
            </React.Fragment>
        );
    }
}