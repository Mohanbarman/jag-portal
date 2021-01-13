import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
// PAGES
import Home from './routes/Home';
import Contact from './routes/Contact';
import About from './routes/About';
import Registration from './routes/Registration';
import Login from './routes/Login';
import Colors from './Colors';


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: Colors.primaryColor,
    },
  }
})


const App = () => {
  return(
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default App;
