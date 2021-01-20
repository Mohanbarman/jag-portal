import React from 'react';
import CreateNewMeeting from "../components/CreateNewMeeting";
import Navbar from "../components/Navbar";
import {authenticatedRoutes} from "../Routes";


const CreateNewMeetingMoblie = () => {
  return(
    <>
      <Navbar routes={authenticatedRoutes}/>
      <CreateNewMeeting/>
    </>
  )
}

export default CreateNewMeetingMoblie;
