import React from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import CoreLeaders from "../components/CoreLeaders";
import MissionAndVision from "../components/MissionAndVision";


const Home = () => {
  return(
    <>
      <Navbar/>
      <Carousel/>
      <CoreLeaders/>
      <MissionAndVision/>
    </>
  )
}

export default Home;
