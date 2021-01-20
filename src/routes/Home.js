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
import RoundedImageContainer from '../components/RoundedImageContainer';
import {IconButton, InputAdornment, Input} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import BackgroundLogo from '../assets/watermark-logo.png';
import CreateNewMeeting from "../components/CreateNewMeeting";
import {missionVisionContent} from "../Content";
import {
  authenticatedRoutes,
  unauthenticatedRoutes,
} from "../Routes";
import {utilsContext} from "../context/UtilsContext";


// Content for unauthenticated users
const _unauthenticatedContent = (
  <>
    <Navbar routes={unauthenticatedRoutes}/>
    <Carousel />
    <CoreLeaders />
    <MissionAndVision content={missionVisionContent}/>
    <ProspectingVideos />
    <Footer />
  </>
)

// Content for authenticated users
const AuthenticatedContent = () => {
  const { profile } = useContext(authContext);
  const { setModalState } = useContext(utilsContext);

  const _handleCopy = () => {
    const landingPageInput = document.getElementById('landing-page-input');

    landingPageInput.select();
    landingPageInput.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');

    setModalState({
      isOpen: true,
      content: 'Successfully copied to clipboard',
      severity: 'success',
    })
  }

  return (
    <>
      <Navbar routes={authenticatedRoutes}/>
      <div className='home-auth-container-flex'>
        <section className='home-auth-left-section'>
          <UpcomingMeetings />
          <TrainingVideos />
        </section>
        <section className='home-auth-right-section'>
          <img src={BackgroundLogo} alt='' className='background-logo-dasboard'/>
          <div className='auth-profile-image-container'>
            <RoundedImageContainer
              image={profile.profileImage}
              label={profile.firstName + ' ' + profile.lastName}
            />
          </div>
          <div className='landing-page-url-container'>
            <h4 className='dashboard-center-text-right'>Landing page</h4>
            <Input
              id='landing-page-input'
              variant='standard'
              className='landing-page-url-input'
              value={profile.landingPageUrl}
              endAdornment={
                <InputAdornment position={'end'}>
                  <IconButton onClick={_handleCopy}>
                    <FileCopyIcon/>
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          {profile?.isAdmin && (
            <div className='create-new-meeting-container-right-bar'>
              <CreateNewMeeting/>
            </div>
          )}
        </section>
      </div>
    </>
  )
};

const Home = () => {
  const { isAuthenticated } = useContext(authContext);
  return (isAuthenticated ? <AuthenticatedContent /> : _unauthenticatedContent)
}

export default Home;
