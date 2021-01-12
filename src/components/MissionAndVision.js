import React from 'react';
import { missionVisionContent } from "../Content";
import { Button } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core';
import  Colors  from '../Colors';


const useStyles = makeStyles({
  colorPrimary: {
    color: Colors.primaryColor,
  }
})

const MissionAndVision = () => {
  const classes = useStyles();

  return(
    <section className="mission-vision-section">
      <div className="mission-vision-left-section">
        <h1 className="decorated-title-1">Mission & Vision</h1>
        <div className="mission-content-container">
          <p>{missionVisionContent.text}</p>
        </div>
        <Button
          endIcon={<ArrowForwardIcon/>}
          classes={classes}
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
