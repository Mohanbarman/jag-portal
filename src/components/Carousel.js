import React, {useEffect} from 'react';
import CarouselImage from '../assets/carousel/first.jpg';
import { useState } from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
} from 'pure-react-carousel';
import { IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core';
import Colors from '../Colors';


// Button nav button styles
const useStyles = makeStyles({
  colorPrimary: {
    color: Colors.primaryColor,
  }
})


const Carousel = () => {
  const classes = useStyles();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [currentSlide, setCuttentSlide] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    })
  }, [])


  return(
    <CarouselProvider
      naturalSlideHeight={screenWidth < 480 ? 60 : 40}
      naturalSlideWidth={100}
      interval={1000}
      infinite={true}
      dragStep={1}
      totalSlides={3}>
      <Slider>
        <Slide index={0}>
          <img className="carousel-image" src={CarouselImage} alt=""/>
        </Slide>
        <Slide index={1}>
          <img className="carousel-image" src={CarouselImage} alt=""/>
        </Slide>
        <Slide index={2}>
          <img className="carousel-image" src={CarouselImage} alt=""/>
        </Slide>
      </Slider>

      {screenWidth > 600 &&
        <>
          <ButtonBack className="carousel-nav-btn carousel-prev-btn">
            <IconButton classes={classes} color="primary">
              <ArrowBackIosIcon/>
            </IconButton>
          </ButtonBack>
          <ButtonNext className="carousel-nav-btn carousel-next-btn">
            <IconButton  classes={classes} color="primary">
              <ArrowForwardIosIcon/>
            </IconButton>
          </ButtonNext>
        </>
      }

      <div className="carousel-indicator-container">
        <Dot
          className="carousel-indicator"
          slide={0}
          onClick={() => setCuttentSlide(0)}
          children={
          <span
            className={"carousel-indicator-count" + (currentSlide === 0 ? ' carousel-indicator-count-active' : '')}>
            01
          </span>
        }/>

        <Dot
          className="carousel-indicator"
          slide={1}
          onClick={() => setCuttentSlide(1)}
          children={
            <span
              className={"carousel-indicator-count" + (currentSlide === 1 ? ' carousel-indicator-count-active' : '')}>
              02
            </span>
          }/>

        <Dot
          className="carousel-indicator"
          slide={2}
          onClick={() => setCuttentSlide(2)}
          children={
            <span
              className={"carousel-indicator-count" + (currentSlide === 2 ? ' carousel-indicator-count-active' : '')}>
            03
            </span>
          }/>
      </div>

    </CarouselProvider>
  );
}

export default Carousel;
