import React from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import CoreLeaders from "../components/CoreLeaders";
import MissionAndVision from "../components/MissionAndVision";
import ProspectingVideos from "../components/ProspectingVideos";
import Footer from "../components/Footer"


const Home = () => {
  return(
    <>
      <Navbar/>
      <Carousel/>
      <CoreLeaders/>
      <MissionAndVision/>
      <ProspectingVideos/>
      <Footer/>
    </>
  )
}

export default Home;
