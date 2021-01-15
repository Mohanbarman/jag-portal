import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import CoreLeaders from "../components/CoreLeaders";
import MissionAndVision from "../components/MissionAndVision";
import ProspectingVideos from "../components/ProspectingVideos";
import Footer from "../components/Footer"
import UpcomingMeetings from "../components/UpcomingMeetings";
import TrainingVideos from "../components/TrainingVideos";
import { authContext } from "../context/AuthContext";


// Content for unauthenticated users
const _unauthenticatedContent = (
  <>
    <Navbar />
    <Carousel />
    <CoreLeaders />
    <MissionAndVision />
    <ProspectingVideos />
    <Footer />
  </>
)

// Content for authenticated users
const _authenticatedContent = (
  <>
    <Navbar/>
    <section className='home-auth-left-section'>
      <UpcomingMeetings/>
      <TrainingVideos/>
    </section>
  </>
)

const Home = () => {
  const { isAuthenticated } = useContext(authContext);

  return (isAuthenticated ? _authenticatedContent : _unauthenticatedContent)
}

export default Home;
