import React from 'react';
import YouTube from "react-youtube";
import { prospectingVideosContent } from '../Content';
import {Grid, Paper} from "@material-ui/core";


const ProspectingVideos = () => {
  return (
    <section className='section'>
     <h1 className="decorated-title-1">Prospecting videos</h1>
      <Grid container className='prospecting-videos-container' spacing={3}>
        {prospectingVideosContent.map((videoID, index) => (
          <Grid item xs={12} sm={6} lg={4}>
              <YouTube
                videoId={videoID}
                containerClassName='youtube-video-item'
                className='youtube-video-item'
              />
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

export default ProspectingVideos;
