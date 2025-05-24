import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = ({ personalInfo }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{personalInfo?.name || 'Your Name'}</h3>
            <p>{personalInfo?.title || 'Full Stack Developer'}</p>
            <p>{personalInfo?.summary || 'Building amazing digital experiences'}</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <a href="/">Home</a>
              {/* <a href="/about">About</a> */}
              <a href="/projects">Projects</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              {personalInfo?.github && (
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              )}
              {personalInfo?.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              )}
              {personalInfo?.email && (
                <a href={`mailto:${personalInfo.email}`}>
                  <FaEnvelope />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            © {currentYear} {personalInfo?.name || 'Your Name'}. Made with <FaHeart className="heart" /> 
            using React & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;