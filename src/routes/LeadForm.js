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
  const {displayModal, isLoading, setIsLoading} = useContext(utilsContext);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const _handleSubmit = async () => {
    setIsSubmitClicked(true);

    if ( firstName.length < 1
      || !validatePhone(phoneNumber)
      || city.length < 1
      || state.length < 1
      || !validateEmail(email)
    ) {
      displayModal('Form contains errors', SEVERITY.ERROR);
      return 0;
    }

    setIsLoading(true);
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

    setIsLoading(false);
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
          error={firstName.length < 1 && isSubmitClicked}
          helperText={firstName.length < 1 && isSubmitClicked ? 'First name is required*' : ''}
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
          error={!validateEmail(email) && isSubmitClicked}
          helperText={!validateEmail(email) && isSubmitClicked ? 'Please enter a valid email' : ''}
        />
        <TextField
          label='Phone number'
          value={phoneNumber}
          onChange={i => setPhoneNumber(i.target.value)}
          variant='filled'
          error={!validatePhone(phoneNumber) && isSubmitClicked}
          helperText={!validatePhone(phoneNumber) && isSubmitClicked ? 'Please enter a valid number' : ''}
        />
        <TextField
          label='City'
          value={city}
          onChange={i => setCity(i.target.value)}
          variant='filled'
          error={city.length < 1 && isSubmitClicked}
          helperText={city.length < 1 && isSubmitClicked ? 'City is required*' : ''}
        />
        <TextField
          label='State'
          value={state}
          onChange={i => setState(i.target.value)}
          variant='filled'
          error={state.length < 1 && isSubmitClicked}
          helperText={state.length < 1 && isSubmitClicked ? 'State is required*' : ''}
        />
      </div>
      <Button
        onClick={_handleSubmit}
        className='lead-form-submit-btn'
        variant='contained'
        color='primary'
        size='large'
        disabled={isLoading}
        endIcon={ <ArrowForwardIcon/> }>
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
