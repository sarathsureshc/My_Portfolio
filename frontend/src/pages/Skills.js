import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Skills.css';

const Skills = () => {
  const { portfolioData } = usePortfolio();
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

  const skillVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const skillCategories = portfolioData?.skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {}) || {};

  return (
    <div className="page-container">
      <Navbar />
      <div className="skills-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="skills-title"
        >
          My Skills
        </motion.h1>
        
        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.entries(skillCategories).map(([category, skills]) => (
            <motion.div 
              key={category}
              className="skill-category"
              variants={skillVariants}
            >
              <h2 className="category-title">{category}</h2>
              <div className="skills-list">
                {skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    variants={skillVariants}
                  >
                    <div className="skill-icon">
                      {skill.icon && <img src={skill.icon} alt={skill.name} />}
                    </div>
                    <div className="skill-info">
                      <h3>{skill.name}</h3>
                      <div className="skill-level">
                        <div 
                          className="skill-progress"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer personalInfo={personalInfo} />
    </div>
  );
};

export default Skills;