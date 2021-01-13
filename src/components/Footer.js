import React from "react";
import Logo from '../assets/logo.svg';
import {footerContent} from '../Content';
import {Link} from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top-section">
        <section className="footer-item">
          <img src={Logo} alt="jag logo"/>
          <p className="footer-short-bio">{footerContent.shortBio}</p>
        </section>
        <section className="footer-item">
          <h3>Pages</h3>
          <div className="footer-pages-link">
            {footerContent.pages.map((page, index) => (
              <Link
                className="footer-pages-link-item"
                key={index}
                to={page.path}>
                {page.label}
              </Link>
            ))}
          </div>
        </section>
        <section className="footer-item">
          <h3>Social</h3>
          <div className="footer-pages-link">
            {footerContent.social.map((social, index) => (
              <a
                className="footer-pages-link-item"
                key={index}
                href={social.url}
              >
                {social.label}
              </a>
            ))}
          </div>
        </section>
      </div>
      <div className="footer-divider">
      </div>
      <div className="footer-bottom-section">
        {footerContent.social.map((social, index) => (
          <a className="footer-social-icon" href={social.url} key={index}>
            <img className="footer-social-icon" src={social.image} alt={social.type}/>
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer;
