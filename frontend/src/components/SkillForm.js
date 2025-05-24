import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { usePortfolio } from '../context/PortfolioContext';

const SkillForm = ({ data, onClose, isEditing }) => {
  const [formData, setFormData] = useState({
    name: data?.name || '',
    category: data?.category || 'Technical',
    level: data?.level || 'Intermediate',
    icon: data?.icon || ''
  });
  const [loading, setLoading] = useState(false);
  
  const { addSkill, updateSkill } = usePortfolio();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name) {
      toast.error('Skill name is required');
      setLoading(false);
      return;
    }

    const result = isEditing 
      ? await updateSkill(data._id, formData)
      : await addSkill(formData);

    if (result.success) {
      toast.success(`Skill ${isEditing ? 'updated' : 'added'} successfully`);
      onClose();
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="form-group">
        <label className="form-label">Skill Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., React.js"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-input form-select"
        >
          <option value="Technical">Technical</option>
          <option value="Programming Language">Programming Language</option>
          <option value="Framework">Framework</option>
          <option value="Database">Database</option>
          <option value="Tools">Tools</option>
          <option value="Soft Skills">Soft Skills</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Proficiency Level</label>
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="form-input form-select"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Icon (Optional)</label>
        <input
          type="text"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          className="form-input"
          placeholder="Icon name or emoji"
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
          {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add')} Skill
        </button>
      </div>
    </form>
  );
};

export default SkillForm;