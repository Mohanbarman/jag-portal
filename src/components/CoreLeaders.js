import React from 'react';
import { coreLeadersContent } from '../Content';
import WatermarkLogo from '../assets/watermark-logo.png';
import RoundedImageContainer from './RoundedImageContainer';


const CoreLeaders = () => {
  return (
    <section className="section">
      <img src={WatermarkLogo} alt="Jag logo" className="section-watermark-logo" />
      <h1 className="decorated-title-1">Core leaders</h1>
      <div className="core-leaders-container">
        {coreLeadersContent.map((coreLeader, index) => (
          <RoundedImageContainer image={coreLeader.image} label={coreLeader.label} />
        ))}
      </div>
    </section>
  )
}

export default CoreLeaders;
