import React, { useState, useEffect } from 'react';
import Logout from './LogOut';
import './Dashboard.css';
import apiClient from '../apiClient';

const Topbar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await apiClient.get('/user-auth/user/');
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  const toggleBtn = () => {
    document.getElementById('sidebar').style.display = 'flex';
  };

  return (
    <>
      <div className="topbar">
        <div className="container toggle">
          <div className="col" id='togglebar'>
            <button onClick={toggleBtn}><i className="fa-solid fa-bars"/></button>
          </div>
          <div className="col d-flex justify-content-end">
            <div className="username mx-2">Welcome, {username}</div>
            <Logout/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
