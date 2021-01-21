import React from 'react';
import YouTube from "react-youtube";
import { demoTrainingVideos } from "../Content";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation]);

const TrainingVideos = () => {
  const breakpoints = {
    680: {
      slidesPerView: 2.5,
    },
    0: {
      slidesPerView: 1,
      height: '40vw'
    }
  }

  return (
    <div className='training-videos-container'>
      <h3 className='dashboard-subheading'>Training videos</h3>
      <Swiper
        breakpoints={breakpoints}
        spaceBetween={10}
        slidesPerView={2}
        onSlideChange={(i) => console.log('slide changed ', i)}
        navigation
      >
        {demoTrainingVideos.map((videoId, index) => (
          <SwiperSlide key={index}>
            <YouTube
              videoId={videoId}
              containerClassName='training-video-yt-container'
              opts={{height: '100%', width: '100%'}}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default TrainingVideos;
