import React, { useRef } from 'react';
import YouTube from "react-youtube";
import { demoTrainingVideos } from "../Content";
import { IconButton } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos} from "@material-ui/icons";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';


const TrainingVideosCarousel = () => {
  return(
    <CarouselProvider
      naturalSlideHeight={50}
      naturalSlideWidth={100}
      totalSlides={demoTrainingVideos.length}
      visibleSlides={2.1}
    >
      <Slider>
        {demoTrainingVideos.map((videoID, index) => (
          <Slide index={index} key={index}>
            <YouTube
              videoId={videoID}
              containerClassName='training-video-yt-container'
              className='training-video-yt-item'
            />
          </Slide>
        ))}
      </Slider>
      <TrainingCarouselNavButtons/>
    </CarouselProvider>
  )
}

const TrainingCarouselNavButtons = () => {
  return (
    <>
      <ButtonBack className="carousel-nav-btn carousel-prev-btn carousel-training-videos-nav-btn">
        <IconButton color="primary">
          <ArrowBackIos/>
        </IconButton>
      </ButtonBack>
      <ButtonNext className="carousel-nav-btn carousel-next-btn carousel-training-videos-nav-btn">
        <IconButton color="primary">
          <ArrowForwardIos/>
        </IconButton>
      </ButtonNext>
    </>
  )
}



const TrainingVideos = () => {
  return (
    <div className='training-videos-content'>
      <h3 className='dashboard-subheading'>Training videos</h3>
      <div className='training-videos-container-outer'>
        <TrainingVideosCarousel/>
      </div>
    </div>
  )
}

export default TrainingVideos;
