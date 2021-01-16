import React from 'react';
import { Button } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom';


const MissionAndVision = ({content}) => {
  const history = useHistory();

  return(
    <section className="mission-vision-section">
      <div className="mission-vision-left-section">
        <h1 className="decorated-title-1">{content.title}</h1>
        <div className="mission-content-container">
          <p>{content.text}</p>
        </div>
        <Button
          endIcon={<ArrowForwardIcon/>}
          color="primary"
          variant="text"
          className="read-more-btn"
          onClick={() => history.push('/about')}
        >
          Read more
        </Button>
      </div>
      <div className="mission-vision-right-section">
        <img src={content.image} alt={content.text}/>
      </div>
    </section>
  )
}

export default MissionAndVision;
