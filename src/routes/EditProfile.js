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
import {storage} from "../services/FirebaseStorage";
import LinearProgress from '@material-ui/core/LinearProgress';


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

  // For upload indicator
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false)

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
      console.log(firstName, lastName);
      const res = await editUser({
        variables: {
          firstName: firstName,
          lastName: lastName,
          profilePic: profileImage,
        }
      });

      console.log(res.data?.editUser);
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

    // Create a upload task on firebase storage
    const uploadTask = storage.ref(`/profiles/${file.name}`).put(file)

    // Will run everytime state of file upload is changed
    uploadTask.on('state_changed',
      (snapShot) => {
        setIsUploading(true);
        setProgress(Math.floor((snapShot.bytesTransferred / snapShot.totalBytes) * 100))
      },

      (err) => {
        displayModal('Failed to upload kindly check your internet connection', SEVERITY.SUCCESS)
        console.log(err);
      },

      () => {
        setProgress(0);
        setIsUploading(false);
        storage.ref('profiles').child(file.name).getDownloadURL()
          .then(url => {
            console.log('Download url : ', url);
            setProfileImage(url);
            displayModal('Image uploaded successfully', SEVERITY.SUCCESS);
          })
      });
  }

  return (
    <>
      <Navbar routes={authenticatedRoutes}/>
      {isUploading && <LinearProgress variant='determinate' value={progress} color='primary'/>}
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
            color='primary'
            disabled={isUploading}
          >
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
};

export default EditProfile;
