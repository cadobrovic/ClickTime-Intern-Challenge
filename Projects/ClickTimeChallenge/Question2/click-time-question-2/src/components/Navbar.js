import React, { Component } from 'react';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';

// This navbar persists across both pages.

export default class Navbar extends Component {
    render() {
        return(
            <div className="navbar-wrapper">
                <ul>
                    <h2 className="title">Piratical Liz's Emporium</h2>
                    <div className="buttons"> 
                    <Link to="/cart">
                        <li><button className="butn">Cart</button></li>
                    </Link>
                    <Link to="/">
                    <li><button className="butn">Home</button></li>
                    </Link>
                    </div>
                    
                </ul>
            </div>
        );
    }
}