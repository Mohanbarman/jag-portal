import React from 'react';
import { coreLeaders } from '../Content';
import WatermarkLogo from '../assets/watermark-logo.png';


const CoreLeaders = () => {
  return(
    <section className="section">
      <img src={WatermarkLogo} alt="Jag logo" className="section-watermark-logo"/>
      <h2 className="decorated-title-1">Core leaders</h2>
      <div className="core-leaders-container">
        {coreLeaders.map((coreLeader, index) => (
          <div className="core-leader-item">
            <div className="core-leader-image-container">
              <img className="core-leader-image" src={coreLeader.image} alt={coreLeader.label}/>
            </div>
            <p className="core-leader-label">{coreLeader.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CoreLeaders;
