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
            <PersonalInfoTab 
              data={portfolioData?.personalInfo} 
              onSave={() => toast.success('Personal info updated')}
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
  const [formData, setFormData] = useState(data || {});
  const [loading, setLoading] = useState(false);
  const { updatePersonalInfo } = usePortfolio();

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'profileImage' || typeof formData[key] === 'object') {
        submitData.append(key === 'profileImage' ? key : 'personalInfo', 
          key === 'profileImage' ? formData[key] : 
          key === 'personalInfo' ? JSON.stringify(formData) : formData[key]);
      }
    });

    if (typeof formData.profileImage === 'object') {
      submitData.append('profileImage', formData.profileImage);
    }
    
    submitData.append('personalInfo', JSON.stringify(formData));

    const result = await updatePersonalInfo(submitData);
    
    if (result.success) {
      onSave();
    } else {
      toast.error(result.message);
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
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="Your full name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Professional Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Full Stack Developer"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="City, Country"
            />
          </div>

          <div className="form-group">
            <label className="form-label">LinkedIn URL</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input
              type="url"
              name="github"
              value={formData.github || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="https://github.com/yourusername"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Website URL</label>
            <input
              type="url"
              name="website"
              value={formData.website || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Professional Summary</label>
          <textarea
            name="summary"
            value={formData.summary || ''}
            onChange={handleChange}
            className="form-input form-textarea"
            rows="4"
            placeholder="Write a brief professional summary..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            className="form-input"
            accept="image/*"
          />
        </div>

        <button 
          type="submit" 
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

// Skills Tab Component  
const SkillsTab = ({ data, onAdd, onEdit }) => {
  const { deleteSkill } = usePortfolio();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      const result = await deleteSkill(id);
      if (result.success) {
        toast.success('Skill deleted successfully');
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Skills Management</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Skill
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((skill) => (
              <tr key={skill._id}>
                <td>{skill.name}</td>
                <td>{skill.category}</td>
                <td>{skill.level}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => onEdit(skill)}
                      className="btn-icon btn-edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(skill._id)}
                      className="btn-icon btn-delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="empty-state">
            <p>No skills added yet. Click "Add Skill" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Projects Tab Component
const ProjectsTab = ({ data, onAdd, onEdit }) => {
  const { deleteProject } = usePortfolio();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const result = await deleteProject(id);
      if (result.success) {
        toast.success('Project deleted successfully');
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Projects Management</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Project
        </button>
      </div>

      <div className="projects-grid">
        {data.map((project) => (
          <div key={project._id} className="project-card-admin">
            {project.image && (
              <img src={project.image} alt={project.title} className="project-image-admin" />
            )}
            <div className="project-content-admin">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-meta">
                <span>Status: {project.status}</span>
                <span>Technologies: {project.technologies?.length || 0}</span>
              </div>
              <div className="action-buttons">
                <button 
                  onClick={() => onEdit(project)}
                  className="btn btn-secondary btn-sm"
                >
                  <FaEdit /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="btn btn-danger btn-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {data.length === 0 && (
        <div className="empty-state">
          <p>No projects added yet. Click "Add Project" to get started.</p>
        </div>
      )}
    </div>
  );
};

// Experience Tab Component
const ExperienceTab = ({ data, onAdd, onEdit }) => {
  const { deleteExperience } = usePortfolio();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience entry?')) {
      const result = await deleteExperience(id);
      if (result.success) {
        toast.success('Experience entry deleted successfully');
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Experience Management</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Experience
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((exp) => (
              <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.position}</td>
                <td>{exp.startDate}</td>
                <td>{exp.endDate}</td>
                <td>{exp.description}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => onEdit(exp)}
                      className="btn-icon btn-edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(exp._id)}
                      className="btn-icon btn-delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="empty-state">
            <p>No experience entries added yet. Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Education Tab Component
const EducationTab = ({ data, onAdd, onEdit }) => {
  const { deleteEducation } = usePortfolio();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      const result = await deleteEducation(id);
      if (result.success) {
        toast.success('Education entry deleted successfully');
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Education Management</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Education
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Institution</th>
              <th>Degree</th>
              <th>Field</th>
              <th>Start Year</th>
              <th>End Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((edu) => (
              <tr key={edu._id}>
                <td>{edu.institution}</td>
                <td>{edu.degree}</td>
                <td>{edu.fieldOfStudy}</td>
                <td>{edu.startYear}</td>
                <td>{edu.endYear}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => onEdit(edu)}
                      className="btn-icon btn-edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(edu._id)}
                      className="btn-icon btn-delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="empty-state">
            <p>No education entries added yet. Click "Add Education" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Certificates Tab Component
const CertificatesTab = ({ data, onAdd, onEdit }) => {
  const { deleteCertificate } = usePortfolio();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      const result = await deleteCertificate(id);
      if (result.success) {
        toast.success('Certificate deleted successfully');
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Certificates Management</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Certificate
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Issuer</th>
              <th>Date</th>
              <th>Credential ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cert) => (
              <tr key={cert._id}>
                <td>{cert.name}</td>
                <td>{cert.issuer}</td>
                <td>{cert.date}</td>
                <td>{cert.credentialId}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => onEdit(cert)}
                      className="btn-icon btn-edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(cert._id)}
                      className="btn-icon btn-delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="empty-state">
            <p>No certificates added yet. Click "Add Certificate" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Messages Tab Component
const MessagesTab = ({ data, onRefresh }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/portfolio/messages/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const result = await response.json();
        if (result.success) {
          toast.success('Message deleted successfully');
          onRefresh();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error('Error deleting message');
      }
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Messages Management</h2>
        <button onClick={onRefresh} className="btn btn-primary">
          Refresh Messages
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((message) => (
              <tr key={message._id}>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
                <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => handleDelete(message._id)}
                      className="btn-icon btn-delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="empty-state">
            <p>No messages received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Languages Tab Component
const LanguagesTab = ({ data, onAdd, onEdit }) => {
  const { deleteLanguage } = usePortfolio();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this language?')) {
      const result = await deleteLanguage(id);
      if (result.success) {
        toast.success('Language deleted successfully');
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Languages Management</h2>
        <button onClick={onAdd} className="btn btn-primary">
          <FaPlus /> Add Language
        </button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Language</th>
              <th>Proficiency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((lang) => (
              <tr key={lang._id}>
                <td>{lang.name}</td>
                <td>{lang.proficiency}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => onEdit(lang)}
                      className="btn-icon btn-edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(lang._id)}
                      className="btn-icon btn-delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="empty-state">
            <p>No languages added yet. Click "Add Language" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};