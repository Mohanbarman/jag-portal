import React, {useContext, useEffect, useState} from 'react';
import {authContext} from "../context/AuthContext";
import {utilsContext} from "../context/UtilsContext";
import {IconButton, Input, InputAdornment} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Navbar from "../components/Navbar";
import {authenticatedRoutes, unauthenticatedRoutes} from "../Routes";
import UpcomingMeetings from "../components/UpcomingMeetings";
import TrainingVideos from "../components/TrainingVideos";
import BackgroundLogo from "../assets/watermark-logo.png";
import RoundedImageContainer from "../components/RoundedImageContainer";
import CreateNewMeeting from "../components/CreateNewMeeting";
import PlaceholderProfilePic from "../assets/placeholder-profile.png";


const Dashboard = () => {
  const {profile, isAuthenticated} = useContext(authContext);
  const {setModalState} = useContext(utilsContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    })
  }, [])

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

  const landingPageField = (
    <>
      <h4 className='dashboard-center-text-right'>Landing page</h4>
      <Input
        id='landing-page-input'
        variant='standard'
        className='landing-page-url-input'
        value={`${window.location.host}/lead-form/${profile?._id}`}
        endAdornment={
          <InputAdornment position={'end'}>
            <IconButton onClick={_handleCopy}>
              <FileCopyIcon/>
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  )

  return (
    <>
      <Navbar routes={isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}/>
      <div className='home-auth-container-flex'>
        <section className='home-auth-left-section'>
          {screenWidth < 900 && (
            <div className='landing-page-url-mobile'>
              {landingPageField}
            </div>
          )}
          <UpcomingMeetings/>
          <TrainingVideos/>
        </section>
        <section className='home-auth-right-section'>
          <img src={BackgroundLogo} alt='' className='background-logo-dasboard'/>
          <div className='auth-profile-image-container'>
            <RoundedImageContainer
              image={profile?.profilePic ?? PlaceholderProfilePic}
              label={`${profile?.firstName} ${profile?.lastName ?? ''}`}
            />
          </div>
          <div className='landing-page-url-container'>
            {landingPageField}
          </div>
          {profile?.role === 'super_admin' && (
            <div className='create-new-meeting-container-right-bar'>
              <CreateNewMeeting/>
            </div>
          )}
        </section>
      </div>
    </>
  )

}

export default Dashboard;
