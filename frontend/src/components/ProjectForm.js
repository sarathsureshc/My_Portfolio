import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { usePortfolio } from '../context/PortfolioContext';

const ProjectForm = ({ data, onClose, isEditing }) => {
  const [formData, setFormData] = useState({
    title: data?.title || '',
    description: data?.description || '',
    technologies: data?.technologies?.join(', ') || '',
    features: data?.features?.join(', ') || '',
    liveUrl: data?.liveUrl || '',
    githubUrl: data?.githubUrl || '',
    status: data?.status || 'Completed',
    startDate: data?.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
    endDate: data?.endDate ? new Date(data.endDate).toISOString().split('T')[0] : ''
  });
  const [loading, setLoading] = useState(false);
  
  const { addProject, updateProject } = usePortfolio();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      setLoading(false);
      return;
    }

    const submitData = new FormData();
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
      features: formData.features.split(',').map(feature => feature.trim()).filter(feature => feature)
    };

    if (formData.image && typeof formData.image === 'object') {
      submitData.append('image', formData.image);
    }
    submitData.append('projectData', JSON.stringify(projectData));

    const result = isEditing 
      ? await updateProject(data._id, submitData)
      : await addProject(submitData);

    if (result.success) {
      toast.success(`Project ${isEditing ? 'updated' : 'added'} successfully`);
      onClose();
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Project name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-input form-select"
          >
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Planned">Planned</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input form-textarea"
          rows="4"
          placeholder="Project description..."
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Technologies (comma-separated)</label>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          className="form-input"
          placeholder="React, Node.js, MongoDB, etc."
        />
      </div>

      <div className="form-group">
        <label className="form-label">Key Features (comma-separated)</label>
        <input
          type="text"
          name="features"
          value={formData.features}
          onChange={handleChange}
          className="form-input"
          placeholder="User authentication, Real-time chat, etc."
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Live URL</label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            className="form-input"
            placeholder="https://project-demo.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="form-input"
            placeholder="https://github.com/username/project"
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Project Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="form-input"
          accept="image/*"
        />
      </div>

      <div className="form-buttons">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button 
          type="submit" 
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add')} Project
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
