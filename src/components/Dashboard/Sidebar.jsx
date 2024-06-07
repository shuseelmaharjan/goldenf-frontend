import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; 
import longLogo from '../assets/goldenlogowhite.webp';
import { HiDocumentReport } from "react-icons/hi";
import apiClient from '../apiClient';

const Sidebar = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await apiClient.get('/user-auth/user/');
        setIsTeacher(response.data.is_teacher);
        setIsUser(response.data.is_user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

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
              <NavLink to="/dashboard" exact activeClassName="active" style={{ width: '100%' }}>
                <span style={{width:'15px', fontSize:'1rem'}}><i class="fa-solid fa-house"></i></span>Dashboard
              </NavLink>
            </li>
            {isUser && (
              <>
            <li className='mb-3'>
            <NavLink to="/exams" activeClassName="active" style={{ width: '100%' }}>
              <span style={{width:'15px', fontSize:'1rem'}}><i class="fa-solid fa-clipboard"></i></span>Exams
            </NavLink>
          </li>
          
        <li className='mb-3'>
                <NavLink to="/exam/examhistory" activeClassName="active" style={{ width: '100%' }}>
                  <span style={{width:'15px', fontSize:'1rem'}}><HiDocumentReport /></span>Exam Report
                </NavLink>
              </li>
        </>
            )}

            {isTeacher && (
<>
<li className='mb-3'>
                <NavLink to="/create-questions" activeClassName="active" style={{ width: '100%' }}>
                  <span style={{width:'15px', fontSize:'1rem'}}><HiDocumentReport /></span>Create Question
                </NavLink>
              </li>
              <li className='mb-3'>
                <NavLink to="/schedule-exam" activeClassName="active" style={{ width: '100%' }}>
                  <span style={{width:'15px', fontSize:'1rem'}}><i class="fa-solid fa-clipboard"/></span>Schedule Exam
                </NavLink>
              </li>
              </>
            )}
            <li className='mb-3'>
          <NavLink to="/change-password" activeClassName="active" style={{ width: '100%' }}>
            <span style={{width:'15px', fontSize:'1rem'}}><i class="fa-solid fa-key"></i></span>Change Password
          </NavLink>
        </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
