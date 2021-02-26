import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import { utilsContext } from "./context/UtilsContext";
import { LinearProgress } from "@material-ui/core";
import { authContext } from "./context/AuthContext";
import NotFound from "./components/404";


const Routers = () => {
  const { isLoading } = useContext(utilsContext);
  const { isAuthenticated } = useContext(authContext);
  return (
    <>
      {isLoading && <LinearProgress color='primary' className='progress-bar-top' />}
      <Modal />
      <Router>
        <Switch>
          <Route exact path="/jag-portal/">
            <Home />
          </Route>
          <Route exact path="/jag-portal/contact">
            <Contact />
          </Route>
          <Route exact path="/jag-portal/about">
            <About />
          </Route>
          <Route exact path="/jag-portal/forget-password">
            <ForgetPassword />
          </Route>
          {!isAuthenticated && (
            [
              <Route exact path="/jag-portal/login">
                <Login />
              </Route>
              ,
              <Route exact path="/jag-portal/registration">
                <Registration />
              </Route>
            ]
          )}
          {isAuthenticated && (
            [
              <Route exact path="/jag-portal/edit-profile">
                <EditProfile />
              </Route>
              ,
              <Route exact path="/jag-portal/dashboard">
                <Dashboard />
              </Route>
              ,
              <Route exact path="/jag-portal/leads">
                <Leads />
              </Route>
              ,
              <Route exact path="/jag-portal/create-meeting">
                <CreateNewMeetingMoblie />
              </Route>
            ]
          )}
          <Route exact path="/jag-portal/lead-form/:ref" component={LeadForm} />
          <Route><NotFound /></Route>
        </Switch>
      </Router>
    </>
  )
}

export default Routers;
