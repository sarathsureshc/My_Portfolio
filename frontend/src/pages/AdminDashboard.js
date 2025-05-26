import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaCode, FaProjectDiagram, FaBriefcase, 
  FaGraduationCap, FaCertificate, FaLanguage, 
  FaEnvelope, FaSignOutAlt, FaPlus, FaEdit, 
  FaTrash, FaSave, FaTimes 
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import Modal from '../components/Modal';
import './AdminDashboard.css';
import SkillForm from '../components/SkillForm';
import ProjectForm from '../components/ProjectForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import CertificateForm from '../components/CertificateForm';
import LanguageForm from '../components/LanguageForm';
import PropTypes from 'prop-types';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [messages, setMessages] = useState([]);
  
  const { logout, user } = useAuth();
  const { portfolioData, loading } = usePortfolio();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/portfolio/messages`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item || {});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setEditingItem(null);
    setFormData({});
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic will be handled by individual form components
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: FaUser },
    { id: 'skills', label: 'Skills', icon: FaCode },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'certificates', label: 'Certificates', icon: FaCertificate },
    { id: 'languages', label: 'Languages', icon: FaLanguage },
    { id: 'messages', label: 'Messages', icon: FaEnvelope }
  ];

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-user">
          <span>Welcome, {user?.username}</span>
          <button onClick={handleLogout} className="btn btn-secondary">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        <nav className="admin-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </nav>

        <main className="admin-main">
          {activeTab === 'personal' && (
            // Where PersonalInfoTab is used
            <PersonalInfoTab 
              data={personalInfoData} 
              onSave={() => handleTabSave('personalInfo')} 
            />
          )}
          
          {activeTab === 'skills' && (
            <SkillsTab 
              data={portfolioData?.skills || []}
              onAdd={() => openModal('skill')}
              onEdit={(item) => openModal('skill', item)}
            />
          )}
          
          {activeTab === 'projects' && (
            <ProjectsTab 
              data={portfolioData?.projects || []}
              onAdd={() => openModal('project')}
              onEdit={(item) => openModal('project', item)}
            />
          )}
          
          {activeTab === 'experience' && (
            <ExperienceTab 
              data={portfolioData?.experience || []}
              onAdd={() => openModal('experience')}
              onEdit={(item) => openModal('experience', item)}
            />
          )}
          
          {activeTab === 'education' && (
            <EducationTab 
              data={portfolioData?.education || []}
              onAdd={() => openModal('education')}
              onEdit={(item) => openModal('education', item)}
            />
          )}
          
          {activeTab === 'certificates' && (
            <CertificatesTab 
              data={portfolioData?.certificates || []}
              onAdd={() => openModal('certificate')}
              onEdit={(item) => openModal('certificate', item)}
            />
          )}
          
          {activeTab === 'languages' && (
            <LanguagesTab 
              data={portfolioData?.languages || []}
              onAdd={() => openModal('language')}
              onEdit={(item) => openModal('language', item)}
            />
          )}
          
          {activeTab === 'messages' && (
            <MessagesTab 
              data={messages}
              onRefresh={fetchMessages}
            />
          )}
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${editingItem ? 'Edit' : 'Add'} ${modalType}`}
        size="large"
      >
        {modalType === 'skill' && (
          <SkillForm 
            data={formData}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
        {modalType === 'project' && (
          <ProjectForm 
            data={formData}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
        {modalType === 'experience' && (
          <ExperienceForm 
            data={formData}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
        {modalType === 'education' && (
          <EducationForm 
            data={formData}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
        {modalType === 'certificate' && (
          <CertificateForm 
            data={formData}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
        {modalType === 'language' && (
          <LanguageForm 
            data={formData}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
      </Modal>
    </div>
  );
};

// Personal Info Tab Component
const PersonalInfoTab = ({ data, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const { updatePersonalInfo } = usePortfolio();

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const validateForm = (data) => {
    const errors = {};
    
    if (!data.name?.trim()) errors.name = 'Name is required';
    if (!data.email?.trim()) errors.email = 'Email is required';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }
    
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateForm(formData);
    if (errors) {
      Object.values(errors).forEach(error => toast.error(error));
      setLoading(false);
      return;
    }

    const submitData = new FormData();
    
    // Handle profile image separately
    if (formData.profileImage && typeof formData.profileImage === 'object') {
      submitData.append('profileImage', formData.profileImage);
    }

    // Remove profileImage from personalInfo data
    const personalInfoData = { ...formData };
    delete personalInfoData.profileImage;

    // Append personal info as JSON string
    submitData.append('personalInfo', JSON.stringify(personalInfoData));

    const result = await updatePersonalInfo(submitData);
    
    if (result.success) {
      onSave();
      toast.success('Personal information updated successfully');
    } else {
      toast.error(result.message || 'Failed to update personal information');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Personal Information</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="Your professional title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="Your email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="Your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              placeholder="Your location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleChange}
              accept="image/*"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="summary">Summary</label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary || ''}
              onChange={handleChange}
              placeholder="A brief summary about yourself"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn URL</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin || ''}
              onChange={handleChange}
              placeholder="Your LinkedIn profile URL"
            />
          </div>

          <div className="form-group">
            <label htmlFor="github">GitHub URL</label>
            <input
              type="url"
              id="github"
              name="github"
              value={formData.github || ''}
              onChange={handleChange}
              placeholder="Your GitHub profile URL"
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Personal Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website || ''}
              onChange={handleChange}
              placeholder="Your personal website URL"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

PersonalInfoTab.propTypes = {
  data: PropTypes.object,
  onSave: PropTypes.func.isRequired
};