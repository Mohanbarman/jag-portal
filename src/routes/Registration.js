import React from 'react';
import { loginScreenContent } from "../Content";
import { Button, TextField } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';


const styles = (theme) => ({
  textField: {
    color: 'white',
  },
  input: {
    color: 'white',
  }
})


const Login = () => {
  const history = useHistory();

  const _handleSubmit = (e) => {
    e?.preventDefault();
    console.log(e);
  }

  const _handleBack = () => {
    history.goBack();
  }

  return(
    <div className="action-form-container">
      <section className="action-form-left-section">
        <h3 className='decorated-title-2'>{loginScreenContent.heading}</h3>
        <p>{loginScreenContent.subheading}</p>
        <form action='#' method='post' onSubmit={_handleSubmit} className='action-form-form'>
          <TextField inputProps={{className: styles.input}} color='primary' label='Email' className='action-form-input' />
          <TextField inputProps={{className: styles.input}} color='primary' label='Password' className='action-form-input' />
          <Button
            variant='contained'
            endIcon={<ArrowForwardIos/>}
            className='action-form-submit-btn'
            type='submit'
            onClick={_handleSubmit}
          >Login</Button>
        </form>
        <Button onClick={_handleBack} variant='contained' className='action-form-back-btn' startIcon={<ArrowBackIos/>}>Back</Button>
      </section>
      <section className="action-form-right-section">
        <img className="action-form-image" src={loginScreenContent.image} alt=''/>
      </section>
    </div>
  )
}

export default Login;
