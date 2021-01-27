import React, {useContext, useState} from 'react';
import {landingPageRoutes} from "../Routes";
import Navbar from "../components/Navbar";
import {leadFormContent} from "../Content";
import MissionAndVision from "../components/MissionAndVision";
import Footer from "../components/Footer";
import {TextField, Button, LinearProgress} from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {validateEmail, validatePhone} from "../Utils";
import {useMutation} from "@apollo/client";
import {SUBMIT_LEAD} from "../graphql/leadSchema";
import {SEVERITY, utilsContext} from "../context/UtilsContext";


const LeadFormInputs = ({refId}) => {
  // Input field states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [submitLead] = useMutation(SUBMIT_LEAD);
  const {displayModal} = useContext(utilsContext);
  const [loading, setLoading] = useState(true);

  const _handleSubmit = async () => {
    setLoading(true);
    const lead = {
      firstName,
      lastName,
      email,
      city,
      state,
      user: refId,
      phone: phoneNumber,
    }

    try {
      await submitLead({variables: lead});

      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setCity('');
      setState('');

      displayModal('Form successfully submitted', SEVERITY.SUCCESS);
    } catch (e) {
      displayModal('Something went wrong', SEVERITY.ERROR);
    }

    setLoading(false);
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
          error={firstName.length < 1}
          helperText={firstName.length < 1 ? 'First name is required*' : ''}
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
          helperText={!validateEmail(email) ? 'Please enter a valid email' : ''}
        />
        <TextField
          label='Phone number'
          value={phoneNumber}
          onChange={i => setPhoneNumber(i.target.value)}
          variant='filled'
          error={!validatePhone(phoneNumber)}
          helperText={!validatePhone(phoneNumber) ? 'Please enter a valid number' : ''}
        />
        <TextField
          label='City'
          value={city}
          onChange={i => setCity(i.target.value)}
          variant='filled'
          error={city.length < 1}
          helperText={city.length < 1 ? 'City is required*' : ''}
        />
        <TextField
          label='State'
          value={state}
          onChange={i => setState(i.target.value)}
          variant='filled'
          error={state.length < 1}
          helperText={state.length < 1 ? 'State is required*' : ''}
        />
      </div>
      <Button
        onClick={_handleSubmit}
        className='lead-form-submit-btn'
        variant='contained'
        color='primary'
        size='large'
        endIcon={ <ArrowForwardIcon/> }
        disabled={
          firstName.length < 1
          || !validatePhone(phoneNumber)
          || city.length < 1
          || state.length < 1
          || !validateEmail(email)
          || !loading
        }>
        Submit
      </Button>
    </div>
  )
}


const LeadForm = (props) => {
  console.log(props);
  return(
    <>
      <Navbar routes={landingPageRoutes}/>
      <img className='banner-image-lead-form' src={leadFormContent.bannerimage} alt=''/>
      <div className='lead-form-container'>
        <MissionAndVision content={leadFormContent}/>
        <LeadFormInputs refId={props.match.params.ref}/>
      </div>
      <Footer/>
    </>
  )
}

export default LeadForm;
