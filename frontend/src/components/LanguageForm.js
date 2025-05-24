import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { usePortfolio } from '../context/PortfolioContext';

const LanguageForm = ({ data, onClose, isEditing }) => {
  const [formData, setFormData] = useState({
    name: data?.name || '',
    proficiency: data?.proficiency || 'Intermediate',
    description: data?.description || '',
    certificates: data?.certificates?.join('\n') || ''
  });
  const [loading, setLoading] = useState(false);
  
  const { addLanguage, updateLanguage } = usePortfolio();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.proficiency) {
      toast.error('Language name and proficiency are required');
      setLoading(false);
      return;
    }

    const submitData = {
      ...formData,
      certificates: formData.certificates.split('\n').map(cert => cert.trim()).filter(cert => cert)
    };

    const result = isEditing 
      ? await updateLanguage(data._id, submitData)
      : await addLanguage(submitData);

    if (result.success) {
      toast.success(`Language ${isEditing ? 'updated' : 'added'} successfully`);
      onClose();
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="form-group">
        <label htmlFor="name">Language Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter language name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="proficiency">Proficiency Level*</label>
        <select
          id="proficiency"
          name="proficiency"
          value={formData.proficiency}
          onChange={handleChange}
          required
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Native">Native</option>
          <option value="Fluent">Fluent</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description or additional notes"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="certificates">Certificates/Qualifications (one per line)</label>
        <textarea
          id="certificates"
          name="certificates"
          value={formData.certificates}
          onChange={handleChange}
          placeholder="Enter language certificates or qualifications"
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add')} Language
        </button>
      </div>
    </form>
  );
};

export default LanguageForm;