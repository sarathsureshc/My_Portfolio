import React, { useRef } from 'react';
import { FaDownload, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePortfolio } from '../context/PortfolioContext';
import './Resume.css';

const Resume = () => {
  const { portfolioData, loading } = usePortfolio();
  const resumeRef = useRef();

  const handleDownload = async () => {
    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${portfolioData?.personalInfo?.name || 'Resume'}.pdf`);
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to download resume. Please try again.');
    }
  };

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
  const experience = portfolioData?.experience || [];
  const education = portfolioData?.education || [];
  const certificates = portfolioData?.certificates || [];
  const languages = portfolioData?.languages || [];

  return (
    <div className="resume-page">
      <Navbar />
      
      <div className="resume-container">
        <div className="resume-header">
          <h1>Resume</h1>
          <p>ATS-Friendly Format</p>
          <button onClick={handleDownload} className="btn btn-primary download-btn">
            <FaDownload /> Download PDF
          </button>
        </div>

        <div className="resume-content" ref={resumeRef}>
          {/* Header Section */}
          <header className="resume-header-section">
            <div className="resume-name">
              <h1>{personalInfo.name || 'Your Name'}</h1>
              <h2>{personalInfo.title || 'Professional Title'}</h2>
            </div>
            
            <div className="resume-contact">
              {personalInfo.email && (
                <div className="contact-item">
                  <FaEnvelope />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="contact-item">
                  <FaPhone />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="contact-item">
                  <FaLinkedin />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="contact-item">
                  <FaGithub />
                  <span>{personalInfo.github}</span>
                </div>
              )}
            </div>
          </header>

          {/* Professional Summary */}
          {personalInfo.summary && (
            <section className="resume-section">
              <h3>Professional Summary</h3>
              <p>{personalInfo.summary}</p>
            </section>
          )}

          {/* Technical Skills */}
          {skills.length > 0 && (
            <section className="resume-section">
              <h3>Technical Skills</h3>
              <div className="skills-categories">
                {['Technical', 'Programming Language', 'Framework', 'Database', 'Tools'].map(category => {
                  const categorySkills = skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category} className="skill-category">
                      <strong>{category}:</strong>
                      <span>{categorySkills.map(skill => skill.name).join(', ')}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Professional Experience */}
          {experience.length > 0 && (
            <section className="resume-section">
              <h3>Professional Experience</h3>
              {experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <div>
                      <h4>{exp.position}</h4>
                      <p className="company">{exp.company} - {exp.location}</p>
                    </div>
                    <div className="date-range">
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                      {exp.current ? ' Present' : ` ${new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="experience-description">{exp.description}</p>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="achievements">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <p className="technologies">
                      <strong>Technologies:</strong> {exp.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Key Projects */}
          {projects.length > 0 && (
            <section className="resume-section">
              <h3>Key Projects</h3>
              {projects.slice(0, 3).map((project, index) => (
                <div key={index} className="project-item">
                  <div className="project-header">
                    <h4>{project.title}</h4>
                    <div className="project-links">
                      {project.liveUrl && <span>Live: {project.liveUrl}</span>}
                      {project.githubUrl && <span>GitHub: {project.githubUrl}</span>}
                    </div>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  {project.features && project.features.length > 0 && (
                    <ul className="project-features">
                      {project.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="technologies">
                      <strong>Technologies:</strong> {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="resume-section">
              <h3>Education</h3>
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-header">
                    <div>
                      <h4>{edu.degree} in {edu.field}</h4>
                      <p className="institution">{edu.institution}</p>
                    </div>
                    <div className="date-range">
                      {new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                      {new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  
                  {edu.gpa && (
                    <p className="gpa">GPA: {edu.gpa}</p>
                  )}
                  
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="achievements">
                      {edu.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certificates.length > 0 && (
            <section className="resume-section">
              <h3>Certifications</h3>
              <div className="certifications-list">
                {certificates.map((cert, index) => (
                  <div key={index} className="certification-item">
                    <div className="cert-header">
                      <h4>{cert.name}</h4>
                      <span className="cert-date">
                        {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="cert-issuer">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="credential-id">Credential ID: {cert.credentialId}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="resume-section">
              <h3>Languages</h3>
              <div className="languages-list">
                {languages.map((lang, index) => (
                  <span key={index} className="language-item">
                    {lang.name} ({lang.proficiency})
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer personalInfo={personalInfo} />
    </div>
  );
};

export default Resume;