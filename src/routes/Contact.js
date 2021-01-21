import React, {useContext, useState} from 'react';
import ActionFormContainer from "../components/ActionFormContainer";
import { contactUsScreenContent } from "../Content";
import { TextField, Button } from "@material-ui/core";
import {validateEmail} from "../Utils";
import {ArrowForwardIos} from "@material-ui/icons";
import Navbar from "../components/Navbar";
import {authContext} from "../context/AuthContext";
import {authenticatedRoutes, unauthenticatedRoutes} from "../Routes";


const Contact = () => {
  const {heading, subheading, image} = contactUsScreenContent;
  const {isAuthenticated} = useContext(authContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const _handleSubmit = (e) => {
    e.preventDefault();
  }

  return(<>
      <Navbar routes={isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}/>
    <ActionFormContainer heading={heading} subheading={subheading} image={image}>
      <form className='action-form-form'>
        <div className='contact-us-form-grid form-grid'>
          <TextField
            color='primary'
            label='First name'
            className='action-form-input'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />

          <TextField
            color='primary'
            label='First name'
            className='action-form-input'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />

          <TextField
            color='primary'
            label='Email'
            className='action-form-input action-form-input-x2'
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!validateEmail(email)}
            helperText={validateEmail(email) ? '' : 'Please enter a valid email'}
          />

          <TextField
            multiline={true}
            rowsMax={5}
            rows={5}
            color='primary'
            label='Message'
            className='action-form-input action-form-input-x2'
            variant='filled'
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>

        <Button
          variant='contained'
          endIcon={<ArrowForwardIos/>}
          className='action-form-submit-btn'
          type='submit'
          color='primary'
          onClick={_handleSubmit}
        >Send</Button>
      </form>
    </ActionFormContainer>
    </>
  );
}

export default Contact;
