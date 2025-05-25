import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './About.css';

const About = () => {
  const { portfolioData, loading } = usePortfolio();
  const personalInfo = portfolioData?.personalInfo || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="page-container">
      <Navbar />
      <div className="about-container">
        <motion.div
          className="about-hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>About Me</h1>
          <p className="subtitle">{personalInfo.title || 'Full Stack Developer & Tech Enthusiast'}</p>
        </motion.div>

        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="bio-section" variants={sectionVariants}>
            <h2>My Journey</h2>
            <p>{personalInfo.summary || 'Add your professional summary in your dashboard.'}</p>
          </motion.div>

          <motion.div className="contact-section" variants={sectionVariants}>
            <h2>Contact Info</h2>
            <ul className="contact-list">
              <li><strong>Name:</strong> {personalInfo.name}</li>
              <li><strong>Email:</strong> {personalInfo.email}</li>
              <li><strong>Phone:</strong> {personalInfo.phone}</li>
              <li><strong>Location:</strong> {personalInfo.location}</li>
              <li>
                <strong>LinkedIn:</strong>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  {personalInfo.linkedin}
                </a>
              </li>
              <li>
                <strong>GitHub:</strong>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  {personalInfo.github}
                </a>
              </li>
              <li>
                <strong>Website:</strong>
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer">
                  {personalInfo.website}
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
      <Footer personalInfo={personalInfo} />
    </div>
  );
};

export default About;