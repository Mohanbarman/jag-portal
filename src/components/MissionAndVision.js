import React from 'react';
import { missionVisionContent } from "../Content";
import { Button } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core';
import  Colors  from '../Colors';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  textPrimary: {
    color: Colors.primaryColor,
  },
  root: {
    marginTop: "3rem",
  }
})

const MissionAndVision = () => {
  const classes = useStyles();
  const history = useHistory();

  return(
    <section className="mission-vision-section">
      <div className="mission-vision-left-section">
        <h1 className="decorated-title-1">{missionVisionContent.title}</h1>
        <div className="mission-content-container">
          <p>{missionVisionContent.text}</p>
        </div>
        <Button
          endIcon={<ArrowForwardIcon/>}
          classes={classes}
          color="primary"
          variant="text"
          className="read-more-btn"
          onClick={() => history.push('/about')}
        >
          Read more
        </Button>
      </div>
      <div className="mission-vision-right-section">
        <img src={missionVisionContent.image} alt={missionVisionContent.text}/>
      </div>
    </section>
  )
}

export default MissionAndVision;
