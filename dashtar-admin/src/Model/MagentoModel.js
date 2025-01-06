// Import React and useState from React
import React, { useEffect, useState } from 'react';
import '../assets/css/model.css'
const MagentoModal = ({ isOpen, onClose, onSave, existingData }) => {
    const [formData, setFormData] = useState({
      storeUrl: '',
      consumerSecret: '',
      consumerKey: '',
      accessToken: '',
      accessTokenSecret: '',
    });
  
    useEffect(() => {
      if (existingData) {
        setFormData({
          storeUrl: existingData[0].storeUrl,
          consumerSecret: existingData[0].consumerSecret,
          consumerKey: existingData[0].consumerKey,
          accessToken: existingData[0].accessToken,
          accessTokenSecret: existingData[0].accessTokenSecret,
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
    // Pass form data up to parent component for API submission
    console.log(formData)
    onSave(formData);
  };

  // Early return if not open
  if (!isOpen) return null;

  // Modal content
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Store</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="storeUrl" className="form-label">Store URL</label>
            <input type="text" id="storeUrl" name="storeUrl" placeholder="https://example.com" value={formData.storeUrl} onChange={handleChange} required className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="consumerSecret" className="form-label">Consumer Secret</label>
            <input type="text" id="consumerSecret" name="consumerSecret" placeholder="Your Consumer Secret" value={formData.consumerSecret} onChange={handleChange} required className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="consumerKey" className="form-label">Consumer Key</label>
            <input type="text" id="consumerKey" name="consumerKey" placeholder="Your Consumer Key" value={formData.consumerKey} onChange={handleChange} required className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="accessToken" className="form-label">Access Token</label>
            <input type="text" id="accessToken" name="accessToken" placeholder="Your Access Token" value={formData.accessToken} onChange={handleChange} required className="input" />
          </div>
          <div className="form-group">
            <label htmlFor="accessTokenSecret" className="form-label">Access Token Secret</label>
            <input type="text" id="accessTokenSecret" name="accessTokenSecret" placeholder="Your Access Token Secret" value={formData.accessTokenSecret} onChange={handleChange} required className="input" />
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

export default MagentoModal;
