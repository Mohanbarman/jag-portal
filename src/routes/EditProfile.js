import React, { useContext, useState } from 'react';
import Navbar from "../components/Navbar";
import {authContext} from "../context/AuthContext";
import RoundedImageContainer from "../components/RoundedImageContainer";
import {Button, TextField} from "@material-ui/core";


const EditProfile = () => {
  const {profile} = useContext(authContext);
  const [firstName, setFirstName] = useState(profile?.firstName)
  const [lastName, setLastName] = useState(profile?.lastName);
  const [email, setEmail] = useState(profile?.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const _handleSubmit = () => {
    console.log('save clicked');
  }


  return(
    <>
      <Navbar/>
      <div className='edit-profile-container'>
        <h3>Edit Profile</h3>
        <div className='edit-profile-image-container'>
          <RoundedImageContainer image={profile.profileImage}/>
          <Button variant='contained' color='primary'>
            Select image
          </Button>
        </div>
        <div className='edit-profile-fields-container'>
          <div className='edit-profile-personal-info-container'>
            <h3>Personal info</h3>
            <div className='edit-profile-input-group'>
              <TextField
                label='First name'
                value={firstName}
                onChange={i => setFirstName(i.target.value)}
                variant='standard'
              />
              <TextField
                label='Last name'
                value={lastName}
                onChange={i => setLastName(i.target.value)}
                variant='standard'
              />
              <TextField
                label='Email'
                value={email}
                onChange={i => setEmail(i.target.value)}
                variant='standard'
              />
            </div>
          </div>
          <div className='edit-profile-change-password-container'>
            <h3>Change password</h3>
            <div className='edit-profile-input-group'>
              <TextField
                label='Current password'
                variant='standard'
                value={currentPassword}
                type='password'
                onChange={i => setCurrentPassword(i.target.value)}
              />
              <TextField
                label='New password'
                variant='standard'
                value={newPassword}
                type='password'
                onChange={i => setNewPassword(i.target.value)}
              />
            </div>
            <Button
              variant='contained'
              color='primary'
              onClick={_handleSubmit}
              className='edit-profile-submit-btn'
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile;
