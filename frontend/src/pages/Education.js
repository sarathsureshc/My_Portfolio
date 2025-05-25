import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Education.css';

const Education = () => {
  const { portfolioData } = usePortfolio();
  const personalInfo = portfolioData?.personalInfo || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="education-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="education-title"
        >
          Education
        </motion.h1>

        <motion.div
          className="education-timeline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {portfolioData?.education?.map((edu, index) => (
            <motion.div
              key={index}
              className="education-item"
              variants={itemVariants}
            >
              <div className="education-content">
                <div className="education-date">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </div>
                <h3 className="education-degree">{edu.degree}</h3>
                <h4 className="education-institution">{edu.institution}</h4>
                <p className="education-location">{edu.location}</p>
                {edu.description && (
                  <p className="education-description">{edu.description}</p>
                )}
                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="education-achievements">
                    <h5>Achievements:</h5>
                    <ul>
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer personalInfo={personalInfo} />
    </div>
  );
};

export default Education;