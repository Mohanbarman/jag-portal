import React, {useState} from 'react';
import {forgetPasswordScreenContent} from "../Content";
import ActionFormContainer from "../components/ActionFormContainer";
import {Button, TextField} from "@material-ui/core";
import {validateEmail} from "../Utils";
import {ArrowForwardIos} from "@material-ui/icons";


const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const {heading, subheading, image} = forgetPasswordScreenContent;

  const _handleSubmit = (e) => {
    e?.preventDefault();
  }

  return(
    <ActionFormContainer heading={heading} subheading={subheading} image={image}>
      <form onSubmit={_handleSubmit} className='action-form-form'>
        <div className='form-grid'>
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
            label='Otp'
            className='action-form-input'
            value={otp}
            onChange={e => setOtp(p =>
              Number(e.target.value) || e.target.value.length < 1 ? e.target.value : p)
            }
          />

          <TextField
            color='primary'
            label='New password'
            className='action-form-input'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>

        <Button
          variant='contained'
          endIcon={<ArrowForwardIos/>}
          className='action-form-submit-btn'
          type='submit'
          color='primary'
          onClick={_handleSubmit}
        >Submit</Button>
      </form>
    </ActionFormContainer>
  )
}

export default ForgetPassword;
