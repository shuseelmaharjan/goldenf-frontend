import React from 'react';
import { NavLink } from 'react-router-dom'; // Removed unused import
import longLogo from '../assets/goldenlogowhite.webp';

const Sidebar = () => {
  const toggleBtn = () => {
    document.getElementById('sidebar').style.display = 'none';
  };

  return (
    <div className="sidebar" id='sidebar'>
      <div className="container">
        <div className="row d-flex justify-content-end" id='closeBtn'>
          <div className="col-auto">
            <button onClick={toggleBtn}><i className="fa-solid fa-xmark"></i></button>
          </div>
        </div>
        <div className="row">
          <img src={longLogo} alt="logo" />
        </div>
        <div className="row mt-3">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className='mb-3'>
              <NavLink to="/dashboard" exact activeClassName="active" style={{ width: '100%' }}><span><i class="fa-solid fa-house"></i></span>Dashboard</NavLink>
            </li>
            <li className='mb-3'>
              <NavLink to="/exams" activeClassName="active" style={{ width: '100%' }}><span><i class="fa-solid fa-clipboard"></i></span>Exams</NavLink>
            </li>
            <li className='mb-3'>
              <NavLink to="/change-password" activeClassName="active" style={{ width: '100%' }}><span><i class="fa-solid fa-key"></i></span>Change Password</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
