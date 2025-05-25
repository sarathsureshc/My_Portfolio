import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Certificates.css';

const Certificates = () => {
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

  const certificateVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="certificates-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="certificates-title"
        >
          Certificates & Achievements
        </motion.h1>

        <motion.div
          className="certificates-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {portfolioData?.certificates?.map((certificate, index) => (
            <motion.div
              key={index}
              className="certificate-card"
              variants={certificateVariants}
            >
              {certificate.image && (
                <div className="certificate-image">
                  <img src={certificate.image} alt={certificate.name} />
                </div>
              )}
              <div className="certificate-content">
                <h3 className="certificate-name">{certificate.name}</h3>
                <p className="certificate-issuer">{certificate.issuer}</p>
                <p className="certificate-date">{certificate.date}</p>
                {certificate.description && (
                  <p className="certificate-description">{certificate.description}</p>
                )}
                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-link"
                  >
                    View Certificate
                  </a>
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

export default Certificates;