import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./routes/Home";
import Contact from "./routes/Contact";
import About from "./routes/About";
import Login from "./routes/Login";
import Registration from "./routes/Registration";
import ForgetPassword from "./routes/ForgetPassword";
import EditProfile from "./routes/EditProfile";
import LeadForm from "./routes/LeadForm";
import React from "react";
import Modal from "./Modal";


const Routers = () => {
  return (
    <Router>
      <Modal/>
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
      <Route exact path="/forget-password">
        <ForgetPassword/>
      </Route>
      <Route exact path="/edit-profile">
        <EditProfile/>
      </Route>
      <Route exact path="/lead-form">
        <LeadForm/>
      </Route>
    </Router>
  )
}

export default Routers;
