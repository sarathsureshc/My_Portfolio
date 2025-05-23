// pages/Contact.js
import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePortfolio } from '../context/PortfolioContext';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { portfolioData, sendMessage } = usePortfolio();
  const personalInfo = portfolioData?.personalInfo || {};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const result = await sendMessage(formData);
    
    if (result.success) {
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      toast.error(result.message || 'Failed to send message. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="contact-page">
      <Navbar />
      
      <div className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>Get In Touch</h1>
            <p>Let's discuss your next project or just say hello!</p>
          </motion.div>
        </div>
      </div>

      <section className="contact-section section">
        <div className="container">
          <div className="contact-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="contact-info"
            >
              <h2>Let's Connect</h2>
              <p>
                I'm always interested in hearing about new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="contact-details">
                {personalInfo.email && (
                  <div className="contact-item">
                    <div className="contact-icon">
                      <FaEnvelope />
                    </div>
                    <div className="contact-text">
                      <h4>Email</h4>
                      <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                    </div>
                  </div>
                )}

                {personalInfo.phone && (
                  <div className="contact-item">
                    <div className="contact-icon">
                      <FaPhone />
                    </div>
                    <div className="contact-text">
                      <h4>Phone</h4>
                      <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                    </div>
                  </div>
                )}

                {personalInfo.location && (
                  <div className="contact-item">
                    <div className="contact-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="contact-text">
                      <h4>Location</h4>
                      <span>{personalInfo.location}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="social-connect">
                <h4>Follow Me</h4>
                <div className="social-links">
                  {personalInfo.linkedin && (
                    <a 
                      href={personalInfo.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <FaLinkedin />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  
                  {personalInfo.github && (
                    <a 
                      href={personalInfo.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="contact-form-container"
            >
              <form onSubmit={handleSubmit} className="contact-form">
                <h3>Send a Message</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    rows="6"
                    placeholder="Tell me about your project or idea..."
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary submit-btn ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner-small"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
            
            <div className="faq-grid">
              <div className="faq-item">
                <h4>What's your typical response time?</h4>
                <p>I usually respond within 24-48 hours. For urgent matters, feel free to mention it in your message.</p>
              </div>
              
              <div className="faq-item">
                <h4>What type of projects do you work on?</h4>
                <p>I work on full-stack web applications, mobile apps, API development, and system architecture projects.</p>
              </div>
              
              <div className="faq-item">
                <h4>Do you work with international clients?</h4>
                <p>Yes! I work with clients globally and am comfortable with remote collaboration across different time zones.</p>
              </div>
              
              <div className="faq-item">
                <h4>What's your preferred way of communication?</h4>
                <p>Email works great for initial contact. For ongoing projects, I'm flexible with Slack, Discord, or video calls.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer personalInfo={personalInfo} />
    </div>
  );
};

export default Contact;