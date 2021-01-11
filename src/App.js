import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// PAGES
import Home from './routes/Home';
import Contact from './routes/Contact';
import About from './routes/About';
import Registration from './routes/Registration';
import Login from './routes/Login';


const App = () => {
  return(
    <Router>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/contact">
        <Contact/>
      </Route>
      <Route exact path="/about">
        <About/>
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/registration">
        <Registration/>
      </Route>
    </Router>
  )
}

export default App;