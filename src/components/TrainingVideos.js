import React, {useRef} from 'react';
import YouTube from "react-youtube";
import { demoTrainingVideos } from "../Content";
import {IconButton} from "@material-ui/core";
import {ArrowBackIos, ArrowDownwardRounded, ArrowForwardIos} from "@material-ui/icons";


const TrainingVideos = () => {
  const trainingVideosContainerRef = useRef(null);

  const _handleScroll = (offset) => {
    trainingVideosContainerRef.current?.scrollBy(offset, 0);
  }


  return(
    <div className='training-videos-content'>
      <h3 className='dashboard-subheading'>Training videos</h3>
      <div className='training-videos-container-outer'>
        <div ref={trainingVideosContainerRef} className='training-videos-container'>
          {demoTrainingVideos.map((videoID, index) => (
            <YouTube
              videoId={videoID}
              containerClassName='youtube-video-item-training'
              className='youtube-video-item-training'
            />
          ))}
        <div className='icon-btn-container-left'>
          <IconButton onClick={() => _handleScroll(-400)} className='upcoming-meetings-scroll-btn' color='primary' variant='filled'>
            <ArrowBackIos/>
          </IconButton>
        </div>

        <div className='icon-btn-container-right'>
          <IconButton onClick={() => _handleScroll(400)} className='upcoming-meetings-scroll-btn' color='primary' variant='filled'>
            <ArrowForwardIos/>
          </IconButton>
        </div>
        </div>

      </div>
    </div>
  )
}

export default TrainingVideos;
