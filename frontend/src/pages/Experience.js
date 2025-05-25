import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Experience.css';

const Experience = () => {
  const { portfolioData } = usePortfolio();

  return (
    <div className="experience-container">
      <Navbar />
      <motion.div
        className="experience-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Work Experience</h1>
        <div className="experience-timeline">
          {portfolioData?.experience?.map((exp, index) => (
            <motion.div
              key={exp._id}
              className="experience-card"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="experience-header">
                <h3>{exp.position}</h3>
                <p className="company">{exp.company}</p>
                <p className="duration">{exp.startDate} - {exp.endDate || 'Present'}</p>
              </div>
              <div className="experience-body">
                <p>{exp.description}</p>
                <ul className="responsibilities">
                  {exp.responsibilities?.map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
                <div className="technologies">
                  <h4>Technologies:</h4>
                  <div className="tech-tags">
                    {exp.technologies?.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Experience;