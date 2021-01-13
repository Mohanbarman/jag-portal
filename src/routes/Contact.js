import React, { useState } from 'react';
import ActionFormContainer from "../components/ActionFormContainer";
import { contactUsScreenContent } from "../Content";
import { TextField, Button } from "@material-ui/core";
import {validateEmail} from "../Utils";
import {ArrowForwardIos} from "@material-ui/icons";


const Contact = () => {
  const {heading, subheading, image} = contactUsScreenContent;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const _handleSubmit = (e) => {
    e.preventDefault();
  }

  return(
    <ActionFormContainer heading={heading} subheading={subheading} image={image}>
      <form className='action-form-form'>
        <div className='contact-us-form-grid registration-form-grid'>
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
            multiline={true}
            color='primary'
            label='Message'
            className='action-form-input action-form-message-input'
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
  );
}

export default Contact;
