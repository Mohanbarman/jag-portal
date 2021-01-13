import React from 'react';
import YouTube from "react-youtube";
import { prospectingVideosContent } from '../Content';


const ProspectingVideos = () => {
  const opts = {
    // height: '400',
    // width: '400',
  }

  return(
    <section className="section">
      <h1 className="decorated-title-1">Prospecting videos</h1>
      <div className="prospecting-videos-container">
        {prospectingVideosContent.map((videoID, index) => (
          <div className="prospecting-videos-item" key={index}>
            <YouTube
              videoId={videoID}
              opts={opts}
              containerClassName='youtube-video-item'
              className='youtube-video-item'
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProspectingVideos;
