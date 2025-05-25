import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Projects.css';

const Projects = () => {
  const { portfolioData } = usePortfolio();

  return (
    <div className="projects-container">
      <Navbar />
      <motion.div
        className="projects-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>My Projects</h1>
        <div className="projects-grid">
          {portfolioData?.projects?.map((project, index) => (
            <motion.div
              key={project._id}
              className="project-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-links">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Projects;