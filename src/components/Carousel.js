import React, {useEffect} from 'react';
import {useState, useContext} from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
  CarouselContext
} from 'pure-react-carousel';
import {IconButton} from "@material-ui/core";
import {carouselContent} from "../Content";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";



const Carousel = () => {
  return (
    <CarouselProvider
      naturalSlideHeight={60}
      naturalSlideWidth={100}
      interval={1000}
      dragStep={1}
      totalSlides={carouselContent.length}>
      <Slider>
        {/*Carousel Images*/}
        {carouselContent.map((carousel, index) => (
          <Slide index={index} key={carousel.id}>
            <img className="carousel-image" src={carousel.image} alt=""/>
          </Slide>
        ))}
      </Slider>

      <CarouselNavButtons/>
      <CarouselIndicators/>

    </CarouselProvider>
  );
};

const CarouselNavButtons = () => {

  return (
    <>
      <ButtonBack className="carousel-nav-btn carousel-prev-btn">
        <IconButton color="primary">
          <KeyboardArrowLeft/>
        </IconButton>
      </ButtonBack>
      <ButtonNext className="carousel-nav-btn carousel-next-btn">
        <IconButton color="primary">
          <KeyboardArrowRight/>
        </IconButton>
      </ButtonNext>
    </>
  )
}

const CarouselIndicators = () => {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }

    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <div className="carousel-indicator-container">
      {carouselContent.map((carousel, index) => (
        <Dot
          className="carousel-indicator"
          slide={index}
          key={carousel.id}
          children={
            <span
              className={"carousel-indicator-count" + (currentSlide === index ? ' carousel-indicator-count-active' : '')}>
                {carousel.label}
              </span>
          }/>
      ))}
    </div>
  )
}

export default Carousel;
