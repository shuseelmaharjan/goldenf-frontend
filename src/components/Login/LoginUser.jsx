import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginUser.css';
import logo from '../assets/goldenlogoblack.webp';
import apiClient from '../apiClient';

const LoginUser = ({ setLoggedIn }) => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      navigate('/dashboard');
    }
  }, [navigate, setLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await apiClient.post('/auth/api/login/', formData);
      if (response.status === 200) {
        console.log('Login successful');
        const { token, username } = response.data; 
        localStorage.setItem('token', token);
        localStorage.setItem('username', username); 
  
        setLoggedIn(true);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error validating credentials:', error);
      setError('Invalid credentials');
    }
  };
  
  return (
    <div className="login">
      <div className="wrapper">
        <div className="col">
          <div className="row">
            <img src={logo} alt="" />
          </div>
          <div className="row">
            <h1>Sign in</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className='mb-2'>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className='mb-2'>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group d-flex align-items-center">
            <input 
              type="checkbox" 
              id="showPassword" 
              name="showPassword" 
              checked={showPassword} 
              onChange={togglePasswordVisibility} 
              className="me-2"
            />
            <label htmlFor="showPassword" className='mb-0'>Show Password</label>
          </div>
          <button type="submit" color="primary" className="btn-login">
            Login
          </button>
          {error && 
            <div className="alert alert-danger alert-dismissible fade show my-2 py-2 d-flex justify-content-between align-items-center" role="alert">
              <span className="error-message">{error}</span>
              <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close" style={{ fontSize: '0.75rem' }}></button>
            </div>
          }
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
