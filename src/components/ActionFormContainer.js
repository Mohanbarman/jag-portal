import React from 'react';
import { Button } from '@material-ui/core';
import { ArrowBackIos } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';


const ActionFormContainer = ({image, heading, subheading, children}) => {
  const history = useHistory();

  const _handleBack = () => {
    history.goBack();
  }

  return(
    <div className="action-form-container">
      <section className="action-form-left-section">
        <h3 className='decorated-title-2'>{heading}</h3>
        <p>{subheading}</p>
        {children}
        <Button
          onClick={_handleBack}
          color='primary'
          variant='text'
          className='action-form-back-btn'
          startIcon={<ArrowBackIos/>}>
          Back
        </Button>
      </section>
      <section className="action-form-right-section">
        <img className="action-form-image" src={image} alt=''/>
      </section>
    </div>
  )
}

export default ActionFormContainer;

