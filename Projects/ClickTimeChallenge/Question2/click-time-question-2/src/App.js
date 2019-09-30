import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import Cart from './components/cart/Cart';

// Root component for the React app
// React Router implemnted here
// Navbar persists across both pages 

function App() {
  return (
    <React.Fragment>
      <div style={{backgroundColor: "rgb(36, 35, 35)"}}>
      <Navbar />
      <Switch >
        <Route exact path="/" component={MovieList}/>
        <Route path="/cart" component={Cart}/>
      </Switch>
      </div>
      
    </React.Fragment>
  );
}

export default App;
