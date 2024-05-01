import React, { useState } from 'react';
import apiClient from '../apiClient';
import AppNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const OnlineApplication = () => {
  window.scrollTo(0, 0); 
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    username: '',
    phone: '',
    address: '',
    guardian: '',
    desired_course: '',
    school_name: '',
    level: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      remarks: `Desired Course: ${formData.desired_course}\nName of School/College: ${formData.school_name}\nLevel: ${formData.level}`
    };

    try {
      setLoading(true); 
      const response = await apiClient.post('/api/custom-users/', postData);
      setSuccessMessage('Form submitted successfully');
      setErrorMessage(''); 
      console.log('Form submitted successfully', response.data);
    } catch (error) {
      setErrorMessage('Error submitting form');
      setSuccessMessage(''); 
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
    <AppNavbar/>
    <div className='container py-3' style={{ marginTop: '120px' }}>
      <div className="row text-center py-2 text-center align-items-center" style={{ background: 'rgb(11, 117, 204)' }}>
        <h4 className='text-white'>Online Application</h4>
      </div>
      <div className="row px-3 py-3" style={{ background: '#F1F8F8', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <div className="form-label">Full Name:</div>
              <input type="text" className='form-control' name="full_name" value={formData.full_name} onChange={handleChange} />
            </div>
            <div className="form-group mt-3">
              <div className="form-label">Email:</div>
              <input type="email" className='form-control' name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group mt-3">
              <div className="form-label">Username:</div>
              <input type="text" className='form-control' name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="form-group mt-3">
              <div className="form-label">Phone Number:</div>
              <input type="number" className='form-control' name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group mt-3">
              <div className="form-label">Address:</div>
              <input type="text" className='form-control' name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="form-group mt-3">
              <div className="form-label">Guardian:</div>
              <input type="text" className='form-control' name="guardian" value={formData.guardian} onChange={handleChange} />
            </div>
            <div className="form-group mt-3">
              <div className="form-label">Desired Course:</div>
              <input type="text" className='form-control' name="desired_course" value={formData.desired_course} onChange={handleChange} />
            </div>
            <div className="form-group mt-3">
              <div className="form-label">Name of School/College:</div>
              <input type="text" className='form-control' name="school_name" value={formData.school_name} onChange={handleChange} />
            </div>
            <div className="form-group mt-3">
              <div className="form-label">Level:</div>
              <select name="level" id="level" className='form-control' value={formData.level} onChange={handleChange}>
                <option value="">SEE</option>
                <option value="">+2</option>
                <option value="">Other</option>
              </select>
            </div>
            <button type="submit" className='btn btn-primary mt-3' disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>            
            </form>
          {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
    </div>
    <Footer/>
    </>

  );
};

export default OnlineApplication;