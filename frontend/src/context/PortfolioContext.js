import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get(`${API_URL}/portfolio`);
      setPortfolioData(response.data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePersonalInfo = async (formData) => {
    try {
      const response = await axios.put(`${API_URL}/portfolio/personal-info`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      setPortfolioData(prev => ({
        ...prev,
        personalInfo: response.data.data
      }));
      
      return { success: true };
    } catch (error) {
      console.error('Error updating personal info:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Update failed' 
      };
    }
  };

  const addSkill = async (skillData) => {
    try {
      const response = await axios.post(`${API_URL}/portfolio/skills`, skillData);
      setPortfolioData(prev => ({
        ...prev,
        skills: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add skill' 
      };
    }
  };

  const updateSkill = async (id, skillData) => {
    try {
      const response = await axios.put(`${API_URL}/portfolio/skills/${id}`, skillData);
      setPortfolioData(prev => ({
        ...prev,
        skills: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update skill' 
      };
    }
  };

  const deleteSkill = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/portfolio/skills/${id}`);
      setPortfolioData(prev => ({
        ...prev,
        skills: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete skill' 
      };
    }
  };

  const addProject = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/portfolio/projects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPortfolioData(prev => ({
        ...prev,
        projects: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add project' 
      };
    }
  };

  const updateProject = async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/portfolio/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPortfolioData(prev => ({
        ...prev,
        projects: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update project' 
      };
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/portfolio/projects/${id}`);
      setPortfolioData(prev => ({
        ...prev,
        projects: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete project' 
      };
    }
  };

  const addExperience = async (experienceData) => {
    try {
      const response = await axios.post(`${API_URL}/portfolio/experience`, experienceData);
      setPortfolioData(prev => ({
        ...prev,
        experience: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add experience' 
      };
    }
  };

  const updateExperience = async (id, experienceData) => {
    try {
      const response = await axios.put(`${API_URL}/portfolio/experience/${id}`, experienceData);
      setPortfolioData(prev => ({
        ...prev,
        experience: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update experience' 
      };
    }
  };

  const deleteExperience = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/portfolio/experience/${id}`);
      setPortfolioData(prev => ({
        ...prev,
        experience: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete experience' 
      };
    }
  };

  const addEducation = async (educationData) => {
    try {
      const response = await axios.post(`${API_URL}/portfolio/education`, educationData);
      setPortfolioData(prev => ({
        ...prev,
        education: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add education' 
      };
    }
  };

  const updateEducation = async (id, educationData) => {
    try {
      const response = await axios.put(`${API_URL}/portfolio/education/${id}`, educationData);
      setPortfolioData(prev => ({
        ...prev,
        education: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update education' 
      };
    }
  };

  const deleteEducation = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/portfolio/education/${id}`);
      setPortfolioData(prev => ({
        ...prev,
        education: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete education' 
      };
    }
  };

  const addCertificate = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/portfolio/certificates`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPortfolioData(prev => ({
        ...prev,
        certificates: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add certificate' 
      };
    }
  };

  const updateCertificate = async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/portfolio/certificates/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPortfolioData(prev => ({
        ...prev,
        certificates: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update certificate' 
      };
    }
  };

  const deleteCertificate = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/portfolio/certificates/${id}`);
      setPortfolioData(prev => ({
        ...prev,
        certificates: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete certificate' 
      };
    }
  };

  const addLanguage = async (languageData) => {
    try {
      const response = await axios.post(`${API_URL}/portfolio/languages`, languageData);
      setPortfolioData(prev => ({
        ...prev,
        languages: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add language' 
      };
    }
  };

  const updateLanguage = async (id, languageData) => {
    try {
      const response = await axios.put(`${API_URL}/portfolio/languages/${id}`, languageData);
      setPortfolioData(prev => ({
        ...prev,
        languages: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update language' 
      };
    }
  };

  const deleteLanguage = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/portfolio/languages/${id}`);
      setPortfolioData(prev => ({
        ...prev,
        languages: response.data.data
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete language' 
      };
    }
  };

  const sendMessage = async (messageData) => {
    try {
      await axios.post(`${API_URL}/portfolio/contact`, messageData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to send message' 
      };
    }
  };

  const value = {
    portfolioData,
    loading,
    fetchPortfolioData,
    updatePersonalInfo,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    sendMessage
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};