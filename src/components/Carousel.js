import React, {useEffect} from 'react';
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
import { carouselContent } from "../Content";


// Button nav button styles
const useStyles = makeStyles({
  colorPrimary: {
    color: Colors.primaryColor,
  }
})


const Carousel = () => {
  const classes = useStyles();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    })
  }, [])


  return(
    <CarouselProvider
      naturalSlideHeight={60}
      naturalSlideWidth={100}
      interval={1000}
      dragStep={1}
      totalSlides={carouselContent.length}>
      <Slider>
        {/*Carousel Images*/}
        {carouselContent.map((carousel, index) => (
          <Slide index={index}>
            <img className="carousel-image" src={carousel.image} alt=""/>
          </Slide>
        ))}
      </Slider>

      {screenWidth > 600 &&
        <>
          {/*Nav buttons*/}
          <ButtonBack className="carousel-nav-btn carousel-prev-btn">
            <IconButton classes={classes} color="primary" onClick={() => {
              setCurrentSlide(p => {
                if (p > 0)
                  return p - 1;
              });
            }}>
              <ArrowBackIosIcon/>
            </IconButton>
          </ButtonBack>
          <ButtonNext className="carousel-nav-btn carousel-next-btn">
            <IconButton classes={classes} color="primary" onClick={() => {
              setCurrentSlide(p => {
                if (p < carouselContent.length)
                  return p + 1
              })
            }}>
              <ArrowForwardIosIcon/>
            </IconButton>
          </ButtonNext>

          {/*Carousel indicators*/}
          <div className="carousel-indicator-container">
            {carouselContent.map((carousel, index) => (
              <Dot
                className="carousel-indicator"
                slide={index}
                onClick={() => setCurrentSlide(index)}
                children={
                  <span
                    className={"carousel-indicator-count" + (currentSlide === index ? ' carousel-indicator-count-active' : '')}>
                {carousel.label}
              </span>
                }/>
            ))}
          </div>
        </>
      }
    </CarouselProvider>
  );
};

export default Carousel;
