import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { usePortfolio } from '../context/PortfolioContext';
const EducationForm = ({ data, onClose, isEditing }) => {
  const [formData, setFormData] = useState({
    institution: data?.institution || '',
    degree: data?.degree || '',
    field: data?.field || '',
    location: data?.location || '',
    description: data?.description || '',
    achievements: data?.achievements?.join('\n') || '',
    current: data?.current || false,
    startDate: data?.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
    endDate: data?.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '',
    gpa: data?.gpa || ''
  });
  const [loading, setLoading] = useState(false);
  
  const { addEducation, updateEducation } = usePortfolio();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.institution || !formData.degree) {
      toast.error('Institution and degree are required');
      setLoading(false);
      return;
    }

    const submitData = {
      ...formData,
      achievements: formData.achievements.split('\n').map(item => item.trim()).filter(item => item)
    };

    const result = isEditing 
      ? await updateEducation(data._id, submitData)
      : await addEducation(submitData);

    if (result.success) {
      toast.success(`Education ${isEditing ? 'updated' : 'added'} successfully`);
      onClose();
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="form-group">
        <label htmlFor="institution">Institution*</label>
        <input
          type="text"
          id="institution"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          placeholder="Enter institution name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="degree">Degree*</label>
        <input
          type="text"
          id="degree"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          placeholder="Enter degree"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="field">Field of Study</label>
        <input
          type="text"
          id="field"
          name="field"
          value={formData.field}
          onChange={handleChange}
          placeholder="Enter field of study"
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="gpa">GPA</label>
        <input
          type="text"
          id="gpa"
          name="gpa"
          value={formData.gpa}
          onChange={handleChange}
          placeholder="Enter GPA (optional)"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="achievements">Achievements (one per line)</label>
        <textarea
          id="achievements"
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          placeholder="Enter achievements"
          rows="4"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={formData.current}
          />
        </div>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="current"
            checked={formData.current}
            onChange={handleChange}
          />
          Currently studying here
        </label>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add')} Education
        </button>
      </div>
    </form>
  );
};

export default EducationForm;