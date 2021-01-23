import React, {useContext, useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import CoreLeaders from "../components/CoreLeaders";
import MissionAndVision from "../components/MissionAndVision";
import ProspectingVideos from "../components/ProspectingVideos";
import Footer from "../components/Footer"
import {authContext} from "../context/AuthContext";
import {missionVisionContent} from "../Content";
import {authenticatedRoutes, unauthenticatedRoutes,} from "../Routes";


const Home = () => {
  const {isAuthenticated} = useContext(authContext);
  return (
    <>
      <Navbar routes={isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}/>
      <Carousel/>
      <CoreLeaders/>
      <MissionAndVision content={missionVisionContent}/>
      <ProspectingVideos/>
      <Footer/>
    </>
  )
}

export default Home;
