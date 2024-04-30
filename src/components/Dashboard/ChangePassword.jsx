import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import apiClient from '../apiClient';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const userId = localStorage.getItem('userId');

  const handleChangePassword = async () => {
    setError(null);
    setSuccessMessage(null);

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      const response = await apiClient.post(`/api/change-password/${userId}/`, {
        current_password: currentPassword,
        new_password: newPassword
      });
      if (response.status === 200) {
        setSuccessMessage('Password changed successfully');
      } else {
        setError('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('An error occurred while changing password');
    }
  };

  return (
    <div className='main d-flex' style={{ width: '100%', height: '100vh' }}>
      <Sidebar />
      <div className="wrapper">
        <Topbar />
        <div className="main-content">
          <div className="container">
            <div className="row">
              <h5>Change Password</h5>
            </div>
            <div className="box">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <button className="btn btn-primary" onClick={handleChangePassword}>Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
