import React, {useContext} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./routes/Home";
import Contact from "./routes/Contact";
import About from "./routes/About";
import Login from "./routes/Login";
import Registration from "./routes/Registration";
import ForgetPassword from "./routes/ForgetPassword";
import EditProfile from "./routes/EditProfile";
import LeadForm from "./routes/LeadForm";
import Modal from "./Modal";
import CreateNewMeetingMoblie from "./routes/CreateMeetingMobile";
import Dashboard from "./routes/Dashboard";
import Leads from "./routes/Leads";
import {utilsContext} from "./context/UtilsContext";
import {LinearProgress} from "@material-ui/core";
import {authContext} from "./context/AuthContext";
import NotFound from "./components/404";


const Routers = () => {
  const {isLoading} = useContext(utilsContext);
  const {isAuthenticated} = useContext(authContext);
  return (
    <>
      {isLoading && <LinearProgress color='primary' className='progress-bar-top'/>}
      <Modal/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/contact">
            <Contact/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/forget-password">
            <ForgetPassword/>
          </Route>
          {!isAuthenticated && (
            [
              <Route exact path="/login">
                <Login/>
              </Route>
              ,
              <Route exact path="/registration">
                <Registration/>
              </Route>
            ]
          )}
          {isAuthenticated && (
            [
              <Route exact path="/edit-profile">
                <EditProfile/>
              </Route>
              ,
              <Route exact path="/dashboard">
                <Dashboard/>
              </Route>
              ,
              <Route exact path="/leads">
                <Leads/>
              </Route>
              ,
              <Route exact path="/create-meeting">
                <CreateNewMeetingMoblie/>
              </Route>
            ]
          )}
          <Route exact path="/lead-form/:ref" component={LeadForm}/>
          <Route><NotFound/></Route>
        </Switch>
      </Router>
    </>
  )
}

export default Routers;
