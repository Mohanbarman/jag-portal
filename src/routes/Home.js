import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import CoreLeaders from "../components/CoreLeaders";
import MissionAndVision from "../components/MissionAndVision";
import ProspectingVideos from "../components/ProspectingVideos";
import Footer from "../components/Footer"
import UpcomingMeetings from "../components/UpcomingMeetings";
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

const Home = () => {
  const { isAuthenticated } = useContext(authContext);

  return (!isAuthenticated ? _unauthenticatedContent :
    <>
      <Navbar/>
      <section className='home-auth-left-section'>
        <UpcomingMeetings/>
      </section>
    </>
  )
}

export default Home;
