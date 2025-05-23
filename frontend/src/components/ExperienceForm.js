const ExperienceForm = ({ data, onClose, isEditing }) => {
  const [formData, setFormData] = useState({
    company: data?.company || '',
    position: data?.position || '',
    location: data?.location || '',
    description: data?.description || '',
    achievements: data?.achievements?.join('\n') || '',
    technologies: data?.technologies?.join(', ') || '',
    current: data?.current || false,
    startDate: data?.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
    endDate: data?.endDate ? new Date(data.endDate).toISOString().split('T')[0] : ''
  });
  const [loading, setLoading] = useState(false);
  
  const { addExperience, updateExperience } = usePortfolio();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.company || !formData.position) {
      toast.error('Company and position are required');
      setLoading(false);
      return;
    }

    const submitData = {
      ...formData,
      achievements: formData.achievements.split('\n').map(item => item.trim()).filter(item => item),
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
    };

    const result = isEditing 
      ? await updateExperience(data._id, submitData)
      : await addExperience(submitData);

    if (result.success) {
      toast.success(`Experience ${isEditing ? 'updated' : 'added'} successfully`);
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
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="form-input"
            placeholder="Company name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="form-input"
            placeholder="Job title"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="form-input"
          placeholder="City, Country"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input form-textarea"
          rows="4"
          placeholder="Job description and responsibilities..."
        />
      </div>

      <div className="form-group">
        <label className="form-label">Key Achievements (one per line)</label>
        <textarea
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          className="form-input form-textarea"
          rows="4"
          placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Technologies Used (comma-separated)</label>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          className="form-input"
          placeholder="React, Node.js, AWS, etc."
        />
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
            required
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
            disabled={formData.current}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="current"
            checked={formData.current}
            onChange={handleChange}
          />
          Currently working here
        </label>
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
          {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add')} Experience
        </button>
      </div>
    </form>
  );
};