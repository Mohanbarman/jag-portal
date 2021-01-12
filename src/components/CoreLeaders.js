import React from 'react';
import { coreLeadersContent } from '../Content';
import WatermarkLogo from '../assets/watermark-logo.png';


const CoreLeaders = () => {
  return(
    <section className="section">
      <img src={WatermarkLogo} alt="Jag logo" className="section-watermark-logo"/>
      <h1 className="decorated-title-1">Core leaders</h1>
      <div className="core-leaders-container">
        {coreLeadersContent.map((coreLeader, index) => (
          <div className="core-leader-item" key={coreLeader.id}>
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
