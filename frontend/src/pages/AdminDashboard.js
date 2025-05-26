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
import PropTypes from 'prop-types';

// Tab Components
const PersonalInfoTab = ({ data, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const { updatePersonalInfo } = usePortfolio();

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    
    if (formData.profileImage && typeof formData.profileImage === 'object') {
      submitData.append('profileImage', formData.profileImage);
    }

    const personalInfoData = { ...formData };
    delete personalInfoData.profileImage;
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
          {/* Other form fields */}
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

const SkillsTab = ({ data, onAdd, onEdit }) => {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Skills</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Skill
        </button>
      </div>
      <div className="data-grid">
        {data.map((skill) => (
          <div key={skill._id} className="data-card">
            <h3>{skill.name}</h3>
            <p>{skill.category}</p>
            <p>{skill.level}</p>
            <div className="card-actions">
              <button onClick={() => onEdit(skill)} className="btn-icon">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectsTab = ({ data, onAdd, onEdit }) => {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Projects</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Project
        </button>
      </div>
      <div className="data-grid">
        {data.map((project) => (
          <div key={project._id} className="data-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="card-actions">
              <button onClick={() => onEdit(project)} className="btn-icon">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExperienceTab = ({ data, onAdd, onEdit }) => {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Experience</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Experience
        </button>
      </div>
      <div className="data-list">
        {data.map((exp) => (
          <div key={exp._id} className="data-card">
            <h3>{exp.position}</h3>
            <p>{exp.company}</p>
            <div className="card-actions">
              <button onClick={() => onEdit(exp)} className="btn-icon">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EducationTab = ({ data, onAdd, onEdit }) => {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Education</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Education
        </button>
      </div>
      <div className="data-list">
        {data.map((edu) => (
          <div key={edu._id} className="data-card">
            <h3>{edu.degree}</h3>
            <p>{edu.institution}</p>
            <div className="card-actions">
              <button onClick={() => onEdit(edu)} className="btn-icon">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CertificatesTab = ({ data, onAdd, onEdit }) => {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Certificates</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Certificate
        </button>
      </div>
      <div className="data-grid">
        {data.map((cert) => (
          <div key={cert._id} className="data-card">
            <h3>{cert.name}</h3>
            <p>{cert.issuer}</p>
            <div className="card-actions">
              <button onClick={() => onEdit(cert)} className="btn-icon">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LanguagesTab = ({ data, onAdd, onEdit }) => {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Languages</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Language
        </button>
      </div>
      <div className="data-list">
        {data.map((lang) => (
          <div key={lang._id} className="data-card">
            <h3>{lang.name}</h3>
            <p>{lang.proficiency}</p>
            <div className="card-actions">
              <button onClick={() => onEdit(lang)} className="btn-icon">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MessagesTab = ({ data, onRefresh }) => {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Messages</h2>
        <button onClick={onRefresh} className="btn btn-secondary">
          Refresh
        </button>
      </div>
      <div className="messages-list">
        {data.map((message) => (
          <div key={message._id} className="message-card">
            <h3>{message.subject}</h3>
            <p>{message.message}</p>
            <div className="message-meta">
              <span>{message.name}</span>
              <span>{message.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes for all tab components
PersonalInfoTab.propTypes = {
  data: PropTypes.object,
  onSave: PropTypes.func.isRequired
};

SkillsTab.propTypes = {
  data: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

ProjectsTab.propTypes = {
  data: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

ExperienceTab.propTypes = {
  data: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

EducationTab.propTypes = {
  data: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

CertificatesTab.propTypes = {
  data: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

LanguagesTab.propTypes = {
  data: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

MessagesTab.propTypes = {
  data: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired
};

// Main AdminDashboard component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
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
      toast.error('Failed to fetch messages');
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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setEditingItem(null);
  };

  const handleTabSave = (tabName) => {
    toast.success(`${tabName} updated successfully`);
    closeModal();
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
            <PersonalInfoTab 
              data={portfolioData?.personalInfo}
              onSave={() => handleTabSave('Personal Info')}
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
        {/* Modal content will be rendered by individual form components */}
      </Modal>
    </div>
  );
};

export default AdminDashboard;