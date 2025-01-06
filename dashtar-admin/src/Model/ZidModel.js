import React, { useEffect, useState } from 'react';
import '../assets/css/model.css'; // Adjust the path as necessary

const ZidModal = ({ isOpen, onClose, onSave, existingData }) => {
  const [formData, setFormData] = useState({
    accessToken: '',
    role: '',
    xManagerToken: '',
    storeId: '',
  });

  useEffect(() => {
    if (existingData) {
      setFormData({
        accessToken: existingData[0].accessToken,
        role: existingData[0].role,
        xManagerToken: existingData[0]['x-manager-token'],
        storeId: existingData[0].storeId,
      });
    }
  }, [existingData]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSave(formData);
  };

  // Early return if not open
  if (!isOpen) return null;

  // Modal content
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add/Edit Zid Record</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="accessToken" className="form-label">Access Token</label>
            <input type="text" id="accessToken" name="accessToken" placeholder="Your Access Token" value={formData.accessToken} onChange={handleChange} required className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="form-label">Role</label>
            <input type="text" id="role" name="role" placeholder="User Role" value={formData.role} onChange={handleChange} required className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="xManagerToken" className="form-label">X-Manager-Token</label>
            <input type="text" id="xManagerToken" name="xManagerToken" placeholder="Your X-Manager-Token" value={formData.xManagerToken} onChange={handleChange} required className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="storeId" className="form-label">Store ID</label>
            <input type="text" id="storeId" name="storeId" placeholder="Associated Store ID" value={formData.storeId} onChange={handleChange} required className="input" />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="button button-cancel">Cancel</button>
            <button type="submit" className="button button-save">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ZidModal;
