import React, {useState} from 'react';
import ActionFormContainer from "../components/ActionFormContainer";
import { registrationScreenContent } from "../Content";
import { Button, TextField } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import { validateEmail } from "../Utils";


const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {heading, subheading, image} = registrationScreenContent;

  const _handleSubmit = (e) => {
    e.preventDefault();
  }


  return(
    <ActionFormContainer heading={heading} subheading={subheading} image={image}>
      <form className='action-form-form'>
        <div className='form-grid'>
          <TextField
            color='primary'
            label='First name'
            className='action-form-input'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
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
            error={!validateEmail(email)}
            helperText={validateEmail(email) ? '' : 'Please enter a valid email'}
          />

          <TextField
            color='primary'
            label='Password'
            className='action-form-input'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <TextField
            color='primary'
            label='Confirm password'
            className='action-form-input'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            error={password !== confirmPassword}
            helperText={password !== confirmPassword ? 'Password didn\'t matched' : ''}
          />
        </div>
        <Button
          variant='contained'
          endIcon={<ArrowForwardIos/>}
          className='action-form-submit-btn'
          type='submit'
          color='primary'
          onClick={_handleSubmit}
        >Register</Button>
      </form>
    </ActionFormContainer>
  )
}

export default Registration;
