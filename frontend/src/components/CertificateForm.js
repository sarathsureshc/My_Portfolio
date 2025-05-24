import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { usePortfolio } from '../context/PortfolioContext';

const CertificateForm = ({ data, onClose, isEditing }) => {
  const [formData, setFormData] = useState({
    name: data?.name || '',
    issuer: data?.issuer || '',
    issueDate: data?.issueDate ? new Date(data.issueDate).toISOString().split('T')[0] : '',
    expiryDate: data?.expiryDate ? new Date(data.expiryDate).toISOString().split('T')[0] : '',
    credentialId: data?.credentialId || '',
    credentialUrl: data?.credentialUrl || '',
    description: data?.description || '',
    skills: data?.skills?.join(', ') || ''
  });
  const [loading, setLoading] = useState(false);
  
  const { addCertificate, updateCertificate } = usePortfolio();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.issuer) {
      toast.error('Certificate name and issuer are required');
      setLoading(false);
      return;
    }

    const submitData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
    };

    const result = isEditing 
      ? await updateCertificate(data._id, submitData)
      : await addCertificate(submitData);

    if (result.success) {
      toast.success(`Certificate ${isEditing ? 'updated' : 'added'} successfully`);
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
        <label htmlFor="name">Certificate Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter certificate name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="issuer">Issuer*</label>
        <input
          type="text"
          id="issuer"
          name="issuer"
          value={formData.issuer}
          onChange={handleChange}
          placeholder="Enter issuer name"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="issueDate">Issue Date</label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="credentialId">Credential ID</label>
        <input
          type="text"
          id="credentialId"
          name="credentialId"
          value={formData.credentialId}
          onChange={handleChange}
          placeholder="Enter credential ID"
        />
      </div>

      <div className="form-group">
        <label htmlFor="credentialUrl">Credential URL</label>
        <input
          type="url"
          id="credentialUrl"
          name="credentialUrl"
          value={formData.credentialUrl}
          onChange={handleChange}
          placeholder="Enter credential URL"
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
        <label htmlFor="skills">Skills (comma-separated)</label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Enter related skills"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add')} Certificate
        </button>
      </div>
    </form>
  );
};

export default CertificateForm;
