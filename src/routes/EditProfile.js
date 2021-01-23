import React, {useContext, useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {authContext} from "../context/AuthContext";
import RoundedImageContainer from "../components/RoundedImageContainer";
import {Button, TextField} from "@material-ui/core";
import {authenticatedRoutes} from "../Routes";
import {SEVERITY, utilsContext} from "../context/UtilsContext";
import {EDIT_USER} from "../graphql/profileSchemas";
import {useMutation} from "@apollo/client";
import PlaceholderProfilePic from "../assets/placeholder-profile.png";


const EditProfile = () => {
  const {profile, setProfile} = useContext(authContext);
  const {displayModal} = useContext(utilsContext);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  // const [email, setEmail] = useState(profile?.email ?? '');
  // const [currentPassword, setCurrentPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  const [editUser] = useMutation(EDIT_USER);

  useEffect(() => {
    if (profile) {
      setFirstName(profile?.firstName);
      setLastName(profile?.lastName);
      setProfileImage(profile?.profilePic);
    }
  }, [profile])

  const _handleSubmit = async () => {
    if (!firstName) {
      displayModal('Please fill required fields.', SEVERITY.ERROR);
      return 0;
    }

    try {
      const res = await editUser({
        variables: {
          firstName: firstName,
          lastName: lastName,
          profilePic: profileImage,
        }
      });

      setProfile(res.data?.editUser);
      localStorage['profile'] = JSON.stringify(res.data?.editUser)

      displayModal('Profile updated successfully', SEVERITY.SUCCESS);

    } catch (e) {
      displayModal(e.message, SEVERITY.ERROR);
    }

  }

  const _handleImageUploadClick = (event) => {
    // File uri
    const file = event.target.files[0];
    const reader = new FileReader();

    // Callback event will run everytime reader is used to read file
    reader.onload = (e) => {
      setProfileImage(e.target.result);
      console.log(e);
    }

    // Read file
    reader.readAsDataURL(file);
  }

  return (
    <>
      <Navbar routes={authenticatedRoutes}/>
      <div className='edit-profile-container'>
        <h3>Edit Profile</h3>
        <div className='edit-profile-image-container'>
          <RoundedImageContainer image={profileImage ?? PlaceholderProfilePic}/>

          <input
            accept='image/*'
            id='file-picker-input'
            type='file'
            onChange={_handleImageUploadClick}
          />

          <Button
            component='label'
            htmlFor='file-picker-input'
            variant='contained'
            color='primary'>
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
                error={firstName?.length < 1}
                helperText={firstName?.length < 1 ? 'First name is required' : ''}
              />
              <TextField
                label='Last name'
                value={lastName}
                onChange={i => setLastName(i.target.value)}
                variant='standard'
              />
              {/*<TextField*/}
              {/*  label='Email'*/}
              {/*  value={email}*/}
              {/*  onChange={i => setEmail(i.target.value)}*/}
              {/*  variant='standard'*/}
              {/*  error={!validateEmail(email)}*/}
              {/*  helperText={validateEmail(email) ? '' : 'Please enter a valid email'}*/}
              {/*/>*/}
            </div>
          </div>
          {/*<div className='edit-profile-change-password-container'>*/}
          {/*  <h3>Change password</h3>*/}
          {/*  <div className='edit-profile-input-group'>*/}
          {/*    <TextField*/}
          {/*      label='Current password'*/}
          {/*      variant='standard'*/}
          {/*      value={currentPassword}*/}
          {/*      type='password'*/}
          {/*      onChange={i => setCurrentPassword(i.target.value)}*/}
          {/*    />*/}
          {/*    <TextField*/}
          {/*      label='New password'*/}
          {/*      variant='standard'*/}
          {/*      value={newPassword}*/}
          {/*      type='password'*/}
          {/*      onChange={i => setNewPassword(i.target.value)}*/}
          {/*    />*/}
          {/*  </div>*/}
          <Button
            variant='contained'
            color='primary'
            onClick={_handleSubmit}
            className='edit-profile-submit-btn'
          >
            Save
          </Button>
          {/*</div>*/}
        </div>
      </div>
    </>
  )
}

export default EditProfile;
