import React, {useContext, useState} from 'react';
import {loginScreenContent} from "../Content";
import {Button, TextField} from '@material-ui/core';
import {ArrowForwardIos} from "@material-ui/icons";
import ActionFormContainer from "../components/ActionFormContainer";
import {Link, useHistory} from 'react-router-dom';
import {validateEmail} from "../Utils";
import {authContext} from "../context/AuthContext";
import {utilsContext} from "../context/UtilsContext";
import {SEVERITY} from "../context/UtilsContext";


const Login = () => {
  const {setIsAuthenticated, setProfile, login} = useContext(authContext);
  const {displayModal} = useContext(utilsContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();


  const _handleSubmit = async (e) => {
    e?.preventDefault();

    if (!(validateEmail(email) && password)) {
      displayModal('Please fix your email or password', SEVERITY.ERROR);
      return 0;
    }

    try {
      const res = await login({variables: {email: email, password: password}});
      setIsAuthenticated(true);
      setProfile(res?.data?.login);
      history.push('/dashboard');
      localStorage['profile'] = JSON.stringify(res?.data?.login);
      displayModal(`Logged in successfully as ${res?.data?.login?.email}`, SEVERITY.SUCCESS);
    } catch (e) {
      displayModal('Wrong email or password', SEVERITY.ERROR);
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
          error={password.length < 1}
          helperText={password.length < 1 ? 'Please provide a password' : ''}
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
