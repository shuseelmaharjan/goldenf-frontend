import React from 'react';
import Logout from './LogOut';
import './Dashboard.css';

const Topbar = () => {
  const username = localStorage.getItem('username');

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
            <div className="username">{username}</div>
            <Logout/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
