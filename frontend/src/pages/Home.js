import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePortfolio } from '../context/PortfolioContext';
import './Home.css';

const Home = () => {
  const { portfolioData, loading } = usePortfolio();

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const personalInfo = portfolioData?.personalInfo || {};
  const skills = portfolioData?.skills || [];
  const projects = portfolioData?.projects || [];

  return (
    <div className="home">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-text"
            >
              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">{personalInfo.name || 'Your Name'}</span>
              </h1>
              <h2 className="hero-subtitle">
                {personalInfo.title || 'Full Stack Developer'}
              </h2>
              <p className="hero-description">
                I’m a self-taught Full Stack Web Developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js), with a strong foundation in building scalable, responsive, and user-centric web applications.
              </p>

              <div className="hero-buttons">
                <Link to="/projects" className="btn btn-primary">
                  View My Work <FaArrowRight />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Get In Touch
                </Link>
              </div>

              <div className="hero-social">
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                )}
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`}>
                    <FaEnvelope />
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-image"
            >
              {personalInfo.profileImage ? (
                <img src={personalInfo.profileImage} alt={personalInfo.name} />
              ) : (
                <div className="placeholder-image">
                  <span>{personalInfo.name?.charAt(0) || 'Y'}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      {skills.length > 0 && (
        <section className="skills-preview section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Skills & Technologies</h2>
              <div className="skills-grid">
                {skills.slice(0, 8).map((skill, index) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="skill-item"
                  >
                    <div className="skill-icon">
                      {skill.icon ? (
                        <img src={skill.icon} alt={skill.name} />
                      ) : (
                        skill.name.charAt(0)
                      )}
                    </div>
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/skills" className="btn btn-secondary">
                  View All Skills
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="projects-preview section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Featured Projects</h2>
              <div className="projects-grid">
                {projects.slice(0, 3).map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="project-card"
                  >
                    <div className="project-image">
                      {project.image ? (
                        <img src={project.image} alt={project.title} />
                      ) : (
                        <div className="placeholder-project">
                          <span>{project.title.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="project-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-tech">
                        {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                          <span key={techIndex} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                            <FaGithub /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/projects" className="btn btn-secondary">
                  View All Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to work together?</h2>
            <p>I'm always interested in new opportunities and challenging projects.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Start a Project
              </Link>
              <Link to="/resume" className="btn btn-secondary">
                <FaDownload /> Download Resume
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer personalInfo={personalInfo} />
    </div>
  );
};

export default Home;