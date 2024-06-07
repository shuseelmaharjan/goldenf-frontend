import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';
import './ChangePassword.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/user-auth/user/`);
        setUsername(response.data.username);
        setUserId(response.data.user_id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
    const fetchUserId = async () => {
      try {
        const response = await apiClient.get('auth/api/current-user/');
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId === null) {
      console.error('Unable to retrieve user ID.');
      return;
    }
    try {
      setIsChangingPassword(true);
      const response = await apiClient.put(`/api/update-password/${userId}/`, {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      setMessage('Password Changed Successfully!');
      console.log(response);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(''); 
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred while updating the password.');
      setError(error.response?.data?.message || 'An error occurred while updating the password.');
    } finally {
      setIsChangingPassword(false);
    }
  };
  

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='main d-flex' style={{ width: '100%', height: '100vh' }}>
      <Sidebar />
      <div className="wrapper">
        <Topbar username={username} />
        <div className="main-content">
          <div className="container">
            <h5>Change Password</h5>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword" className='form-label'>Current Password:</label>
                <div className="input-group">
                  <input 
                    type={showCurrentPassword ? 'text' : 'password'} 
                    className='form-control' 
                    name="currentPassword" 
                    value={currentPassword} 
                    onChange={handleChange} 
                    required 
                  />
                  <button 
                    className="btn btn-outline-secondary toggle-button" 
                    type="button" 
                    onClick={toggleShowCurrentPassword}
                  >
                    {showCurrentPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="newPassword" className='form-label'>New Password:</label>
                <div className="input-group">
                  <input 
                    type={showNewPassword ? 'text' : 'password'} 
                    className='form-control' 
                    name="newPassword" 
                    value={newPassword} 
                    onChange={handleChange} 
                    required 
                  />
                  <button 
                    className="btn btn-outline-secondary toggle-button" 
                    type="button" 
                    onClick={toggleShowNewPassword}
                  >
                    {showNewPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword" className='form-label'>Confirm Password</label>
                <div className="input-group">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    className='form-control' 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={handleChange} 
                    required 
                  />
                  <button 
                    className="btn btn-outline-secondary toggle-button" 
                    type="button" 
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="row d-flex justify-content-end">
                <div className="col-auto">
                  <button type="submit" className={`btn btn-primary ${isChangingPassword ? 'disabled' : ''}`}>
                    {isChangingPassword ? 'Changing Password...' : 'Change Password'}
                  </button>            
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
