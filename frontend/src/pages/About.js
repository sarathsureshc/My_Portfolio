import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import './About.css';

const About = () => {
  const { portfolioData, loading } = usePortfolio();
  const personalInfo = portfolioData?.personalInfo || {};

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Me</h1>
        <p className="subtitle">{personalInfo.title || 'Full Stack Developer & Tech Enthusiast'}</p>
      </section>
      <section className="about-content">
        <div className="bio-section">
          <h2>My Journey</h2>
          <p>{personalInfo.summary || 'Add your professional summary in your dashboard.'}</p>
        </div>
        <div className="values-section">
          <h2>Contact Info</h2>
          <ul>
            <li><strong>Name:</strong> {personalInfo.name}</li>
            <li><strong>Email:</strong> {personalInfo.email}</li>
            <li><strong>Phone:</strong> {personalInfo.phone}</li>
            <li><strong>Location:</strong> {personalInfo.location}</li>
            <li><strong>LinkedIn:</strong> <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">{personalInfo.linkedin}</a></li>
            <li><strong>GitHub:</strong> <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">{personalInfo.github}</a></li>
            <li><strong>Website:</strong> <a href={personalInfo.website} target="_blank" rel="noopener noreferrer">{personalInfo.website}</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;