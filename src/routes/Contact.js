import React, { useContext, useState } from 'react';
import ActionFormContainer from "../components/ActionFormContainer";
import { contactUsScreenContent } from "../Content";
import { TextField, Button } from "@material-ui/core";
import { validateEmail } from "../Utils";
import { ArrowForwardIos } from "@material-ui/icons";
import Navbar from "../components/Navbar";
import { authContext } from "../context/AuthContext";
import { authenticatedRoutes, unauthenticatedRoutes } from "../Routes";
import { SUBMIT_CONTACT } from "../graphql/contactSchema";
import { useMutation } from '@apollo/client';
import { SEVERITY, utilsContext } from '../context/UtilsContext';


const Contact = () => {
  const [submitContact] = useMutation(SUBMIT_CONTACT);

  const { heading, subheading, image } = contactUsScreenContent;
  const { isAuthenticated } = useContext(authContext);
  const { displayModal, setIsLoading, isLoading } = useContext(utilsContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const _handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitClicked(true);

    if (firstName.length < 1 && lastName.length < 1 && message.length < 1 && !validateEmail(email)) {
      displayModal('Form contains Errors', SEVERITY.ERROR);
      return 0;
    }

    setIsLoading(true);

    try {
      await submitContact({ variables: { firstName, lastName, email, message } });
      displayModal('Message successfully sent', SEVERITY.SUCCESS);
    } catch (e) {
      displayModal(e.message, SEVERITY.ERROR);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Navbar routes={isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes} />
      <ActionFormContainer heading={heading} subheading={subheading} image={image}>
        <form className='action-form-form'>
          <div className='contact-us-form-grid form-grid'>
            <TextField
              color='primary'
              label='First name'
              className='action-form-input'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              error={firstName.length < 1 && isSubmitClicked}
              helperText={firstName.length < 1 && isSubmitClicked ? 'First name is required*' : ''}
            />

            <TextField
              color='primary'
              label='Last name'
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
              error={!validateEmail(email) && isSubmitClicked}
              helperText={!validateEmail(email) && isSubmitClicked ? 'Please enter a valid email' : ''}
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
              error={message.length < 1 && isSubmitClicked}
              helperText={message.length < 1 && isSubmitClicked ? 'Message is required*' : ''}
            />
          </div>

          <Button
            variant='contained'
            endIcon={<ArrowForwardIos />}
            className='action-form-submit-btn'
            type='submit'
            color='primary'
            onClick={_handleSubmit}
            disabled={isLoading}
          >Send</Button>
        </form>
      </ActionFormContainer>
    </>
  );
}

export default Contact;
