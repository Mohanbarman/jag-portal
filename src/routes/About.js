import React from 'react';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import { aboutUsContent } from '../Content';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <Banner title='/About us' image={aboutUsContent.bannerImage} />
      <section className="mission-vision-section">
        <div className="mission-vision-left-section">
          <h1 className="decorated-title-1">Our Mission</h1>
          <div className="mission-content-container">
            <p>{aboutUsContent.mission}</p>
          </div>
        </div>
        <div className="mission-vision-right-section">
          <img src={aboutUsContent.missionImage} alt={aboutUsContent.mission} />
        </div>
      </section>

      <section className="mission-vision-section vision-section">
        <div className="mission-vision-left-section">
          <h1 className="decorated-title-1">Our Vision</h1>
          <div className="mission-content-container">
            <p>{aboutUsContent.vision}</p>
          </div>
        </div>
        <div className="mission-vision-right-section">
          <img src={aboutUsContent.visionImage} alt={aboutUsContent.vision} />
        </div>
      </section>

      <Footer/>
    </>
  );
}

export default About;
