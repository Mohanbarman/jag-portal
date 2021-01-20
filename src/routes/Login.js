import React, {useContext, useState} from 'react';
import {loginScreenContent} from "../Content";
import {Button, TextField} from '@material-ui/core';
import {ArrowForwardIos} from "@material-ui/icons";
import ActionFormContainer from "../components/ActionFormContainer";
import {Link, useHistory} from 'react-router-dom';
import {validateEmail} from "../Utils";
import {authContext} from "../context/AuthContext";
import {utilsContext} from "../context/UtilsContext";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setIsAuthenticated} = useContext(authContext);
  const {setModalState} = useContext(utilsContext);
  const history = useHistory();

  const _handleSubmit = (e) => {
    e?.preventDefault();

    if (validateEmail(email) && password) {
      setModalState({
        isOpen: true,
        content: `Logged in successfully as ${email}`,
        severity: 'success',
      })

      setIsAuthenticated(true);
      history.push('/');
      return 0;
    }

    if (!validateEmail(email)) {
      setModalState({
        isOpen: true,
        content: 'Please enter a valid email and password',
        severity: 'error',
      })
    }
  }

  return (
    <ActionFormContainer
      heading={loginScreenContent.heading}
      subheading={loginScreenContent.subheading}
      image={loginScreenContent.image}
    >
      <form onSubmit={_handleSubmit} className='action-form-form'>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          color='primary'
          label='Email'
          className='action-form-input'
          error={!validateEmail(email)}
          helperText={validateEmail(email) ? '' : 'Please enter a valid email'}
        />
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          color='primary'
          label='Password'
          className='action-form-input'
          type='password'
        />

        <div className='submit-btn-container'>
          <Link to='/forget-password'>Forget password ?</Link>
          <Button
            variant='contained'
            endIcon={<ArrowForwardIos/>}
            className='action-form-submit-btn'
            type='submit'
            color='primary'
            onClick={_handleSubmit}
          >Login</Button>
        </div>
      </form>
    </ActionFormContainer>
  )
}

export default Login;
