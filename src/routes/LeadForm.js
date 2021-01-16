import React, {useState} from 'react';
import {landingPageRoutes} from "../Routes";
import Navbar from "../components/Navbar";
import {leadFormContent} from "../Content";
import MissionAndVision from "../components/MissionAndVision";
import Footer from "../components/Footer";
import {TextField, Button} from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {validateEmail} from "../Utils";


const LeadFormInputs = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const _handleSubmit = () => {

  }

  return(
    <div className='lead-form-input-container'>
      <h1 className='decorated-title-1'>{leadFormContent.formTitle}</h1>
      <p>{leadFormContent.formDescription}</p>

      <div className='lead-form-fields-wrapper'>
        <TextField
          label='First name'
          value={firstName}
          onChange={i => setFirstName(i.target.value)}
          variant='filled'
        />
        <TextField
          label='Last name'
          value={lastName}
          onChange={i => setLastName(i.target.value)}
          variant='filled'
        />
        <TextField
          label='Email address'
          value={email}
          onChange={i => setEmail(i.target.value)}
          variant='filled'
          error={!validateEmail(email)}
          helperText={!validateEmail(email)}
        />
        <TextField
          label='Phone number'
          value={phoneNumber}
          onChange={i => setPhoneNumber(i.target.value)}
          variant='filled'
        />
        <TextField
          label='City'
          value={city}
          onChange={i => setCity(i.target.value)}
          variant='filled'
        />
        <TextField
          label='State'
          value={state}
          onChange={i => setState(i.target.value)}
          variant='filled'
        />
      </div>
      <Button
        onClick={_handleSubmit}
        className='lead-form-submit-btn'
        variant='contained'
        color='primary'
        size='large'
        endIcon={ <ArrowForwardIcon/> }
      >
        Submit
      </Button>
    </div>
  )
}


const LeadForm = () => {
  return(
    <>
      <Navbar routes={landingPageRoutes}/>
      <img className='banner-image-lead-form' src={leadFormContent.bannerimage} alt=''/>
      <div className='lead-form-container'>
        <MissionAndVision content={leadFormContent}/>
        <LeadFormInputs/>
      </div>
      <Footer/>
    </>
  )
}

export default LeadForm;
