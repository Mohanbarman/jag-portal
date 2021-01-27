import React, { useContext, useState } from 'react';
import ActionFormContainer from "../components/ActionFormContainer";
import { registrationScreenContent } from "../Content";
import { Button, LinearProgress, TextField } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import { validateEmail } from "../Utils";
import { REGISTER_USER } from "../graphql/profileSchemas";
import { useMutation } from "@apollo/client";
import { SEVERITY, utilsContext } from "../context/UtilsContext";
import { useHistory } from "react-router-dom";


const Registration = () => {
  const [registerUser] = useMutation(REGISTER_USER);
  const { displayModal, isLoading, setIsLoading } = useContext(utilsContext);

  // Input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [managerId, setManagerId] = useState('');

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const { heading, subheading, image } = registrationScreenContent;
  const history = useHistory();

  const _handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitClicked(true);

    if (firstName.length < 1
      && !validateEmail(email)
      && (password !== confirmPassword || password.length < 1)
      && !Number(managerId)
      && managerId.length < 1
    ) {
      displayModal('Form contains error please correct them', SEVERITY.ERROR);
      return 0;
    }

    setIsLoading(true);

    try {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        empId: managerId,
      }
      await registerUser({ variables: user })

      history.push('/login');
      displayModal('Successfully registered');
      setIsLoading(false);

    } catch (e) {
      if (e?.message === "User exists with this email") {
        displayModal('That email is already registered', SEVERITY.ERROR);
        setIsLoading(false);
        return 0;
      }
      if (e?.message === 'E11000 duplicate key error collection: jag.users index: empId_1 dup key: { empId: "80809890" }') {
        displayModal('That manager id is already registered', SEVERITY.ERROR);
        setIsLoading(false);
        return 0;
      }
      displayModal('Something went wrong', SEVERITY.ERROR);
    }
  }


  return (
    <>
      <ActionFormContainer heading={heading} subheading={subheading} image={image}>
        <form className='action-form-form'>
          <div className='form-grid'>
            <TextField
              color='primary'
              label='First name*'
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
              label='Manager id*'
              className='action-form-input'
              value={managerId}
              onChange={e => setManagerId(e.target.value)}
              error={managerId.length < 1 && isSubmitClicked}
              helperText={managerId.length < 1 && isSubmitClicked ? 'Manager id is required*' : ''}
            />

            <TextField
              color='primary'
              label='Email*'
              className='action-form-input'
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={!validateEmail(email) && isSubmitClicked}
              helperText={!validateEmail(email) && isSubmitClicked ? 'Please enter a valid email' : ''}
            />

            <TextField
              color='primary'
              label='Password*'
              className='action-form-input'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={password.length < 1 && isSubmitClicked}
              helperText={password.length < 1 && isSubmitClicked ? 'Password is required*' : ''}
            />

            <TextField
              color='primary'
              type='password'
              label='Confirm password*'
              className='action-form-input'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              error={password !== confirmPassword && isSubmitClicked}
              helperText={password !== confirmPassword && isSubmitClicked ? 'Password didn\'t matched' : ''}
            />
          </div>
          <Button
            variant='contained'
            endIcon={<ArrowForwardIos />}
            className='action-form-submit-btn'
            type='submit'
            color='primary'
            onClick={_handleSubmit}
          >Register</Button>
        </form>
      </ActionFormContainer>
    </>
  )
}

export default Registration;
