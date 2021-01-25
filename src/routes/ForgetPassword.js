import React, { useContext, useState } from 'react';
import { forgetPasswordScreenContent } from "../Content";
import ActionFormContainer from "../components/ActionFormContainer";
import { Button, LinearProgress, TextField } from "@material-ui/core";
import { validateEmail } from "../Utils";
import { ArrowForwardIos } from "@material-ui/icons";
import { RESET_PASS } from "../graphql/profileSchemas";
import { useMutation } from '@apollo/client';
import { SEVERITY, utilsContext } from '../context/UtilsContext';


const ForgetPassword = () => {
  const [resetPass] = useMutation(RESET_PASS);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);

  const { heading, subheading, image } = forgetPasswordScreenContent;
  const { displayModal } = useContext(utilsContext);

  const _handleSubmit = async (e) => {
    e?.preventDefault();

    setIsLoading(true);

    try {
      if (email.length > 1 && otp.length < 1 && newPassword.length < 1) {
        await resetPass({ variables: { email } })
        setIsMailSent(true);
        displayModal(`Mail sent to ${email}`, SEVERITY.SUCCESS);
      }

      if (email.length > 1 && otp.length > 1 && newPassword.length > 1) {
        await resetPass({ variables: { email, password: newPassword, otp: Number(otp) } });
        displayModal('Password changed now you can login');
      }

    } catch (e) {
      displayModal(e.message, SEVERITY.ERROR);
    }

    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <LinearProgress color='primary' />}
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
              disabled={!isMailSent}
            />

            <TextField
              color='primary'
              label='New password'
              className='action-form-input'
              type='password'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              disabled={!isMailSent}
            />
          </div>

          <Button
            variant='contained'
            endIcon={<ArrowForwardIos />}
            className='action-form-submit-btn'
            type='submit'
            color='primary'
            onClick={_handleSubmit}
            disabled={!validateEmail(email)}
          >Submit</Button>
        </form>
      </ActionFormContainer>
    </>
  )
}

export default ForgetPassword;
