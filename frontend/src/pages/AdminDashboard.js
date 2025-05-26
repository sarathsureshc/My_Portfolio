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
import SkillForm from '../components/SkillForm';
import ProjectForm from '../components/ProjectForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import CertificateForm from '../components/CertificateForm';
import LanguageForm from '../components/LanguageForm';

// Personal Info Tab Component
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
            <label htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleChange}
              accept="image/*"
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
            <label htmlFor="website">Website URL</label>
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

// Generic Tab Component for other sections
const GenericTab = ({ title, data, onAdd, onEdit, onDelete }) => {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>{title}</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add {title.slice(0, -1)}
        </button>
      </div>
      <div className="data-grid">
        {data.map((item) => (
          <div key={item._id} className="data-card">
            <h3>{item.name || item.title || item.degree || item.position}</h3>
            <p>{item.category || item.company || item.institution || item.description}</p>
            {item.level && <p>Level: {item.level}</p>}
            {item.proficiency && <p>Proficiency: {item.proficiency}</p>}
            <div className="card-actions">
              <button onClick={() => onEdit(item)} className="btn-icon">
                <FaEdit />
              </button>
              <button 
                onClick={() => onDelete(item._id)} 
                className="btn-icon btn-danger"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Messages Tab Component
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
              <span>{new Date(message.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes
PersonalInfoTab.propTypes = {
  data: PropTypes.object,
  onSave: PropTypes.func.isRequired
};

GenericTab.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

MessagesTab.propTypes = {
  data: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired
};

// Main AdminDashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [messages, setMessages] = useState([]);
  
  const { logout, user } = useAuth();
  const { portfolioData, loading, fetchPortfolioData, deleteSkill, deleteProject, deleteExperience, deleteEducation, deleteCertificate, deleteLanguage } = usePortfolio();

  const handleDelete = async (type, id) => {
    try {
      let result;
      switch (type) {
        case 'skills':
          result = await deleteSkill(id);
          break;
        case 'projects':
          result = await deleteProject(id);
          break;
        case 'experience':
          result = await deleteExperience(id);
          break;
        case 'education':
          result = await deleteEducation(id);
          break;
        case 'certificates':
          result = await deleteCertificate(id);
          break;
        case 'languages':
          result = await deleteLanguage(id);
          break;
        default:
          toast.error('Invalid type');
          return;
      }

      if (result.success) {
        toast.success(`${type} deleted successfully`);
      } else {
        toast.error(result.message || `Failed to delete ${type}`);
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      toast.error(`Failed to delete ${type}`);
    }
  };
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
            <GenericTab 
              title="Skills"
              data={portfolioData?.skills || []}
              onAdd={() => openModal('skill')}
              onEdit={(item) => openModal('skill', item)}
              onDelete={(id) => handleDelete('skills', id)}
            />
          )}
          
          {activeTab === 'projects' && (
            <GenericTab 
              title="Projects"
              data={portfolioData?.projects || []}
              onAdd={() => openModal('project')}
              onEdit={(item) => openModal('project', item)}
              onDelete={(id) => handleDelete('projects', id)}
            />
          )}
          
          {activeTab === 'experience' && (
            <GenericTab 
              title="Experience"
              data={portfolioData?.experience || []}
              onAdd={() => openModal('experience')}
              onEdit={(item) => openModal('experience', item)}
              onDelete={(id) => handleDelete('experience', id)}
            />
          )}
          
          {activeTab === 'education' && (
            <GenericTab 
              title="Education"
              data={portfolioData?.education || []}
              onAdd={() => openModal('education')}
              onEdit={(item) => openModal('education', item)}
              onDelete={(id) => handleDelete('education', id)}
            />
          )}
          
          {activeTab === 'certificates' && (
            <GenericTab 
              title="Certificates"
              data={portfolioData?.certificates || []}
              onAdd={() => openModal('certificate')}
              onEdit={(item) => openModal('certificate', item)}
              onDelete={(id) => handleDelete('certificates', id)}
            />
          )}
          
          {activeTab === 'languages' && (
            <GenericTab 
              title="Languages"
              data={portfolioData?.languages || []}
              onAdd={() => openModal('language')}
              onEdit={(item) => openModal('language', item)}
              onDelete={(id) => handleDelete('languages', id)}
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
            data={editingItem}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
        {modalType === 'project' && (
          <ProjectForm
            data={editingItem}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
        {modalType === 'experience' && (
          <ExperienceForm
            data={editingItem}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
        {modalType === 'education' && (
          <EducationForm
            data={editingItem}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
        {modalType === 'certificate' && (
          <CertificateForm
            data={editingItem}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
        {modalType === 'language' && (
          <LanguageForm
            data={editingItem}
            onClose={closeModal}
            isEditing={!!editingItem}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;